import type { Metadata } from 'next';
import { Montserrat, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers/Providers';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'TrovaPro - Trova Professionisti Qualificati nella Tua Zona',
    template: '%s | TrovaPro',
  },
  description:
    'Trova elettricisti, idraulici e imbianchini qualificati vicino a te. Confronta profili, leggi recensioni e richiedi preventivi gratuiti.',
  keywords: ['professionisti', 'elettricista', 'idraulico', 'imbianchino', 'preventivo', 'riparazioni', 'casa', 'servizi'],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'TrovaPro',
    title: 'TrovaPro - Trova Professionisti Qualificati nella Tua Zona',
    description: 'Trova elettricisti, idraulici e imbianchini qualificati vicino a te. Confronta profili, leggi recensioni e richiedi preventivi gratuiti.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TrovaPro',
    url: 'https://www.trovapro.it',
    logo: 'https://www.trovapro.it/logo.png',
    sameAs: [],
    description: 'Piattaforma italiana per trovare professionisti qualificati: elettricisti, idraulici, imbianchini, muratori, fabbri e giardinieri.',
  };

  return (
    <html lang="it" className={`${montserrat.variable} ${geistMono.variable}`}>
      <body className="antialiased" style={{ fontFamily: 'var(--font-sans)' }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
