'use client';

import Link from 'next/link';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Mail, Lock, Eye, EyeOff, Zap, Loader2, ArrowRight } from 'lucide-react';

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
      const result = await signIn('credentials', { email, password, redirect: false });
      if (result?.error) {
        setError('Email o password non corretti.');
        setLoading(false);
        return;
      }
      if (callbackUrl) {
        router.push(callbackUrl);
        return;
      }
      const sessionRes = await fetch('/api/auth/session');
      const session = await sessionRes.json();
      if (session?.user?.role === 'admin') router.push('/admin');
      else if (session?.user?.role === 'professional') router.push('/dashboard');
      else router.push('/');
    } catch {
      setError('Errore di connessione. Riprova.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left form */}
      <div className="flex-1 flex items-center justify-center p-8" style={{ background: '#FAFAFA' }}>
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ background: '#050505' }}>
              <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-semibold tracking-tight" style={{ color: '#050505', letterSpacing: '-0.01em' }}>
              trovapro
            </span>
          </Link>

          <h1 className="text-3xl font-bold tracking-[-0.03em] mb-2" style={{ color: '#0A0A0A' }}>
            Bentornato
          </h1>
          <p className="text-sm mb-8" style={{ color: '#6B7280' }}>
            Accedi al tuo account.
          </p>

          {error && (
            <div className="rounded-xl p-3.5 mb-6 text-sm" style={{ background: '#FEF2F2', color: '#991B1B', border: '1px solid #FECACA' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#0A0A0A' }}>Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-4 h-4" style={{ color: '#9CA3AF' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="la-tua@email.it"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#0A0A0A' }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-4 h-4" style={{ color: '#9CA3AF' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="La tua password"
                  className="input-field pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5"
                  style={{ color: '#9CA3AF' }}
                  aria-label="Mostra/nascondi password"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2" style={{ color: '#6B7280' }}>
                <input type="checkbox" className="rounded" />
                Ricordami
              </label>
              <Link href="/auth/password-dimenticata" className="hover:underline" style={{ color: '#0070F3' }}>
                Password dimenticata?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-1.5 disabled:opacity-60"
              style={{ background: '#0070F3', color: 'white' }}
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Accesso...</> : <>Accedi <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: '#6B7280' }}>
            Non hai un account?{' '}
            <Link href="/auth/registrazione" className="font-semibold hover:underline" style={{ color: '#0A0A0A' }}>
              Registrati gratis
            </Link>
          </p>

          {process.env.NODE_ENV !== 'production' && (
            <div className="mt-8 p-4 rounded-xl text-xs" style={{ background: 'white', border: '1px solid #E5E5E5', color: '#6B7280' }}>
              <p className="font-semibold mb-2" style={{ color: '#0A0A0A' }}>Account di test:</p>
              <p>Admin: admin@trovapro.it / admin123!</p>
              <p>Pro: mario.rossi@email.it / professionista123!</p>
              <p>Cliente: cliente@email.it / cliente123!</p>
            </div>
          )}
        </div>
      </div>

      {/* Right visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 relative overflow-hidden" style={{ background: '#050505' }}>
        <div className="aurora-d" />
        <div className="absolute inset-0 grid-bg-dark opacity-50" />
        <div className="relative max-w-md text-center">
          <h2 className="font-bold tracking-[-0.04em]" style={{ fontSize: 'clamp(40px, 5vw, 56px)', lineHeight: 1 }}>
            <span className="gradient-text-dark">Trova il</span><br />
            <span className="accent-text">professionista</span>
          </h2>
          <p className="mt-6 text-base" style={{ color: '#888' }}>
            Più di 8.000 professionisti verificati, pronti a darti una mano.
          </p>
        </div>
      </div>
    </div>
  );
}
