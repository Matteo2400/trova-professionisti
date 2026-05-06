import Link from 'next/link';
import {
  Search, MapPin, Star, Shield, ArrowRight, ArrowUpRight, Check,
  Zap, Sparkles,
} from 'lucide-react';

const ink = '#0A0A0A';
const subtle = '#666';
const border = '#EAEAEA';
const borderStrong = '#D4D4D4';
const accent = '#0040C9';
const accentSoft = '#EFF4FF';
const surface = '#FAFAFA';
const success = '#0F8A5F';

const PALETTE = [
  { name: 'Background', token: '#FFFFFF' },
  { name: 'Surface', token: '#FAFAFA' },
  { name: 'Border', token: '#EAEAEA' },
  { name: 'Subtle', token: '#666666' },
  { name: 'Ink', token: '#0A0A0A' },
  { name: 'Accent', token: '#0040C9' },
];

const FEATURED = [
  { name: 'Mario Rossi', category: 'Elettricista', city: 'Roma', rating: 4.9, reviews: 127, price: '€45/h', distance: '2.1 km', available: true, plan: 'premium' as const, completedJobs: 312 },
  { name: 'Giuseppe Verdi', category: 'Imbianchino', city: 'Torino', rating: 5.0, reviews: 89, price: '€30/h', distance: '4.8 km', available: true, plan: 'pro' as const, completedJobs: 178 },
  { name: 'Luigi Bianchi', category: 'Idraulico', city: 'Milano', rating: 4.8, reviews: 213, price: '€40/h', distance: '1.3 km', available: false, plan: 'pro' as const, completedJobs: 421 },
];

