'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { faqItems } from '@/data';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const displayed = faqItems.slice(0, 6);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 border border-zinc-200 text-zinc-500 text-xs font-semibold mb-6 uppercase tracking-[0.2em]">
            Domande frequenti
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4 tracking-tight">
            Hai delle domande?
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Trova le risposte alle domande più comuni. Se hai bisogno di ulteriore
            assistenza, <Link href="/contatti" className="text-primary hover:underline">contattaci</Link>.
          </p>
        </AnimatedSection>

        <div className="border border-zinc-200">
          {displayed.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={i < displayed.length - 1 ? 'border-b border-zinc-200' : ''}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left group hover:bg-zinc-50 transition-colors"
                >
                  <span className={`font-semibold text-sm sm:text-base transition-colors pr-4 ${isOpen ? 'text-primary' : 'text-text group-hover:text-primary'}`}>
                    {item.question}
                  </span>
                  <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center border transition-all ${isOpen ? 'bg-primary border-primary text-white' : 'border-zinc-200 text-zinc-400'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-text-secondary text-sm leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/faq"
            className="text-sm text-primary font-semibold hover:underline uppercase tracking-wider"
          >
            Vedi tutte le FAQ →
          </Link>
        </div>
      </div>
    </section>
  );
}
