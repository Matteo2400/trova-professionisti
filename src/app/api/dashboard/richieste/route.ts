import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
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

  const { searchParams } = request.nextUrl;
  const status = searchParams.get('status');

  const where: any = { professionalId: professional.id };
  if (status && status !== 'all') {
    where.status = status;
  }

  const requests = await prisma.quoteRequest.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(requests);
}

export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== 'professional') {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const body = await request.json();
  const { requestId, status, notes } = body;

  if (!requestId || !status) {
    return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 });
  }

  const professional = await prisma.professional.findFirst({
    where: { userId: session.user.id },
  });

  if (!professional) {
    return NextResponse.json({ error: 'Profilo non trovato' }, { status: 404 });
  }

  // Verify the request belongs to this professional
  const quoteRequest = await prisma.quoteRequest.findFirst({
    where: { id: requestId, professionalId: professional.id },
  });

  if (!quoteRequest) {
    return NextResponse.json({ error: 'Richiesta non trovata' }, { status: 404 });
  }

  const updated = await prisma.quoteRequest.update({
    where: { id: requestId },
    data: {
      status,
      professionalNotes: notes || quoteRequest.professionalNotes,
    },
  });

  return NextResponse.json(updated);
}
