import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== 'professional') {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const professional = await prisma.professional.findFirst({
    where: { userId: session.user.id },
  });

  if (!professional) {
    return NextResponse.json({ error: 'Profilo non trovato' }, { status: 404 });
  }

  const reviews = await prisma.review.findMany({
    where: { professionalId: professional.id },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(reviews);
}

// Professional responds to a review
export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== 'professional') {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const professional = await prisma.professional.findFirst({
    where: { userId: session.user.id },
  });

  if (!professional) {
    return NextResponse.json({ error: 'Profilo non trovato' }, { status: 404 });
  }

  const body = await request.json();
  const { reviewId, response } = body;

  if (!reviewId || !response) {
    return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 });
  }

  const review = await prisma.review.findFirst({
    where: { id: reviewId, professionalId: professional.id },
  });

  if (!review) {
    return NextResponse.json({ error: 'Recensione non trovata' }, { status: 404 });
  }

  const updated = await prisma.review.update({
    where: { id: reviewId },
    data: { response, respondedAt: new Date() },
  });

  return NextResponse.json(updated);
}
