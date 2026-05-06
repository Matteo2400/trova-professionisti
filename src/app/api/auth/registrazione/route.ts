import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { getClientIp, rateLimit, rateLimitResponse } from '@/lib/rate-limit';
import { generateToken } from '@/lib/tokens';
import { emailVerificationEmail, sendEmail } from '@/lib/email';

const VERIFY_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

async function sendVerificationEmail(userId: string, email: string, name: string) {
  const { raw, hash: tokenHash } = generateToken();
  await prisma.emailVerificationToken.create({
    data: {
      userId,
      email,
      tokenHash,
      expiresAt: new Date(Date.now() + VERIFY_TOKEN_TTL_MS),
    },
  });
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const verifyUrl = `${baseUrl}/auth/verifica-email?token=${raw}`;
  await sendEmail({ to: email, ...emailVerificationEmail({ name, verifyUrl }) });
}

const baseSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8).optional(),
  password: z.string().min(8),
});

const clientSchema = baseSchema.extend({
  role: z.literal('client'),
});

const professionalSchema = baseSchema.extend({
  role: z.literal('professional'),
  phone: z.string().min(8),
  vatNumber: z.string().min(11).max(16),
  category: z.string().min(1),
  city: z.string().min(2),
  description: z.string().min(20),
});

const schema = z.discriminatedUnion('role', [clientSchema, professionalSchema]);

function makeSlug(parts: string[]): string {
  return parts
    .join('-')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const result = rateLimit(`register:${ip}`, { limit: 5, windowMs: 15 * 60 * 1000 });
  if (!result.ok) return rateLimitResponse(result, 900);

  try {
    const body = await request.json();
    const parsed = schema.safeParse({
      ...body,
      role: body.role || 'professional',
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dati non validi', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      return NextResponse.json({ error: 'Email già registrata' }, { status: 409 });
    }

    if (data.role === 'professional') {
      const existingVat = await prisma.professional.findUnique({
        where: { vatNumber: data.vatNumber },
      });
      if (existingVat) {
        return NextResponse.json({ error: 'Partita IVA già registrata' }, { status: 409 });
      }

      const category = await prisma.category.findUnique({ where: { slug: data.category } });
      if (!category) {
        return NextResponse.json({ error: 'Categoria non valida' }, { status: 400 });
      }

      const passwordHash = await hash(data.password, 12);
      const slugBase = makeSlug([data.firstName, data.lastName, data.category, data.city]);

      const existingSlug = await prisma.professional.findUnique({ where: { slug: slugBase } });
      const finalSlug = existingSlug ? `${slugBase}-${Date.now()}` : slugBase;

      const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            email: data.email,
            passwordHash,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            role: 'professional',
          },
        });

        const professional = await tx.professional.create({
          data: {
            userId: user.id,
            slug: finalSlug,
            vatNumber: data.vatNumber,
            description: data.description,
            city: data.city,
            province: '',
            coverageAreas: JSON.stringify([data.city]),
            isApproved: false,
          },
        });

        await tx.professionalCategory.create({
          data: { professionalId: professional.id, categoryId: category.id },
        });

        return { user, professional };
      });

      void sendVerificationEmail(result.user.id, data.email, data.firstName).catch((err) =>
        console.error('Failed to send verification email:', err),
      );

      return NextResponse.json(
        {
          success: true,
          role: 'professional',
          message: "Registrazione completata. Il tuo profilo sarà attivo dopo l'approvazione.",
          userId: result.user.id,
        },
        { status: 201 },
      );
    }

    // Client registration
    const passwordHash = await hash(data.password, 12);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        role: 'client',
      },
    });

    void sendVerificationEmail(user.id, data.email, data.firstName).catch((err) =>
      console.error('Failed to send verification email:', err),
    );

    return NextResponse.json(
      {
        success: true,
        role: 'client',
        message: 'Registrazione completata. Puoi accedere al sito.',
        userId: user.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Errore del server' }, { status: 500 });
  }
}
