import HomePageClient from '@/components/home/HomePageClient';
import {
  getAvailableProfessionalsCount,
  getFeaturedProfessionals,
  getPublicCategories,
} from '@/lib/professionals';

export const revalidate = 60;

export default async function HomePage() {
  const [featured, categories, availableNow] = await Promise.all([
    getFeaturedProfessionals(3),
    getPublicCategories(),
    getAvailableProfessionalsCount(),
  ]);

  return (
    <HomePageClient
      featured={featured}
      categories={categories}
      availableNow={availableNow}
    />
  );
}
