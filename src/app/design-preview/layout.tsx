import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
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
      className={`${geist.variable} ${geistMono.variable}`}
      style={{
        fontFamily: 'var(--font-sans)',
        background: '#FFFFFF',
        color: '#0A0A0A',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
}
