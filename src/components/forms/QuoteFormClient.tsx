'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ArrowLeft, ArrowRight, CheckCircle, AlertTriangle,
  User, Mail, Phone, MapPin, Calendar, Loader2,
} from 'lucide-react';
import { Professional } from '@/types';

const quoteSchema = z.object({
  firstName: z.string().min(2, 'Inserisci il nome'),
  lastName: z.string().min(2, 'Inserisci il cognome'),
  email: z.string().email('Email non valida'),
  phone: z.string().min(8, 'Numero non valido'),
  address: z.string().min(5, 'Inserisci indirizzo'),
  city: z.string().min(2, 'Inserisci città'),
  description: z.string().min(20, 'Almeno 20 caratteri'),
  preferredDate: z.string().optional(),
  urgency: z.enum(['bassa', 'media', 'alta']),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

interface Props {
  professional: Professional;
}

const COLORS = ['#0070F3', '#7B61FF', '#00C896', '#FFB020', '#EF4444', '#22C55E'];

export default function QuoteFormClient({ professional }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const initials = `${professional.firstName[0]}${professional.lastName[0]}`;
  const color = COLORS[Math.abs(professional.slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % COLORS.length];

  const { register, handleSubmit, formState: { errors } } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { urgency: 'media' },
  });

  const onSubmit = async (data: QuoteFormData) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/richieste', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          professionalId: professional.id,
          category: professional.category,
        }),
      });
      if (!res.ok) {
        const r = await res.json();
        setError(r.error || 'Errore. Riprova.');
        setLoading(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError('Errore di connessione.');
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ background: '#FAFAFA', minHeight: '100vh' }} className="pt-32 pb-20 px-6">
        <div className="max-w-md mx-auto text-center glass-emboss-light" style={{ borderRadius: '28px', padding: '40px' }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)' }}>
            <CheckCircle className="w-8 h-8" style={{ color: '#16A34A' }} strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold mb-3" style={{ color: '#0A0A0A' }}>Richiesta inviata!</h1>
          <p className="text-sm mb-8" style={{ color: '#6B7280' }}>
            <span className="font-semibold" style={{ color: '#0A0A0A' }}>{professional.firstName}</span> riceverà la tua richiesta e ti risponderà a breve.
          </p>
          <Link href="/cerca" className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90" style={{ background: '#0070F3', color: 'white' }}>
            Cerca altri professionisti <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh' }}>
      <section className="relative overflow-hidden pt-24 pb-12" style={{ background: '#050505' }}>
        <div className="aurora-d-soft" />
        <div className="absolute inset-0 grid-bg-dark opacity-50" />
        <div className="relative max-w-[1280px] mx-auto px-6">
          <Link href={`/professionista/${professional.slug}`} className="inline-flex items-center gap-2 text-sm transition-colors hover:text-white mb-6" style={{ color: '#888' }}>
            <ArrowLeft className="w-4 h-4" />
            Torna al profilo
          </Link>
          <h1 className="text-3xl lg:text-4xl tracking-[-0.04em] font-bold mb-2">
            <span className="gradient-text-dark">Richiedi un preventivo</span>
          </h1>
          <p className="text-base" style={{ color: '#B5B5B5' }}>
            Risposta entro 2 ore · Gratuito e senza impegno
          </p>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="glass-emboss-light" style={{ borderRadius: '24px', padding: '32px' }}>
            {error && (
              <div className="rounded-xl p-4 mb-6 text-sm flex items-start gap-3" style={{ background: '#FEF2F2', color: '#991B1B', border: '1px solid #FECACA' }}>
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <Field label="Nome" icon={User} error={errors.firstName?.message}>
                <input {...register('firstName')} placeholder="Mario" className="input-field" />
              </Field>
              <Field label="Cognome" icon={User} error={errors.lastName?.message}>
                <input {...register('lastName')} placeholder="Rossi" className="input-field" />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <Field label="Email" icon={Mail} error={errors.email?.message}>
                <input {...register('email')} type="email" placeholder="mario@email.it" className="input-field" />
              </Field>
              <Field label="Telefono" icon={Phone} error={errors.phone?.message}>
                <input {...register('phone')} type="tel" placeholder="+39 333 1234567" className="input-field" />
              </Field>
            </div>

            <div className="grid sm:grid-cols-[2fr_1fr] gap-4 mb-5">
              <Field label="Indirizzo" icon={MapPin} error={errors.address?.message}>
                <input {...register('address')} placeholder="Via Roma 1" className="input-field" />
              </Field>
              <Field label="Città" icon={MapPin} error={errors.city?.message}>
                <input {...register('city')} placeholder="Roma" className="input-field" />
              </Field>
            </div>

            <Field label="Descrivi il lavoro" error={errors.description?.message}>
              <textarea
                {...register('description')}
                rows={5}
                placeholder="Cosa hai bisogno? Es. impianto elettrico nuovo, riparazione caldaia, tinteggiatura 2 stanze..."
                className="input-field resize-none"
              />
            </Field>

            <div className="grid sm:grid-cols-2 gap-4 mb-6 mt-5">
              <Field label="Data preferita (opzionale)" icon={Calendar}>
                <input {...register('preferredDate')} type="date" className="input-field" />
              </Field>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0A0A0A' }}>Urgenza</label>
                <select {...register('urgency')} className="input-field">
                  <option value="bassa">Bassa - posso aspettare</option>
                  <option value="media">Media - questa settimana</option>
                  <option value="alta">Alta - urgente</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-1.5 disabled:opacity-60"
              style={{ background: '#0070F3', color: 'white' }}
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Invio...</> : <>Invia richiesta gratuita <ArrowRight className="w-4 h-4" /></>}
            </button>
            <p className="text-xs text-center mt-3" style={{ color: '#6B7280' }}>
              Inviando accetti i nostri <Link href="/termini" className="underline">termini</Link> e la <Link href="/privacy" className="underline">privacy</Link>.
            </p>
          </form>

          {/* Pro card sidebar */}
          <aside className="lg:sticky lg:top-24 self-start space-y-4">
            <div className="glass-emboss-light" style={{ borderRadius: '24px', padding: '24px' }}>
              <h3 className="text-xs uppercase tracking-[0.15em] font-bold mb-5" style={{ color: '#6B7280', fontFamily: 'var(--font-mono)' }}>
                Stai contattando
              </h3>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-base font-semibold text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}CC)`, boxShadow: `0 6px 16px -4px ${color}55, inset 0 1px 0 rgba(255,255,255,0.2)` }}
                >
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold truncate" style={{ color: '#0A0A0A' }}>
                    {professional.firstName} {professional.lastName}
                  </p>
                  <p className="text-sm capitalize truncate" style={{ color: '#6B7280' }}>
                    {professional.category} · {professional.city}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span style={{ color: '#6B7280' }}>Valutazione</span>
                  <span className="font-semibold" style={{ color: '#0A0A0A' }}>★ {professional.rating.toFixed(1)} ({professional.reviewCount})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: '#6B7280' }}>Esperienza</span>
                  <span className="font-semibold" style={{ color: '#0A0A0A' }}>{professional.yearsExperience} anni</span>
                </div>
                {professional.priceRange && (
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#6B7280' }}>Tariffa</span>
                    <span className="font-semibold" style={{ color: '#0A0A0A' }}>{professional.priceRange}</span>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  error,
  children,
}: {
  label: string;
  icon?: typeof User;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2" style={{ color: '#0A0A0A' }}>{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-3.5 w-4 h-4" style={{ color: '#9CA3AF' }} />}
        <div style={{ paddingLeft: Icon ? 0 : 0 }}>{Icon ? <div className="[&_input]:!pl-10 [&_textarea]:!pl-10">{children}</div> : children}</div>
      </div>
      {error && <p className="text-xs mt-1" style={{ color: '#DC2626' }}>{error}</p>}
    </div>
  );
}
