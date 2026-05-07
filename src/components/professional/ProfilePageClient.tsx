'use client';

import Link from 'next/link';
import {
  MapPin, Phone, Mail, ArrowLeft, Star, BadgeCheck, Bolt, Calendar, ArrowRight,
} from 'lucide-react';
import { Professional, Review } from '@/types';

interface Props {
  professional: Professional;
  reviews: Review[];
}

const COLORS = ['#0070F3', '#7B61FF', '#00C896', '#FFB020', '#EF4444', '#22C55E'];

export default function ProfilePageClient({ professional, reviews }: Props) {
  const isPremium = professional.plan === 'premium';
  const initials = `${professional.firstName[0]}${professional.lastName[0]}`;
  const color = COLORS[Math.abs(professional.slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % COLORS.length];

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh' }}>
      {/* Hero band dark */}
      <section className="relative overflow-hidden pt-24 pb-12" style={{ background: '#050505' }}>
        <div className="aurora-d-soft" />
        <div className="absolute inset-0 grid-bg-dark opacity-50" />

        <div className="relative max-w-[1280px] mx-auto px-6">
          <Link href="/cerca" className="inline-flex items-center gap-2 text-sm transition-colors hover:text-white mb-8" style={{ color: '#888' }}>
            <ArrowLeft className="w-4 h-4" />
            Torna ai risultati
          </Link>

          <div className="flex items-start gap-8 flex-wrap">
            <div
              className="w-28 h-28 rounded-3xl flex items-center justify-center text-3xl font-semibold text-white flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${color}, ${color}CC)`,
                boxShadow: `0 12px 32px -8px ${color}66, inset 0 1px 0 rgba(255,255,255,0.2)`,
              }}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                {isPremium && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: 'white', color: '#050505' }}>
                    Premium
                  </span>
                )}
                {professional.plan === 'pro' && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.15)' }}>
                    Pro
                  </span>
                )}
                {professional.isVerified && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-flex items-center gap-1" style={{ background: 'rgba(34,197,94,0.15)', color: '#4ADE80', border: '1px solid rgba(34,197,94,0.25)' }}>
                    <BadgeCheck className="w-3 h-3" />
                    Verificato
                  </span>
                )}
                {professional.available && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-flex items-center gap-1" style={{ background: 'rgba(34,197,94,0.15)', color: '#4ADE80' }}>
                    <span className="pulse-dot w-1 h-1 rounded-full" style={{ background: '#4ADE80' }} />
                    Online
                  </span>
                )}
              </div>

              <h1 className="text-4xl lg:text-5xl tracking-[-0.04em] font-bold mb-3">
                <span className="gradient-text-dark">{professional.firstName}</span>{' '}
                <span className="accent-text">{professional.lastName}</span>
              </h1>

              <p className="text-lg capitalize mb-4" style={{ color: '#B5B5B5' }}>
                {professional.category} · {professional.city} ({professional.province})
              </p>

              <div className="flex items-center gap-6 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-base">
                  <Star className="w-4 h-4" fill="#FBBF24" strokeWidth={0} />
                  <span className="font-semibold text-white">{professional.rating.toFixed(1)}</span>
                  <span style={{ color: '#888' }}>({professional.reviewCount} recensioni)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-base" style={{ color: '#B5B5B5' }}>
                  <Calendar className="w-4 h-4" />
                  {professional.yearsExperience} anni di esperienza
                </span>
                {professional.priceRange && (
                  <span className="inline-flex items-center gap-1.5 text-base" style={{ color: '#B5B5B5' }}>
                    <Bolt className="w-4 h-4" />
                    {professional.priceRange}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body content */}
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Left: bio + reviews */}
          <div className="space-y-6">
            {/* About */}
            <article className="glass-emboss-light" style={{ borderRadius: '24px', padding: '32px' }}>
              <h2 className="text-2xl tracking-[-0.02em] font-bold mb-4" style={{ color: '#0A0A0A' }}>
                Chi sono
              </h2>
              <p className="text-[15px] leading-[1.7]" style={{ color: '#374151' }}>
                {professional.description}
              </p>

              {professional.coverageAreas && professional.coverageAreas.length > 0 && (
                <div className="mt-6 pt-6 border-t" style={{ borderColor: '#E5E5E5' }}>
                  <h3 className="text-xs uppercase tracking-[0.15em] font-bold mb-3" style={{ color: '#6B7280', fontFamily: 'var(--font-mono)' }}>
                    Zone di copertura
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {professional.coverageAreas.map((area) => (
                      <span key={area} className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: '#F5F5F5', color: '#0A0A0A', border: '1px solid #E5E5E5' }}>
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Reviews */}
            {reviews.length > 0 && (
              <article className="glass-emboss-light" style={{ borderRadius: '24px', padding: '32px' }}>
                <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                  <h2 className="text-2xl tracking-[-0.02em] font-bold" style={{ color: '#0A0A0A' }}>
                    Recensioni
                  </h2>
                  <span className="inline-flex items-center gap-1.5 text-base">
                    <Star className="w-4 h-4" fill="#FBBF24" strokeWidth={0} />
                    <span className="font-semibold" style={{ color: '#0A0A0A' }}>{professional.rating.toFixed(1)}</span>
                    <span style={{ color: '#6B7280' }}>· {professional.reviewCount} recensioni</span>
                  </span>
                </div>

                <div className="space-y-5">
                  {reviews.map((r) => (
                    <div key={r.id} className="pb-5 last:pb-0 last:border-0" style={{ borderBottom: '1px solid #E5E5E5' }}>
                      <div className="flex items-center gap-2 mb-2">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5" fill="#FBBF24" strokeWidth={0} />
                        ))}
                        {r.verified && (
                          <span className="text-[10px] font-bold uppercase tracking-wider ml-1 px-1.5 py-0.5 rounded" style={{ background: '#ECFDF5', color: '#16A34A' }}>Verificata</span>
                        )}
                      </div>
                      <p className="text-[15px] leading-[1.6] mb-3" style={{ color: '#0A0A0A' }}>
                        &ldquo;{r.comment}&rdquo;
                      </p>
                      <p className="text-xs" style={{ color: '#6B7280' }}>
                        <span className="font-semibold" style={{ color: '#0A0A0A' }}>{r.authorName}</span> · {r.date}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            )}
          </div>

          {/* Right: sticky CTA */}
          <aside className="space-y-4 lg:sticky lg:top-24 self-start">
            <div className="glass-emboss-light" style={{ borderRadius: '24px', padding: '24px' }}>
              <h3 className="text-lg font-semibold mb-1" style={{ color: '#0A0A0A' }}>
                Richiedi un preventivo
              </h3>
              <p className="text-sm mb-5" style={{ color: '#6B7280' }}>
                Risposta entro {professional.available ? '2 ore' : '24 ore'}, gratuito e senza impegno.
              </p>

              <Link
                href={`/richiedi-preventivo/${professional.slug}`}
                className="block w-full py-3 rounded-xl text-sm font-semibold text-center transition-all hover:opacity-90 mb-3"
                style={{ background: '#0070F3', color: 'white' }}
              >
                Richiedi preventivo gratuito <ArrowRight className="w-4 h-4 inline ml-1" />
              </Link>

              {professional.phone && (
                <a
                  href={`tel:${professional.phone}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-neutral-50 mb-2"
                  style={{ border: '1px solid #E5E5E5', color: '#0A0A0A' }}
                >
                  <Phone className="w-4 h-4" />
                  {professional.phone}
                </a>
              )}
              {professional.email && (
                <a
                  href={`mailto:${professional.email}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-neutral-50"
                  style={{ border: '1px solid #E5E5E5', color: '#0A0A0A' }}
                >
                  <Mail className="w-4 h-4" />
                  {professional.email}
                </a>
              )}
            </div>

            {/* Trust signals */}
            <div className="glass-emboss-light" style={{ borderRadius: '24px', padding: '24px' }}>
              <h3 className="text-xs uppercase tracking-[0.15em] font-bold mb-4" style={{ color: '#6B7280', fontFamily: 'var(--font-mono)' }}>
                Garanzie
              </h3>
              <ul className="space-y-3 text-sm">
                {professional.isVerified && (
                  <li className="flex items-center gap-2.5" style={{ color: '#0A0A0A' }}>
                    <BadgeCheck className="w-4 h-4 flex-shrink-0" style={{ color: '#16A34A' }} />
                    P.IVA verificata
                  </li>
                )}
                <li className="flex items-center gap-2.5" style={{ color: '#0A0A0A' }}>
                  <Star className="w-4 h-4 flex-shrink-0" fill="#FBBF24" strokeWidth={0} />
                  {professional.reviewCount} recensioni reali
                </li>
                <li className="flex items-center gap-2.5" style={{ color: '#0A0A0A' }}>
                  <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: '#0A0A0A' }} />
                  {professional.yearsExperience}+ anni di esperienza
                </li>
                <li className="flex items-center gap-2.5" style={{ color: '#0A0A0A' }}>
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#0A0A0A' }} />
                  Copertura {professional.coverageRadius} km
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
