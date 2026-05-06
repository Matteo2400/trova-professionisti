import { ImageResponse } from 'next/og';
import { getPublicProfessionalBySlug } from '@/lib/professionals';

export const runtime = 'nodejs';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'TrovaPro — Profilo professionista';

export default async function OpengraphImage({ params }: { params: { slug: string } }) {
  const data = await getPublicProfessionalBySlug(params.slug);

  if (!data) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0F172A',
            color: '#fff',
            fontSize: 64,
            fontWeight: 700,
          }}
        >
          TrovaPro
        </div>
      ),
      size,
    );
  }

  const { professional } = data;
  const initials = `${professional.firstName[0]}${professional.lastName[0]}`;
  const stars = '★'.repeat(Math.round(professional.rating));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
          color: '#fff',
          padding: 80,
          fontFamily: 'system-ui',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
          <div
            style={{
              width: 48,
              height: 48,
              background: '#2563EB',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            ⚡
          </div>
          <span style={{ fontSize: 28, fontWeight: 700 }}>
            Trova<span style={{ color: '#60A5FA' }}>Pro</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginTop: 40 }}>
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: 24,
              background: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 72,
              fontWeight: 700,
            }}
          >
            {initials}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05 }}>
              {professional.firstName} {professional.lastName}
            </div>
            <div style={{ fontSize: 32, color: '#93C5FD', marginTop: 12, textTransform: 'capitalize' }}>
              {professional.category} · {professional.city}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', gap: 32, fontSize: 24 }}>
          {professional.reviewCount > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#FBBF24' }}>{stars}</span>
              <span>
                {professional.rating.toFixed(1)} · {professional.reviewCount} recensioni
              </span>
            </div>
          )}
          <div style={{ color: '#94A3B8' }}>
            {professional.yearsExperience} anni di esperienza
          </div>
        </div>
      </div>
    ),
    size,
  );
}
