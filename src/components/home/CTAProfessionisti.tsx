'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, TrendingUp, Users } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function CTAProfessionisti() {
  return (
    <section className="section-padding bg-dark relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedSection className="text-center">
          <span className="inline-block px-4 py-1.5 border border-white/10 text-zinc-400 text-xs font-semibold mb-8 uppercase tracking-[0.2em]">
            Per professionisti
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            Sei un professionista?
            <br />
            <span className="text-primary">Registrati gratis oggi</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-4">
            Entra nella rete di TrovaPro e inizia a ricevere richieste da clienti
            nella tua zona. La registrazione è gratuita e senza impegno.
          </p>
          <p className="text-sm text-primary font-semibold mb-12">
            Già 500+ professionisti registrati • Registrazione in 2 minuti
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 mb-12 max-w-3xl mx-auto border border-white/10">
            {[
              { icon: <Users className="w-6 h-6" />, title: 'Nuovi clienti', desc: 'Raggiungi migliaia di utenti' },
              { icon: <TrendingUp className="w-6 h-6" />, title: 'Cresci', desc: 'Aumenta la tua visibilità' },
              { icon: <Shield className="w-6 h-6" />, title: 'Affidabile', desc: 'Piattaforma verificata' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                className={`p-6 transition-all duration-300 ${i < 2 ? 'sm:border-r border-b sm:border-b-0 border-white/10' : ''}`}
              >
                <div className="text-primary mb-3">{item.icon}</div>
                <h3 className="font-semibold text-white text-sm mb-1">{item.title}</h3>
                <p className="text-zinc-500 text-xs">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <Link
            href="/auth/registrazione"
            className="inline-flex items-center gap-3 bg-white text-dark px-10 py-4 font-semibold text-lg hover:bg-zinc-100 transition-all duration-300 active:scale-[0.98] group"
          >
            Registrati Gratis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
