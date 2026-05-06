import HeroSection from '@/components/home/HeroSection';
import TrustBar from '@/components/home/TrustBar';
import CategoriesSection from '@/components/home/CategoriesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import FeaturedProfessionals from '@/components/home/FeaturedProfessionals';
import StatsSection from '@/components/home/StatsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTAProfessionisti from '@/components/home/CTAProfessionisti';
import FAQSection from '@/components/home/FAQSection';
import FinalCTA from '@/components/home/FinalCTA';
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
    <>
      <HeroSection />
      <TrustBar />
      <CategoriesSection categories={categories} />
      <HowItWorksSection />
      <FeaturedProfessionals featured={featured} availableNow={availableNow} />
      <StatsSection />
      <TestimonialsSection />
      <CTAProfessionisti />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
