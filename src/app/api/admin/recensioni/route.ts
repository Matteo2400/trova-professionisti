import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      include: {
        professional: {
          include: {
            user: { select: { firstName: true, lastName: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.review.count(),
  ]);

  return NextResponse.json({
    reviews: reviews.map((r) => ({
      id: r.id,
      authorName: r.authorName,
      rating: r.rating,
      comment: r.comment,
      verified: r.verified,
      isApproved: r.isApproved,
      response: r.response,
      professionalName: `${r.professional.user.firstName} ${r.professional.user.lastName}`,
      createdAt: r.createdAt.toISOString(),
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

export async function PATCH(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const body = await request.json();
  const { reviewId, action } = body;

  if (!reviewId || !action) {
    return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 });
  }

  if (action === 'approve') {
    await prisma.review.update({ where: { id: reviewId }, data: { isApproved: true } });
  } else if (action === 'reject') {
    await prisma.review.update({ where: { id: reviewId }, data: { isApproved: false } });
  } else if (action === 'verify') {
    await prisma.review.update({ where: { id: reviewId }, data: { verified: true } });
  } else if (action === 'delete') {
    const review = await prisma.review.findUnique({ where: { id: reviewId } });
    if (review) {
      await prisma.review.delete({ where: { id: reviewId } });
      // Recalculate professional rating
      const reviews = await prisma.review.findMany({
        where: { professionalId: review.professionalId, isApproved: true },
      });
      const avg = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
      await prisma.professional.update({
        where: { id: review.professionalId },
        data: { rating: Math.round(avg * 10) / 10, reviewCount: reviews.length },
      });
    }
  }

  return NextResponse.json({ success: true });
}
