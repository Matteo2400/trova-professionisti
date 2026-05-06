'use client';

import Link from 'next/link';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Zap, Loader2 } from 'lucide-react';

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '';
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Email o password non corretti.');
        setLoading(false);
        return;
      }

      // Honor callbackUrl if provided, otherwise role-based default.
      if (callbackUrl) {
        router.push(callbackUrl);
        return;
      }

      const sessionRes = await fetch('/api/auth/session');
      const session = await sessionRes.json();

      if (session?.user?.role === 'admin') {
        router.push('/admin');
      } else if (session?.user?.role === 'professional') {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    } catch {
      setError('Errore di connessione. Riprova.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text">
              Trova<span className="text-primary">Pro</span>
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-text mb-2">Bentornato!</h1>
          <p className="text-text-secondary mb-8">Accedi al tuo account professionista.</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-text-secondary" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="la-tua@email.it"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-4 h-4 text-text-secondary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="La tua password"
                  className="input-field pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-text-secondary hover:text-text"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-text-secondary">
                <input type="checkbox" className="rounded border-gray-300" />
                Ricordami
              </label>
              <Link href="/auth/password-dimenticata" className="text-sm text-primary hover:underline">
                Password dimenticata?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary !py-3.5 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Accesso in corso...
                </>
              ) : (
                'Accedi'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-text-secondary mt-6">
            Non hai un account?{' '}
            <Link href="/auth/registrazione" className="text-primary font-medium hover:underline">
              Registrati gratis
            </Link>
          </p>

          {/* Dev login hints */}
          {process.env.NODE_ENV !== 'production' && (
            <div className="mt-8 p-4 bg-surface border border-zinc-200 text-xs text-text-secondary">
              <p className="font-semibold mb-2 text-text">Account di test:</p>
              <p>Admin: admin@trovapro.it / admin123!</p>
              <p>Pro: mario.rossi@email.it / professionista123!</p>
              <p>Client: cliente@email.it / cliente123!</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Right - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary to-dark items-center justify-center p-12">
        <div className="max-w-md text-center text-white">
          <div className="text-6xl mb-6">🔧</div>
          <h2 className="text-3xl font-bold mb-4">La tua dashboard ti aspetta</h2>
          <p className="text-blue-100/70 leading-relaxed">
            Gestisci le richieste dei clienti, monitora le statistiche del tuo profilo
            e fai crescere la tua attivita con TrovaPro.
          </p>
        </div>
      </div>
    </div>
  );
}
