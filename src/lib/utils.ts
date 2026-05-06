import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}

export function getStarArray(rating: number): ('full' | 'half' | 'empty')[] {
  const stars: ('full' | 'half' | 'empty')[] = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push('full');
    else if (rating >= i - 0.5) stars.push('half');
    else stars.push('empty');
  }
  return stars;
}

export function getCategoryIcon(slug: string): string {
  const icons: Record<string, string> = {
    elettricista: 'Zap',
    idraulico: 'Droplets',
    imbianchino: 'Paintbrush',
  };
  return icons[slug] || 'Wrench';
}

export function getPlanBadgeClass(plan: string): string {
  switch (plan) {
    case 'premium':
      return 'bg-amber-100 text-amber-800 border-amber-300';
    case 'pro':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    default:
      return 'bg-gray-100 text-gray-600 border-gray-300';
  }
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
