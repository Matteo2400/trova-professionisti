'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import {
  User, Mail, Lock, Phone, MapPin, Eye, EyeOff,
  Zap, Briefcase, ArrowRight, CheckCircle, Loader2,
  UserCircle, Hammer,
} from 'lucide-react';
import { categories } from '@/data';

type Role = 'client' | 'professional';

const clientSchema = z.object({
  firstName: z.string().min(2, 'Minimo 2 caratteri'),
  lastName: z.string().min(2, 'Minimo 2 caratteri'),
  email: z.string().email('Email non valida'),
  phone: z.string().optional(),
  password: z.string().min(8, 'La password deve avere almeno 8 caratteri'),
});

const professionalSchema = clientSchema.extend({
  phone: z.string().min(8, 'Numero non valido'),
  vatNumber: z.string().min(11, 'P.IVA non valida').max(16),
  category: z.string().min(1, 'Seleziona una categoria'),
  city: z.string().min(2, 'Inserisci la tua citta'),
  description: z.string().min(20, 'Minimo 20 caratteri'),
});

type ClientFormData = z.infer<typeof clientSchema>;
type ProfessionalFormData = z.infer<typeof professionalSchema>;

export default function RegistrazionePage() {
  const [role, setRole] = useState<Role | null>(null);

  if (!role) {
    return <RoleSelector onSelect={setRole} />;
  }

  return role === 'client' ? (
    <ClientRegistrationForm onBack={() => setRole(null)} />
  ) : (
    <ProfessionalRegistrationForm onBack={() => setRole(null)} />
  );
}

