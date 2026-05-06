'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'tp-cookie-consent';
type Consent = 'accepted' | 'declined' | null;

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Consent;
      setConsent(saved);
    } catch {
      // localStorage may be unavailable
    }
  }, []);

  const setAndPersist = (value: 'accepted' | 'declined') => {
    setConsent(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
  };

  if (!mounted || consent !== null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md bg-white border border-zinc-200 shadow-2xl rounded-2xl p-5 z-[100]"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Cookie className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text mb-1 text-sm">Usiamo cookie</h3>
            <p className="text-xs text-text-secondary leading-relaxed mb-3">
              Utilizziamo cookie tecnici essenziali per il funzionamento del sito e cookie analitici (con consenso).
              Per maggiori informazioni leggi la nostra{' '}
              <Link href="/privacy" className="text-primary hover:underline">privacy policy</Link>.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setAndPersist('accepted')}
                className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-light transition-colors"
              >
                Accetta tutti
              </button>
              <button
                onClick={() => setAndPersist('declined')}
                className="px-4 py-2 border border-zinc-200 text-text-secondary text-xs font-semibold rounded-lg hover:bg-zinc-50 transition-colors"
              >
                Solo essenziali
              </button>
            </div>
          </div>
          <button
            onClick={() => setAndPersist('declined')}
            className="text-text-secondary hover:text-text"
            aria-label="Chiudi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
