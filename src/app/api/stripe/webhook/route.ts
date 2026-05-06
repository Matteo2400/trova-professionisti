import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe, getPlanByPriceId } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
// Stripe webhooks need the raw body — Next caches request body otherwise.
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const signature = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: 'Webhook signature missing' }, { status: 400 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdate(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        // Other events ignored (no-op).
        break;
    }
  } catch (err) {
    console.error(`Error handling Stripe event ${event.type}:`, err);
    // Return 500 so Stripe retries. Idempotency is required from our side.
    return NextResponse.json({ error: 'Handler error' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (session.mode !== 'subscription' || !session.subscription) return;

  const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription.id;
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  await handleSubscriptionUpdate(subscription);
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id;
  const item = subscription.items.data[0];
  if (!item) return;

  const priceId = item.price.id;
  const plan = getPlanByPriceId(priceId);
  if (!plan) {
    console.warn(`Unknown Stripe price ${priceId}, skipping update`);
    return;
  }

  const professional = await prisma.professional.findFirst({
    where: { stripeCustomerId: customerId },
  });
  if (!professional) {
    console.warn(`No professional matches Stripe customer ${customerId}`);
    return;
  }

  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: subscription.id },
    create: {
      professionalId: professional.id,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: customerId,
      stripePriceId: priceId,
      plan,
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
    },
    update: {
      stripePriceId: priceId,
      plan,
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
    },
  });

  // Sync derived plan field on Professional. Active or trialing → grant access.
  const isActive = ['active', 'trialing'].includes(subscription.status);
  await prisma.professional.update({
    where: { id: professional.id },
    data: {
      plan: isActive ? plan : 'base',
      planExpiresAt: isActive ? new Date(subscription.current_period_end * 1000) : null,
    },
  });

  // Notify the user about important state changes.
  let title: string | null = null;
  let message: string | null = null;
  if (subscription.status === 'active' || subscription.status === 'trialing') {
    title = 'Abbonamento attivo';
    message = `Il tuo piano ${plan === 'premium' ? 'Premium' : 'Pro'} è attivo. Grazie per scegliere TrovaPro!`;
  } else if (subscription.status === 'past_due') {
    title = 'Pagamento in ritardo';
    message = 'Il rinnovo del tuo abbonamento non è andato a buon fine. Aggiorna il metodo di pagamento.';
  } else if (subscription.cancel_at_period_end) {
    title = 'Abbonamento in cancellazione';
    message = `Il tuo abbonamento sarà cancellato il ${new Date(subscription.current_period_end * 1000).toLocaleDateString('it-IT')}.`;
  }

  if (title && message) {
    await prisma.notification.create({
      data: {
        userId: professional.userId,
        type: 'subscription',
        title,
        message,
      },
    });
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const existing = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: subscription.id },
    include: { professional: true },
  });
  if (!existing) return;

  await prisma.subscription.update({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: 'canceled',
      canceledAt: new Date(),
    },
  });

  await prisma.professional.update({
    where: { id: existing.professionalId },
    data: { plan: 'base', planExpiresAt: null },
  });

  await prisma.notification.create({
    data: {
      userId: existing.professional.userId,
      type: 'subscription',
      title: 'Abbonamento terminato',
      message: 'Il tuo abbonamento è stato cancellato. Puoi sempre riattivarlo dalla dashboard.',
    },
  });
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id;
  if (!customerId) return;

  const professional = await prisma.professional.findFirst({ where: { stripeCustomerId: customerId } });
  if (!professional) return;

  await prisma.notification.create({
    data: {
      userId: professional.userId,
      type: 'subscription',
      title: 'Pagamento fallito',
      message: 'Non siamo riusciti ad addebitare il pagamento del tuo abbonamento. Aggiorna il metodo di pagamento per non perdere i benefici del tuo piano.',
    },
  });
}
