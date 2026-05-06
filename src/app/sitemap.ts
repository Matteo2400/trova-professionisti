import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { italianRegions } from '@/data';

const BASE_URL = process.env.NEXTAUTH_URL || 'https://www.trovapro.it';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    '',
    '/cerca',
    '/chi-siamo',
    '/come-funziona',
    '/come-funziona-professionisti',
    '/contatti',
    '/faq',
    '/piani-premium',
    '/privacy',
    '/termini',
    '/auth/login',
    '/auth/registrazione',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));

  // Professional profiles (only approved, non-suspended).
  const pros = await prisma.professional.findMany({
    where: { isApproved: true, isSuspended: false },
    select: { slug: true, updatedAt: true, plan: true },
    orderBy: { updatedAt: 'desc' },
    take: 5000,
  });

  const proEntries: MetadataRoute.Sitemap = pros.map((p) => ({
    url: `${BASE_URL}/professionista/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'weekly',
    priority: p.plan === 'premium' ? 0.9 : p.plan === 'pro' ? 0.8 : 0.6,
  }));

  // Top category × city combinations.
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    select: { namePlural: true },
  });
  const topCities = ['roma', 'milano', 'napoli', 'torino', 'palermo', 'genova', 'bologna', 'firenze', 'bari', 'catania', 'venezia', 'verona', 'padova', 'brescia'];

  const seoEntries: MetadataRoute.Sitemap = [];
  for (const cat of categories) {
    for (const city of topCities) {
      seoEntries.push({
        url: `${BASE_URL}/${cat.namePlural.toLowerCase()}/${city}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    }
  }

  return [...staticEntries, ...proEntries, ...seoEntries];
}

// Eslint hint: italianRegions is used implicitly to keep parity with route logic
void italianRegions;
