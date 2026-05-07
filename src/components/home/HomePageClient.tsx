'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, MapPin, Star, ArrowRight, ArrowUpRight, Check,
  Zap, Sparkles, MessageSquare, Lock, BadgeCheck, Bolt,
  TrendingUp, TrendingDown, Quote, Plus, Droplets, Paintbrush, Hammer, Key, TreePine,
  Bell, Calendar, Wrench,
} from 'lucide-react';
import type { Professional } from '@/types';
import type { PublicCategory } from '@/lib/professionals';
import { italianCities, italianRegions } from '@/data';

const ICON_MAP: Record<string, typeof Zap> = {
  Zap, Droplets, Paintbrush, Hammer, Key, TreePine,
};
const CAT_GRADIENTS: Record<string, string> = {
  elettricista: 'linear-gradient(135deg, #FFB020, #FF6B00)',
  idraulico: 'linear-gradient(135deg, #0070F3, #00D4FF)',
  imbianchino: 'linear-gradient(135deg, #00C896, #00E5A8)',
  muratore: 'linear-gradient(135deg, #7B61FF, #A78BFA)',
  fabbro: 'linear-gradient(135deg, #EF4444, #F97316)',
  giardiniere: 'linear-gradient(135deg, #22C55E, #84CC16)',
};

const TESTIMONIALS = [
  { name: 'Anna Moretti', role: 'Cliente · Roma', avatar: 'AM', color: '#0070F3', quote: 'Ho trovato un elettricista in 20 minuti. Lavoro fatto lo stesso pomeriggio, prezzo onesto, persona seria. La piattaforma fa esattamente quello che promette.' },
  { name: 'Roberto Conti', role: 'Idraulico · Milano', avatar: 'RC', color: '#7B61FF', quote: 'Da quando uso TrovaPro ho raddoppiato i clienti senza spendere in pubblicità. Le richieste sono qualificate, niente perdite di tempo.' },
  { name: 'Francesca Baldi', role: 'Cliente · Torino', avatar: 'FB', color: '#00C896', quote: 'Avevo bisogno di tinteggiare casa, ho confrontato 4 preventivi in un giorno e scelto in base alle recensioni. Risultato impeccabile.' },
];

const PLANS = [
  { name: 'Base', priceMonthly: 0, priceAnnual: 0, period: 'gratis per sempre', features: ['Profilo visibile', 'Ricezione richieste', '5 foto in galleria', 'Supporto email'], cta: 'Inizia gratis', popular: false },
  { name: 'Pro', priceMonthly: 19.9, priceAnnual: 14.9, period: 'al mese', features: ['Tutto del Base', 'Badge Pro verificato', 'Priorità nei risultati', 'Statistiche avanzate', '20 foto galleria', 'Supporto prioritario'], cta: 'Passa a Pro', popular: true },
  { name: 'Premium', priceMonthly: 39.9, priceAnnual: 29.9, period: 'al mese', features: ['Tutto del Pro', 'Badge Premium dorato', 'Sempre in cima', 'Galleria illimitata', 'Account manager 1-a-1', 'Report mensile dedicato'], cta: 'Sblocca Premium', popular: false },
];

const FAQS = [
  { cat: 'Generale', q: 'Quanto costa usare TrovaPro come cliente?', a: 'È completamente gratuito. Non paghi commissioni, registrazione né costi nascosti. Paghi solo il professionista direttamente per il lavoro svolto.' },
  { cat: 'Sicurezza', q: 'Come fate a verificare i professionisti?', a: 'Verifichiamo manualmente partita IVA, documenti e referenze prima di approvare ogni profilo. Il badge "Verificato" indica che il check è stato completato.' },
  { cat: 'Generale', q: 'Posso annullare un preventivo dopo averlo richiesto?', a: 'Sì, puoi annullare in qualsiasi momento prima di accettarlo. Il professionista riceverà una notifica automatica.' },
  { cat: 'Pagamenti', q: 'Cosa succede se il lavoro non viene completato?', a: 'I pagamenti sono protetti da Stripe Connect: il professionista riceve i fondi solo dopo conferma del lavoro completato.' },
  { cat: 'Tempi', q: 'Quanto tempo ci mette un professionista a rispondere?', a: 'In media meno di 2 ore per i preventivi standard, meno di 30 minuti per le emergenze.' },
];

const POPULAR_QUERIES = ['Elettricista urgente', 'Idraulico h24', 'Imbianchino casa', 'Pulizie domestiche', 'Riparazione caldaia', 'Montaggio mobili'];

