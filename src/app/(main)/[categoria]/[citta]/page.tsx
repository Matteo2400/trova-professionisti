import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, MapPin } from 'lucide-react';
import ProfessionalCard from '@/components/ui/ProfessionalCard';
import { prisma } from '@/lib/prisma';
import { getPublicProfessionals } from '@/lib/professionals';
import { italianRegions } from '@/data';

interface PageProps {
  params: Promise<{ categoria: string; citta: string }>;
}

// Use ISR + dynamic rendering on first request (avoids exhausting Neon's
// 3-connection pool during build with many parallel category/city queries).
export const dynamic = 'force-dynamic';
export const revalidate = 3600;

function denormalize(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

async function resolveCategory(pluralSlug: string) {
  const target = pluralSlug.toLowerCase();
  return prisma.category.findFirst({
    where: {
      OR: [
        { namePlural: { equals: denormalize(target) } },
        { slug: { equals: target.replace(/i$/, 'a').replace(/o$/, 'o') } },
      ],
      isActive: true,
    },
  });
}

function resolveCity(citySlug: string): string | null {
  const slug = citySlug.toLowerCase();
  for (const region of Object.values(italianRegions)) {
    for (const city of region.cities) {
      if (city.toLowerCase().replace(/\s+/g, '-') === slug) return city;
    }
  }
  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria, citta } = await params;
  const cat = await resolveCategory(categoria);
  const cityName = resolveCity(citta);
  if (!cat || !cityName) return { title: 'Pagina non trovata' };

  return {
    title: `${cat.namePlural} a ${cityName} — Trova un professionista qualificato`,
    description: `${cat.namePlural} a ${cityName}: confronta profili, leggi recensioni e richiedi preventivi gratuiti. Tutti i professionisti sono verificati.`,
    alternates: {
      canonical: `/${categoria}/${citta}`,
    },
    openGraph: {
      title: `${cat.namePlural} a ${cityName}`,
      description: `Trova ${cat.namePlural.toLowerCase()} qualificati a ${cityName} su TrovaPro.`,
      type: 'website',
    },
  };
}

export default async function CategoryCityPage({ params }: PageProps) {
  const { categoria, citta } = await params;
  const cat = await resolveCategory(categoria);
  const cityName = resolveCity(citta);

  if (!cat || !cityName) notFound();

  const { results } = await getPublicProfessionals({
    category: cat.slug,
    city: cityName,
    pageSize: 30,
  });

  const ldjson = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${cat.namePlural} a ${cityName}`,
    description: `${cat.namePlural} qualificati a ${cityName}.`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: results.length,
      itemListElement: results.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'LocalBusiness',
          name: `${p.firstName} ${p.lastName}`,
          url: `https://www.trovapro.it/professionista/${p.slug}`,
          aggregateRating: p.reviewCount > 0
            ? {
                '@type': 'AggregateRating',
                ratingValue: p.rating,
                reviewCount: p.reviewCount,
              }
            : undefined,
        },
      })),
    },
  };

  return (
    <div className="pt-20 min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldjson) }}
      />

      <div className="bg-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-zinc-500 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/cerca?categoria=${cat.slug}`} className="hover:text-white">{cat.namePlural}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{cityName}</span>
          </nav>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-3">
            {cat.namePlural} a <span className="text-primary">{cityName}</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl">
            {results.length === 0
              ? `Stiamo lavorando per portare nuovi ${cat.namePlural.toLowerCase()} a ${cityName}. Iscriviti per essere avvisato quando saranno disponibili.`
              : `Confronta ${results.length} ${cat.namePlural.toLowerCase()} verificati a ${cityName} e richiedi preventivi gratuiti.`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {results.length === 0 ? (
          <div className="text-center py-20 border border-zinc-200">
            <MapPin className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <h2 className="text-lg font-bold mb-2">Nessun {cat.name.toLowerCase()} ancora a {cityName}</h2>
            <p className="text-text-secondary text-sm mb-6">
              Prova ad allargare la ricerca o usa la pagina di ricerca avanzata.
            </p>
            <Link href="/cerca" className="btn-primary inline-flex items-center gap-2">
              Cerca tutti i professionisti
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {results.map((pro) => (
              <ProfessionalCard key={pro.id} professional={pro} />
            ))}
          </div>
        )}

        <div className="mt-16 prose max-w-none">
          <h2 className="text-2xl font-bold mb-4">Come scegliere un {cat.name.toLowerCase()} a {cityName}</h2>
          <p className="text-text-secondary leading-relaxed">
            Trovare un {cat.name.toLowerCase()} affidabile a {cityName} è semplice con TrovaPro: confronta i profili,
            leggi le recensioni verificate dei clienti precedenti e richiedi preventivi gratuiti senza impegno.
            Tutti i nostri professionisti sono verificati e dispongono di partita IVA, garanzia di un servizio
            professionale e assicurato.
          </p>
        </div>
      </div>
    </div>
  );
}
