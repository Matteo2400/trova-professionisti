import Link from 'next/link';
import { Search, MapPin, Star, Shield, Clock, CheckCircle2, Sparkles, ArrowRight, Zap, Award } from 'lucide-react';

const PALETTE = [
  { name: 'Brand', token: '#E0531C', subtitle: 'Arancione bruciato' },
  { name: 'Background', token: '#FAF8F3', subtitle: 'Bianco caldo' },
  { name: 'Ink', token: '#1A1410', subtitle: 'Nero caldo' },
  { name: 'Subtle', token: '#7A6E63', subtitle: 'Testo secondario' },
  { name: 'Verified', token: '#5D6B47', subtitle: 'Verde verifica' },
  { name: 'Premium', token: '#C8A951', subtitle: 'Oro antico' },
  { name: 'Stone', token: '#E8E0D5', subtitle: 'Bordi caldi' },
];

const FEATURED_PROS = [
  {
    name: 'Mario Rossi',
    category: 'Elettricista',
    city: 'Roma',
    rating: 4.9,
    reviews: 127,
    price: 'da €45/h',
    distance: '2,1 km',
    available: true,
    verified: true,
    plan: 'premium' as const,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces',
    work: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
  },
  {
    name: 'Giuseppe Verdi',
    category: 'Imbianchino',
    city: 'Torino',
    rating: 5.0,
    reviews: 89,
    price: 'da €30/h',
    distance: '4,8 km',
    available: true,
    verified: true,
    plan: 'pro' as const,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces',
    work: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=400&fit=crop',
  },
  {
    name: 'Luigi Bianchi',
    category: 'Idraulico',
    city: 'Milano',
    rating: 4.8,
    reviews: 213,
    price: 'da €40/h',
    distance: '1,3 km',
    available: false,
    verified: true,
    plan: 'pro' as const,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
    work: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=400&fit=crop',
  },
];

const ink = '#1A1410';
const subtle = '#7A6E63';
const brand = '#E0531C';
const verified = '#5D6B47';
const premium = '#C8A951';
const stone = '#E8E0D5';

