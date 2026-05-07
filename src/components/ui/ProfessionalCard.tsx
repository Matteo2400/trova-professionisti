'use client';

import Link from 'next/link';
import { Star, BadgeCheck, ArrowUpRight, Bolt } from 'lucide-react';
import type { Professional } from '@/types';

interface Props {
  professional: Professional;
  compact?: boolean;
}

const COLORS = ['#0070F3', '#7B61FF', '#00C896', '#FFB020', '#EF4444', '#22C55E'];

export default function ProfessionalCard({ professional }: Props) {
  const initials = `${professional.firstName[0]}${professional.lastName[0]}`;
  // deterministic color from slug
  const color = COLORS[Math.abs(professional.slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % COLORS.length];

  return (
    <Link
      href={`/professionista/${professional.slug}`}
      className="glass-emboss-light group block cursor-pointer transition-all duration-500 hover:-translate-y-1"
      style={{ borderRadius: '24px', padding: '24px' }}
    >
      <div className="flex items-start justify-between mb-6">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-semibold text-white"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}CC)`,
            boxShadow: `0 6px 16px -4px ${color}55, inset 0 1px 0 rgba(255,255,255,0.2)`,
          }}
        >
          {initials}
        </div>
        <div className="flex items-center gap-1.5">
          {professional.plan === 'premium' && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: '#0A0A0A', color: 'white' }}>
              Premium
            </span>
          )}
          {professional.plan === 'pro' && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: '#F5F5F5', color: '#0A0A0A', border: '1px solid #E5E5E5' }}>
              Pro
            </span>
          )}
        </div>
      </div>

      <h3 className="text-xl tracking-[-0.02em] font-semibold mb-1 flex items-center gap-1.5" style={{ color: '#0A0A0A' }}>
        {professional.firstName} {professional.lastName}
        {professional.isVerified && (
          <BadgeCheck className="w-4 h-4" style={{ color: '#0A0A0A' }} fill="#0A0A0A" fillOpacity={0.1} strokeWidth={2} />
        )}
      </h3>
      <p className="text-sm mb-5 capitalize" style={{ color: '#6B7280' }}>
        {professional.category} · {professional.city}
      </p>

      {professional.priceRange && (
        <div className="flex items-center justify-between gap-3 mb-5 text-sm">
          {professional.available ? (
            <span className="inline-flex items-center gap-1.5 font-medium" style={{ color: '#16A34A' }}>
              <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: '#16A34A', boxShadow: '0 0 6px #16A34A' }} />
              Online
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-medium" style={{ color: '#6B7280' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#6B7280' }} />
              Occupato
            </span>
          )}
          <span className="inline-flex items-center gap-1 font-medium" style={{ color: '#6B7280' }}>
            <Bolt className="w-3 h-3" /> {professional.priceRange}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between pt-5" style={{ borderTop: '1px solid #E5E5E5' }}>
        <span className="inline-flex items-center gap-1 font-semibold text-sm" style={{ color: '#0A0A0A' }}>
          <Star className="w-4 h-4" fill="#0A0A0A" strokeWidth={0} /> {professional.rating.toFixed(1)}
          <span className="font-normal text-xs ml-0.5" style={{ color: '#6B7280' }}>({professional.reviewCount})</span>
        </span>
        <span className="text-sm font-medium" style={{ color: '#6B7280' }}>{professional.yearsExperience} anni</span>
        <ArrowUpRight className="w-4 h-4 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: '#6B7280' }} />
      </div>
    </Link>
  );
}