function RoleSelector({ onSelect }: { onSelect: (r: Role) => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Link href="/" className="flex items-center justify-center gap-2 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-text">
            Trova<span className="text-primary">Pro</span>
          </span>
        </Link>

        <h1 className="text-3xl font-bold text-text text-center mb-3">Crea il tuo account</h1>
        <p className="text-text-secondary text-center mb-10">
          Come vuoi usare TrovaPro?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => onSelect('client')}
            className="group bg-white border-2 border-zinc-200 hover:border-primary p-8 text-left transition-all hover:shadow-lg"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white text-primary transition-colors">
              <UserCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-text mb-2">Sono un cliente</h3>
            <p className="text-sm text-text-secondary mb-4">
              Cerco un professionista qualificato per un lavoro nella mia zona.
            </p>
            <span className="text-sm text-primary font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              Continua <ArrowRight className="w-4 h-4" />
            </span>
          </button>

          <button
            onClick={() => onSelect('professional')}
            className="group bg-white border-2 border-zinc-200 hover:border-primary p-8 text-left transition-all hover:shadow-lg"
          >
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white text-amber-600 transition-colors">
              <Hammer className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-text mb-2">Sono un professionista</h3>
            <p className="text-sm text-text-secondary mb-4">
              Voglio offrire i miei servizi e ricevere richieste dai clienti.
            </p>
            <span className="text-sm text-primary font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              Continua <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </div>

        <p className="text-center text-sm text-text-secondary mt-8">
          Hai gia un account?{' '}
          <Link href="/auth/login" className="text-primary font-medium hover:underline">
            Accedi
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

function ClientRegistrationForm({ onBack }: { onBack: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });

  const onSubmit = async (data: ClientFormData) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/registrazione', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, role: 'client' }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || 'Errore durante la registrazione');
        setLoading(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError('Errore di connessione. Riprova.');
      setLoading(false);
    }
  };

  if (submitted) {
    return <SuccessScreen
      title="Benvenuto!"
      description="Il tuo account cliente e stato creato. Accedi per iniziare a cercare professionisti."
    />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl border border-zinc-200 p-8"
      >
        <button onClick={onBack} className="text-sm text-text-secondary hover:text-primary mb-4">
          ← Cambia tipo di account
        </button>

        <h1 className="text-2xl font-bold text-text mb-2">Registrati come cliente</h1>
        <p className="text-text-secondary mb-6 text-sm">Crea il tuo account in 30 secondi.</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Nome</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-4 h-4 text-text-secondary" />
                <input {...register('firstName')} placeholder="Mario" className="input-field pl-10" />
              </div>
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Cognome</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-4 h-4 text-text-secondary" />
                <input {...register('lastName')} placeholder="Rossi" className="input-field pl-10" />
              </div>
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-text-secondary" />
              <input {...register('email')} type="email" placeholder="mario@example.com" className="input-field pl-10" />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Telefono (opzionale)</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 w-4 h-4 text-text-secondary" />
              <input {...register('phone')} type="tel" placeholder="+39 333 1234567" className="input-field pl-10" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-4 h-4 text-text-secondary" />
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
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
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary !py-3.5 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Registrazione...
              </>
            ) : (
              'Crea Account'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-text-secondary mt-6">
          Hai gia un account?{' '}
          <Link href="/auth/login" className="text-primary font-medium hover:underline">
            Accedi
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

function ProfessionalRegistrationForm({ onBack }: { onBack: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors }, trigger } = useForm<ProfessionalFormData>({
    resolver: zodResolver(professionalSchema),
  });

  const nextStep = async () => {
    const fields = step === 1
      ? (['firstName', 'lastName', 'email', 'phone', 'password'] as const)
      : (['vatNumber', 'category', 'city', 'description'] as const);
    const valid = await trigger(fields);
    if (valid) setStep(step + 1);
  };

  const onSubmit = async (data: ProfessionalFormData) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/registrazione', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, role: 'professional' }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || 'Errore durante la registrazione');
        setLoading(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError('Errore di connessione. Riprova.');
      setLoading(false);
    }
  };

  if (submitted) {
    return <SuccessScreen
      title="Registrazione completata!"
      description="Il tuo profilo e stato creato con successo. Sara visibile ai clienti dopo l'approvazione da parte del nostro team."
    />;
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary to-dark items-center justify-center p-12">
        <div className="max-w-md text-center text-white">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-3xl font-bold mb-4">Fai crescere la tua attivita</h2>
          <p className="text-blue-100/70 leading-relaxed mb-8">
            Unisciti a centinaia di professionisti che hanno gia scelto TrovaPro
            per trovare nuovi clienti nella propria zona.
          </p>
          <div className="space-y-3 text-left max-w-xs mx-auto">
            {['Registrazione completamente gratuita', 'Ricevi richieste dai clienti', 'Gestisci tutto dalla dashboard', 'Fai upgrade quando vuoi'].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-blue-100/80 text-sm">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-lg">
          <button onClick={onBack} className="text-sm text-text-secondary hover:text-primary mb-4">
            ← Cambia tipo di account
          </button>

          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text">
              Trova<span className="text-primary">Pro</span>
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-text mb-2">Registrati come professionista</h1>
          <p className="text-text-secondary mb-6">
            Passo {step} di 2 — {step === 1 ? 'Dati personali' : 'Dettagli professionali'}
          </p>

          <div className="flex gap-2 mb-8">
            <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-gray-200'}`} />
            <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Nome</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 w-4 h-4 text-text-secondary" />
                      <input {...register('firstName')} placeholder="Mario" className="input-field pl-10" />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Cognome</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 w-4 h-4 text-text-secondary" />
                      <input {...register('lastName')} placeholder="Rossi" className="input-field pl-10" />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-4 h-4 text-text-secondary" />
                    <input {...register('email')} type="email" placeholder="mario@example.com" className="input-field pl-10" />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Telefono</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-4 h-4 text-text-secondary" />
                    <input {...register('phone')} type="tel" placeholder="+39 333 1234567" className="input-field pl-10" />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-4 h-4 text-text-secondary" />
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
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
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <button type="button" onClick={nextStep} className="w-full btn-primary !py-3.5 flex items-center justify-center gap-2">
                  Continua
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Partita IVA</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3.5 w-4 h-4 text-text-secondary" />
                    <input {...register('vatNumber')} placeholder="IT12345678901" className="input-field pl-10" />
                  </div>
                  {errors.vatNumber && <p className="text-red-500 text-xs mt-1">{errors.vatNumber.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Categoria principale</label>
                  <select {...register('category')} className="input-field">
                    <option value="">Seleziona categoria</option>
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Citta</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-text-secondary" />
                    <input {...register('city')} placeholder="Milano" className="input-field pl-10" />
                  </div>
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Descrizione servizi</label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    placeholder="Descrivi i tuoi servizi, le tue specializzazioni e la tua esperienza..."
                    className="input-field resize-none"
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 btn-secondary !text-text !border-zinc-300 hover:!bg-zinc-100 hover:!text-text"
                  >
                    Indietro
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 btn-primary !py-3.5 flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Registrazione...
                      </>
                    ) : (
                      'Completa Registrazione'
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </form>

          <p className="text-center text-sm text-text-secondary mt-6">
            Hai gia un account?{' '}
            <Link href="/auth/login" className="text-primary font-medium hover:underline">
              Accedi
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function SuccessScreen({ title, description }: { title: string; description: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
      >
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h2 className="text-2xl font-bold text-text mb-3">{title}</h2>
        <p className="text-text-secondary mb-6">{description}</p>
        <Link href="/auth/login" className="btn-primary inline-block">
          Accedi
        </Link>
      </motion.div>
    </div>
  );
}
