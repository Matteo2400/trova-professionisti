'use client';

import { motion } from 'framer-motion';
import { Shield, Star, Clock, Users, CheckCircle } from 'lucide-react';

const items = [
  { icon: <Users className="w-5 h-5" />, value: '500+', label: 'Professionisti attivi' },
  { icon: <Star className="w-5 h-5" />, value: '4.8/5', label: 'Valutazione media' },
  { icon: <Shield className="w-5 h-5" />, value: '100%', label: 'Verificati' },
  { icon: <Clock className="w-5 h-5" />, value: '< 2 min', label: 'Tempo risposta' },
  { icon: <CheckCircle className="w-5 h-5" />, value: '10k+', label: 'Lavori completati' },
];

export default function TrustBar() {
  return (
    <section className="bg-white border-y border-zinc-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 justify-center"
            >
              <div className="w-10 h-10 bg-primary/5 border border-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="font-bold text-text text-lg leading-tight">{item.value}</div>
                <div className="text-text-secondary text-xs">{item.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
