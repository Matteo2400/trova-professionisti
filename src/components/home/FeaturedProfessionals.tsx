'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Crown } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProfessionalCard from '@/components/ui/ProfessionalCard';
import type { Professional } from '@/types';

interface Props {
  featured: Professional[];
  availableNow: number;
}

export default function FeaturedProfessionals({ featured, availableNow }: Props) {
  if (featured.length === 0) return null;

  return (
    <section className="section-padding bg-surface">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-zinc-200 text-zinc-500 text-xs font-semibold mb-6 uppercase tracking-[0.2em]">
              <Crown className="w-3.5 h-3.5 text-amber-500" />
              I più richiesti
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight">
              Professionisti in evidenza
            </h2>
            <p className="text-text-secondary mt-3 max-w-lg">
              I professionisti con le migliori valutazioni selezionati per te.
            </p>
          </div>
          <Link
            href="/cerca"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider hover:gap-3 transition-all group"
          >
            Vedi tutti
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((pro, i) => (
            <motion.div
              key={pro.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <ProfessionalCard professional={pro} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-text-secondary"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            {availableNow} professionisti disponibili ora
          </span>
          <span className="hidden sm:inline text-zinc-300">|</span>
          <span>Media risposte: &lt; 2 ore</span>
        </motion.div>
      </div>
    </section>
  );
}
