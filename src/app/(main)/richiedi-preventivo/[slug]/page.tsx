import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import QuoteFormClient from '@/components/forms/QuoteFormClient';
import { getPublicProfessionalBySlug } from '@/lib/professionals';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPublicProfessionalBySlug(slug);
  if (!data) return { title: 'Professionista non trovato' };
  const { professional } = data;
  return {
    title: `Richiedi Preventivo - ${professional.firstName} ${professional.lastName}`,
    description: `Richiedi un preventivo gratuito a ${professional.firstName} ${professional.lastName}, ${professional.category} a ${professional.city}.`,
  };
}

export default async function QuoteRequestPage({ params }: Props) {
  const { slug } = await params;
  const data = await getPublicProfessionalBySlug(slug);
  if (!data) notFound();
  return <QuoteFormClient professional={data.professional} />;
}
