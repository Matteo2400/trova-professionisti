import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProfilePageClient from '@/components/professional/ProfilePageClient';
import { getPublicProfessionalBySlug } from '@/lib/professionals';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXTAUTH_URL || 'https://www.trovapro.it';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPublicProfessionalBySlug(slug);
  if (!data) return { title: 'Professionista non trovato' };
  const { professional } = data;
  const cat = professional.category.charAt(0).toUpperCase() + professional.category.slice(1);
  const title = `${professional.firstName} ${professional.lastName} - ${cat} a ${professional.city}`;
  const description = professional.description.slice(0, 160);
  return {
    title,
    description,
    alternates: { canonical: `/professionista/${professional.slug}` },
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `${BASE_URL}/professionista/${professional.slug}`,
      images: professional.profileImage ? [{ url: professional.profileImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ProfessionalProfilePage({ params }: Props) {
  const { slug } = await params;
  const data = await getPublicProfessionalBySlug(slug, { trackView: true, viewSource: 'direct' });
  if (!data) notFound();

  const { professional, reviews } = data;

  const ldjson = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/professionista/${professional.slug}`,
    name: `${professional.firstName} ${professional.lastName}`,
    description: professional.description,
    url: `${BASE_URL}/professionista/${professional.slug}`,
    telephone: professional.phone || undefined,
    email: professional.email || undefined,
    image: professional.profileImage || undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: professional.city,
      addressRegion: professional.province,
      addressCountry: 'IT',
    },
    geo: professional.latitude && professional.longitude
      ? {
          '@type': 'GeoCoordinates',
          latitude: professional.latitude,
          longitude: professional.longitude,
        }
      : undefined,
    aggregateRating: professional.reviewCount > 0
      ? {
          '@type': 'AggregateRating',
          ratingValue: professional.rating,
          reviewCount: professional.reviewCount,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
    review: reviews.slice(0, 10).map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.authorName },
      datePublished: r.date,
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.comment,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldjson) }}
      />
      <ProfilePageClient professional={professional} reviews={reviews} />
    </>
  );
}
