'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Crown, Check, Award, Zap, Loader2, AlertCircle, CheckCircle, Settings } from 'lucide-react';

interface SubscriptionInfo {
  status: string;
  plan: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

interface Props {
  currentPlan: string;
  planExpiresAt: string | null;
  hasStripeCustomer: boolean;
  activeSubscription: SubscriptionInfo | null;
  checkoutStatus?: string;
}

const PLANS = [
  {
    slug: 'base',
    name: 'Base',
    price: 0,
    period: 'Gratis per sempre',
    icon: Zap,
    features: [
      'Profilo visibile ai clienti',
      'Ricevi richieste di preventivo',
      'Fino a 5 foto nella galleria',
      'Supporto via email',
    ],
  },
  {
    slug: 'pro',
    name: 'Pro',
    price: 19.9,
    period: 'al mese',
    icon: Award,
    badge: 'Più popolare',
    features: [
      'Tutto del piano Base',
      'Badge "Pro" sul profilo',
      'Priorità nei risultati della tua zona',
      'Statistiche avanzate',
      'Fino a 20 foto nella galleria',
      'Supporto prioritario',
    ],
  },
  {
    slug: 'premium',
    name: 'Premium',
    price: 39.9,
    period: 'al mese',
    icon: Crown,
    features: [
      'Tutto del piano Pro',
      'Badge "Premium" dorato',
      'Sempre in cima ai risultati',
      'Profilo evidenziato',
      'Galleria illimitata',
      'Account manager dedicato',
    ],
  },
];

export default function VisibilitaClient({
  currentPlan,
  planExpiresAt,
  hasStripeCustomer,
  activeSubscription,
  checkoutStatus,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(checkoutStatus === 'success');

  useEffect(() => {
    if (checkoutStatus === 'success') {
      // Refresh server state once Stripe webhook should have processed.
      const t = setTimeout(() => router.refresh(), 1500);
      return () => clearTimeout(t);
    }
  }, [checkoutStatus, router]);

  const handleUpgrade = async (plan: 'pro' | 'premium') => {
    setLoading(plan);
    setError(null);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || 'Errore nella creazione della sessione di pagamento');
        setLoading(null);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError('Errore di connessione. Riprova.');
      setLoading(null);
    }
  };

  const handleManage = async () => {
    setLoading('portal');
    setError(null);
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || 'Impossibile aprire il portale di gestione');
        setLoading(null);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError('Errore di connessione. Riprova.');
      setLoading(null);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text">Aumenta la tua visibilità</h1>
        <p className="text-text-secondary text-sm mt-1">
          Scegli un piano per ottenere più clienti e far crescere la tua attività.
        </p>
      </div>

      {showSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-emerald-900 text-sm">Pagamento completato!</p>
            <p className="text-emerald-700 text-sm mt-0.5">
              Il tuo piano sarà attivo entro pochi secondi.
            </p>
          </div>
          <button onClick={() => setShowSuccess(false)} className="text-emerald-600 hover:text-emerald-800 text-sm">
            Chiudi
          </button>
        </div>
      )}

      {checkoutStatus === 'cancel' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-amber-900 text-sm">
            Pagamento annullato. Puoi riprovare quando vuoi.
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Current plan card */}
      {activeSubscription ? (
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border-2 border-primary/30 p-6 mb-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {activeSubscription.plan === 'premium' ? (
                  <Crown className="w-6 h-6 text-amber-600" />
                ) : (
                  <Award className="w-6 h-6 text-primary" />
                )}
                <h2 className="font-bold text-text text-lg">
                  Piano attivo: {activeSubscription.plan === 'premium' ? 'Premium' : 'Pro'}
                </h2>
                {activeSubscription.status === 'past_due' && (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                    Pagamento in ritardo
                  </span>
                )}
              </div>
              <p className="text-text-secondary text-sm">
                {activeSubscription.cancelAtPeriodEnd
                  ? `Il tuo abbonamento sarà cancellato il ${formatDate(activeSubscription.currentPeriodEnd)}.`
                  : `Prossimo rinnovo: ${formatDate(activeSubscription.currentPeriodEnd)}`}
              </p>
            </div>
            <button
              onClick={handleManage}
              disabled={loading === 'portal'}
              className="btn-primary !py-2.5 !px-5 flex items-center gap-2 disabled:opacity-60"
            >
              {loading === 'portal' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Settings className="w-4 h-4" />
              )}
              Gestisci abbonamento
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6 text-zinc-500" />
            <h2 className="font-bold text-text text-lg">
              Piano attuale: {currentPlan === 'base' ? 'Base (gratuito)' : currentPlan}
            </h2>
          </div>
          <p className="text-text-secondary text-sm">
            {planExpiresAt
              ? `Valido fino al ${formatDate(planExpiresAt)}`
              : 'Passa a Pro o Premium per più visibilità e funzionalità avanzate.'}
          </p>
        </div>
      )}

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => {
          const Icon = plan.icon;
          const isCurrent = currentPlan === plan.slug;
          const canUpgrade = plan.slug !== 'base' && !isCurrent;
          const isPremium = plan.slug === 'premium';

          return (
            <div
              key={plan.slug}
              className={`rounded-2xl p-6 relative ${
                isCurrent
                  ? isPremium
                    ? 'bg-gradient-to-br from-amber-50 to-amber-100/50 border-2 border-amber-300'
                    : 'bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/30'
                  : 'bg-white border border-gray-200'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-6 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  {plan.badge}
                </span>
              )}

              <div className="flex items-center gap-2 mb-3">
                <Icon className={`w-5 h-5 ${isPremium ? 'text-amber-600' : plan.slug === 'pro' ? 'text-primary' : 'text-gray-500'}`} />
                <h3 className="font-bold text-text">{plan.name}</h3>
                {isCurrent && (
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                    Attivo
                  </span>
                )}
              </div>

              <div className="mb-4">
                {plan.price === 0 ? (
                  <span className="text-2xl font-bold text-text">Gratis</span>
                ) : (
                  <>
                    <span className="text-2xl font-bold text-text">
                      €{plan.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-text-secondary text-sm">/{plan.period}</span>
                  </>
                )}
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                    <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              {canUpgrade ? (
                <button
                  onClick={() => handleUpgrade(plan.slug as 'pro' | 'premium')}
                  disabled={loading === plan.slug}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    isPremium
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : 'bg-primary text-white hover:bg-primary-light'
                  } disabled:opacity-60`}
                >
                  {loading === plan.slug ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Reindirizzamento...
                    </>
                  ) : (
                    `Passa a ${plan.name}`
                  )}
                </button>
              ) : (
                <button
                  className="w-full py-2.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-500 cursor-default"
                  disabled
                >
                  {isCurrent ? 'Piano attuale' : 'Gratuito'}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {!hasStripeCustomer && (
        <p className="text-xs text-text-secondary text-center mt-8">
          I pagamenti sono gestiti in modo sicuro tramite Stripe. Puoi cancellare in qualsiasi momento.
        </p>
      )}
    </div>
  );
}
