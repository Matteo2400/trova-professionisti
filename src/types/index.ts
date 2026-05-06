export interface Professional {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vatNumber: string;
  category: CategorySlug;
  categories: CategorySlug[];
  description: string;
  profileImage: string;
  gallery: string[];
  coverageAreas: string[];
  coverageRadius: number;
  latitude: number;
  longitude: number;
  city: string;
  province: string;
  yearsExperience: number;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  plan: 'base' | 'pro' | 'premium';
  createdAt: string;
  available: boolean;
  priceRange?: string;
}

export type CategorySlug = string;

export interface Category {
  slug: CategorySlug;
  name: string;
  namePlural: string;
  icon: string;
  color: string;
  description: string;
}

export interface Review {
  id: string;
  professionalId: string;
  authorName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface QuoteRequest {
  id: string;
  professionalId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  category: CategorySlug;
  description: string;
  photos: string[];
  preferredDate: string;
  urgency: 'bassa' | 'media' | 'alta';
  status: 'nuova' | 'in_lavorazione' | 'completata';
  createdAt: string;
}

export interface SearchFilters {
  category?: CategorySlug;
  city?: string;
  latitude?: number;
  longitude?: number;
  radius: number;
  minRating?: number;
  sortBy: 'distance' | 'rating' | 'relevance';
  available?: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  slug: 'base' | 'pro' | 'premium';
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
  badgeColor?: string;
}

export interface DashboardStats {
  profileViews: number;
  requestsReceived: number;
  responseRate: number;
  avgRating: number;
}