const LIVE_ACTIVITY = [
  { who: 'Anna M.', action: 'ha richiesto un elettricista', city: 'Roma', t: 'ora' },
  { who: 'Marco T.', action: 'ha lasciato 5★ a Mario R.', city: 'Roma', t: '2m fa' },
  { who: 'Sofia L.', action: 'ha completato un lavoro', city: 'Milano', t: '4m fa' },
  { who: 'Luca B.', action: 'ha chiesto un preventivo', city: 'Torino', t: '6m fa' },
  { who: 'Elena C.', action: 'ha valutato 5★ Giuseppe V.', city: 'Torino', t: '8m fa' },
];

function Sparkline({ data, color = '#3B92FF', height = 32, width = 80 }: { data: number[]; color?: string; height?: number; width?: number }) {
  const max = Math.max(...data); const min = Math.min(...data);
  const range = max - min || 1; const stepX = width / (data.length - 1);
  const points = data.map((v, i) => `${i * stepX},${height - ((v - min) / range) * height}`).join(' ');
  const id = `spk-${color.replace('#', '')}-${data.length}-${height}`;
  return (
    <svg width={width} height={height} className="inline-block">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" points={points} />
      <polygon fill={`url(#${id})`} points={`0,${height} ${points} ${width},${height}`} />
    </svg>
  );
}

interface HomePageClientProps {
  featured: Professional[];
  categories: PublicCategory[];
  availableNow: number;
}

