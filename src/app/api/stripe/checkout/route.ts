import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { stripe, STRIPE_PLANS, isStripeConfigured } from '@/lib/stripe';

const schema = z.object({
  plan: z.enum(['pro', 'premium']),
});

export async function POST(req: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: 'Pagamenti non configurati. Contatta l\'amministratore.' },
      { status: 503 },
    );
  }

  const session = await auth();
  if (!session?.user || session.user.role !== 'professional') {
    return NextResponse.json({ error: 'Accesso riservato ai professionisti' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dati non validi' }, { status: 400 });
  }

  const planConfig = STRIPE_PLANS[parsed.data.plan];

  const professional = await prisma.professional.findUnique({
    where: { userId: session.user.id },
    include: { user: true },
  });
  if (!professional) {
    return NextResponse.json({ error: 'Profilo professionista non trovato' }, { status: 404 });
  }

  // Get or create Stripe customer
  let customerId = professional.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: professional.user.email,
      name: `${professional.user.firstName} ${professional.user.lastName}`,
      metadata: {
        professionalId: professional.id,
        userId: professional.userId,
      },
    });
    customerId = customer.id;
    await prisma.professional.update({
      where: { id: professional.id },
      data: { stripeCustomerId: customerId },
    });
  }

  const baseUrl = process.env.NEXTAUTH_URL || `${req.nextUrl.protocol}//${req.nextUrl.host}`;

  const checkout = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price: planConfig.priceId, quantity: 1 }],
    success_url: `${baseUrl}/dashboard/visibilita?status=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/dashboard/visibilita?status=cancel`,
    allow_promotion_codes: true,
    billing_address_collection: 'required',
    locale: 'it',
    subscription_data: {
      metadata: {
        professionalId: professional.id,
        plan: parsed.data.plan,
      },
    },
    metadata: {
      professionalId: professional.id,
      plan: parsed.data.plan,
    },
  });

  return NextResponse.json({ url: checkout.url });
}
