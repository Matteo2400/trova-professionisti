import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin';
import { prisma } from '@/lib/prisma';
import { accountApprovedEmail, sendEmail } from '@/lib/email';

export async function GET(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const status = searchParams.get('status'); // pending | approved | suspended | all
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  const where: any = {};

  if (status === 'pending') {
    where.isApproved = false;
    where.isSuspended = false;
  } else if (status === 'approved') {
    where.isApproved = true;
    where.isSuspended = false;
  } else if (status === 'suspended') {
    where.isSuspended = true;
  }

  if (search) {
    where.OR = [
      { user: { firstName: { contains: search } } },
      { user: { lastName: { contains: search } } },
      { user: { email: { contains: search } } },
      { city: { contains: search } },
      { vatNumber: { contains: search } },
    ];
  }

  const [professionals, total] = await Promise.all([
    prisma.professional.findMany({
      where,
      include: {
        user: { select: { firstName: true, lastName: true, email: true, phone: true, createdAt: true } },
        categories: { include: { category: true } },
        _count: { select: { quoteRequests: true, reviews: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.professional.count({ where }),
  ]);

  return NextResponse.json({
    professionals: professionals.map((p) => ({
      id: p.id,
      slug: p.slug,
      firstName: p.user.firstName,
      lastName: p.user.lastName,
      email: p.user.email,
      phone: p.user.phone,
      vatNumber: p.vatNumber,
      city: p.city,
      categories: p.categories.map((c) => c.category.name),
      plan: p.plan,
      rating: p.rating,
      reviewCount: p.reviewCount,
      isVerified: p.isVerified,
      isApproved: p.isApproved,
      isSuspended: p.isSuspended,
      requestsCount: p._count.quoteRequests,
      createdAt: p.createdAt.toISOString(),
      userCreatedAt: p.user.createdAt.toISOString(),
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
  const { professionalId, action } = body;

  if (!professionalId || !action) {
    return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 });
  }

  const professional = await prisma.professional.findUnique({
    where: { id: professionalId },
    include: { user: { select: { email: true, firstName: true } } },
  });

  if (!professional) {
    return NextResponse.json({ error: 'Professionista non trovato' }, { status: 404 });
  }

  const updateData: { isApproved?: boolean; isSuspended?: boolean; isVerified?: boolean } = {};
  let notificationMessage = '';
  let sendApprovedEmail = false;

  switch (action) {
    case 'approve':
      updateData.isApproved = true;
      notificationMessage = 'Il tuo profilo è stato approvato! Ora sei visibile ai clienti.';
      sendApprovedEmail = !professional.isApproved;
      break;
    case 'reject':
      updateData.isApproved = false;
      notificationMessage = 'La tua richiesta di registrazione non è stata approvata. Contattaci per maggiori informazioni.';
      break;
    case 'suspend':
      updateData.isSuspended = true;
      notificationMessage = 'Il tuo profilo è stato sospeso. Contattaci per maggiori informazioni.';
      break;
    case 'unsuspend':
      updateData.isSuspended = false;
      notificationMessage = 'Il tuo profilo è stato riattivato.';
      break;
    case 'verify':
      updateData.isVerified = true;
      notificationMessage = 'Il tuo profilo è stato verificato!';
      break;
    case 'unverify':
      updateData.isVerified = false;
      break;
    default:
      return NextResponse.json({ error: 'Azione non valida' }, { status: 400 });
  }

  await prisma.professional.update({
    where: { id: professionalId },
    data: updateData,
  });

  if (notificationMessage) {
    await prisma.notification.create({
      data: {
        userId: professional.userId,
        type: 'account_approved',
        title: 'Aggiornamento profilo',
        message: notificationMessage,
      },
    });
  }

  if (sendApprovedEmail) {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const profileUrl = `${baseUrl}/professionista/${(await prisma.professional.findUnique({ where: { id: professionalId }, select: { slug: true } }))?.slug ?? ''}`;
    void sendEmail({
      to: professional.user.email,
      ...accountApprovedEmail({ name: professional.user.firstName, profileUrl }),
    }).catch((err) => console.error('Failed to send approval email:', err));
  }

  return NextResponse.json({ success: true });
}
