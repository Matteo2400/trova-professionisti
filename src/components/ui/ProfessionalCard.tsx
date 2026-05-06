'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Shield, Crown, Award, Zap, Droplets, Paintbrush, Hammer, ArrowUpRight } from 'lucide-react';
import StarRating from '@/components/ui/StarRating';
import { Professional } from '@/types';

interface ProfessionalCardProps {
  professional: Professional;
  compact?: boolean;
}

const categoryIcons: Record<string, React.ReactNode> = {
  elettricista: <Zap className="w-3.5 h-3.5" />,
  idraulico: <Droplets className="w-3.5 h-3.5" />,
  imbianchino: <Paintbrush className="w-3.5 h-3.5" />,
  muratore: <Hammer className="w-3.5 h-3.5" />,
};

const categoryGradients: Record<string, string> = {
  elettricista: 'from-amber-500 to-orange-600',
  idraulico: 'from-blue-500 to-cyan-600',
  imbianchino: 'from-emerald-500 to-teal-600',
  muratore: 'from-violet-500 to-purple-600',
};

const categoryImages: Record<string, string> = {
  elettricista: '/images/categories/elettricista.svg',
  idraulico: '/images/categories/idraulico.svg',
  imbianchino: '/images/categories/imbianchino.svg',
  muratore: '/images/categories/muratore.svg',
};

export default function ProfessionalCard({ professional, compact = false }: ProfessionalCardProps) {
  const isPremium = professional.plan === 'premium';
  const isPro = professional.plan === 'pro';
  const initials = `${professional.firstName[0]}${professional.lastName[0]}`;
  const categoryImage = categoryImages[professional.category];

  return (
    <Link href={`/professionista/${professional.slug}`}>
      <div className={`group relative overflow-hidden ${isPremium ? 'card-premium' : 'card'}`}>
        {/* Photo section */}
        <div className="relative h-48 overflow-hidden">
          {/* Category themed image */}
          <div className={`absolute inset-0 bg-gradient-to-br ${categoryGradients[professional.category] || 'from-zinc-700 to-zinc-900'} flex items-center justify-center`}>
            <span className="text-5xl font-bold text-white/80 select-none">{initials}</span>
          </div>
          {categoryImage && (
            <Image
              src={categoryImage}
              alt={professional.category}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 relative z-[1]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent z-[2]" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex gap-2 z-[3]">
            {isPremium && (
              <span className="badge-premium">
                <Crown className="w-3 h-3" /> Premium
              </span>
            )}
            {isPro && (
              <span className="badge-pro">
                <Award className="w-3 h-3" /> Pro
              </span>
            )}
            {professional.isVerified && (
              <span className="badge-verified">
                <Shield className="w-3 h-3" /> Verificato
              </span>
            )}
          </div>

          {/* Arrow icon on hover */}
          <div className="absolute top-3 right-3 w-8 h-8 bg-white/0 flex items-center justify-center transition-all duration-300 group-hover:bg-white z-[3]">
            <ArrowUpRight className="w-4 h-4 text-white transition-all duration-300 group-hover:text-dark" />
          </div>

          {/* Price range at bottom of image */}
          {professional.priceRange && (
            <div className="absolute bottom-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-dark z-[3]">
              {professional.priceRange}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1 text-xs text-text-secondary uppercase tracking-wider font-medium">
              {categoryIcons[professional.category]}
              {professional.category}
            </span>
            <span className="text-zinc-300">|</span>
            <span className="text-xs text-text-secondary">
              {professional.yearsExperience} anni esp.
            </span>
          </div>

          <h3 className="text-lg font-bold text-text mb-1 group-hover:text-primary transition-colors duration-300">
            {professional.firstName} {professional.lastName}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            <StarRating rating={professional.rating} count={professional.reviewCount} size={14} />
          </div>

          {!compact && (
            <p className="text-sm text-text-secondary line-clamp-2 mb-4 leading-relaxed">
              {professional.description}
            </p>
          )}

          <div className="flex items-center gap-1 text-xs text-text-secondary pt-3 border-t border-zinc-100">
            <MapPin className="w-3.5 h-3.5" />
            {professional.city} ({professional.province})
          </div>
        </div>

        {/* Bottom accent line */}
        <div className={`h-0.5 w-0 transition-all duration-500 group-hover:w-full ${isPremium ? 'bg-amber-500' : 'bg-primary'}`} />
      </div>
    </Link>
  );
}
