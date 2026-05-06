'use client';

import { motion } from 'framer-motion';
import { Check, Crown, Award, Zap, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { pricingPlans } from '@/data';

export default function PianiPremiumPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark via-primary/95 to-primary-light section-padding text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-accent text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
            Piani per professionisti
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Aumenta la tua visibilità,
            <br />
            <span className="text-accent">ottieni più clienti</span>
          </h1>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto">
            Scegli il piano perfetto per far crescere la tua attività.
            Inizia gratis e fai l&apos;upgrade quando vuoi.
          </p>
        </motion.div>
      </section>

      {/* Plans */}
      <section className="section-padding bg-surface -mt-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pricingPlans.map((plan, i) => {
              const isPremium = plan.slug === 'premium';
              const isPro = plan.slug === 'pro';
              const isHighlighted = plan.highlighted;

              return (
                <AnimatedSection key={plan.id} delay={i * 0.15}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={`relative rounded-2xl p-8 transition-all duration-300 ${
                      isPremium
                        ? 'bg-gradient-to-br from-amber-50 to-amber-100/50 border-2 border-amber-300 shadow-xl shadow-amber-500/10'
                        : isHighlighted
                        ? 'bg-white border-2 border-primary shadow-xl shadow-primary/10'
                        : 'bg-white border border-gray-200 shadow-sm'
                    }`}
                  >
                    {plan.badge && (
                      <div
                        className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: plan.badgeColor }}
                      >
                        {plan.badge}
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                        isPremium
                          ? 'bg-amber-200 text-amber-700'
                          : isPro
                          ? 'bg-primary/10 text-primary'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {isPremium ? <Crown className="w-7 h-7" /> : isPro ? <Award className="w-7 h-7" /> : <Zap className="w-7 h-7" />}
                      </div>

                      <h3 className="text-xl font-bold text-text mb-1">{plan.name}</h3>
                      <p className="text-text-secondary text-sm mb-4">{plan.description}</p>

                      <div className="mb-2">
                        {plan.price === 0 ? (
                          <span className="text-4xl font-bold text-text">Gratis</span>
                        ) : (
                          <>
                            <span className="text-4xl font-bold text-text">€{plan.price.toFixed(2).replace('.', ',')}</span>
                            <span className="text-text-secondary text-sm">/{plan.period}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm">
                          <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            isPremium ? 'text-amber-500' : isPro ? 'text-primary' : 'text-success'
                          }`} />
                          <span className="text-text-secondary">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                        isPremium
                          ? 'btn-premium'
                          : isPro
                          ? 'btn-primary'
                          : 'btn-secondary'
                      }`}
                    >
                      {plan.price === 0 ? 'Registrati Gratis' : 'Scegli Piano'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ about plans */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
              Domande frequenti sui piani
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            {[
              {
                q: 'Posso annullare in qualsiasi momento?',
                a: 'Sì, puoi annullare il tuo abbonamento in qualsiasi momento. Continuerai ad avere accesso alle funzionalità premium fino alla fine del periodo di fatturazione.',
              },
              {
                q: 'Come funziona il pagamento?',
                a: 'Accettiamo tutte le principali carte di credito e debito tramite Stripe. Il pagamento è mensile e si rinnova automaticamente.',
              },
              {
                q: 'Posso fare upgrade o downgrade del mio piano?',
                a: 'Certamente! Puoi cambiare piano in qualsiasi momento dalla tua dashboard. Il cambio sarà effettivo al prossimo ciclo di fatturazione.',
              },
              {
                q: 'C\'è un periodo di prova?',
                a: 'Il piano Base è completamente gratuito e ti permette di provare la piattaforma senza limiti di tempo. Per i piani Pro e Premium offriamo 7 giorni di prova gratuita.',
              },
            ].map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-surface rounded-xl p-6">
                  <h3 className="font-semibold text-text mb-2">{faq.q}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{faq.a}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
