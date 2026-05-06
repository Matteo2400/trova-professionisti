import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

/**
 * GDPR Art. 17 — Right to erasure.
 * Deletes the user account and all associated data. Cancels any active Stripe
 * subscriptions first.
 */
export async function DELETE() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Non autenticato' }, { status: 401 });
  }

  const userId = session.user.id;

  const professional = await prisma.professional.findUnique({
    where: { userId },
    include: { subscriptions: { where: { status: { in: ['active', 'trialing'] } } } },
  });

  // Cancel any active Stripe subscriptions immediately.
  if (professional?.subscriptions.length) {
    for (const sub of professional.subscriptions) {
      try {
        await stripe.subscriptions.cancel(sub.stripeSubscriptionId);
      } catch (err) {
        console.error('Failed to cancel Stripe subscription:', err);
      }
    }
  }

  if (professional?.stripeCustomerId) {
    try {
      await stripe.customers.del(professional.stripeCustomerId);
    } catch (err) {
      console.error('Failed to delete Stripe customer:', err);
    }
  }

  // Cascade delete will remove Professional, Reviews authored, QuoteRequests as client,
  // Notifications, Sessions, ProfessionalCategory links, Subscriptions, etc.
  await prisma.user.delete({ where: { id: userId } });

  return NextResponse.json({ success: true });
}
