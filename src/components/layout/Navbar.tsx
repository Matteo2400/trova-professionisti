'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, ChevronDown } from 'lucide-react';
import { categories } from '@/data';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-zinc-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-primary flex items-center justify-center transition-all duration-300 group-hover:bg-dark">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-dark' : 'text-white'}`}>
              Trova<span className="text-primary">Pro</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink href="/cerca" scrolled={scrolled}>Cerca Professionisti</NavLink>
            <div className="relative group">
              <button className={`flex items-center gap-1 hover:text-primary transition-colors duration-200 text-sm font-medium ${scrolled ? 'text-zinc-600' : 'text-zinc-300'}`}>
                Categorie <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-zinc-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top">
                <div className="py-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/cerca?categoria=${cat.slug}`}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-primary transition-colors"
                    >
                      <span className="text-lg">{cat.slug === 'elettricista' ? '⚡' : cat.slug === 'idraulico' ? '💧' : '🎨'}</span>
                      {cat.namePlural}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <NavLink href="/come-funziona" scrolled={scrolled}>Come Funziona</NavLink>
            <NavLink href="/piani-premium" scrolled={scrolled}>Piani</NavLink>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/auth/login"
              className={`text-sm font-medium hover:text-primary transition-colors duration-200 ${scrolled ? 'text-zinc-600' : 'text-zinc-300'}`}
            >
              Accedi
            </Link>
            <Link href="/auth/registrazione" className="btn-primary text-sm !py-2.5 !px-6">
              Registrati Gratis
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 transition-colors ${scrolled ? 'text-dark' : 'text-white'}`}
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-white border-l border-zinc-200 z-50 lg:hidden"
          >
            <div className="p-6">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-zinc-100 transition-colors"
                aria-label="Chiudi menu"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mt-12 space-y-1">
                <MobileNavLink href="/cerca" onClick={() => setIsOpen(false)}>
                  Cerca Professionisti
                </MobileNavLink>
                {categories.map((cat) => (
                  <MobileNavLink
                    key={cat.slug}
                    href={`/cerca?categoria=${cat.slug}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {cat.slug === 'elettricista' ? '⚡' : cat.slug === 'idraulico' ? '💧' : '🎨'}{' '}
                    {cat.namePlural}
                  </MobileNavLink>
                ))}
                <MobileNavLink href="/come-funziona" onClick={() => setIsOpen(false)}>
                  Come Funziona
                </MobileNavLink>
                <MobileNavLink href="/piani-premium" onClick={() => setIsOpen(false)}>
                  Piani Premium
                </MobileNavLink>
                <MobileNavLink href="/faq" onClick={() => setIsOpen(false)}>
                  FAQ
                </MobileNavLink>

                <div className="pt-6 space-y-3">
                  <Link
                    href="/auth/login"
                    className="block w-full text-center py-3 border border-zinc-200 text-text font-medium hover:bg-zinc-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Accedi
                  </Link>
                  <Link
                    href="/auth/registrazione"
                    className="block w-full text-center btn-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Registrati Gratis
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({ href, children, scrolled }: { href: string; children: React.ReactNode; scrolled: boolean }) {
  return (
    <Link
      href={href}
      className={`relative text-sm font-medium hover:text-primary transition-colors duration-200 group ${scrolled ? 'text-zinc-600' : 'text-zinc-300'}`}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 text-zinc-600 hover:bg-zinc-50 hover:text-primary transition-colors text-base"
    >
      {children}
    </Link>
  );
}
