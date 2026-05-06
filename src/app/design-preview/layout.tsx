import type { Metadata } from 'next';
import { Inter, Fraunces, Geist_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  axes: ['SOFT', 'WONK', 'opsz'],
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
      className={`${inter.variable} ${fraunces.variable} ${geistMono.variable}`}
      style={{
        fontFamily: 'var(--font-body)',
        background: '#FAF8F3',
        color: '#1A1410',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
}
