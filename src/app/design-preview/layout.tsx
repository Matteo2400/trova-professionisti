import type { Metadata } from 'next';
import { Montserrat, Geist_Mono } from 'next/font/google';

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
  title: 'Design Preview — TrovaPro',
  robots: { index: false, follow: false },
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${montserrat.variable} ${geistMono.variable}`}
      style={{
        fontFamily: 'var(--font-sans)',
        background: '#050505',
        color: '#FFFFFF',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
}