export default function DesignPreviewPage() {
  return (
    <main>
      {/* ───────────────── Top notice bar ───────────────── */}
      <div style={{ background: ink, color: '#FAF8F3' }} className="text-xs">
        <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between">
          <span style={{ fontFamily: 'var(--font-mono)' }} className="opacity-70">
            DESIGN PREVIEW · v0.1
          </span>
          <Link href="/" className="opacity-70 hover:opacity-100 transition-opacity">
            ← Torna al sito attuale
          </Link>
        </div>
      </div>

      {/* ───────────────── Navbar ───────────────── */}
      <header className="border-b" style={{ borderColor: stone, background: 'rgba(250,248,243,0.85)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: brand }}>
              <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl tracking-tight" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              TrovaPro
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: subtle }}>
            <a href="#" className="hover:text-[var(--ink)]" style={{ ['--ink' as string]: ink }}>Cerca</a>
            <a href="#" className="hover:text-[var(--ink)]" style={{ ['--ink' as string]: ink }}>Categorie</a>
            <a href="#" className="hover:text-[var(--ink)]" style={{ ['--ink' as string]: ink }}>Come funziona</a>
            <a href="#" className="hover:text-[var(--ink)]" style={{ ['--ink' as string]: ink }}>Per professionisti</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#" className="text-sm" style={{ color: subtle }}>Accedi</a>
            <button
              className="px-4 py-2 text-sm font-medium rounded-lg transition-all hover:opacity-90"
              style={{ background: ink, color: '#FAF8F3' }}
            >
              Registrati
            </button>
          </div>
        </div>
      </header>

      {/* ───────────────── Hero ───────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse at top right, ${brand}15 0%, transparent 50%), radial-gradient(ellipse at bottom left, ${premium}10 0%, transparent 50%)`,
        }} />
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-32 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-8 border"
                style={{ background: '#fff', borderColor: stone, color: subtle, fontFamily: 'var(--font-mono)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: verified }} />
                3.142 PREVENTIVI QUESTA SETTIMANA
              </span>

              <h1
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.03em' }}
                className="text-6xl lg:text-7xl mb-6"
              >
                Trova il <em style={{ color: brand, fontStyle: 'italic' }}>professionista</em>
                <br /> giusto per casa tua.
              </h1>

              <p className="text-lg mb-10 leading-relaxed max-w-md" style={{ color: subtle }}>
                Elettricisti, idraulici e artigiani verificati nella tua zona.
                Confronta preventivi gratuiti in pochi minuti.
              </p>

              {/* Search bar */}
              <div className="bg-white rounded-2xl p-2 shadow-[0_4px_24px_rgba(26,20,16,0.08)] border" style={{ borderColor: stone }}>
                <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-2">
                  <div className="flex items-center gap-3 px-4 py-3 sm:border-r" style={{ borderColor: stone }}>
                    <Search className="w-4 h-4 flex-shrink-0" style={{ color: subtle }} />
                    <input
                      placeholder="Di cosa hai bisogno?"
                      className="bg-transparent outline-none text-sm w-full"
                      style={{ color: ink }}
                    />
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: subtle }} />
                    <input
                      placeholder="La tua città"
                      className="bg-transparent outline-none text-sm w-full"
                      style={{ color: ink }}
                    />
                  </div>
                  <button
                    className="rounded-xl px-6 py-3 text-sm font-medium transition-all hover:opacity-95 flex items-center gap-2"
                    style={{ background: brand, color: '#fff' }}
                  >
                    Cerca <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-3 mt-10 text-xs" style={{ color: subtle, fontFamily: 'var(--font-mono)' }}>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5" style={{ color: verified }} /> Gratuito</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5" style={{ color: verified }} /> P.IVA verificate</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5" style={{ color: verified }} /> Risposta in &lt; 2h</span>
              </div>
            </div>

            {/* Right side — visual */}
            <div className="hidden lg:block relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden" style={{ background: stone }}>
                <img
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=1000&fit=crop"
                  alt=""
                  className="w-full h-full object-cover"
                />
                {/* Floating card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white rounded-2xl p-4 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=faces"
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="font-medium text-sm truncate" style={{ color: ink }}>Mario Rossi</p>
                        <Shield className="w-3.5 h-3.5" style={{ color: verified }} fill={verified} />
                      </div>
                      <p className="text-xs" style={{ color: subtle }}>Elettricista · Roma</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                        <Star className="w-3 h-3" fill={premium} stroke={premium} />
                        <span style={{ color: ink }}>4.9</span>
                        <span style={{ color: subtle }}>(127)</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: stone, color: subtle }}>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: verified }} />
                      Disponibile oggi
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>2,1 km · da €45/h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── Trust strip ───────────────── */}
      <section className="border-y" style={{ borderColor: stone, background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '12.847', label: 'Lavori completati', icon: CheckCircle2 },
              { value: '4.8', label: 'Valutazione media', icon: Star },
              { value: '< 2h', label: 'Tempo di risposta', icon: Clock },
              { value: '98%', label: 'Tasso di completamento', icon: Sparkles },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i}>
                  <Icon className="w-5 h-5 mx-auto mb-3" style={{ color: brand }} />
                  <div
                    className="text-3xl mb-1"
                    style={{ fontFamily: 'var(--font-mono)', color: ink, fontWeight: 500 }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: subtle }}>
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────── Featured pros ───────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <div>
            <span className="text-xs tracking-widest uppercase block mb-3" style={{ color: brand, fontFamily: 'var(--font-mono)' }}>
              In evidenza
            </span>
            <h2
              className="text-4xl lg:text-5xl tracking-tight"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400, lineHeight: 1, letterSpacing: '-0.02em' }}
            >
              Professionisti{' '}
              <em style={{ fontStyle: 'italic', color: brand }}>scelti</em> per te
            </h2>
          </div>
          <a href="#" className="text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all" style={{ color: ink }}>
            Vedi tutti <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {FEATURED_PROS.map((p, i) => (
            <article
              key={i}
              className="group bg-white rounded-2xl overflow-hidden border transition-all hover:shadow-[0_12px_32px_rgba(26,20,16,0.1)] hover:-translate-y-1 cursor-pointer"
              style={{ borderColor: stone }}
            >
              {/* Cover */}
              <div className="relative aspect-[4/3] overflow-hidden" style={{ background: stone }}>
                <img
                  src={p.work}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {p.plan === 'premium' && (
                    <span
                      className="px-2 py-1 rounded text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1"
                      style={{ background: premium, color: '#fff', fontFamily: 'var(--font-mono)' }}
                    >
                      <Award className="w-3 h-3" /> Premium
                    </span>
                  )}
                  {p.available && (
                    <span
                      className="px-2 py-1 rounded text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1.5 bg-white/95"
                      style={{ color: verified, fontFamily: 'var(--font-mono)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: verified }} />
                      Oggi
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-start gap-3 mb-4">
                  <img src={p.avatar} alt="" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-semibold truncate" style={{ color: ink, fontFamily: 'var(--font-display)' }}>
                        {p.name}
                      </h3>
                      {p.verified && <Shield className="w-3.5 h-3.5 flex-shrink-0" style={{ color: verified }} fill={verified} />}
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: subtle }}>
                      {p.category} · {p.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-3 border-t" style={{ borderColor: stone }}>
                  <span className="flex items-center gap-1" style={{ fontFamily: 'var(--font-mono)' }}>
                    <Star className="w-3.5 h-3.5" fill={premium} stroke={premium} />
                    <strong style={{ color: ink, fontWeight: 500 }}>{p.rating}</strong>
                    <span style={{ color: subtle }}>({p.reviews})</span>
                  </span>
                  <span style={{ color: subtle, fontFamily: 'var(--font-mono)' }}>
                    {p.distance} · {p.price}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ───────────────── Design system reference ───────────────── */}
      <section className="border-t py-24" style={{ borderColor: stone, background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs tracking-widest uppercase block mb-3" style={{ color: brand, fontFamily: 'var(--font-mono)' }}>
            Design system
          </span>
          <h2
            className="text-4xl mb-12 tracking-tight"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 400, letterSpacing: '-0.02em' }}
          >
            La <em style={{ fontStyle: 'italic', color: brand }}>grammatica</em> visiva
          </h2>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Palette */}
            <div>
              <h3 className="text-xs uppercase tracking-widest mb-6" style={{ color: subtle, fontFamily: 'var(--font-mono)' }}>
                Palette
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {PALETTE.map((p) => (
                  <div key={p.name} className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg border flex-shrink-0"
                      style={{ background: p.token, borderColor: stone }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: ink }}>{p.name}</p>
                      <p className="text-xs truncate" style={{ color: subtle, fontFamily: 'var(--font-mono)' }}>
                        {p.token}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div>
              <h3 className="text-xs uppercase tracking-widest mb-6" style={{ color: subtle, fontFamily: 'var(--font-mono)' }}>
                Tipografia
              </h3>
              <div className="space-y-6">
                <div className="border-b pb-6" style={{ borderColor: stone }}>
                  <p className="text-xs mb-2" style={{ color: subtle, fontFamily: 'var(--font-mono)' }}>
                    Display — Fraunces
                  </p>
                  <p
                    className="text-4xl tracking-tight"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 400, letterSpacing: '-0.02em' }}
                  >
                    Trova il <em style={{ fontStyle: 'italic', color: brand }}>professionista</em>
                  </p>
                </div>
                <div className="border-b pb-6" style={{ borderColor: stone }}>
                  <p className="text-xs mb-2" style={{ color: subtle, fontFamily: 'var(--font-mono)' }}>
                    Body — Inter
                  </p>
                  <p className="text-base leading-relaxed" style={{ color: ink }}>
                    Elettricisti, idraulici e artigiani verificati nella tua zona.
                    Confronta preventivi gratuiti in pochi minuti.
                  </p>
                </div>
                <div>
                  <p className="text-xs mb-2" style={{ color: subtle, fontFamily: 'var(--font-mono)' }}>
                    Mono — Geist Mono (numeri, dati, label)
                  </p>
                  <p className="text-2xl" style={{ fontFamily: 'var(--font-mono)', color: ink, fontWeight: 500 }}>
                    €45/h · 4.9★ · 2,1 km
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-16">
            <h3 className="text-xs uppercase tracking-widest mb-6" style={{ color: subtle, fontFamily: 'var(--font-mono)' }}>
              Bottoni
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                className="px-5 py-3 rounded-lg text-sm font-medium transition-all hover:opacity-95"
                style={{ background: brand, color: '#fff' }}
              >
                Primario
              </button>
              <button
                className="px-5 py-3 rounded-lg text-sm font-medium transition-all hover:opacity-90"
                style={{ background: ink, color: '#FAF8F3' }}
              >
                Secondario
              </button>
              <button
                className="px-5 py-3 rounded-lg text-sm font-medium transition-all border hover:bg-white"
                style={{ borderColor: stone, color: ink, background: 'transparent' }}
              >
                Outline
              </button>
              <button
                className="px-5 py-3 rounded-lg text-sm font-medium flex items-center gap-2 transition-all"
                style={{ color: brand, background: 'transparent' }}
              >
                Ghost <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── Footer note ───────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <p className="text-sm mb-4" style={{ color: subtle }}>
          Ti piace? Procedo con lo Step 2 e applico questo design a home, ricerca e profilo.
        </p>
        <Link href="/" className="text-sm underline" style={{ color: ink }}>
          Confronta con il sito attuale →
        </Link>
      </section>
    </main>
  );
}
