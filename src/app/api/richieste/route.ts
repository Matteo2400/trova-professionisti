import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { quoteRequestEmail, sendEmail } from '@/lib/email';
import { getClientIp, rateLimit, rateLimitResponse } from '@/lib/rate-limit';

const quoteSchema = z.object({
  professionalId: z.string().min(1),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  address: z.string().min(3),
  city: z.string().min(2),
  category: z.string().min(1),
  description: z.string().min(10),
  preferredDate: z.string().optional(),
  urgency: z.enum(['bassa', 'media', 'alta']),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const result = rateLimit(`quote:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!result.ok) return rateLimitResponse(result, 600);

  try {
    const body = await request.json();
    const parsed = quoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dati non validi', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const professional = await prisma.professional.findUnique({
      where: { id: parsed.data.professionalId },
      include: { user: true },
    });

    if (!professional || !professional.isApproved || professional.isSuspended) {
      return NextResponse.json({ error: 'Professionista non trovato' }, { status: 404 });
    }

    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        professionalId: parsed.data.professionalId,
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        address: parsed.data.address,
        city: parsed.data.city,
        category: parsed.data.category,
        description: parsed.data.description,
        preferredDate: parsed.data.preferredDate,
        urgency: parsed.data.urgency,
        status: 'nuova',
      },
    });

    await prisma.notification.create({
      data: {
        userId: professional.userId,
        type: 'new_request',
        title: 'Nuova richiesta di preventivo',
        message: `${parsed.data.firstName} ${parsed.data.lastName} ha richiesto un preventivo per: ${parsed.data.description.substring(0, 100)}`,
        data: JSON.stringify({ requestId: quoteRequest.id }),
      },
    });

    // Best-effort email; do not fail the request if email fails.
    void sendQuoteEmail(professional, parsed.data).catch((err) =>
      console.error('Failed to send quote email:', err),
    );

    return NextResponse.json({ success: true, request: quoteRequest }, { status: 201 });
  } catch (err) {
    console.error('Quote request error:', err);
    return NextResponse.json({ error: 'Errore del server' }, { status: 500 });
  }
}

async function sendQuoteEmail(
  professional: { user: { email: string; firstName: string } },
  data: z.infer<typeof quoteSchema>,
) {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const { subject, html } = quoteRequestEmail({
    proName: professional.user.firstName,
    clientName: `${data.firstName} ${data.lastName}`,
    clientEmail: data.email,
    clientPhone: data.phone,
    city: data.city,
    description: data.description,
    urgency: data.urgency,
    dashboardUrl: `${baseUrl}/dashboard/richieste`,
  });
  await sendEmail({
    to: professional.user.email,
    subject,
    html,
    replyTo: data.email,
  });
}
