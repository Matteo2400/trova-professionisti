import Link from 'next/link';
import {
  Search, MapPin, Star, Shield, ArrowRight, ArrowUpRight, Check,
  Zap, Sparkles, MessageSquare, Lock, BadgeCheck, Bolt,
  TrendingUp, Quote, Plus, Wrench, Droplets, Paintbrush, Hammer, Key, TreePine,
  Twitter, Instagram, Linkedin, Mail, Globe,
} from 'lucide-react';

const ink = '#0A0A0A';
const subtle = '#737373';
const fade = '#A3A3A3';
const border = '#EDEDED';
const borderDark = 'rgba(255,255,255,0.08)';
const accent = '#0070F3';
const success = '#0F8A5F';
const dark = '#050505';
const surface = '#FAFAFA';

const FEATURED = [
  { name: 'Mario Rossi', category: 'Elettricista', city: 'Roma', rating: 4.9, reviews: 127, price: '€45/h', distance: '2.1 km', available: true, plan: 'premium' as const, completedJobs: 312, responseTime: '12 min' },
  { name: 'Giuseppe Verdi', category: 'Imbianchino', city: 'Torino', rating: 5.0, reviews: 89, price: '€30/h', distance: '4.8 km', available: true, plan: 'pro' as const, completedJobs: 178, responseTime: '34 min' },
  { name: 'Luigi Bianchi', category: 'Idraulico', city: 'Milano', rating: 4.8, reviews: 213, price: '€40/h', distance: '1.3 km', available: false, plan: 'pro' as const, completedJobs: 421, responseTime: '1h 12m' },
  { name: 'Antonio Esposito', category: 'Elettricista', city: 'Napoli', rating: 4.7, reviews: 94, price: '€35/h', distance: '3.4 km', available: true, plan: 'pro' as const, completedJobs: 156, responseTime: '8 min' },
  { name: 'Carlo Ricci', category: 'Muratore', city: 'Roma', rating: 4.9, reviews: 167, price: '€42/h', distance: '5.2 km', available: true, plan: 'premium' as const, completedJobs: 289, responseTime: '22 min' },
  { name: 'Andrea Martini', category: 'Fabbro', city: 'Firenze', rating: 4.8, reviews: 76, price: '€55/h', distance: '6.1 km', available: false, plan: 'pro' as const, completedJobs: 134, responseTime: '45 min' },
];

const CATEGORIES = [
  { name: 'Elettricisti', slug: 'elettricista', count: '2.847', icon: Zap, gradient: 'linear-gradient(135deg, #FFB020, #FF6B00)' },
  { name: 'Idraulici', slug: 'idraulico', count: '1.923', icon: Droplets, gradient: 'linear-gradient(135deg, #0070F3, #00D4FF)' },
  { name: 'Imbianchini', slug: 'imbianchino', count: '1.456', icon: Paintbrush, gradient: 'linear-gradient(135deg, #00C896, #00E5A8)' },
  { name: 'Muratori', slug: 'muratore', count: '987', icon: Hammer, gradient: 'linear-gradient(135deg, #7B61FF, #A78BFA)' },
  { name: 'Fabbri', slug: 'fabbro', count: '534', icon: Key, gradient: 'linear-gradient(135deg, #EF4444, #F97316)' },
  { name: 'Giardinieri', slug: 'giardiniere', count: '712', icon: TreePine, gradient: 'linear-gradient(135deg, #22C55E, #84CC16)' },
];

const TESTIMONIALS = [
  {
    name: 'Anna Moretti',
    role: 'Cliente · Roma',
    avatar: 'AM',
    color: '#0070F3',
    quote:
      'Ho trovato un elettricista in 20 minuti. Lavoro fatto lo stesso pomeriggio, prezzo onesto, persona seria. La piattaforma fa esattamente quello che promette.',
  },
  {
    name: 'Roberto Conti',
    role: 'Idraulico professionista · Milano',
    avatar: 'RC',
    color: '#7B61FF',
    quote:
      'Da quando uso TrovaPro ho raddoppiato i clienti senza spendere in pubblicità. Le richieste sono qualificate, niente perdite di tempo con clienti incerti.',
  },
  {
    name: 'Francesca Baldi',
    role: 'Cliente · Torino',
    avatar: 'FB',
    color: '#00C896',
    quote:
      'Avevo bisogno di tinteggiare casa, ho confrontato 4 preventivi in un giorno e scelto in base alle recensioni. Risultato impeccabile.',
  },
];

