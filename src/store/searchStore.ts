import { create } from 'zustand';
import { SearchFilters, CategorySlug } from '@/types';

interface SearchState {
  filters: SearchFilters;
  setCategory: (category: CategorySlug | undefined) => void;
  setCity: (city: string) => void;
  setLocation: (lat: number, lng: number) => void;
  setRadius: (radius: number) => void;
  setMinRating: (rating: number | undefined) => void;
  setSortBy: (sort: 'distance' | 'rating' | 'relevance') => void;
  resetFilters: () => void;
}

const defaultFilters: SearchFilters = {
  radius: 25,
  sortBy: 'relevance',
};

export const useSearchStore = create<SearchState>((set) => ({
  filters: defaultFilters,
  setCategory: (category) =>
    set((state) => ({ filters: { ...state.filters, category } })),
  setCity: (city) =>
    set((state) => ({ filters: { ...state.filters, city } })),
  setLocation: (lat, lng) =>
    set((state) => ({
      filters: { ...state.filters, latitude: lat, longitude: lng },
    })),
  setRadius: (radius) =>
    set((state) => ({ filters: { ...state.filters, radius } })),
  setMinRating: (minRating) =>
    set((state) => ({ filters: { ...state.filters, minRating } })),
  setSortBy: (sortBy) =>
    set((state) => ({ filters: { ...state.filters, sortBy } })),
  resetFilters: () => set({ filters: defaultFilters }),
}));