export default function DesignPreviewPage() {
  return (
    <main>
      {/* Notice bar */}
      <div className="border-b" style={{ borderColor: border, background: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 py-2 flex items-center justify-between text-xs">
          <span style={{ fontFamily: 'var(--font-mono)', color: subtle }}>
            DESIGN PREVIEW · v0.2 · MODERNO
          </span>
          <Link href="/" style={{ color: subtle }} className="hover:text-black">
            ← Sito attuale
          </Link>
        </div>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b backdrop-blur-md" style={{ borderColor: border, background: 'rgba(255,255,255,0.85)' }}>
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: ink }}>
                <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-[15px] font-semibold tracking-tight" style={{ color: ink, letterSpacing: '-0.01em' }}>
                trovapro
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm" style={{ color: subtle }}>
              <a className="hover:text-black transition-colors" href="#">Cerca</a>
              <a className="hover:text-black transition-colors" href="#">Categorie</a>
              <a className="hover:text-black transition-colors" href="#">Per professionisti</a>
              <a className="hover:text-black transition-colors" href="#">Prezzi</a>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <a className="text-sm px-3 py-1.5 hover:bg-neutral-100 rounded-md transition-colors" href="#">Accedi</a>
            <button className="text-sm font-medium px-3.5 py-1.5 rounded-md transition-all hover:opacity-90 flex items-center gap-1" style={{ background: ink, color: 'white' }}>
              Inizia <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b" style={{ borderColor: border }}>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.4]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #EFEFEF 1px, transparent 1px), linear-gradient(to bottom, #EFEFEF 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 80%)',
          }}
        />
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none opacity-50"
          style={{
            background: `radial-gradient(circle, ${accent}25, transparent 60%)`,
            filter: 'blur(40px)',
          }}
        />

        <div className="relative max-w-[1200px] mx-auto px-6 pt-28 pb-32">
          <div className="flex justify-center mb-10">
            <a href="#" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border transition-all hover:bg-neutral-50" style={{ borderColor: border, color: ink, background: 'rgba(255,255,255,0.7)' }}>
              <span className="font-medium" style={{ color: accent }}>Novità</span>
              <span style={{ color: borderStrong }}>·</span>
              <span style={{ color: subtle }}>Pagamenti garantiti via Stripe</span>
              <ArrowRight className="w-3 h-3" style={{ color: subtle }} />
            </a>
          </div>

          <h1 className="text-center text-[64px] lg:text-[88px] leading-[0.95] tracking-[-0.04em] font-medium mx-auto max-w-4xl" style={{ color: ink }}>
            Il modo più semplice
            <br />
            <span style={{
              background: `linear-gradient(135deg, ${ink} 30%, ${accent} 70%, ${ink} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              di trovare un professionista.
            </span>
          </h1>

          <p className="text-center text-[17px] leading-relaxed mt-7 max-w-xl mx-auto" style={{ color: subtle }}>
            Confronta professionisti verificati nella tua zona, leggi le recensioni,
            ricevi preventivi gratuiti in poche ore.
          </p>

          <div className="mt-12 max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.06)] border p-1.5 flex items-center gap-1.5" style={{ borderColor: border }}>
              <div className="flex items-center gap-2.5 px-3.5 flex-1 min-w-0">
                <Search className="w-4 h-4 flex-shrink-0" style={{ color: subtle }} />
                <input placeholder="Elettricista, idraulico…" className="bg-transparent outline-none text-sm w-full placeholder:text-neutral-400" style={{ color: ink }} />
              </div>
              <div className="w-px self-stretch my-1.5" style={{ background: border }} />
              <div className="flex items-center gap-2.5 px-3.5 flex-1 min-w-0">
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: subtle }} />
                <input placeholder="La tua città" className="bg-transparent outline-none text-sm w-full placeholder:text-neutral-400" style={{ color: ink }} />
              </div>
              <button className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-90 flex items-center gap-1.5 flex-shrink-0" style={{ background: ink, color: 'white' }}>
                Cerca <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs" style={{ color: subtle }}>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" style={{ color: success }} strokeWidth={3} /> Gratuito</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" style={{ color: success }} strokeWidth={3} /> P.IVA verificate</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" style={{ color: success }} strokeWidth={3} /> Risposta in &lt; 2h</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b" style={{ borderColor: border }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x" style={{ borderColor: border }}>
          {[
            { value: '12.847', label: 'Lavori completati' },
            { value: '4.8 / 5', label: 'Valutazione media' },
            { value: '< 2h', label: 'Tempo di risposta' },
            { value: '98%', label: 'Tasso completamento' },
          ].map((s, i) => (
            <div key={i} className="px-6 py-10 text-center" style={{ borderColor: border }}>
              <div className="text-3xl tracking-tight" style={{ color: ink, fontFamily: 'var(--font-mono)', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
                {s.value}
              </div>
              <div className="text-xs mt-1.5 uppercase tracking-[0.1em]" style={{ color: subtle }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="border-b" style={{ borderColor: border, background: surface }}>
        <div className="max-w-[1200px] mx-auto px-6 py-24">
          <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
            <div>
              <span className="text-xs uppercase tracking-[0.15em] block mb-3" style={{ color: accent, fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
                In evidenza
              </span>
              <h2 className="text-3xl lg:text-4xl tracking-[-0.02em]" style={{ color: ink, fontWeight: 500 }}>
                Professionisti consigliati
              </h2>
            </div>
            <a className="text-sm flex items-center gap-1 hover:gap-2 transition-all" style={{ color: ink }}>
              Vedi tutti <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {FEATURED.map((p, i) => (
              <article key={i} className="group bg-white rounded-xl border transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] cursor-pointer" style={{ borderColor: border }}>
                <div className="flex items-center justify-between px-5 pt-5 pb-3">
                  <div className="flex items-center gap-2">
                    {p.plan === 'premium' && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider font-semibold" style={{ background: ink, color: 'white', fontFamily: 'var(--font-mono)' }}>
                        Premium
                      </span>
                    )}
                    {p.plan === 'pro' && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider font-semibold border" style={{ borderColor: border, color: ink, fontFamily: 'var(--font-mono)' }}>
                        Pro
                      </span>
                    )}
                    {p.available ? (
                      <span className="flex items-center gap-1.5 text-xs" style={{ color: success }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: success }} />
                        Disponibile
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs" style={{ color: subtle }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: borderStrong }} />
                        Occupato
                      </span>
                    )}
                  </div>
                  <ArrowUpRight className="w-4 h-4 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: subtle }} />
                </div>

                <div className="px-5 pb-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-[17px] tracking-tight" style={{ color: ink }}>
                      {p.name}
                    </h3>
                    <Shield className="w-4 h-4" style={{ color: success }} fill={success} fillOpacity={0.15} strokeWidth={1.5} />
                  </div>
                  <p className="text-sm" style={{ color: subtle }}>
                    {p.category} · {p.city}
                  </p>

                  <div className="grid grid-cols-3 gap-3 mt-5 py-3.5 border-t border-b" style={{ borderColor: border }}>
                    <div>
                      <div className="text-[15px] flex items-center gap-1" style={{ color: ink, fontFamily: 'var(--font-mono)', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
                        <Star className="w-3 h-3" fill={ink} />
                        {p.rating}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: subtle }}>
                        {p.reviews} review
                      </div>
                    </div>
                    <div>
                      <div className="text-[15px]" style={{ color: ink, fontFamily: 'var(--font-mono)', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
                        {p.completedJobs}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: subtle }}>
                        Lavori
                      </div>
                    </div>
                    <div>
                      <div className="text-[15px]" style={{ color: ink, fontFamily: 'var(--font-mono)', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
                        {p.distance}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: subtle }}>
                        Distanza
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm" style={{ color: subtle }}>Tariffa da</span>
                    <span className="text-[15px]" style={{ color: ink, fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
                      {p.price}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b" style={{ borderColor: border }}>
        <div className="max-w-[1200px] mx-auto px-6 py-24">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-[0.15em] block mb-3" style={{ color: accent, fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
              Come funziona
            </span>
            <h2 className="text-3xl lg:text-4xl tracking-[-0.02em] mb-4" style={{ color: ink, fontWeight: 500 }}>
              Tre passi, dal preventivo al lavoro fatto.
            </h2>
            <p className="text-[15px]" style={{ color: subtle }}>
              Senza intermediari. Senza commissioni nascoste.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px" style={{ background: border }}>
            {[
              { step: '01', icon: Search, title: 'Descrivi il tuo lavoro', desc: 'In meno di un minuto, dicci cosa ti serve. Aggiungi foto se vuoi.' },
              { step: '02', icon: Sparkles, title: 'Ricevi preventivi', desc: 'I professionisti della tua zona ti rispondono in poche ore con offerte personalizzate.' },
              { step: '03', icon: Check, title: 'Scegli e prenota', desc: 'Confronta profili, recensioni e prezzi. Paga in sicurezza solo a lavoro fatto.' },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="bg-white p-8 lg:p-10">
                  <div className="flex items-start justify-between mb-12">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: ink }}>
                      <Icon className="w-4 h-4 text-white" strokeWidth={2} />
                    </div>
                    <span style={{ color: borderStrong, fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }} className="text-sm">
                      {f.step}
                    </span>
                  </div>
                  <h3 className="text-lg mb-2 tracking-tight" style={{ color: ink, fontWeight: 500 }}>
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: subtle }}>
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pro CTA */}
      <section className="relative overflow-hidden" style={{ background: ink }}>
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(ellipse at top right, ${accent}40, transparent 50%), radial-gradient(ellipse at bottom left, ${accent}20, transparent 50%)`,
          }}
        />
        <div className="relative max-w-[1200px] mx-auto px-6 py-24 text-center">
          <span className="text-xs uppercase tracking-[0.15em] block mb-4" style={{ color: '#7AA8FF', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
            Sei un professionista?
          </span>
          <h2 className="text-4xl lg:text-5xl tracking-[-0.03em] max-w-2xl mx-auto mb-6" style={{ color: 'white', fontWeight: 500 }}>
            Più clienti, meno lavoro amministrativo.
          </h2>
          <p className="text-[15px] mb-10 max-w-lg mx-auto" style={{ color: '#888' }}>
            Crea il tuo profilo in 5 minuti, ricevi richieste qualificate
            e gestisci tutto da una sola dashboard.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button className="px-5 py-3 rounded-lg text-sm font-medium transition-all hover:opacity-90 flex items-center gap-1.5" style={{ background: 'white', color: ink }}>
              Inizia gratis <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-5 py-3 rounded-lg text-sm font-medium transition-all border hover:bg-white/5" style={{ borderColor: '#333', color: 'white' }}>
              Vedi i piani
            </button>
          </div>
        </div>
      </section>

      {/* Design system */}
      <section className="border-b" style={{ borderColor: border }}>
        <div className="max-w-[1200px] mx-auto px-6 py-24">
          <span className="text-xs uppercase tracking-[0.15em] block mb-3" style={{ color: accent, fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
            Design system
          </span>
          <h2 className="text-3xl lg:text-4xl tracking-[-0.02em] mb-12" style={{ color: ink, fontWeight: 500 }}>
            Linguaggio visivo
          </h2>

          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] mb-5" style={{ color: subtle, fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
                Palette
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {PALETTE.map((p) => (
                  <div key={p.name} className="flex items-center gap-3 p-3 border rounded-lg" style={{ borderColor: border }}>
                    <div className="w-10 h-10 rounded-md flex-shrink-0 border" style={{ background: p.token, borderColor: border }} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium" style={{ color: ink }}>{p.name}</p>
                      <p className="text-xs" style={{ color: subtle, fontFamily: 'var(--font-mono)' }}>{p.token}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] mb-5" style={{ color: subtle, fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
                Tipografia
              </h3>
              <div className="space-y-0 border rounded-lg" style={{ borderColor: border }}>
                <div className="p-5 border-b" style={{ borderColor: border }}>
                  <p className="text-xs mb-2" style={{ color: subtle, fontFamily: 'var(--font-mono)' }}>
                    Display — Geist · 500 · -0.03em
                  </p>
                  <p className="text-3xl tracking-[-0.03em]" style={{ color: ink, fontWeight: 500 }}>
                    Trova il professionista giusto.
                  </p>
                </div>
                <div className="p-5 border-b" style={{ borderColor: border }}>
                  <p className="text-xs mb-2" style={{ color: subtle, fontFamily: 'var(--font-mono)' }}>
                    Body — Geist · 400
                  </p>
                  <p className="text-[15px] leading-relaxed" style={{ color: ink }}>
                    Confronta professionisti verificati nella tua zona, leggi recensioni e ricevi preventivi gratuiti.
                  </p>
                </div>
                <div className="p-5">
                  <p className="text-xs mb-2" style={{ color: subtle, fontFamily: 'var(--font-mono)' }}>
                    Mono — Geist Mono · numeri tabular
                  </p>
                  <p className="text-2xl" style={{ fontFamily: 'var(--font-mono)', color: ink, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
                    €45/h · 4.9 · 2.1 km
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] mb-5" style={{ color: subtle, fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
                Bottoni
              </h3>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 rounded-md text-sm font-medium transition-all hover:opacity-90 flex items-center gap-1.5" style={{ background: ink, color: 'white' }}>
                  Primario <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button className="px-4 py-2 rounded-md text-sm font-medium transition-all hover:bg-neutral-50 border" style={{ borderColor: border, color: ink, background: 'white' }}>
                  Secondario
                </button>
                <button className="px-4 py-2 rounded-md text-sm font-medium hover:bg-neutral-100 transition-all" style={{ color: ink }}>
                  Ghost
                </button>
                <button className="px-4 py-2 rounded-md text-sm font-medium transition-all" style={{ background: accentSoft, color: accent }}>
                  Accent
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] mb-5" style={{ color: subtle, fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
                Badge
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 rounded-md text-[11px] uppercase tracking-wider font-semibold" style={{ background: ink, color: 'white', fontFamily: 'var(--font-mono)' }}>
                  Premium
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] uppercase tracking-wider font-semibold border" style={{ borderColor: border, color: ink, fontFamily: 'var(--font-mono)' }}>
                  Pro
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] flex items-center gap-1.5" style={{ color: success, background: '#E8F7F0' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: success }} /> Disponibile
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] flex items-center gap-1" style={{ color: success, background: '#E8F7F0' }}>
                  <Shield className="w-3 h-3" /> Verificato
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="max-w-[1200px] mx-auto px-6 py-16 text-center">
        <p className="text-sm mb-3" style={{ color: subtle }}>
          Direzione: Stripe + Linear · Geist + Geist Mono · Bianco puro + accenti misurati
        </p>
        <Link href="/" className="text-sm" style={{ color: ink }}>
          Torna al sito attuale →
        </Link>
      </section>
    </main>
  );
}
