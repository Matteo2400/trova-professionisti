'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const stats = [
  { value: 10000, suffix: '+', label: 'Interventi completati', description: 'Lavori portati a termine con successo' },
  { value: 98, suffix: '%', label: 'Clienti soddisfatti', description: 'Recensioni positive verificate' },
  { value: 500, suffix: '+', label: 'Professionisti attivi', description: 'Esperti qualificati in tutta Italia' },
  { value: 50, suffix: '+', label: 'Città coperte', description: 'Copertura nazionale in crescita' },
];

function StatCounter({ value, suffix, label, description, delay }: {
  value: number; suffix: string; label: string; description: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      let startTime: number;
      const duration = 2000;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * value));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timeout);
  }, [isInView, value, delay]);

  const formatted = count >= 1000 ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 1).replace('.', ',')}k` : count.toString();

  return (
    <div ref={ref} className="text-center px-6 py-10">
      <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-2">
        {formatted}{suffix}
      </div>
      <div className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-2">{label}</div>
      <div className="text-xs text-zinc-500 max-w-[200px] mx-auto">{description}</div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="relative bg-dark overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/10 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-white/5">
          {stats.map((stat, i) => (
            <div key={i} className={`${i < stats.length - 1 ? 'border-r border-white/5' : ''}`}>
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                description={stat.description}
                delay={i * 150}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