const PLANS = [
  {
    name: 'Base', price: '0', period: 'gratis per sempre',
    features: ['Profilo visibile', 'Ricezione richieste', '5 foto in galleria', 'Supporto email'],
    cta: 'Inizia gratis', popular: false,
  },
  {
    name: 'Pro', price: '19,90', period: 'al mese',
    features: ['Tutto del Base', 'Badge Pro', 'Priorità in zona', 'Statistiche avanzate', '20 foto galleria', 'Supporto prioritario'],
    cta: 'Passa a Pro', popular: true,
  },
  {
    name: 'Premium', price: '39,90', period: 'al mese',
    features: ['Tutto del Pro', 'Badge Premium dorato', 'Sempre in cima', 'Galleria illimitata', 'Account manager 1-a-1', 'Report mensile'],
    cta: 'Sblocca Premium', popular: false,
  },
];

const FAQS = [
  { q: 'Quanto costa usare TrovaPro come cliente?', a: 'È completamente gratuito. Non paghi commissioni, registrazione né costi nascosti. Paghi solo il professionista direttamente per il lavoro svolto.' },
  { q: 'Come fate a verificare i professionisti?', a: 'Verifichiamo manualmente partita IVA, documenti e referenze prima di approvare ogni profilo. Il badge "Verificato" indica che il check è stato completato.' },
  { q: 'Posso annullare un preventivo dopo averlo richiesto?', a: 'Sì, puoi annullare in qualsiasi momento prima di accettarlo. Il professionista riceverà una notifica automatica e la richiesta si chiuderà.' },
  { q: 'Cosa succede se il lavoro non viene completato?', a: 'I pagamenti sono protetti da Stripe Connect: il professionista riceve i fondi solo dopo conferma del lavoro completato. In caso di problemi, il rimborso è automatico.' },
  { q: 'Quanto tempo ci mette un professionista a rispondere?', a: 'In media meno di 2 ore per i preventivi standard, meno di 30 minuti per le emergenze. Vedi il tempo medio sul profilo di ogni professionista.' },
];

