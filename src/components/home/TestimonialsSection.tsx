'use client';

import { Star, Quote, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { testimonials } from '@/data';

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-surface">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 border border-zinc-200 text-zinc-500 text-xs font-semibold mb-6 uppercase tracking-[0.2em]">
            Recensioni verificate
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4 tracking-tight">
            Cosa dicono i nostri utenti
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Migliaia di persone hanno già trovato il professionista perfetto
            grazie a TrovaPro.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-zinc-200">
          {testimonials.map((t, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className={`p-8 group hover:bg-dark transition-all duration-500 ${
                i < testimonials.length - 1 ? 'md:border-r border-b md:border-b-0 border-zinc-200' : ''
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <Quote className="w-8 h-8 text-primary/20 group-hover:text-primary/40 transition-colors duration-500" />
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold uppercase tracking-wider group-hover:text-emerald-400 transition-colors">
                    <Shield className="w-3 h-3" /> Verificata
                  </span>
                </div>
                <p className="text-text text-sm leading-relaxed mb-8 group-hover:text-zinc-300 transition-colors duration-500">
                  &quot;{t.text}&quot;
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-zinc-100 group-hover:border-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary font-bold text-sm group-hover:bg-primary/20 transition-colors">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-text text-sm group-hover:text-white transition-colors duration-500">{t.name}</p>
                      <p className="text-xs text-text-secondary group-hover:text-zinc-500 transition-colors duration-500">{t.city}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Aggregate rating */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-text-secondary">
            Valutazione media <span className="font-bold text-text">4.8/5</span> basata su <span className="font-bold text-text">1.200+</span> recensioni
          </p>
        </motion.div>
      </div>
    </section>
  );
}
