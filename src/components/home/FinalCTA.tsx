'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Shield, Star, Zap } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { categories } from '@/data';

export default function FinalCTA() {
  const router = useRouter();
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (category) params.set('categoria', category);
    router.push(`/cerca?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-dark">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 blur-[150px]" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
        <AnimatedSection>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 border border-white/10 text-zinc-400 text-xs font-semibold mb-8 uppercase tracking-[0.2em]">
              Inizia ora
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
              Il professionista giusto
              <br />
              <span className="text-primary">è a un click di distanza</span>
            </h2>

            <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-10">
              Non rimandare quel lavoro che aspetta da tempo.
              Trova oggi stesso chi può aiutarti.
            </p>

            {/* Quick search */}
            <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto mb-8">
              <div className="flex-1 relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 bg-white/10 text-white border-0 appearance-none cursor-pointer focus:outline-none focus:bg-white/15 transition-all text-sm"
                >
                  <option value="" className="text-dark">Di cosa hai bisogno?</option>
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug} className="text-dark">
                      {cat.name}
                    </option>
                  ))}
                </select>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              </div>
              <button
                onClick={handleSearch}
                className="h-14 px-8 bg-primary text-white font-semibold hover:bg-primary-light transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Cerca ora
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-6 text-xs text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" /> Risultati istantanei
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-500" /> Profili verificati
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-500" /> Recensioni reali
              </span>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
