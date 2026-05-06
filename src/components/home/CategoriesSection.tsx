'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Droplets, Paintbrush, Hammer, Key, TreePine, Wrench, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { PublicCategory } from '@/lib/professionals';

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-8 h-8" />,
  Droplets: <Droplets className="w-8 h-8" />,
  Paintbrush: <Paintbrush className="w-8 h-8" />,
  Hammer: <Hammer className="w-8 h-8" />,
  Key: <Key className="w-8 h-8" />,
  TreePine: <TreePine className="w-8 h-8" />,
};

interface Props {
  categories: PublicCategory[];
}

export default function CategoriesSection({ categories }: Props) {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 border border-zinc-200 text-zinc-500 text-xs font-semibold mb-6 uppercase tracking-[0.2em]">
            I nostri servizi
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4 tracking-tight">
            Che tipo di professionista cerchi?
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Scegli tra le nostre categorie di professionisti qualificati e trova
            l&apos;esperto perfetto per il tuo lavoro.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-zinc-200">
          {categories.map((cat, i) => {
            const icon = iconMap[cat.icon] || <Wrench className="w-8 h-8" />;
            return (
              <AnimatedSection key={cat.slug} delay={i * 0.1}>
                <Link href={`/cerca?categoria=${cat.slug}`}>
                  <motion.div
                    whileHover={{ backgroundColor: '#09090B' }}
                    className={`relative p-10 transition-all duration-500 group cursor-pointer overflow-hidden ${
                      (i + 1) % 4 !== 0 ? 'lg:border-r' : ''
                    } ${i < categories.length - 1 ? 'border-b lg:border-b' : ''} border-zinc-200`}
                  >
                    <div className="absolute -right-8 -bottom-8 opacity-[0.03] transform rotate-12 scale-[4] group-hover:opacity-[0.1] transition-opacity duration-500">
                      {icon}
                    </div>

                    <div className="w-14 h-14 border border-zinc-200 flex items-center justify-center mb-6 text-zinc-600 group-hover:border-primary group-hover:text-primary group-hover:bg-primary/10 transition-all duration-500">
                      {icon}
                    </div>

                    <h3 className="text-xl font-bold text-text mb-2 group-hover:text-white transition-colors duration-500">{cat.namePlural}</h3>
                    <p className="text-text-secondary text-sm mb-4 leading-relaxed group-hover:text-zinc-400 transition-colors duration-500">
                      {cat.description}
                    </p>

                    <div className="flex items-center gap-4 mb-6 text-xs text-zinc-400 group-hover:text-zinc-500 transition-colors">
                      <span className="font-semibold">{cat.professionalsCount} professionisti</span>
                      {cat.avgRating > 0 && (
                        <>
                          <span>•</span>
                          <span>★ {cat.avgRating.toFixed(1)} media</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-wider">
                      Cerca {cat.name.toLowerCase()}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>

                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
                  </motion.div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
