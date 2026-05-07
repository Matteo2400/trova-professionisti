'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, ChevronDown, ArrowRight } from 'lucide-react';
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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(5,5,5,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'white' }}>
              <Zap className="w-3.5 h-3.5" style={{ color: '#050505' }} strokeWidth={2.5} />
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-white" style={{ letterSpacing: '-0.01em' }}>
              trovapro
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7 text-sm" style={{ color: '#888' }}>
            <Link href="/cerca" className="hover:text-white transition-colors">Cerca</Link>
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-white transition-colors">
                Categorie <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl glass-emboss opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                <div className="py-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/cerca?categoria=${cat.slug}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                      style={{ color: 'rgba(255,255,255,0.85)' }}
                    >
                      {cat.namePlural}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/come-funziona" className="hover:text-white transition-colors">Come funziona</Link>
            <Link href="/come-funziona-professionisti" className="hover:text-white transition-colors">Per professionisti</Link>
            <Link href="/piani-premium" className="hover:text-white transition-colors">Prezzi</Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/auth/login"
              className="text-sm px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors"
              style={{ color: '#ccc' }}
            >
              Accedi
            </Link>
            <Link
              href="/auth/registrazione"
              className="text-sm font-semibold px-3.5 py-1.5 rounded-md transition-all hover:opacity-90 flex items-center gap-1"
              style={{ background: 'white', color: '#050505' }}
            >
              Inizia <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t"
            style={{
              background: 'rgba(5,5,5,0.95)',
              backdropFilter: 'blur(20px)',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <div className="max-w-[1280px] mx-auto px-6 py-6 space-y-1">
              <MobileLink href="/cerca" onClick={() => setIsOpen(false)}>Cerca</MobileLink>
              {categories.map((cat) => (
                <MobileLink
                  key={cat.slug}
                  href={`/cerca?categoria=${cat.slug}`}
                  onClick={() => setIsOpen(false)}
                  indent
                >
                  {cat.namePlural}
                </MobileLink>
              ))}
              <MobileLink href="/come-funziona" onClick={() => setIsOpen(false)}>Come funziona</MobileLink>
              <MobileLink href="/come-funziona-professionisti" onClick={() => setIsOpen(false)}>Per professionisti</MobileLink>
              <MobileLink href="/piani-premium" onClick={() => setIsOpen(false)}>Prezzi</MobileLink>

              <div className="pt-4 mt-4 border-t space-y-2" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3 rounded-xl text-sm font-medium border transition-colors"
                  style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'white' }}
                >
                  Accedi
                </Link>
                <Link
                  href="/auth/registrazione"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3 rounded-xl text-sm font-semibold"
                  style={{ background: 'white', color: '#050505' }}
                >
                  Registrati Gratis
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function MobileLink({ href, onClick, children, indent = false }: { href: string; onClick: () => void; children: React.ReactNode; indent?: boolean }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block py-2.5 text-base transition-colors hover:text-white ${indent ? 'pl-4 text-sm' : ''}`}
      style={{ color: indent ? '#888' : '#ccc' }}
    >
      {children}
    </Link>
  );
}
