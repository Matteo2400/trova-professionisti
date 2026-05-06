'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { Professional } from '@/types';

const MapView = dynamic(() => import('@/components/map/MapView'), { ssr: false });

interface Props {
  professionals?: Professional[];
}

export default function MapPreviewSection({ professionals = [] }: Props) {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-8">
        <AnimatedSection className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 border border-zinc-200 text-zinc-500 text-xs font-semibold mb-6 uppercase tracking-[0.2em]">
              <MapPin className="w-3.5 h-3.5 inline mr-1.5" />
              Mappa interattiva
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight">
              Professionisti nella tua zona
            </h2>
            <p className="text-text-secondary mt-3 max-w-lg">
              Esplora la mappa per trovare professionisti verificati vicino a te. Copertura in tutta Italia.
            </p>
          </div>
          <Link
            href="/cerca"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider hover:gap-3 transition-all group"
          >
            Apri mappa
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>

      {/* Full-width map */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-y border-zinc-200"
      >
        <MapView
          professionals={professionals}
          zoom={6}
          className="h-[450px] lg:h-[550px] w-full"
        />
      </motion.div>

      {/* Bottom bar with city highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-text-secondary">
          <span className="font-semibold text-text uppercase tracking-wider">Città principali:</span>
          {['Roma', 'Milano', 'Torino', 'Napoli', 'Bologna', 'Firenze'].map((city, i) => (
            <Link
              key={city}
              href={`/cerca?citta=${city}`}
              className="px-3 py-1.5 border border-zinc-200 hover:border-primary hover:text-primary transition-all"
            >
              {city}
            </Link>
          ))}
          <Link href="/cerca" className="text-primary font-semibold hover:underline ml-2">+50 altre →</Link>
        </div>
      </div>
    </section>
  );
}
