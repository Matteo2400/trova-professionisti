import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { newReviewEmail, sendEmail } from '@/lib/email';
import { getClientIp, rateLimit, rateLimitResponse } from '@/lib/rate-limit';

const reviewSchema = z.object({
  professionalId: z.string().min(1),
  authorName: z.string().min(2),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(10),
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const result = rateLimit(`review:${ip}`, { limit: 3, windowMs: 60 * 60 * 1000 });
  if (!result.ok) return rateLimitResponse(result, 3600);

  try {
    const body = await request.json();
    const parsed = reviewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dati non validi', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const professional = await prisma.professional.findUnique({
      where: { id: parsed.data.professionalId },
      include: { user: { select: { email: true, firstName: true } } },
    });

    if (!professional) {
      return NextResponse.json({ error: 'Professionista non trovato' }, { status: 404 });
    }

    // Anti-spam: same author cannot leave more than one review per professional in 7 days.
    const recent = await prisma.review.findFirst({
      where: {
        professionalId: parsed.data.professionalId,
        authorName: parsed.data.authorName,
        createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
    });
    if (recent) {
      return NextResponse.json(
        { error: 'Hai già lasciato una recensione recente per questo professionista.' },
        { status: 409 },
      );
    }

    const review = await prisma.review.create({
      data: {
        professionalId: parsed.data.professionalId,
        authorName: parsed.data.authorName,
        rating: parsed.data.rating,
        comment: parsed.data.comment,
        verified: false,
        // Default to pending moderation; admin must approve.
        isApproved: false,
      },
    });

    // Recalculate rating only counting approved reviews.
    const approved = await prisma.review.findMany({
      where: { professionalId: parsed.data.professionalId, isApproved: true },
    });
    const avg = approved.length
      ? approved.reduce((s, r) => s + r.rating, 0) / approved.length
      : 0;
    await prisma.professional.update({
      where: { id: parsed.data.professionalId },
      data: {
        rating: Math.round(avg * 10) / 10,
        reviewCount: approved.length,
      },
    });

    await prisma.notification.create({
      data: {
        userId: professional.userId,
        type: 'new_review',
        title: 'Nuova recensione (in attesa di moderazione)',
        message: `${parsed.data.authorName} ha lasciato una recensione (${parsed.data.rating}/5)`,
        data: JSON.stringify({ reviewId: review.id }),
      },
    });

    void (async () => {
      const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
      const { subject, html } = newReviewEmail({
        proName: professional.user.firstName,
        rating: parsed.data.rating,
        comment: parsed.data.comment,
        authorName: parsed.data.authorName,
        dashboardUrl: `${baseUrl}/dashboard/recensioni`,
      });
      await sendEmail({ to: professional.user.email, subject, html });
    })().catch((err) => console.error('Failed to send review email:', err));

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (err) {
    console.error('Review error:', err);
    return NextResponse.json({ error: 'Errore del server' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const professionalId = searchParams.get('professionalId');

  if (!professionalId) {
    return NextResponse.json({ error: 'professionalId richiesto' }, { status: 400 });
  }

  const reviews = await prisma.review.findMany({
    where: { professionalId, isApproved: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(reviews);
}