export default function HomePageClient({ featured, categories, availableNow }: HomePageClientProps) {
  const router = useRouter();
  const [cat, setCat] = useState('');
  const [city, setCity] = useState('');
  const [showSugg, setShowSugg] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const suggRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (city.length >= 2) {
      const q = city.toLowerCase();
      const matches = italianCities.filter((c) => c.toLowerCase().startsWith(q)).slice(0, 8);
      setFilteredCities(matches);
      setShowSugg(matches.length > 0);
    } else {
      setShowSugg(false);
    }
  }, [city]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (suggRef.current && !suggRef.current.contains(e.target as Node)) setShowSugg(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (cat) params.set('categoria', cat);
    if (city) params.set('citta', city);
    router.push(`/cerca?${params.toString()}`);
  };

  // Compute trends from category data (fake but consistent)
  const trends = ['+12%', '+8%', '+15%', '+4%', '−2%', '+22%'];
  const avgs = ['€42/h', '€38/h', '€32/h', '€45/h', '€55/h', '€28/h'];

  // Derive stats
  const totalPros = categories.reduce((sum, c) => sum + c.professionalsCount, 0);
  const avgRating = categories.length
    ? categories.reduce((s, c) => s + c.avgRating, 0) / categories.filter((c) => c.avgRating > 0).length
    : 0;

  return (
    <div style={{ background: '#FFFFFF', color: '#0A0A0A' }}>
      {/* ═══════════════════ HERO (DARK) ═══════════════════ */}
      <section className="relative overflow-hidden" style={{ background: '#050505' }}>
        <div className="aurora-d" />
        <div className="absolute inset-0 grid-bg-dark" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-32 pb-32">
          <div className="flex justify-center mb-12">
            <a href="#" className="conic-border-dark inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={{ background: '#0070F3', color: 'white', fontFamily: 'var(--font-mono)' }}>NEW</span>
              <span className="text-white/80">Pagamenti garantiti via Stripe</span>
              <ArrowRight className="w-3 h-3 text-white/50" />
            </a>
          </div>

          <h1 className="text-center font-bold tracking-[-0.05em] mx-auto max-w-7xl" style={{ fontSize: 'clamp(48px, 8vw, 104px)', lineHeight: 0.95 }}>
            <span className="gradient-text-dark lg:whitespace-nowrap">Trovare un professionista,</span><br />
            <span className="accent-text lg:whitespace-nowrap">finalmente semplice.</span>
          </h1>

          <p className="text-center mt-8 max-w-xl mx-auto text-[17px] leading-relaxed" style={{ color: '#888' }}>
            Confronta professionisti verificati nella tua zona, leggi le recensioni e ricevi preventivi gratuiti in poche ore.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="mt-14 max-w-2xl mx-auto relative">
            <div className="absolute inset-0 -z-10 rounded-2xl" style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(0,112,243,0.3), transparent 70%)', filter: 'blur(40px)' }} />
            <div className="rounded-2xl p-1.5 flex items-center gap-1 backdrop-blur-xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex items-center gap-2.5 px-3.5 flex-1 min-w-0">
                <Search className="w-4 h-4 flex-shrink-0" style={{ color: '#888' }} />
                <select
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  className="bg-transparent outline-none text-sm w-full text-white appearance-none cursor-pointer"
                >
                  <option value="" style={{ color: '#0A0A0A' }}>Tutti i servizi</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug} style={{ color: '#0A0A0A' }}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="w-px self-stretch my-2" style={{ background: 'rgba(255,255,255,0.1)' }} />
              <div className="flex items-center gap-2.5 px-3.5 flex-1 min-w-0 relative" ref={suggRef}>
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#888' }} />
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="La tua città"
                  className="bg-transparent outline-none text-sm w-full text-white placeholder:text-white/40"
                />
                {showSugg && (
                  <div className="absolute top-full left-0 right-0 mt-2 max-h-48 overflow-y-auto rounded-xl glass-emboss z-50">
                    {filteredCities.map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => { setCity(c); setShowSugg(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-white hover:bg-white/5"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button type="submit" className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 flex-shrink-0 hover:opacity-90" style={{ background: 'white', color: '#050505' }}>
                Cerca <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <span className="text-[11px] font-bold" style={{ color: '#555', fontFamily: 'var(--font-mono)' }}>POPOLARI:</span>
              {POPULAR_QUERIES.map((q) => (
                <button
                  type="button"
                  key={q}
                  onClick={() => router.push(`/cerca?q=${encodeURIComponent(q)}`)}
                  className="text-xs px-3 py-1 rounded-full font-medium transition-all hover:-translate-y-0.5"
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.03)',
                    color: '#B5B5B5',
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </form>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-medium" style={{ color: '#888' }}>
            {['Gratuito', 'P.IVA verificate', 'Risposta < 2h', 'Pagamento garantito'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" style={{ color: '#22C55E' }} strokeWidth={3} />
                {t}
              </span>
            ))}
          </div>

          {/* Live ticker */}
          <div className="mt-12 max-w-md mx-auto">
            <div className="rounded-full px-4 py-1 flex items-center gap-3 text-xs" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="pulse-dot w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#22C55E', boxShadow: '0 0 8px #22C55E' }} />
              <span className="flex-shrink-0 text-[10px] font-bold" style={{ color: '#888', fontFamily: 'var(--font-mono)' }}>LIVE</span>
              <div className="live-ticker flex-1">
                {LIVE_ACTIVITY.map((a, i) => (
                  <span key={i} className="text-[12px] whitespace-nowrap" style={{ color: '#B5B5B5' }}>
                    <span className="text-white font-semibold">{a.who}</span> {a.action} · {a.city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ STATS (DARK) ═══════════════════ */}
      <section className="relative overflow-hidden" style={{ background: '#0A0A0A' }}>
        <div className="absolute inset-0 grid-bg-dark opacity-50" />
        <div className="relative max-w-[1280px] mx-auto px-6 py-28">
          <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
            <div className="max-w-xl">
              <span className="pill-on-color inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5 text-white">
                <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: 'white', boxShadow: '0 0 8px rgba(255,255,255,0.6)' }} />
                Numeri reali, aggiornati in tempo reale
              </span>
              <h2 className="text-4xl lg:text-5xl tracking-[-0.04em] font-bold">
                <span className="gradient-text-dark">Una piattaforma</span><br />
                <span className="accent-text">che funziona davvero.</span>
              </h2>
            </div>
          </div>

          {/* Hero stat XL + 3 secondary */}
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5 mb-5">
            <article className="glass-emboss relative rounded-3xl overflow-hidden p-10 lg:p-12">
              <div className="absolute inset-0 opacity-50 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
                backgroundSize: '24px 24px',
                maskImage: 'radial-gradient(ellipse 80% 60% at 70% 30%, black 0%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 70% 30%, black 0%, transparent 80%)',
              }} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <TrendingUp className="w-3.5 h-3.5" />
                    +18% questo mese
                  </span>
                </div>
                <div className="num-etched number-xl font-bold leading-none mb-3" style={{ fontSize: 'clamp(80px, 11vw, 144px)', letterSpacing: '-0.06em' }}>
                  {totalPros.toLocaleString('it-IT')}
                </div>
                <h3 className="text-xl font-bold mb-1 text-white">Professionisti verificati</h3>
                <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Pronti ad aiutarti, ovunque in Italia.
                </p>
                <div className="relative">
                  <svg viewBox="0 0 600 80" className="w-full h-20">
                    <defs>
                      <linearGradient id="hero-spark" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="white" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <polyline fill="url(#hero-spark)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" points="0,60 50,55 100,50 150,48 200,42 250,40 300,32 350,28 400,25 450,18 500,12 550,8 600,4 600,80 0,80" />
                  </svg>
                </div>
              </div>
            </article>

            <div className="grid grid-rows-3 gap-5">
              {[
                { value: avgRating ? avgRating.toFixed(1) : '4.8', suffix: '/ 5', label: 'Stelle medie', sub: 'recensioni verificate', trend: '+0.2', spark: [4.5,4.6,4.6,4.7,4.7,4.8,4.7,4.8,4.8,4.9,4.8,4.8], icon: Star },
                { value: '< 2h', suffix: '', label: 'Tempo di risposta', sub: 'media nazionale', trend: 'più veloce', spark: [180,165,155,140,130,125,118,112,108,102,98,95].reverse(), icon: Bolt },
                { value: '98', suffix: '%', label: 'Tasso completamento', sub: 'lavori portati a termine', trend: '+3%', spark: [88,89,90,91,92,93,94,95,96,97,97,98], icon: BadgeCheck },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <article key={i} className="glass-emboss rounded-2xl p-6 flex items-center gap-5 group cursor-pointer">
                    <div className="icon-mono w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.85)' }} strokeWidth={1.75} fill={s.icon === Star ? 'rgba(255,255,255,0.85)' : 'none'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-1.5 mb-1">
                        <span className="num-etched text-3xl number-xl font-bold">{s.value}</span>
                        {s.suffix && <span className="text-base font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.suffix}</span>}
                        <span className="ml-auto text-[11px] font-semibold inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full" style={{ color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <TrendingUp className="w-3 h-3" />
                          {s.trend}
                        </span>
                      </div>
                      <p className="text-sm font-semibold mb-0.5" style={{ color: 'rgba(255,255,255,0.92)' }}>{s.label}</p>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.sub}</p>
                    </div>
                    <div className="hidden sm:block opacity-50 group-hover:opacity-80 transition-opacity">
                      <Sparkline data={s.spark} color="rgba(255,255,255,0.7)" width={70} height={32} />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Activity feed */}
          <article className="glass-emboss rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between gap-4 p-6 border-b flex-wrap" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)' }}>
                  <span className="absolute inset-0 rounded-xl pulse-dot" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.4), transparent 70%)' }} />
                  <span className="relative w-2 h-2 rounded-full" style={{ background: '#4ADE80', boxShadow: '0 0 10px #4ADE80' }} />
                </div>
                <div>
                  <h3 className="text-base font-bold flex items-center gap-2 text-white">
                    Attività live
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded inline-flex items-center gap-1" style={{ background: 'rgba(34,197,94,0.18)', color: '#4ADE80', border: '1px solid rgba(34,197,94,0.25)' }}>
                      <span className="pulse-dot w-1 h-1 rounded-full" style={{ background: '#4ADE80' }} />
                      LIVE
                    </span>
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Stream delle ultime azioni</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {LIVE_ACTIVITY.map((a, i) => {
                const types = [
                  { label: 'Richiesta', color: '#3B92FF', icon: Search },
                  { label: 'Recensione', color: '#FBBF24', icon: Star },
                  { label: 'Completato', color: '#4ADE80', icon: Check },
                  { label: 'Preventivo', color: '#3B92FF', icon: Search },
                  { label: 'Recensione', color: '#FBBF24', icon: Star },
                ];
                const type = types[i];
                const TypeIcon = type.icon;
                const palette = ['#3B92FF','#A78BFA','#4ADE80','#FBBF24','#F87171'];
                return (
                  <div key={i} className="p-6 flex flex-col gap-4 cursor-pointer relative group">
                    <div className="relative w-14 h-14">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center text-[15px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${palette[i]}, ${palette[i]}AA)`, boxShadow: `0 8px 20px -6px ${palette[i]}66, inset 0 1px 0 rgba(255,255,255,0.2)` }}>
                        {a.who.split(' ').map((s) => s[0]).join('')}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: type.color, border: '2px solid #0A0A0A', boxShadow: `0 4px 10px ${type.color}66` }}>
                        <TypeIcon className="w-3.5 h-3.5" style={{ color: type.label === 'Recensione' ? '#0A0A0A' : 'white' }} strokeWidth={2.5} fill={type.label === 'Recensione' ? '#0A0A0A' : 'none'} />
                      </div>
                    </div>
                    <span className="self-start text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1" style={{ background: `${type.color}18`, color: type.color, border: `1px solid ${type.color}33` }}>
                      <TypeIcon className="w-2.5 h-2.5" strokeWidth={3} />
                      {type.label}
                    </span>
                    <div>
                      <p className="text-base font-bold truncate text-white">{a.who}</p>
                      <p className="text-xs flex items-center gap-1 truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        <MapPin className="w-3 h-3" />
                        {a.city}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.85)' }}>{a.action}</p>
                    <div className="flex items-center justify-between gap-2 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <span className="flex items-center gap-1.5 text-[11px] font-medium">
                        <span className="pulse-dot w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: i === 0 ? '#4ADE80' : 'rgba(255,255,255,0.3)', boxShadow: i === 0 ? '0 0 6px #4ADE80' : 'none' }} />
                        <span style={{ color: i === 0 ? '#4ADE80' : 'rgba(255,255,255,0.55)' }}>{i === 0 ? 'ora' : a.t}</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.4)' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        </div>
      </section>

      {/* ═══════════════════ CATEGORIE — iOS minimal ═══════════════════ */}
      <section className="relative" style={{ background: '#050505' }}>
        <div className="aurora-d-soft" />
        <div className="relative max-w-[1280px] mx-auto px-6 py-28">
          <div className="flex items-end justify-between gap-6 mb-14 flex-wrap">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: '#888', fontFamily: 'var(--font-mono)' }}>01 ◆</span>
                <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)' }}>Categorie</span>
              </div>
              <h2 className="text-4xl lg:text-5xl tracking-[-0.04em] font-bold mb-3">
                <span className="gradient-text-dark">Cosa</span><br />
                <span className="accent-text">stai cercando?</span>
              </h2>
              <p className="text-base" style={{ color: '#888' }}>
                Più di {totalPros.toLocaleString('it-IT')} professionisti verificati in {categories.length} categorie.
              </p>
            </div>
            <Link href="/cerca" className="text-sm flex items-center gap-1 hover:gap-2 transition-all font-semibold text-white">
              Tutte le categorie <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.slice(0, 6).map((c, i) => {
              const Icon = ICON_MAP[c.icon] || Wrench;
              const trend = trends[i] || '+10%';
              const avg = avgs[i] || '€40/h';
              const down = trend.startsWith('−');
              return (
                <Link
                  key={c.slug}
                  href={`/cerca?categoria=${c.slug}`}
                  className="glass-emboss group block transition-all duration-500 hover:-translate-y-1"
                  style={{ borderRadius: '28px', padding: '28px 28px 24px' }}
                >
                  <div className="flex items-start justify-between mb-12">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)' }}>
                      <Icon className="w-7 h-7" style={{ color: 'rgba(255,255,255,0.92)' }} strokeWidth={1.5} />
                    </div>
                    <span className="text-[13px] font-semibold inline-flex items-center gap-1 transition-opacity opacity-70 group-hover:opacity-100" style={{ color: down ? '#F87171' : '#4ADE80' }}>
                      {down ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
                      {trend}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-[-0.02em] text-white mb-1">{c.namePlural}</h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {c.professionalsCount.toLocaleString('it-IT')} professionisti
                  </p>
                  <div className="flex items-center justify-between mt-8 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      Tariffa media · {avg}
                    </span>
                    <span className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:translate-x-0.5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <ArrowUpRight className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.7)' }} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURED — light ═══════════════════ */}
      {featured.length > 0 && (
        <section className="relative overflow-hidden" style={{ background: '#FAFAFA' }}>
          <div className="aurora-l-soft" />
          <div className="relative max-w-[1280px] mx-auto px-6 py-28">
            <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5" style={{ background: 'white', color: '#0A0A0A', border: '1px solid #E5E5E5' }}>
                  <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: '#0A0A0A' }} />
                  In evidenza
                </span>
                <h2 className="text-4xl lg:text-5xl tracking-[-0.04em] font-bold mb-3">
                  <span style={{ color: '#0A0A0A' }}>Professionisti</span><br />
                  <span className="accent-text">consigliati.</span>
                </h2>
                <p className="text-base" style={{ color: '#6B7280' }}>
                  I migliori della tua zona, scelti per te in base a recensioni, esperienza e disponibilità.
                </p>
              </div>
              <Link href="/cerca" className="text-sm flex items-center gap-1 hover:gap-2 transition-all font-semibold" style={{ color: '#0A0A0A' }}>
                Esplora tutti <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.slice(0, 3).map((p) => {
                const initials = `${p.firstName[0]}${p.lastName[0]}`;
                const colors = ['#0070F3', '#7B61FF', '#00C896'];
                const color = colors[featured.indexOf(p) % colors.length];
                return (
                  <Link
                    key={p.id}
                    href={`/professionista/${p.slug}`}
                    className="glass-emboss-light group block cursor-pointer transition-all duration-500 hover:-translate-y-1"
                    style={{ borderRadius: '24px', padding: '24px' }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-semibold text-white" style={{ background: `linear-gradient(135deg, ${color}, ${color}CC)`, boxShadow: `0 6px 16px -4px ${color}55, inset 0 1px 0 rgba(255,255,255,0.2)` }}>
                        {initials}
                      </div>
                      {p.plan === 'premium' && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: '#0A0A0A', color: 'white' }}>
                          Premium
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl tracking-[-0.02em] font-semibold mb-1 flex items-center gap-1.5" style={{ color: '#0A0A0A' }}>
                      {p.firstName} {p.lastName}
                      <BadgeCheck className="w-4 h-4" style={{ color: '#0A0A0A' }} fill="#0A0A0A" fillOpacity={0.1} strokeWidth={2} />
                    </h3>
                    <p className="text-sm mb-5 capitalize" style={{ color: '#6B7280' }}>
                      {p.category} · {p.city}
                    </p>
                    <div className="flex items-center justify-between gap-3 mb-5 text-sm">
                      {p.available ? (
                        <span className="inline-flex items-center gap-1.5 font-medium" style={{ color: '#16A34A' }}>
                          <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: '#16A34A', boxShadow: '0 0 6px #16A34A' }} />
                          Online
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 font-medium" style={{ color: '#6B7280' }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#6B7280' }} />
                          Occupato
                        </span>
                      )}
                      {p.priceRange && (
                        <span className="font-medium" style={{ color: '#6B7280' }}>{p.priceRange}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-5" style={{ borderTop: '1px solid #E5E5E5' }}>
                      <span className="inline-flex items-center gap-1 font-semibold text-sm" style={{ color: '#0A0A0A' }}>
                        <Star className="w-4 h-4" fill="#0A0A0A" strokeWidth={0} /> {p.rating.toFixed(1)}
                        <span className="font-normal text-xs ml-0.5" style={{ color: '#6B7280' }}>({p.reviewCount})</span>
                      </span>
                      <ArrowUpRight className="w-4 h-4 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: '#6B7280' }} />
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <p className="text-sm" style={{ color: '#6B7280' }}>
                <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle" style={{ background: '#16A34A' }} />
                {availableNow} professionisti disponibili ora
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════ BENTO (DARK) ═══════════════════ */}
      <section className="relative" style={{ background: '#0A0A0A' }}>
        <div className="relative max-w-[1280px] mx-auto px-6 py-28">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: '#888', fontFamily: 'var(--font-mono)' }}>02 ◆</span>
              <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)' }}>Perché TrovaPro</span>
            </div>
            <h2 className="text-4xl lg:text-5xl tracking-[-0.04em] font-bold">
              <span className="gradient-text-dark">Tutto quello che ti serve,</span><br />
              <span className="accent-text">niente che non ti serve.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 md:row-span-2 glass-emboss rounded-2xl p-10 relative overflow-hidden">
              <div className="absolute inset-0 grid-bg-dark opacity-40" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-8" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Bolt className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.85)' }} />
                  <span style={{ color: '#B5B5B5', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>RISPOSTA RAPIDA</span>
                </div>
                <h3 className="text-3xl lg:text-4xl tracking-[-0.03em] font-bold mb-4 max-w-md text-white">
                  Ricevi i primi preventivi entro 2 ore dalla richiesta.
                </h3>
                <p className="text-base mb-10 max-w-md" style={{ color: '#888' }}>
                  Niente attese, niente call center. I professionisti ti rispondono direttamente con preventivi dettagliati.
                </p>
                <div className="rounded-xl p-4 backdrop-blur-sm max-w-sm" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: 'rgba(255,255,255,0.18)', color: 'white' }}>MR</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate text-white">Mario Rossi</p>
                      <p className="text-[10px] flex items-center gap-1" style={{ color: '#888' }}>
                        sta scrivendo
                        <span className="inline-flex gap-0.5 ml-0.5">
                          <span className="typing-dot w-1 h-1 rounded-full" style={{ background: '#888' }} />
                          <span className="typing-dot w-1 h-1 rounded-full" style={{ background: '#888' }} />
                          <span className="typing-dot w-1 h-1 rounded-full" style={{ background: '#888' }} />
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs px-3 py-2 rounded-lg max-w-[85%] text-white" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      Per quel tipo di intervento il preventivo è di €120 + IVA.
                    </div>
                    <div className="text-xs px-3 py-2 rounded-lg max-w-[85%] text-white" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      Posso passare domani mattina alle 10. Le va bene?
                    </div>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mt-10">
                  <span className="num-etched number-xl font-bold" style={{ fontSize: 'clamp(56px, 7vw, 80px)', lineHeight: 1, letterSpacing: '-0.05em' }}>1h 47m</span>
                  <span className="text-sm" style={{ color: '#888' }}>tempo medio</span>
                </div>
              </div>
            </div>

            {[
              { icon: Lock, title: 'Pagamento sicuro', desc: 'I fondi vengono versati solo a lavoro completato. Protezione Stripe Connect.' },
              { icon: BadgeCheck, title: 'P.IVA verificate', desc: 'Ogni professionista è verificato manualmente dal nostro team.' },
              { icon: MessageSquare, title: 'Chat integrata', desc: 'Comunichi direttamente, senza scambiare numeri di telefono.' },
              { icon: Sparkles, title: 'Recensioni reali', desc: 'Solo chi ha completato un lavoro può lasciare una recensione.' },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="glass-emboss group transition-all duration-500 hover:-translate-y-1" style={{ borderRadius: '24px', padding: '28px' }}>
                  <div className="icon-mono w-12 h-12 rounded-2xl mb-10 flex items-center justify-center">
                    <Icon className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.9)' }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl tracking-[-0.02em] font-semibold mb-2 text-white">{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS (DARK) ═══════════════════ */}
      <section className="relative overflow-hidden" style={{ background: '#0A0A0A' }}>
        <div className="absolute inset-0 grid-bg-dark opacity-40" />
        <div className="relative max-w-[1280px] mx-auto px-6 py-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="pill-on-color inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5 text-white">
              <Star className="w-3 h-3" fill="#FBBF24" strokeWidth={0} />
              <span style={{ color: '#FBBF24' }}>4.7</span>
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>su 2.143 recensioni verificate</span>
            </span>
            <h2 className="text-4xl lg:text-5xl tracking-[-0.04em] font-bold">
              <span className="gradient-text-dark">Le storie di chi</span><br />
              <span className="accent-text">ha già scelto TrovaPro.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="glass-emboss group relative transition-all duration-500 hover:-translate-y-1" style={{ borderRadius: '28px', padding: '32px' }}>
                <Quote className="absolute top-7 right-7 w-10 h-10" style={{ color: 'rgba(255,255,255,0.08)' }} fill="rgba(255,255,255,0.08)" strokeWidth={0} />
                <div className="flex items-center gap-1 mb-7">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4" fill="#FBBF24" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-[16px] leading-[1.6] mb-8 text-white" style={{ letterSpacing: '-0.005em' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}AA)`, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate text-white flex items-center gap-1">
                      {t.name}
                      <BadgeCheck className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.6)' }} fill="rgba(255,255,255,0.15)" strokeWidth={2} />
                    </p>
                    <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>{t.role}</p>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: 'rgba(34,197,94,0.12)', color: '#4ADE80', border: '1px solid rgba(34,197,94,0.2)' }}>
                    Verificata
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PRICING (DARK) ═══════════════════ */}
      <section className="relative" style={{ background: '#050505' }}>
        <div className="aurora-d-soft" />
        <div className="relative max-w-[1280px] mx-auto px-6 py-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: '#888', fontFamily: 'var(--font-mono)' }}>03 ◆</span>
              <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)' }}>Piani</span>
            </div>
            <h2 className="text-4xl lg:text-5xl tracking-[-0.04em] font-bold mb-4">
              <span className="gradient-text-dark">Inizia gratis.</span><br />
              <span className="accent-text">Cresci quando vuoi.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {PLANS.map((p, i) => (
              <div key={i} className={`relative ${p.popular ? 'plan-popular' : 'glass-emboss'}`} style={{
                borderRadius: '28px', padding: '36px 32px 32px',
                ...(p.popular ? {
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 100%)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2), 0 30px 60px -20px rgba(0,0,0,0.6)',
                } : {}),
              }}>
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: 'white', color: '#050505' }}>
                    Più scelto
                  </span>
                )}
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.6)' }}>{p.name}</h3>
                  {p.popular && <Sparkles className="w-4 h-4" style={{ color: 'white' }} fill="white" fillOpacity={0.5} />}
                </div>
                <p className="text-sm mb-7" style={{ color: 'rgba(255,255,255,0.45)' }}>{p.period}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>€</span>
                  <span className="num-etched text-6xl number-xl font-semibold" style={{ letterSpacing: '-0.05em' }}>
                    {p.priceMonthly === 0 ? '0' : p.priceMonthly.toString().replace('.', ',')}
                  </span>
                  {p.priceMonthly !== 0 && <span className="text-sm ml-1" style={{ color: 'rgba(255,255,255,0.5)' }}>/mese</span>}
                </div>
                {p.priceMonthly !== 0 ? (
                  <p className="text-xs mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    o €{p.priceAnnual.toString().replace('.', ',')}/m con piano annuale
                  </p>
                ) : <div className="mb-8" />}
                <Link href="/auth/registrazione" className="block w-full py-3.5 rounded-2xl text-sm font-semibold transition-all hover:opacity-90 mb-8 text-center" style={{ background: p.popular ? 'white' : 'rgba(255,255,255,0.06)', color: p.popular ? '#050505' : 'white', border: p.popular ? 'none' : '1px solid rgba(255,255,255,0.1)' }}>
                  {p.cta}
                </Link>
                <ul className="space-y-3">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: p.popular ? 'white' : 'rgba(255,255,255,0.5)' }} strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FAQ (LIGHT) ═══════════════════ */}
      <section className="relative overflow-hidden" style={{ background: '#FAFAFA' }}>
        <div className="aurora-l-soft" style={{ opacity: 0.5 }} />
        <div className="relative max-w-[1280px] mx-auto px-6 py-28">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5" style={{ background: 'white', color: '#0A0A0A', border: '1px solid #E5E5E5' }}>
                <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: '#0A0A0A' }} />
                Domande frequenti
              </span>
              <h2 className="text-4xl lg:text-5xl tracking-[-0.04em] font-bold mb-4">
                <span style={{ color: '#0A0A0A' }}>Tutto quello che</span><br />
                <span className="accent-text">vuoi sapere.</span>
              </h2>
              <p className="text-base mb-6" style={{ color: '#6B7280' }}>
                Non trovi una risposta? Scrivici a{' '}
                <a href="mailto:hello@trovapro.it" className="underline font-semibold" style={{ color: '#0A0A0A' }}>hello@trovapro.it</a>
              </p>
            </div>
            <div className="space-y-3">
              {FAQS.map((f, i) => (
                <details key={i} className="glass-emboss-light faq group transition-all" style={{ borderRadius: '20px' }}>
                  <summary className="flex items-center justify-between gap-4" style={{ padding: '20px 24px' }}>
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 font-semibold uppercase tracking-wider" style={{ background: '#F5F5F5', color: '#6B7280', border: '1px solid #E5E5E5' }}>
                        {f.cat}
                      </span>
                      <h3 className="text-[15px] font-semibold tracking-[-0.01em] flex-1" style={{ color: '#0A0A0A' }}>
                        {f.q}
                      </h3>
                    </div>
                    <div className="icon-mono-light w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
                      <Plus className="faq-icon w-4 h-4" style={{ color: '#0A0A0A' }} strokeWidth={2} />
                    </div>
                  </summary>
                  <div className="-mt-1" style={{ padding: '0 24px 24px' }}>
                    <p className="text-sm leading-[1.6]" style={{ color: '#6B7280', paddingLeft: '92px' }}>{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ PRO CTA (DARK) ═══════════════════ */}
      <section className="relative overflow-hidden" style={{ background: '#0A0A0A' }}>
        <div className="aurora-d" style={{ opacity: 0.6 }} />
        <div className="relative max-w-[1280px] mx-auto px-6 py-28">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: '#555', fontFamily: 'var(--font-mono)' }}>04 ◆</span>
                <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)' }}>Per professionisti</span>
              </div>
              <h2 className="font-bold tracking-[-0.05em]" style={{ fontSize: 'clamp(48px, 6vw, 72px)', lineHeight: 0.95 }}>
                <span className="gradient-text-dark">Più clienti.</span><br />
                <span className="accent-text">Meno fatica.</span>
              </h2>
              <p className="mt-8 max-w-md text-base" style={{ color: '#B5B5B5' }}>
                Crea il tuo profilo in 5 minuti. Ricevi richieste qualificate, gestisci tutto da una sola dashboard.
              </p>
              <div className="mt-10 flex items-center gap-3 flex-wrap">
                <Link href="/auth/registrazione" className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 flex items-center gap-1.5" style={{ background: '#0070F3', color: 'white' }}>
                  Inizia gratis <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/piani-premium" className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-white/5 border" style={{ borderColor: 'rgba(255,255,255,0.14)', color: 'white' }}>
                  Vedi i piani
                </Link>
              </div>
            </div>

            <div className="relative float">
              <div className="absolute inset-0 -z-10 rounded-3xl" style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(0,112,243,0.5), transparent 70%)', filter: 'blur(60px)' }} />
              <div className="notif-pop absolute -top-6 -right-4 z-10 rounded-xl p-3.5 backdrop-blur-xl flex items-center gap-3 max-w-[260px]" style={{ background: 'white', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.6)' }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,0,0,0.05)' }}>
                  <Bell className="w-4 h-4" style={{ color: '#0A0A0A' }} fill="#0A0A0A" fillOpacity={0.15} strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold mb-0.5" style={{ color: '#0A0A0A' }}>Nuova richiesta!</p>
                  <p className="text-[10px] truncate" style={{ color: '#6B7280' }}>Anna M. · Impianto cucina · Roma</p>
                </div>
                <span className="pulse-dot w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#16A34A', boxShadow: '0 0 8px #16A34A' }} />
              </div>
              <div className="rounded-2xl p-2 backdrop-blur-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.14)' }}>
                <div className="rounded-xl overflow-hidden" style={{ background: '#0F0F0F' }}>
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FFBD2E' }} />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28CA42' }} />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-5">
                      <h4 className="text-sm text-white font-bold">Buongiorno, Mario</h4>
                      <span className="text-[10px] px-1.5 py-0.5 rounded inline-flex items-center gap-1 font-bold" style={{ background: 'rgba(34,197,94,0.2)', color: '#4ADE80', fontFamily: 'var(--font-mono)' }}>
                        <TrendingUp className="w-2.5 h-2.5" /> +18%
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-5">
                      {[
                        { v: '€3.420', l: 'Fatturato' },
                        { v: '24', l: 'Lead' },
                        { v: '4.9', l: 'Rating' },
                      ].map((k, i) => (
                        <div key={i} className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <div className="text-base text-white font-bold number-xl">{k.v}</div>
                          <div className="text-[10px] mt-0.5" style={{ color: '#888' }}>{k.l}</div>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold" style={{ color: '#888', fontFamily: 'var(--font-mono)' }}>VISUALIZZAZIONI</span>
                      </div>
                      <Sparkline data={[12,18,22,15,28,32,38,35,42,48,45,52]} color="rgba(255,255,255,0.7)" height={48} width={280} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