// Sparkline component
function Sparkline({ data, color = ink, height = 32, width = 80 }: { data: number[]; color?: string; height?: number; width?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  const points = data.map((v, i) => `${i * stepX},${height - ((v - min) / range) * height}`).join(' ');
  return (
    <svg width={width} height={height} className="inline-block">
      <defs>
        <linearGradient id={`spark-${color.replace('#', '')}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" points={points} />
      <polygon fill={`url(#spark-${color.replace('#', '')})`} points={`0,${height} ${points} ${width},${height}`} />
    </svg>
  );
}

export default function DesignPreviewPage() {
  return (
    <main>
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes slide-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .glow-card {
          position: relative;
          isolation: isolate;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease;
        }
        .glow-card::before {
          content: ""; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
          background: linear-gradient(135deg, transparent 30%, rgba(0,112,243,0.5) 50%, transparent 70%);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          opacity: 0; transition: opacity 0.4s ease; pointer-events: none;
        }
        .glow-card:hover { transform: translateY(-4px); box-shadow: 0 30px 60px -20px rgba(0,112,243,0.25), 0 0 60px -10px rgba(0,112,243,0.15); }
        .glow-card:hover::before { opacity: 1; }
        .premium-glow { box-shadow: 0 0 0 1px rgba(0,112,243,0.18), 0 8px 32px -8px rgba(0,112,243,0.12); }

        .aurora { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .aurora::before, .aurora::after {
          content: ""; position: absolute; width: 800px; height: 800px;
          border-radius: 50%; filter: blur(80px); opacity: 0.45;
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
        .gradient-text { background: linear-gradient(180deg, #FFFFFF 0%, #888 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .accent-text   { background: linear-gradient(90deg, #7B61FF 0%, #0070F3 50%, #00D4FF 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

        .number-xl { font-feature-settings: "tnum"; letter-spacing: -0.06em; }
        .pulse-dot { animation: pulse-glow 2s ease-in-out infinite; }
        .float { animation: float 4s ease-in-out infinite; }

        .conic-border { position: relative; background: white; border-radius: 16px; }
        .conic-border::before {
          content: ""; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
          background: conic-gradient(from 0deg, transparent 0%, rgba(0,112,243,0.4) 25%, transparent 50%, rgba(123,97,255,0.4) 75%, transparent 100%);
          animation: spin-slow 8s linear infinite;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
        }

        .cat-card {
          position: relative; isolation: isolate; overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cat-card .cat-blob {
          position: absolute; bottom: -40px; right: -40px; width: 140px; height: 140px;
          border-radius: 50%; opacity: 0; transition: opacity 0.5s ease, transform 0.5s ease;
          filter: blur(20px); transform: scale(0.8);
        }
        .cat-card:hover { transform: translateY(-3px); }
        .cat-card:hover .cat-blob { opacity: 0.5; transform: scale(1); }

        details.faq[open] summary .faq-icon { transform: rotate(45deg); }
        details.faq summary { list-style: none; cursor: pointer; }
        details.faq summary::-webkit-details-marker { display: none; }
        details.faq .faq-icon { transition: transform 0.25s ease; }

        .marquee { overflow: hidden; mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent); }
        .marquee-track { display: flex; gap: 64px; animation: slide-marquee 30s linear infinite; width: max-content; }

        .chip-active { background: ${ink}; color: white; }
        .chip-default { background: white; color: ${ink}; border: 1px solid ${border}; }

        .plan-popular {
          position: relative;
          background: ${dark};
          color: white;
          box-shadow: 0 30px 60px -20px rgba(0,112,243,0.4), 0 0 80px -20px rgba(123,97,255,0.3);
        }
        .plan-popular::before {
          content: ""; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
          background: linear-gradient(135deg, ${accent}, #7B61FF);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>

      {/* ───────── Notice ───────── */}
      <div style={{ background: dark, color: '#999' }} className="text-xs">
        <div className="max-w-[1280px] mx-auto px-6 py-2 flex items-center justify-between">
          <span style={{ fontFamily: 'var(--font-mono)' }}>DESIGN PREVIEW · v0.6 · FULL</span>
          <Link href="/" className="hover:text-white transition-colors">← Sito attuale</Link>
        </div>
      </div>

      {/* ───────── Dark Hero (no change) ───────── */}
      <section className="relative overflow-hidden" style={{ background: dark }}>
        <div className="aurora" />
        <div className="absolute inset-0 grid-bg" />

        <header className="relative z-10 border-b" style={{ borderColor: borderDark }}>
          <div className="max-w-[1280px] mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'white' }}>
                  <Zap className="w-3.5 h-3.5" style={{ color: dark }} strokeWidth={2.5} />
                </div>
                <span className="text-[15px] font-semibold tracking-tight text-white" style={{ letterSpacing: '-0.01em' }}>trovapro</span>
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
          <div className="flex justify-center mb-12">
            <a href="#" className="conic-border inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold" style={{ background: accent, color: 'white', fontFamily: 'var(--font-mono)' }}>NEW</span>
              <span className="text-white/80">Pagamenti garantiti via Stripe</span>
              <ArrowRight className="w-3 h-3 text-white/50" />
            </a>
          </div>

          <h1 className="text-center font-medium tracking-[-0.05em] mx-auto max-w-5xl" style={{ fontSize: 'clamp(56px, 9vw, 112px)', lineHeight: 0.92 }}>
            <span className="gradient-text">Trovare un professionista,</span><br />
            <span className="accent-text">finalmente semplice.</span>
          </h1>

          <p className="text-center mt-8 max-w-xl mx-auto text-[17px] leading-relaxed" style={{ color: '#999' }}>
            Confronta professionisti verificati nella tua zona, leggi le recensioni e ricevi preventivi gratuiti in poche ore.
          </p>

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

        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, white)' }} />
      </section>

      {/* ───────── Stats con sparkline + trend ───────── */}
      <section className="relative bg-white">
        <div className="max-w-[1280px] mx-auto px-6 py-32">
          <div className="grid md:grid-cols-4 gap-px rounded-2xl overflow-hidden" style={{ background: border }}>
            {[
              { value: '12.847', label: 'Lavori completati', sub: 'questo mese', trend: '+18%', spark: [40,45,50,52,58,60,68,72,75,82,88,95], color: accent },
              { value: '4.8', label: 'Stelle medie', sub: 'su 5 — recensioni verificate', trend: '+0.2', spark: [4.5,4.6,4.6,4.7,4.7,4.8,4.7,4.8,4.8,4.9,4.8,4.8], color: '#FFB020' },
              { value: '< 2h', label: 'Tempo di risposta', sub: 'media nazionale', trend: '−24m', spark: [180,165,155,140,130,125,118,112,108,102,98,95].reverse(), color: success },
              { value: '98%', label: 'Tasso completamento', sub: 'lavori andati a fine', trend: '+3%', spark: [88,89,90,91,92,93,94,95,96,97,97,98], color: '#7B61FF' },
            ].map((s, i) => (
              <div key={i} className="bg-white p-8 lg:p-10 group hover:bg-neutral-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md" style={{ background: `${s.color}15`, color: s.color, fontFamily: 'var(--font-mono)' }}>
                    <TrendingUp className="w-3 h-3" />
                    {s.trend}
                  </span>
                  <div className="opacity-50 group-hover:opacity-100 transition-opacity">
                    <Sparkline data={s.spark} color={s.color} />
                  </div>
                </div>
                <div className="text-5xl lg:text-6xl number-xl font-medium mb-2" style={{ color: ink }}>
                  {s.value}
                </div>
                <div className="text-sm font-medium mb-1" style={{ color: ink }}>{s.label}</div>
                <div className="text-xs" style={{ color: subtle }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Categories grid ───────── */}
      <section className="bg-white pb-32">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
            <div className="max-w-xl">
              <span className="text-xs uppercase tracking-[0.2em] block mb-4" style={{ color: accent, fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
                ◆ Categorie
              </span>
              <h2 className="text-4xl lg:text-5xl tracking-[-0.04em] font-medium mb-3" style={{ color: ink }}>
                Cosa stai cercando?
              </h2>
              <p className="text-base" style={{ color: subtle }}>
                Più di 8.000 professionisti verificati in 6 categorie principali.
              </p>
            </div>
            <a className="text-sm flex items-center gap-1 hover:gap-2 transition-all font-medium" style={{ color: ink }}>
              Tutte le categorie <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES.map((c, i) => {
              const Icon = c.icon;
              return (
                <a
                  key={i}
                  href={`#${c.slug}`}
                  className="cat-card rounded-2xl p-5 bg-white block"
                  style={{ border: `1px solid ${border}` }}
                >
                  <div className="cat-blob" style={{ background: c.gradient }} />
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center" style={{ background: c.gradient }}>
                      <Icon className="w-4 h-4 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="text-base font-medium tracking-[-0.01em]" style={{ color: ink }}>{c.name}</h3>
                    <p className="text-xs mt-0.5" style={{ color: subtle, fontFamily: 'var(--font-mono)' }}>
                      {c.count} pro
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── Featured pros: filter + 6 card ───────── */}
      <section className="relative pb-32" style={{ background: surface }}>
        <div className="max-w-[1280px] mx-auto px-6 pt-20">
          <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
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

          {/* Filter chips */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="chip-active text-xs px-3 py-1.5 rounded-full font-medium">Tutti</span>
            {['Disponibili oggi', 'Premium', 'Top rated', 'Vicino a me'].map((c) => (
              <span key={c} className="chip-default text-xs px-3 py-1.5 rounded-full font-medium hover:bg-neutral-50 cursor-pointer transition-colors">
                {c}
              </span>
            ))}
            <span className="ml-auto text-xs" style={{ color: subtle, fontFamily: 'var(--font-mono)' }}>
              {FEATURED.length} risultati
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED.map((p, i) => (
              <article
                key={i}
                className={`glow-card group bg-white rounded-2xl p-6 cursor-pointer ${p.plan === 'premium' ? 'premium-glow' : ''}`}
                style={{ border: `1px solid ${border}` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-2 flex-wrap">
                    {p.plan === 'premium' && (
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold" style={{ background: ink, color: 'white', fontFamily: 'var(--font-mono)' }}>
                        Premium
                      </span>
                    )}
                    {p.plan === 'pro' && (
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold border" style={{ borderColor: border, color: ink, fontFamily: 'var(--font-mono)' }}>
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
                  <ArrowUpRight className="w-5 h-5 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: subtle }} />
                </div>

                <h3 className="text-2xl tracking-[-0.02em] font-medium mb-1 flex items-center gap-2" style={{ color: ink }}>
                  {p.name}
                  <BadgeCheck className="w-4 h-4" style={{ color: accent }} fill={accent} fillOpacity={0.15} strokeWidth={2} />
                </h3>
                <p className="text-sm mb-2" style={{ color: subtle }}>
                  {p.category} · {p.city}
                </p>

                <p className="text-xs mb-6 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md" style={{ color: success, background: '#E8F7F0', fontFamily: 'var(--font-mono)' }}>
                  <Bolt className="w-3 h-3" /> Risponde in {p.responseTime}
                </p>

                <div className="grid grid-cols-3 gap-3 py-4 border-t" style={{ borderColor: border }}>
                  <div>
                    <div className="text-xl flex items-center gap-1 number-xl font-medium" style={{ color: ink }}>
                      <Star className="w-3.5 h-3.5" fill={ink} strokeWidth={0} />
                      {p.rating}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider mt-1" style={{ color: fade }}>{p.reviews} review</div>
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

      {/* ───────── Bento "Perché TrovaPro" potenziato ───────── */}
      <section className="bg-white py-32">
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
            {/* Big dark card with chat mockup */}
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
                <p className="text-base mb-10 max-w-md" style={{ color: '#999' }}>
                  Niente attese, niente call center. I professionisti ti rispondono direttamente con preventivi dettagliati.
                </p>

                {/* Mini chat mockup */}
                <div className="rounded-xl p-4 backdrop-blur-sm max-w-sm" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold" style={{ background: accent, color: 'white' }}>MR</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">Mario Rossi</p>
                      <p className="text-[10px]" style={{ color: '#888' }}>Elettricista · sta scrivendo…</p>
                    </div>
                    <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: success, boxShadow: `0 0 8px ${success}` }} />
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs px-3 py-2 rounded-lg max-w-[85%]" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      Salve! Per quel tipo di intervento il preventivo è di €120 + IVA.
                    </div>
                    <div className="text-xs px-3 py-2 rounded-lg max-w-[85%]" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      Posso passare domani mattina alle 10. Le va bene?
                    </div>
                    <div className="text-[10px] mt-2" style={{ color: '#666', fontFamily: 'var(--font-mono)' }}>RICEVUTO 12 MIN FA</div>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mt-10">
                  <span className="number-xl font-medium" style={{ fontSize: 'clamp(56px, 7vw, 80px)', lineHeight: 1, color: 'white', letterSpacing: '-0.05em' }}>1h 47m</span>
                  <span className="text-sm" style={{ color: '#777' }}>tempo medio</span>
                </div>
              </div>
            </div>

            {[
              { icon: Lock, title: 'Pagamento sicuro', desc: 'Versiamo i fondi al professionista solo a lavoro completato. Protezione Stripe Connect.' },
              { icon: BadgeCheck, title: 'P.IVA verificate', desc: 'Ogni professionista è verificato manualmente dal nostro team.' },
              { icon: MessageSquare, title: 'Chat integrata', desc: 'Comunichi direttamente, senza scambiare numeri di telefono.' },
              { icon: Sparkles, title: 'Recensioni reali', desc: 'Solo chi ha completato un lavoro può lasciare una recensione.' },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="glow-card rounded-2xl p-6 bg-white" style={{ border: `1px solid ${border}` }}>
                  <div className="w-10 h-10 rounded-lg mb-5 flex items-center justify-center" style={{ background: `${accent}10` }}>
                    <Icon className="w-4 h-4" style={{ color: accent }} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg tracking-[-0.02em] font-medium mb-2" style={{ color: ink }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: subtle }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── Testimonials ───────── */}
      <section className="bg-white pb-32 border-t" style={{ borderColor: border }}>
        <div className="max-w-[1280px] mx-auto px-6 pt-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] block mb-4" style={{ color: accent, fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
              ◆ Testimonianze
            </span>
            <h2 className="text-4xl lg:text-5xl tracking-[-0.04em] font-medium" style={{ color: ink }}>
              Le storie di chi ha già scelto TrovaPro.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="glow-card relative rounded-2xl p-7 bg-white" style={{ border: `1px solid ${border}` }}>
                <Quote className="absolute top-7 right-7 w-7 h-7" style={{ color: border }} fill={border} strokeWidth={0} />
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4" fill="#FFB020" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-[15px] leading-relaxed mb-6" style={{ color: ink }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-5 border-t" style={{ borderColor: border }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white" style={{ background: t.color }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: ink }}>{t.name}</p>
                    <p className="text-xs" style={{ color: subtle }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Pricing ───────── */}
      <section className="bg-white pb-32 border-t" style={{ borderColor: border }}>
        <div className="max-w-[1280px] mx-auto px-6 pt-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] block mb-4" style={{ color: accent, fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
              ◆ Piani per professionisti
            </span>
            <h2 className="text-4xl lg:text-5xl tracking-[-0.04em] font-medium mb-4" style={{ color: ink }}>
              Inizia gratis. Cresci quando vuoi.
            </h2>
            <p className="text-base" style={{ color: subtle }}>
              I clienti non pagano nulla. I professionisti scelgono il piano che preferiscono.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {PLANS.map((p, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-7 ${p.popular ? 'plan-popular' : 'bg-white'}`}
                style={{ border: p.popular ? '1px solid transparent' : `1px solid ${border}` }}
              >
                {p.popular && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                    style={{ background: accent, color: 'white', fontFamily: 'var(--font-mono)' }}
                  >
                    Più scelto
                  </span>
                )}

                <h3 className="text-base font-medium mb-1" style={{ color: p.popular ? 'white' : ink, fontFamily: 'var(--font-mono)' }}>
                  {p.name.toUpperCase()}
                </h3>
                <p className="text-xs mb-6" style={{ color: p.popular ? '#999' : subtle }}>
                  {p.period}
                </p>

                <div className="flex items-baseline gap-1 mb-7">
                  <span className="text-xs" style={{ color: p.popular ? '#999' : subtle }}>€</span>
                  <span className="text-5xl number-xl font-medium" style={{ color: p.popular ? 'white' : ink }}>
                    {p.price}
                  </span>
                  {p.price !== '0' && <span className="text-xs" style={{ color: p.popular ? '#999' : subtle }}>/mese</span>}
                </div>

                <button
                  className="w-full py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-90 mb-7"
                  style={{ background: p.popular ? 'white' : ink, color: p.popular ? dark : 'white' }}
                >
                  {p.cta}
                </button>

                <ul className="space-y-2.5">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: p.popular ? 'rgba(255,255,255,0.85)' : ink }}>
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: p.popular ? accent : success }} strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FAQ accordion ───────── */}
      <section className="bg-white pb-32 border-t" style={{ borderColor: border }}>
        <div className="max-w-[1280px] mx-auto px-6 pt-32">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] block mb-4" style={{ color: accent, fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
                ◆ Domande frequenti
              </span>
              <h2 className="text-4xl tracking-[-0.04em] font-medium mb-4" style={{ color: ink }}>
                Tutto quello che vuoi sapere.
              </h2>
              <p className="text-base mb-6" style={{ color: subtle }}>
                Non trovi una risposta? Scrivici a{' '}
                <a href="mailto:hello@trovapro.it" className="underline" style={{ color: ink }}>hello@trovapro.it</a>
              </p>
              <a className="text-sm flex items-center gap-1 hover:gap-2 transition-all font-medium" style={{ color: accent }}>
                Centro assistenza <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="space-y-3">
              {FAQS.map((f, i) => (
                <details key={i} className="faq group rounded-xl bg-white open:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-shadow" style={{ border: `1px solid ${border}` }}>
                  <summary className="flex items-center justify-between gap-4 p-5">
                    <h3 className="text-[15px] font-medium tracking-[-0.01em] flex-1" style={{ color: ink }}>
                      {f.q}
                    </h3>
                    <Plus className="faq-icon w-4 h-4 flex-shrink-0" style={{ color: subtle }} strokeWidth={2} />
                  </summary>
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-sm leading-relaxed" style={{ color: subtle }}>{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Pro CTA con dashboard mockup ───────── */}
      <section className="relative overflow-hidden" style={{ background: dark }}>
        <div className="aurora" style={{ opacity: 0.6 }} />

        <div className="relative max-w-[1280px] mx-auto px-6 py-32">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] block mb-5" style={{ color: '#7AA8FF', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
                ◆ Per professionisti
              </span>
              <h2 className="font-medium tracking-[-0.05em]" style={{ fontSize: 'clamp(48px, 6vw, 72px)', lineHeight: 0.95 }}>
                <span className="gradient-text">Più clienti.</span><br />
                <span className="accent-text">Meno fatica.</span>
              </h2>
              <p className="mt-8 max-w-md text-base" style={{ color: '#aaa' }}>
                Crea il tuo profilo in 5 minuti. Ricevi richieste qualificate, gestisci tutto da una sola dashboard.
              </p>

              <div className="mt-10 flex items-center gap-3 flex-wrap">
                <button className="px-5 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90 flex items-center gap-1.5" style={{ background: 'white', color: dark }}>
                  Inizia gratis <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-5 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/5 border" style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'white' }}>
                  Vedi i piani
                </button>
              </div>

              <div className="mt-12 flex items-center gap-6 pt-8 border-t" style={{ borderColor: borderDark }}>
                <div>
                  <div className="text-2xl number-xl font-medium" style={{ color: 'white' }}>1.247</div>
                  <div className="text-xs" style={{ color: '#888' }}>professionisti attivi</div>
                </div>
                <div>
                  <div className="text-2xl number-xl font-medium" style={{ color: 'white' }}>€2.4M</div>
                  <div className="text-xs" style={{ color: '#888' }}>fatturato generato</div>
                </div>
                <div>
                  <div className="text-2xl number-xl font-medium" style={{ color: 'white' }}>4.7★</div>
                  <div className="text-xs" style={{ color: '#888' }}>valutazione pro</div>
                </div>
              </div>
            </div>

            {/* Dashboard mockup */}
            <div className="relative float">
              <div className="absolute inset-0 -z-10 rounded-3xl" style={{ background: `radial-gradient(50% 50% at 50% 50%, ${accent}40, transparent 70%)`, filter: 'blur(60px)' }} />

              <div className="rounded-2xl p-2 backdrop-blur-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="rounded-xl overflow-hidden" style={{ background: '#0F0F0F' }}>
                  {/* Window chrome */}
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: borderDark }}>
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FFBD2E' }} />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28CA42' }} />
                    </div>
                    <div className="ml-3 px-2 py-0.5 rounded text-[10px]" style={{ background: 'rgba(255,255,255,0.05)', color: '#888', fontFamily: 'var(--font-mono)' }}>
                      trovapro.it/dashboard
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-5">
                      <h4 className="text-sm text-white font-medium">Buongiorno, Mario</h4>
                      <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: success + '20', color: success, fontFamily: 'var(--font-mono)' }}>
                        +18% MESE
                      </span>
                    </div>

                    {/* KPI row */}
                    <div className="grid grid-cols-3 gap-2 mb-5">
                      {[
                        { v: '€3.420', l: 'Fatturato' },
                        { v: '24', l: 'Lead' },
                        { v: '4.9', l: 'Rating' },
                      ].map((k, i) => (
                        <div key={i} className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <div className="text-base text-white font-medium number-xl">{k.v}</div>
                          <div className="text-[10px]" style={{ color: '#888' }}>{k.l}</div>
                        </div>
                      ))}
                    </div>

                    {/* Mini chart */}
                    <div className="rounded-lg p-3 mb-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px]" style={{ color: '#888', fontFamily: 'var(--font-mono)' }}>VISUALIZZAZIONI</span>
                        <span className="text-[10px]" style={{ color: success, fontFamily: 'var(--font-mono)' }}>+24%</span>
                      </div>
                      <Sparkline data={[12,18,22,15,28,32,38,35,42,48,45,52]} color={accent} height={48} width={280} />
                    </div>

                    {/* Recent leads */}
                    <div className="space-y-2">
                      {[
                        { n: 'Anna M.', d: 'Impianto cucina', t: '2m fa', dot: success },
                        { n: 'Roberto C.', d: 'Quadro elettrico', t: '15m fa', dot: '#FFB020' },
                        { n: 'Laura S.', d: 'Domotica', t: '1h fa', dot: subtle },
                      ].map((l, i) => (
                        <div key={i} className="flex items-center gap-3 rounded-lg p-2.5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: l.dot }} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-white truncate">{l.n}</p>
                            <p className="text-[10px] truncate" style={{ color: '#888' }}>{l.d}</p>
                          </div>
                          <span className="text-[10px]" style={{ color: '#666', fontFamily: 'var(--font-mono)' }}>{l.t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Footer ───────── */}
      <footer className="bg-white border-t" style={{ borderColor: border }}>
        <div className="max-w-[1280px] mx-auto px-6 py-16">
          <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-12 mb-16">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: ink }}>
                  <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-[15px] font-semibold tracking-tight" style={{ color: ink, letterSpacing: '-0.01em' }}>trovapro</span>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: subtle }}>
                Il modo più semplice di trovare professionisti qualificati nella tua zona. Verificati, valutati, pronti a partire.
              </p>
              <div className="flex items-center gap-2">
                <a className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-neutral-100" style={{ border: `1px solid ${border}`, color: ink }}>
                  <Twitter className="w-3.5 h-3.5" strokeWidth={1.75} />
                </a>
                <a className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-neutral-100" style={{ border: `1px solid ${border}`, color: ink }}>
                  <Instagram className="w-3.5 h-3.5" strokeWidth={1.75} />
                </a>
                <a className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-neutral-100" style={{ border: `1px solid ${border}`, color: ink }}>
                  <Linkedin className="w-3.5 h-3.5" strokeWidth={1.75} />
                </a>
                <a className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-neutral-100" style={{ border: `1px solid ${border}`, color: ink }}>
                  <Mail className="w-3.5 h-3.5" strokeWidth={1.75} />
                </a>
              </div>
            </div>

            {[
              { title: 'Prodotto', links: ['Cerca professionisti', 'Categorie', 'Mappa', 'Mobile app'] },
              { title: 'Per professionisti', links: ['Iscriviti', 'Piani e prezzi', 'Centro risorse', 'Affiliati'] },
              { title: 'Azienda', links: ['Chi siamo', 'Blog', 'Lavora con noi', 'Press'] },
              { title: 'Legale', links: ['Termini', 'Privacy', 'Cookie', 'Aiuto'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs uppercase tracking-[0.15em] mb-4" style={{ color: ink, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a className="text-sm hover:text-black transition-colors" style={{ color: subtle }}>{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4 pt-8 border-t text-xs" style={{ borderColor: border, color: subtle }}>
            <div className="flex items-center gap-4">
              <span style={{ fontFamily: 'var(--font-mono)' }}>© 2026 TrovaPro · P.IVA 12345678901</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3 h-3" />
                Italia
              </span>
              <span className="flex items-center gap-1.5">
                <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: success }} />
                All systems operational
              </span>
            </div>
          </div>
        </div>

        <div className="border-t" style={{ borderColor: border, background: surface }}>
          <div className="max-w-[1280px] mx-auto px-6 py-4 text-center text-xs" style={{ color: subtle }}>
            v0.6 · Montserrat · Hero dark · Stats sparkline · Categories · Featured · Bento + chat · Testimonials · Pricing · FAQ · Pro CTA + dashboard mockup ·{' '}
            <Link href="/" style={{ color: ink, fontWeight: 500 }}>Torna al sito attuale →</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
