import Link from 'next/link';
import {
  Search, MapPin, Star, Shield, ArrowRight, ArrowUpRight, Check,
  Zap, Sparkles, MessageSquare, Lock, BadgeCheck, Bolt,
} from 'lucide-react';

const ink = '#0A0A0A';
const subtle = '#737373';
const fade = '#A3A3A3';
const border = '#EDEDED';
const accent = '#0070F3';
const success = '#0F8A5F';
const dark = '#050505';

const FEATURED = [
  { name: 'Mario Rossi', category: 'Elettricista', city: 'Roma', rating: 4.9, reviews: 127, price: '€45/h', distance: '2.1 km', available: true, plan: 'premium' as const, completedJobs: 312 },
  { name: 'Giuseppe Verdi', category: 'Imbianchino', city: 'Torino', rating: 5.0, reviews: 89, price: '€30/h', distance: '4.8 km', available: true, plan: 'pro' as const, completedJobs: 178 },
  { name: 'Luigi Bianchi', category: 'Idraulico', city: 'Milano', rating: 4.8, reviews: 213, price: '€40/h', distance: '1.3 km', available: false, plan: 'pro' as const, completedJobs: 421 },
];

export default function DesignPreviewPage() {
  return (
    <main>
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .glow-card {
          position: relative;
          isolation: isolate;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease;
        }
        .glow-card::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, transparent 30%, rgba(0, 112, 243, 0.5) 50%, transparent 70%);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .glow-card:hover { transform: translateY(-4px); box-shadow: 0 30px 60px -20px rgba(0, 112, 243, 0.25), 0 0 60px -10px rgba(0, 112, 243, 0.15); }
        .glow-card:hover::before { opacity: 1; }
        .premium-glow { box-shadow: 0 0 0 1px rgba(0,112,243,0.18), 0 8px 32px -8px rgba(0,112,243,0.12); }
        .aurora {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .aurora::before, .aurora::after {
          content: "";
          position: absolute;
          width: 800px;
          height: 800px;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.45;
        }
        .aurora::before { background: radial-gradient(circle, #0070F3 0%, transparent 50%); top: -300px; left: -200px; }
        .aurora::after  { background: radial-gradient(circle, #7B61FF 0%, transparent 50%); top: -200px; right: -300px; }
        .grid-bg {
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 80% 50% at 50% 30%, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 80% 50% at 50% 30%, black 30%, transparent 80%);
        }
        .gradient-text {
          background: linear-gradient(180deg, #FFFFFF 0%, #888 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .accent-text {
          background: linear-gradient(90deg, #7B61FF 0%, #0070F3 50%, #00D4FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .number-xl { font-feature-settings: "tnum"; letter-spacing: -0.06em; }
        .pulse-dot { animation: pulse-glow 2s ease-in-out infinite; }
        .conic-border {
          position: relative;
          background: white;
          border-radius: 16px;
        }
        .conic-border::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: conic-gradient(from 0deg, transparent 0%, rgba(0,112,243,0.4) 25%, transparent 50%, rgba(123,97,255,0.4) 75%, transparent 100%);
          animation: spin-slow 8s linear infinite;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>

      {/* ───────── Notice ───────── */}
      <div style={{ background: dark, color: '#999' }} className="text-xs">
        <div className="max-w-[1280px] mx-auto px-6 py-2 flex items-center justify-between">
          <span style={{ fontFamily: 'var(--font-mono)' }}>DESIGN PREVIEW · v0.3 · WOW</span>
          <Link href="/" className="hover:text-white transition-colors">← Sito attuale</Link>
        </div>
      </div>

      {/* ───────── Dark Hero ───────── */}
      <section className="relative overflow-hidden" style={{ background: dark }}>
        <div className="aurora" />
        <div className="absolute inset-0 grid-bg" />

        {/* Navbar */}
        <header className="relative z-10 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="max-w-[1280px] mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'white' }}>
                  <Zap className="w-3.5 h-3.5" style={{ color: dark }} strokeWidth={2.5} />
                </div>
                <span className="text-[15px] font-semibold tracking-tight text-white" style={{ letterSpacing: '-0.01em' }}>
                  trovapro
                </span>
              </div>
              <nav className="hidden md:flex items-center gap-6 text-sm" style={{ color: '#999' }}>
                <a className="hover:text-white transition-colors" href="#">Cerca</a>
                <a className="hover:text-white transition-colors" href="#">Categorie</a>
                <a className="hover:text-white transition-colors" href="#">Per professionisti</a>
                <a className="hover:text-white transition-colors" href="#">Prezzi</a>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <a className="text-sm px-3 py-1.5 rounded-md transition-colors hover:bg-white/5" style={{ color: '#ccc' }} href="#">Accedi</a>
              <button className="text-sm font-medium px-3.5 py-1.5 rounded-md transition-all hover:opacity-90 flex items-center gap-1" style={{ background: 'white', color: dark }}>
                Inizia <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </header>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-32 pb-40">
          {/* Pill */}
          <div className="flex justify-center mb-12">
            <a href="#" className="conic-border inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold" style={{ background: accent, color: 'white', fontFamily: 'var(--font-mono)' }}>NEW</span>
              <span className="text-white/80">Pagamenti garantiti via Stripe</span>
              <ArrowRight className="w-3 h-3 text-white/50" />
            </a>
          </div>

          {/* Headline */}
          <h1 className="text-center font-medium tracking-[-0.05em] mx-auto max-w-5xl" style={{ fontSize: 'clamp(56px, 9vw, 112px)', lineHeight: 0.92 }}>
            <span className="gradient-text">Trovare un professionista,</span>
            <br />
            <span className="accent-text">finalmente semplice.</span>
          </h1>

          <p className="text-center mt-8 max-w-xl mx-auto text-[17px] leading-relaxed" style={{ color: '#999' }}>
            Confronta professionisti verificati nella tua zona, leggi le recensioni
            e ricevi preventivi gratuiti in poche ore.
          </p>

          {/* Search */}
          <div className="mt-14 max-w-2xl mx-auto relative">
            <div className="absolute inset-0 -z-10 rounded-2xl" style={{ background: `radial-gradient(50% 50% at 50% 50%, ${accent}30, transparent 70%)`, filter: 'blur(40px)' }} />
            <div className="rounded-2xl p-1.5 flex items-center gap-1 backdrop-blur-xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex items-center gap-2.5 px-3.5 flex-1 min-w-0">
                <Search className="w-4 h-4 flex-shrink-0" style={{ color: '#999' }} />
                <input placeholder="Elettricista, idraulico…" className="bg-transparent outline-none text-sm w-full text-white placeholder:text-white/40" />
              </div>
              <div className="w-px self-stretch my-2" style={{ background: 'rgba(255,255,255,0.1)' }} />
              <div className="flex items-center gap-2.5 px-3.5 flex-1 min-w-0">
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#999' }} />
                <input placeholder="La tua città" className="bg-transparent outline-none text-sm w-full text-white placeholder:text-white/40" />
              </div>
              <button className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 flex-shrink-0 hover:opacity-90" style={{ background: 'white', color: dark }}>
                Cerca <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs" style={{ color: '#888' }}>
            {['Gratuito', 'P.IVA verificate', 'Risposta < 2h', 'Pagamento garantito'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" style={{ color: success }} strokeWidth={3} />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, white)' }} />
      </section>

      {/* ───────── Stat XL ───────── */}
      <section className="relative bg-white">
        <div className="max-w-[1280px] mx-auto px-6 py-32">
          <div className="grid md:grid-cols-4 gap-px rounded-2xl overflow-hidden" style={{ background: border }}>
            {[
              { value: '12.847', label: 'Lavori completati', sub: 'questo mese' },
              { value: '4.8', label: 'Stelle medie', sub: 'su 5 — recensioni verificate' },
              { value: '< 2h', label: 'Tempo di risposta', sub: 'media nazionale' },
              { value: '98%', label: 'Tasso completamento', sub: 'lavori andati a fine' },
            ].map((s, i) => (
              <div key={i} className="bg-white p-8 lg:p-10">
                <div
                  className="text-5xl lg:text-6xl number-xl font-medium mb-2"
                  style={{ color: ink, fontFeatureSettings: '"tnum"', letterSpacing: '-0.05em' }}
                >
                  {s.value}
                </div>
                <div className="text-sm font-medium mb-1" style={{ color: ink }}>{s.label}</div>
                <div className="text-xs" style={{ color: subtle }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Featured pros — glow cards ───────── */}
      <section className="relative bg-white pb-32">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
            <div className="max-w-xl">
              <span className="text-xs uppercase tracking-[0.2em] block mb-4" style={{ color: accent, fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
                ◆ In evidenza
              </span>
              <h2 className="text-4xl lg:text-5xl tracking-[-0.04em] font-medium mb-3" style={{ color: ink }}>
                Professionisti consigliati.
              </h2>
              <p className="text-base" style={{ color: subtle }}>
                I migliori della tua zona, scelti per te in base a recensioni, esperienza e disponibilità.
              </p>
            </div>
            <a className="text-sm flex items-center gap-1 hover:gap-2 transition-all font-medium" style={{ color: ink }}>
              Esplora tutti <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {FEATURED.map((p, i) => (
              <article
                key={i}
                className={`glow-card group bg-white rounded-2xl p-6 cursor-pointer ${p.plan === 'premium' ? 'premium-glow' : ''}`}
                style={{ border: `1px solid ${border}` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-2">
                    {p.plan === 'premium' && (
                      <span
                        className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold"
                        style={{ background: ink, color: 'white', fontFamily: 'var(--font-mono)' }}
                      >
                        Premium
                      </span>
                    )}
                    {p.plan === 'pro' && (
                      <span
                        className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold border"
                        style={{ borderColor: border, color: ink, fontFamily: 'var(--font-mono)' }}
                      >
                        Pro
                      </span>
                    )}
                    {p.available ? (
                      <span className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: success }}>
                        <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: success, boxShadow: `0 0 8px ${success}` }} />
                        Online
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[11px]" style={{ color: fade }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: fade }} />
                        Occupato
                      </span>
                    )}
                  </div>
                  <ArrowUpRight
                    className="w-5 h-5 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: subtle }}
                  />
                </div>

                <h3 className="text-2xl tracking-[-0.02em] font-medium mb-1 flex items-center gap-2" style={{ color: ink }}>
                  {p.name}
                  <BadgeCheck className="w-4 h-4" style={{ color: accent }} fill={accent} fillOpacity={0.15} strokeWidth={2} />
                </h3>
                <p className="text-sm mb-8" style={{ color: subtle }}>
                  {p.category} · {p.city}
                </p>

                <div className="grid grid-cols-3 gap-3 py-4 border-t" style={{ borderColor: border }}>
                  <div>
                    <div className="text-xl flex items-center gap-1 number-xl font-medium" style={{ color: ink }}>
                      <Star className="w-3.5 h-3.5" fill={ink} strokeWidth={0} />
                      {p.rating}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider mt-1" style={{ color: fade }}>
                      {p.reviews} review
                    </div>
                  </div>
                  <div>
                    <div className="text-xl number-xl font-medium" style={{ color: ink }}>{p.completedJobs}</div>
                    <div className="text-[10px] uppercase tracking-wider mt-1" style={{ color: fade }}>Lavori</div>
                  </div>
                  <div>
                    <div className="text-xl number-xl font-medium" style={{ color: ink }}>{p.distance}</div>
                    <div className="text-[10px] uppercase tracking-wider mt-1" style={{ color: fade }}>Distanza</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-5 pt-5 border-t" style={{ borderColor: border }}>
                  <span className="text-xs" style={{ color: subtle }}>Tariffa da</span>
                  <span className="text-base number-xl font-medium" style={{ color: ink }}>{p.price}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Bento grid ───────── */}
      <section className="bg-white pb-32">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] block mb-4" style={{ color: accent, fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
              ◆ Perché TrovaPro
            </span>
            <h2 className="text-4xl lg:text-5xl tracking-[-0.04em] font-medium" style={{ color: ink }}>
              Tutto quello che ti serve, niente che non ti serve.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Big card */}
            <div className="md:col-span-2 md:row-span-2 glow-card rounded-2xl p-10 relative overflow-hidden" style={{ background: dark, color: 'white', border: `1px solid ${dark}` }}>
              <div className="absolute inset-0 grid-bg opacity-50" />
              <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full" style={{ background: `radial-gradient(circle, ${accent}40, transparent 60%)`, filter: 'blur(60px)' }} />

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-8" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Bolt className="w-3 h-3" style={{ color: accent }} />
                  <span style={{ color: '#aaa', fontFamily: 'var(--font-mono)' }}>RISPOSTA RAPIDA</span>
                </div>
                <h3 className="text-3xl lg:text-4xl tracking-[-0.03em] font-medium mb-4 max-w-md">
                  Ricevi i primi preventivi entro 2 ore dalla richiesta.
                </h3>
                <p className="text-base mb-8 max-w-md" style={{ color: '#999' }}>
                  Niente attese, niente call con call center. I professionisti
                  ti rispondono direttamente con preventivi dettagliati.
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="number-xl font-medium" style={{ fontSize: 'clamp(64px, 8vw, 96px)', lineHeight: 1, color: 'white', letterSpacing: '-0.05em' }}>1h 47m</span>
                  <span className="text-sm" style={{ color: '#777' }}>tempo medio</span>
                </div>
              </div>
            </div>

            {[
              { icon: Lock, title: 'Pagamento sicuro', desc: 'Versiamo i fondi al professionista solo a lavoro completato.' },
              { icon: BadgeCheck, title: 'P.IVA verificate', desc: 'Ogni professionista è verificato manualmente dal nostro team.' },
              { icon: MessageSquare, title: 'Chat integrata', desc: 'Comunichi direttamente con il professionista, senza scambiare numeri.' },
              { icon: Sparkles, title: 'Recensioni reali', desc: 'Solo chi ha completato un lavoro può lasciare una recensione.' },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="glow-card rounded-2xl p-6 bg-white" style={{ border: `1px solid ${border}` }}>
                  <Icon className="w-5 h-5 mb-5" style={{ color: accent }} strokeWidth={1.75} />
                  <h3 className="text-lg tracking-[-0.02em] font-medium mb-2" style={{ color: ink }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: subtle }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── Pro CTA aurora ───────── */}
      <section className="relative overflow-hidden" style={{ background: dark }}>
        <div className="aurora" style={{ opacity: 0.6 }} />
        <div className="relative max-w-[1280px] mx-auto px-6 py-32 text-center">
          <span className="text-xs uppercase tracking-[0.2em] block mb-5" style={{ color: '#7AA8FF', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
            ◆ Per professionisti
          </span>
          <h2 className="font-medium tracking-[-0.05em] mx-auto max-w-3xl" style={{ fontSize: 'clamp(48px, 7vw, 88px)', lineHeight: 0.95 }}>
            <span className="gradient-text">Più clienti.</span>{' '}
            <span className="accent-text">Meno fatica.</span>
          </h2>
          <p className="mt-8 max-w-md mx-auto text-base" style={{ color: '#aaa' }}>
            Crea il tuo profilo in 5 minuti. Ricevi richieste qualificate, gestisci tutto da una sola dashboard.
          </p>
          <div className="mt-12 flex items-center justify-center gap-3 flex-wrap">
            <button className="px-5 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90 flex items-center gap-1.5" style={{ background: 'white', color: dark }}>
              Inizia gratis <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-5 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/5 border" style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'white' }}>
              Vedi i piani
            </button>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <section className="bg-white border-t" style={{ borderColor: border }}>
        <div className="max-w-[1280px] mx-auto px-6 py-12 text-center">
          <p className="text-sm mb-2" style={{ color: subtle }}>
            v0.3 · Dark hero + aurora · Glow cards · Bento grid · Numeric XL
          </p>
          <Link href="/" className="text-sm font-medium" style={{ color: ink }}>
            Torna al sito attuale →
          </Link>
        </div>
      </section>
    </main>
  );
}
