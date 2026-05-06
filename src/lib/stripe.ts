import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY;

// Use a placeholder so module evaluation never throws at build/cold-start.
// Routes that actually use Stripe should call `isStripeConfigured()` first
// (returns 503 otherwise) so we never hit the placeholder in real traffic.
export const stripe = new Stripe(stripeSecret || 'sk_test_placeholder', {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
  appInfo: {
    name: 'TrovaPro',
    version: '1.0.0',
  },
});

export type StripePlan = 'pro' | 'premium';

interface PlanConfig {
  name: string;
  priceMonthly: number;
  priceId: string;
  features: string[];
}

export const STRIPE_PLANS: Record<StripePlan, PlanConfig> = {
  pro: {
    name: 'Pro',
    priceMonthly: 19.9,
    priceId: process.env.STRIPE_PRICE_ID_PRO || '',
    features: [
      'Badge Pro',
      'Priorità nei risultati',
      'Statistiche avanzate',
      '20 foto galleria',
    ],
  },
  premium: {
    name: 'Premium',
    priceMonthly: 39.9,
    priceId: process.env.STRIPE_PRICE_ID_PREMIUM || '',
    features: [
      'Tutto di Pro',
      'Badge Premium dorato',
      'Sempre in cima',
      'Galleria illimitata',
      'Account manager',
    ],
  },
};

export function getPlanByPriceId(priceId: string): StripePlan | null {
  for (const [plan, cfg] of Object.entries(STRIPE_PLANS)) {
    if (cfg.priceId && cfg.priceId === priceId) return plan as StripePlan;
  }
  return null;
}

export function isStripeConfigured(): boolean {
  return Boolean(stripeSecret) && Boolean(STRIPE_PLANS.pro.priceId) && Boolean(STRIPE_PLANS.premium.priceId);
}
