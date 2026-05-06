import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { generateToken, hashToken } from '@/lib/tokens';
import { passwordResetEmail, sendEmail } from '@/lib/email';
import { getClientIp, rateLimit, rateLimitResponse } from '@/lib/rate-limit';

const requestSchema = z.object({ email: z.string().email() });
const confirmSchema = z.object({
  token: z.string().min(32),
  password: z.string().min(8),
});

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

// Step 1: User requests a reset email.
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const result = rateLimit(`password-reset:${ip}`, { limit: 5, windowMs: 60 * 60 * 1000 });
  if (!result.ok) return rateLimitResponse(result, 3600);

  const body = await req.json().catch(() => ({}));
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Email non valida' }, { status: 400 });
  }

  // Always respond OK to avoid leaking which emails are registered.
  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (user) {
    const { raw, hash: tokenHash } = generateToken();
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt: new Date(Date.now() + TOKEN_TTL_MS),
      },
    });

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/auth/reset-password?token=${raw}`;
    void sendEmail({
      to: user.email,
      ...passwordResetEmail({ name: user.firstName, resetUrl }),
    }).catch((err) => console.error('Failed to send reset email:', err));
  }

  return NextResponse.json({ success: true });
}

// Step 2: User submits new password with token.
export async function PATCH(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const parsed = confirmSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dati non validi' }, { status: 400 });
  }

  const tokenHash = hashToken(parsed.data.token);
  const record = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });

  if (!record || record.consumedAt || record.expiresAt < new Date()) {
    return NextResponse.json({ error: 'Token non valido o scaduto' }, { status: 400 });
  }

  const passwordHash = await hash(parsed.data.password, 12);

  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
    prisma.passwordResetToken.update({ where: { id: record.id }, data: { consumedAt: new Date() } }),
    // Invalidate all other outstanding reset tokens for this user.
    prisma.passwordResetToken.updateMany({
      where: { userId: record.userId, consumedAt: null, NOT: { id: record.id } },
      data: { consumedAt: new Date() },
    }),
  ]);

  return NextResponse.json({ success: true });
}
