import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/layout/CookieBanner';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
    </>
  );
}
