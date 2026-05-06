'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Zap, Loader2, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Errore. Riprova.');
        setLoading(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError('Errore di connessione. Riprova.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl border border-zinc-200 p-8"
      >
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-text">
            Trova<span className="text-primary">Pro</span>
          </span>
        </Link>

        {submitted ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h1 className="text-xl font-bold text-text mb-2">Controlla la tua email</h1>
            <p className="text-text-secondary text-sm mb-6">
              Se l&apos;indirizzo è registrato, riceverai un link per reimpostare la password.
              Il link è valido per 1 ora.
            </p>
            <Link href="/auth/login" className="text-primary font-medium hover:underline text-sm">
              ← Torna al login
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-text mb-2">Password dimenticata?</h1>
            <p className="text-text-secondary mb-6 text-sm">
              Inserisci la tua email per ricevere un link di reset.
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-text-secondary" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mario@example.com"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary !py-3.5 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Invio...
                  </>
                ) : (
                  'Invia link di reset'
                )}
              </button>
            </form>

            <p className="text-center text-sm text-text-secondary mt-6">
              <Link href="/auth/login" className="text-primary font-medium hover:underline">
                ← Torna al login
              </Link>
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
