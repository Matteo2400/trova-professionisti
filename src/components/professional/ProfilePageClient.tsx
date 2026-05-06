'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  MapPin, Phone, Mail, Shield, Crown, Award, Clock, Calendar,
  Zap, Droplets, Paintbrush, ArrowLeft, ExternalLink, Star
} from 'lucide-react';
import StarRating from '@/components/ui/StarRating';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Professional, Review } from '@/types';

const MapView = dynamic(() => import('@/components/map/MapView'), { ssr: false });

const categoryEmoji: Record<string, string> = {
  elettricista: '⚡',
  idraulico: '💧',
  imbianchino: '🎨',
  muratore: '🧱',
};

interface Props {
  professional: Professional;
  reviews: Review[];
}

export default function ProfilePageClient({ professional, reviews }: Props) {
  const isPremium = professional.plan === 'premium';
  const isPro = professional.plan === 'pro';

  return (
    <div className="pt-20 min-h-screen bg-surface">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/cerca" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          Torna ai risultati
        </Link>
      </div>

      {/* Profile Header */}
      <div className={`${isPremium ? 'bg-gradient-to-r from-amber-50 to-amber-100/50 border-b-2 border-amber-200' : 'bg-white border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-6 items-start"
          >
            {/* Avatar */}
            <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-2xl flex items-center justify-center text-5xl ${
              isPremium ? 'bg-amber-100 border-4 border-amber-300 shadow-lg shadow-amber-500/20' : 'bg-surface border-2 border-gray-200'
            }`}>
              {categoryEmoji[professional.category]}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-text">
                  {professional.firstName} {professional.lastName}
                </h1>
                {professional.isVerified && (
                  <span className="badge-verified"><Shield className="w-3 h-3" /> Verificato</span>
                )}
                {isPremium && (
                  <span className="badge-premium"><Crown className="w-3 h-3" /> Premium</span>
                )}
                {isPro && (
                  <span className="badge-pro"><Award className="w-3 h-3" /> Pro</span>
                )}
              </div>

              <p className="text-text-secondary mb-3 capitalize">{professional.category}</p>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <StarRating rating={professional.rating} count={professional.reviewCount} />
                <span className="flex items-center gap-1 text-sm text-text-secondary">
                  <MapPin className="w-4 h-4" />
                  {professional.city} ({professional.province})
                </span>
                <span className="flex items-center gap-1 text-sm text-text-secondary">
                  <Clock className="w-4 h-4" />
                  {professional.yearsExperience} anni di esperienza
                </span>
              </div>

              {professional.priceRange && (
                <p className="text-sm font-medium text-primary mb-4">
                  Tariffa indicativa: {professional.priceRange}
                </p>
              )}

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={`tel:${professional.phone.replace(/\s/g, '')}`}
                  className="btn-primary flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Chiama direttamente
                </a>
                <Link
                  href={`/richiedi-preventivo/${professional.slug}`}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Richiedi preventivo
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <AnimatedSection>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-text mb-4">Chi sono</h2>
                <p className="text-text-secondary leading-relaxed">
                  {professional.description}
                </p>
              </div>
            </AnimatedSection>

            {/* Services and areas */}
            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-text mb-4">Zone coperte</h2>
                <div className="flex flex-wrap gap-2">
                  {professional.coverageAreas.map((area) => (
                    <span key={area} className="px-3 py-1.5 bg-surface rounded-lg text-sm text-text-secondary">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Reviews */}
            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-text">
                    Recensioni ({reviews.length})
                  </h2>
                  <StarRating rating={professional.rating} />
                </div>

                {reviews.length === 0 ? (
                  <p className="text-text-secondary text-sm">Ancora nessuna recensione.</p>
                ) : (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center font-semibold text-primary text-sm">
                              {review.authorName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-text text-sm">{review.authorName}</p>
                              <p className="text-xs text-text-secondary">
                                {new Date(review.date).toLocaleDateString('it-IT', {
                                  day: 'numeric', month: 'long', year: 'numeric'
                                })}
                                {review.verified && (
                                  <span className="ml-2 text-success">✓ Verificata</span>
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed ml-13 pl-13">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact card */}
            <div className={`rounded-2xl p-6 ${isPremium ? 'bg-gradient-to-br from-amber-50 to-amber-100/50 border-2 border-amber-200' : 'bg-white border border-gray-100'}`}>
              <h3 className="font-bold text-text mb-4">Contatta {professional.firstName}</h3>
              <div className="space-y-3">
                <a
                  href={`tel:${professional.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 hover:border-primary hover:shadow-sm transition-all text-sm"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-text">{professional.phone}</span>
                </a>
                <Link
                  href={`/richiedi-preventivo/${professional.slug}`}
                  className="block w-full btn-primary text-center"
                >
                  Richiedi preventivo gratuito
                </Link>
              </div>
            </div>

            {/* Info card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-text mb-4">Informazioni</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-text-secondary">Categoria</dt>
                  <dd className="font-medium text-text capitalize">{professional.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-secondary">Esperienza</dt>
                  <dd className="font-medium text-text">{professional.yearsExperience} anni</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-secondary">Raggio copertura</dt>
                  <dd className="font-medium text-text">{professional.coverageRadius} km</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-secondary">Disponibile</dt>
                  <dd className="font-medium text-success">
                    {professional.available ? 'Sì' : 'No'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <h3 className="font-bold text-text mb-3 px-2">Zona di copertura</h3>
              <MapView
                professionals={[professional]}
                center={[professional.latitude, professional.longitude]}
                zoom={11}
                className="h-[250px]"
                showCoverage
                selectedProfessional={professional}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
