'use client';

import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) {
  const { setRef, isVisible } = useIntersectionObserver(0.1);

  const initial = {
    opacity: 0,
    y: direction === 'up' ? 40 : 0,
    x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
  };

  return (
    <div ref={setRef} className={className}>
      <motion.div
        initial={initial}
        animate={isVisible ? { opacity: 1, y: 0, x: 0 } : initial}
        transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
}
