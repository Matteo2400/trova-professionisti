'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { faqItems } from '@/data';

function FAQItem({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-text pr-4">{q}</span>
        <ChevronDown className={`w-5 h-5 text-text-secondary transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-5 pb-5 text-text-secondary leading-relaxed">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-dark to-primary section-padding text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold mb-6">Domande Frequenti</h1>
          <p className="text-lg text-blue-100/80">
            Trova le risposte alle domande più comuni su TrovaPro.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <FAQItem
                  key={i}
                  q={item.question}
                  a={item.answer}
                  open={openIdx === i}
                  toggle={() => setOpenIdx(openIdx === i ? null : i)}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
