'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Send, CheckCircle, Upload, AlertTriangle,
  User, Mail, Phone, MapPin, FileText, Calendar, Zap
} from 'lucide-react';
import { Professional } from '@/types';
import StarRating from '@/components/ui/StarRating';

const quoteSchema = z.object({
  firstName: z.string().min(2, 'Inserisci il nome (minimo 2 caratteri)'),
  lastName: z.string().min(2, 'Inserisci il cognome (minimo 2 caratteri)'),
  email: z.string().email('Inserisci un\'email valida'),
  phone: z.string().min(8, 'Inserisci un numero di telefono valido'),
  address: z.string().min(5, 'Inserisci il tuo indirizzo'),
  city: z.string().min(2, 'Inserisci la tua città'),
  description: z.string().min(20, 'Descrivi il lavoro in almeno 20 caratteri'),
  preferredDate: z.string().optional(),
  urgency: z.enum(['bassa', 'media', 'alta']),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

interface Props {
  professional: Professional;
}

export default function QuoteFormClient({ professional }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      urgency: 'media',
    },
  });

  const onSubmit = async (data: QuoteFormData) => {
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen bg-surface flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h2 className="text-2xl font-bold text-text mb-3">Richiesta inviata!</h2>
          <p className="text-text-secondary mb-6">
            La tua richiesta è stata inviata a <strong>{professional.firstName} {professional.lastName}</strong>.
            Il professionista ti contatterà entro 24 ore.
          </p>
          <div className="space-y-3">
            <Link href={`/professionista/${professional.slug}`} className="block btn-primary">
              Torna al profilo
            </Link>
            <Link href="/cerca" className="block btn-secondary">
              Cerca altri professionisti
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <Link
          href={`/professionista/${professional.slug}`}
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Torna al profilo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8"
            >
              <h1 className="text-2xl font-bold text-text mb-2">Richiedi Preventivo</h1>
              <p className="text-text-secondary text-sm mb-8">
                Compila il modulo e invieremo la tua richiesta a {professional.firstName}.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Nome"
                    icon={<User className="w-4 h-4" />}
                    error={errors.firstName?.message}
                  >
                    <input {...register('firstName')} placeholder="Mario" className="input-field pl-10" />
                  </FormField>

                  <FormField
                    label="Cognome"
                    icon={<User className="w-4 h-4" />}
                    error={errors.lastName?.message}
                  >
                    <input {...register('lastName')} placeholder="Rossi" className="input-field pl-10" />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Email"
                    icon={<Mail className="w-4 h-4" />}
                    error={errors.email?.message}
                  >
                    <input {...register('email')} type="email" placeholder="mario@example.com" className="input-field pl-10" />
                  </FormField>

                  <FormField
                    label="Telefono"
                    icon={<Phone className="w-4 h-4" />}
                    error={errors.phone?.message}
                  >
                    <input {...register('phone')} type="tel" placeholder="+39 333 1234567" className="input-field pl-10" />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Indirizzo"
                    icon={<MapPin className="w-4 h-4" />}
                    error={errors.address?.message}
                  >
                    <input {...register('address')} placeholder="Via Roma 1" className="input-field pl-10" />
                  </FormField>

                  <FormField
                    label="Città"
                    icon={<MapPin className="w-4 h-4" />}
                    error={errors.city?.message}
                  >
                    <input {...register('city')} placeholder="Milano" className="input-field pl-10" />
                  </FormField>
                </div>

                {/* Description */}
                <FormField
                  label="Descrizione del lavoro"
                  icon={<FileText className="w-4 h-4" />}
                  error={errors.description?.message}
                >
                  <textarea
                    {...register('description')}
                    rows={4}
                    placeholder="Descrivi dettagliatamente il lavoro di cui hai bisogno: tipo di intervento, dimensioni, problemi riscontrati..."
                    className="input-field pl-10 resize-none"
                  />
                </FormField>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Preferred date */}
                  <FormField
                    label="Data preferita (opzionale)"
                    icon={<Calendar className="w-4 h-4" />}
                  >
                    <input {...register('preferredDate')} type="date" className="input-field pl-10" />
                  </FormField>

                  {/* Urgency */}
                  <FormField
                    label="Urgenza"
                    icon={<AlertTriangle className="w-4 h-4" />}
                    error={errors.urgency?.message}
                  >
                    <select {...register('urgency')} className="input-field pl-10 appearance-none cursor-pointer">
                      <option value="bassa">Bassa — Nessuna fretta</option>
                      <option value="media">Media — Entro una settimana</option>
                      <option value="alta">Alta — Urgente</option>
                    </select>
                  </FormField>
                </div>

                {/* Photo upload placeholder */}
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Foto (opzionale)
                  </label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-text-secondary/40 mx-auto mb-2" />
                    <p className="text-sm text-text-secondary">
                      Trascina le foto qui o <span className="text-primary font-medium">sfoglia</span>
                    </p>
                    <p className="text-xs text-text-secondary/60 mt-1">JPG, PNG fino a 5MB</p>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 text-lg !py-4 disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Invio in corso...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Invia Richiesta
                    </>
                  )}
                </button>

                <p className="text-xs text-text-secondary text-center">
                  Inviando il modulo accetti la nostra{' '}
                  <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  {' '}e i{' '}
                  <Link href="/termini" className="text-primary hover:underline">Termini di Servizio</Link>
                </p>
              </form>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <h3 className="font-bold text-text mb-4">Richiedi a</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-2xl">
                  {professional.category === 'elettricista' ? '⚡' : professional.category === 'idraulico' ? '💧' : '🎨'}
                </div>
                <div>
                  <p className="font-semibold text-text text-sm">
                    {professional.firstName} {professional.lastName}
                  </p>
                  <p className="text-xs text-text-secondary capitalize">{professional.category}</p>
                </div>
              </div>
              <StarRating rating={professional.rating} count={professional.reviewCount} size={14} />
              <div className="mt-4 pt-4 border-t border-gray-50">
                <p className="text-xs text-text-secondary flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {professional.city} ({professional.province})
                </p>
                {professional.priceRange && (
                  <p className="text-xs text-primary font-medium mt-1">
                    {professional.priceRange}
                  </p>
                )}
              </div>

              <div className="mt-6 p-4 bg-surface rounded-xl">
                <p className="text-xs text-text-secondary leading-relaxed">
                  💡 <strong>Suggerimento:</strong> Sii il più dettagliato possibile nella descrizione
                  del lavoro. Includi foto se possibile — aiuteranno il professionista a darti un
                  preventivo più accurato.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-text mb-1.5">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-3.5 text-text-secondary">{icon}</div>
        {children}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
