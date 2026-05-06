'use client';

import Link from 'next/link';
import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Zap, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordInner />
    </Suspense>
  );
}

function ResetPasswordInner() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('La password deve avere almeno 8 caratteri');
      return;
    }
    if (password !== confirm) {
      setError('Le password non coincidono');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/password-reset', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Errore. Riprova.');
        setLoading(false);
        return;
      }
      setDone(true);
      setTimeout(() => router.push('/auth/login'), 2500);
    } catch {
      setError('Errore di connessione. Riprova.');
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface p-4">
        <div className="max-w-md text-center bg-white rounded-2xl p-8 border border-zinc-200">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">Link non valido</h1>
          <p className="text-text-secondary text-sm mb-6">
            Il link di reset è mancante o malformato.
          </p>
          <Link href="/auth/password-dimenticata" className="text-primary hover:underline text-sm">
            Richiedi un nuovo link
          </Link>
        </div>
      </div>
    );
  }

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

        {done ? (
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
            <h1 className="text-xl font-bold mb-2">Password aggiornata!</h1>
            <p className="text-text-secondary text-sm">Reindirizzamento al login...</p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-text mb-2">Nuova password</h1>
            <p className="text-text-secondary mb-6 text-sm">
              Scegli una nuova password sicura per il tuo account.
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Nuova password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-4 h-4 text-text-secondary" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Almeno 8 caratteri"
                    className="input-field pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-text-secondary hover:text-text"
                    aria-label="Mostra/nascondi password"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Conferma password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-4 h-4 text-text-secondary" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Ripeti la password"
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
                    Aggiornamento...
                  </>
                ) : (
                  'Aggiorna password'
                )}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
