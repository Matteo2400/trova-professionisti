import Link from 'next/link';
import { Twitter, Instagram, Linkedin, Mail, Globe, Zap, ArrowRight } from 'lucide-react';

const COLUMNS = [
  { title: 'Prodotto', links: [
    { label: 'Cerca professionisti', href: '/cerca' },
    { label: 'Categorie', href: '/cerca' },
    { label: 'Come funziona', href: '/come-funziona' },
    { label: 'FAQ', href: '/faq' },
  ]},
  { title: 'Per professionisti', links: [
    { label: 'Iscriviti', href: '/auth/registrazione' },
    { label: 'Piani e prezzi', href: '/piani-premium' },
    { label: 'Come funziona', href: '/come-funziona-professionisti' },
    { label: 'Login', href: '/auth/login' },
  ]},
  { title: 'Azienda', links: [
    { label: 'Chi siamo', href: '/chi-siamo' },
    { label: 'Contatti', href: '/contatti' },
    { label: 'FAQ', href: '/faq' },
  ]},
  { title: 'Legale', links: [
    { label: 'Termini', href: '/termini' },
    { label: 'Privacy', href: '/privacy' },
  ]},
];

export default function Footer() {
  return (
    <footer style={{ background: '#000' }}>
      <div className="max-w-[1280px] mx-auto px-6 pt-20 pb-12">
        {/* Newsletter */}
        <div
          className="rounded-2xl p-8 lg:p-12 mb-16 grid md:grid-cols-[1.4fr_1fr] gap-8 items-center"
          style={{ background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div>
            <h3 className="text-2xl tracking-[-0.02em] font-bold mb-2 text-white">
              La newsletter dei professionisti.
            </h3>
            <p className="text-sm" style={{ color: '#888' }}>
              Ogni 2 settimane: novità, consigli, casi studio. Niente spam, cancellazione in 1 click.
            </p>
          </div>
          <form className="flex items-center gap-2">
            <div
              className="flex-1 rounded-lg p-1 flex items-center"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <Mail className="w-4 h-4 ml-2 mr-2 flex-shrink-0" style={{ color: '#888' }} />
              <input
                type="email"
                placeholder="tu@email.it"
                className="bg-transparent outline-none text-sm flex-1 py-2 text-white placeholder:text-[#555]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-all hover:opacity-90"
              style={{ background: '#0070F3', color: 'white' }}
            >
              Iscriviti <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Columns */}
        <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-12 mb-16">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'white' }}>
                <Zap className="w-3.5 h-3.5" style={{ color: '#050505' }} strokeWidth={2.5} />
              </div>
              <span className="text-[15px] font-bold tracking-tight text-white" style={{ letterSpacing: '-0.01em' }}>
                trovapro
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#888' }}>
              Il modo più semplice di trovare professionisti qualificati nella tua zona. Verificati, valutati, pronti a partire.
            </p>
            <div className="flex items-center gap-2">
              {[Twitter, Instagram, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#B5B5B5' }}
                  aria-label="Social"
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4
                className="text-xs uppercase tracking-[0.15em] mb-4 text-white font-bold"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm hover:text-white transition-colors" style={{ color: '#888' }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          className="flex items-center justify-between flex-wrap gap-4 pt-8 border-t text-xs"
          style={{ borderColor: 'rgba(255,255,255,0.08)', color: '#888' }}
        >
          <span style={{ fontFamily: 'var(--font-mono)' }}>© 2026 TrovaPro · P.IVA 12345678901</span>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3 h-3" /> Italia (IT)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: '#22C55E' }} />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
