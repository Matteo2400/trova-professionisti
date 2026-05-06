import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { stripe, isStripeConfigured } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: 'Pagamenti non configurati' },
      { status: 503 },
    );
  }

  const session = await auth();
  if (!session?.user || session.user.role !== 'professional') {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const professional = await prisma.professional.findUnique({
    where: { userId: session.user.id },
  });
  if (!professional?.stripeCustomerId) {
    return NextResponse.json(
      { error: 'Nessun abbonamento attivo' },
      { status: 400 },
    );
  }

  const baseUrl = process.env.NEXTAUTH_URL || `${req.nextUrl.protocol}//${req.nextUrl.host}`;

  const portal = await stripe.billingPortal.sessions.create({
    customer: professional.stripeCustomerId,
    return_url: `${baseUrl}/dashboard/visibilita`,
    locale: 'it',
  });

  return NextResponse.json({ url: portal.url });
}
