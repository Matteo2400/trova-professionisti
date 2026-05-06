import type { Metadata } from 'next';
import SearchPageClient from '@/components/search/SearchPageClient';
import { getPublicCategories, getPublicProfessionals } from '@/lib/professionals';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Cerca Professionisti',
  description:
    'Cerca elettricisti, idraulici, imbianchini e muratori qualificati nella tua zona. Filtra per categoria, provincia e valutazione.',
};

interface PageProps {
  searchParams: Promise<{
    categoria?: string;
    provincia?: string;
    citta?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function CercaPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const minRating = params.rating ? parseFloat(params.rating) : undefined;
  const sortBy = params.sort === 'rating' ? 'rating' : 'relevance';
  const page = params.page ? Math.max(1, parseInt(params.page, 10)) : 1;

  const [searchResult, categories] = await Promise.all([
    getPublicProfessionals({
      category: params.categoria,
      province: params.provincia,
      city: params.citta,
      minRating: Number.isFinite(minRating) ? minRating : undefined,
      sortBy,
      page,
    }),
    getPublicCategories(),
  ]);

  return (
    <SearchPageClient
      initialProfessionals={searchResult.results}
      total={searchResult.total}
      page={searchResult.page}
      totalPages={searchResult.totalPages}
      categories={categories}
      initialFilters={{
        category: params.categoria || '',
        province: params.provincia || '',
        city: params.citta || '',
        minRating: Number.isFinite(minRating) ? (minRating as number) : 0,
        sortBy,
      }}
    />
  );
}
