'use client';

import { motion } from 'framer-motion';
import { Search, MessageSquare, CheckCircle } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const steps = [
  {
    step: 1,
    title: 'Cerca',
    description: 'Inserisci il servizio di cui hai bisogno e la tua zona. Trova i migliori professionisti vicino a te.',
    icon: <Search className="w-7 h-7" />,
  },
  {
    step: 2,
    title: 'Contatta',
    description: 'Scegli il professionista più adatto e richiedi un preventivo gratuito o chiamalo direttamente.',
    icon: <MessageSquare className="w-7 h-7" />,
  },
  {
    step: 3,
    title: 'Risolvi',
    description: 'Il professionista ti contatterà per fissare l\'intervento. Problema risolto!',
    icon: <CheckCircle className="w-7 h-7" />,
  },
];

export default function HowItWorksSection() {
  return (
    <section className="section-padding bg-dark relative overflow-hidden">
      {/* Subtle grid bg */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 border border-white/10 text-zinc-400 text-xs font-semibold mb-6 uppercase tracking-[0.2em]">
            Semplice e veloce
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Come funziona?
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Trovare un professionista qualificato non è mai stato così facile.
            Bastano <span className="text-white font-semibold">3 semplici passaggi</span>.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/5 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {steps.map((item, i) => (
            <AnimatedSection key={item.step} delay={i * 0.2}>
              <motion.div
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                className={`relative text-center px-8 py-12 group transition-all duration-500 ${
                  i < steps.length - 1 ? 'md:border-r border-b md:border-b-0 border-white/5' : ''
                }`}
              >
                {/* Step number + icon */}
                <div className="relative inline-flex mb-8">
                  <div className="w-20 h-20 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:border-primary group-hover:text-primary group-hover:bg-primary/5 transition-all duration-500">
                    {item.icon}
                  </div>
                  <div className="absolute -top-3 -right-3 w-7 h-7 bg-primary flex items-center justify-center text-xs font-bold text-white">
                    0{item.step}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>

                {/* Hover bottom line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Tagline below */}
        <AnimatedSection delay={0.6}>
          <p className="text-center text-sm text-zinc-600 mt-8">
            Tutto in meno di <span className="text-primary font-semibold">2 minuti</span> • Completamente <span className="text-primary font-semibold">gratuito</span>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
