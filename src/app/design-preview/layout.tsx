import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  // Use the OpenType "ss01" stylistic set for a slightly more refined "a"
  axes: ['opsz'],
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Design Preview — TrovaPro',
  robots: { index: false, follow: false },
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${inter.variable} ${geistMono.variable}`}
      style={{
        fontFamily: 'var(--font-sans)',
        background: '#FFFFFF',
        color: '#0A0A0A',
        minHeight: '100vh',
        fontFeatureSettings: '"cv11", "ss03", "cv02"',
      }}
    >
      {children}
    </div>
  );
}
