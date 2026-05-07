import Link from 'next/link';
import {
  Search, MapPin, Star, ArrowRight, ArrowUpRight, Check,
  Zap, Sparkles, MessageSquare, Lock, BadgeCheck, Bolt,
  TrendingUp, TrendingDown, Quote, Plus, Droplets, Paintbrush, Hammer, Key, TreePine,
  Twitter, Instagram, Linkedin, Mail, Globe, Bell, Calendar,
} from 'lucide-react';

// Light tokens
const ink = '#0A0A0A';
const subtle = '#6B7280';
const fade = '#9CA3AF';
const surface = '#FAFAFA';
const border = '#E5E5E5';
const borderStrong = '#D4D4D4';

// Dark tokens
const dark = '#050505';
const dark2 = '#0A0A0A';
const dark3 = '#0F0F0F';
const cardBgD = 'rgba(255,255,255,0.03)';
const cardBgDHover = 'rgba(255,255,255,0.05)';
const borderD = 'rgba(255,255,255,0.08)';
const borderD2 = 'rgba(255,255,255,0.14)';
const subtleD = '#888';
const fadeD = '#555';
const textMidD = '#B5B5B5';

// Accent
const accent = '#0070F3';
const accentDark = '#0057CC';
const accentLight = '#3B92FF';
const accentSoft = '#EFF4FF';
const violet = '#7B61FF';
const success = '#16A34A';
const successD = '#22C55E';
const successSoft = '#ECFDF5';
const warning = '#F59E0B';

const FEATURED = [
  { name: 'Mario Rossi', category: 'Elettricista', city: 'Roma', rating: 4.9, reviews: 127, price: '€45/h', distance: '2.1 km', available: true, plan: 'premium' as const, completedJobs: 312, responseTime: '12 min', avatar: '#0070F3', initials: 'MR' },
  { name: 'Giuseppe Verdi', category: 'Imbianchino', city: 'Torino', rating: 5.0, reviews: 89, price: '€30/h', distance: '4.8 km', available: true, plan: 'pro' as const, completedJobs: 178, responseTime: '34 min', avatar: '#7B61FF', initials: 'GV' },
  { name: 'Luigi Bianchi', category: 'Idraulico', city: 'Milano', rating: 4.8, reviews: 213, price: '€40/h', distance: '1.3 km', available: false, plan: 'pro' as const, completedJobs: 421, responseTime: '1h 12m', avatar: '#00C896', initials: 'LB' },
  { name: 'Antonio Esposito', category: 'Elettricista', city: 'Napoli', rating: 4.7, reviews: 94, price: '€35/h', distance: '3.4 km', available: true, plan: 'pro' as const, completedJobs: 156, responseTime: '8 min', avatar: '#FFB020', initials: 'AE' },
  { name: 'Carlo Ricci', category: 'Muratore', city: 'Roma', rating: 4.9, reviews: 167, price: '€42/h', distance: '5.2 km', available: true, plan: 'premium' as const, completedJobs: 289, responseTime: '22 min', avatar: '#EF4444', initials: 'CR' },
];

const CATEGORIES = [
  { name: 'Elettricisti', slug: 'elettricista', count: '2.847', icon: Zap, gradient: 'linear-gradient(135deg, #FFB020, #FF6B00)', trend: '+12%', avg: '€42/h' },
  { name: 'Idraulici', slug: 'idraulico', count: '1.923', icon: Droplets, gradient: 'linear-gradient(135deg, #0070F3, #00D4FF)', trend: '+8%', avg: '€38/h' },
  { name: 'Imbianchini', slug: 'imbianchino', count: '1.456', icon: Paintbrush, gradient: 'linear-gradient(135deg, #00C896, #00E5A8)', trend: '+15%', avg: '€32/h' },
  { name: 'Muratori', slug: 'muratore', count: '987', icon: Hammer, gradient: 'linear-gradient(135deg, #7B61FF, #A78BFA)', trend: '+4%', avg: '€45/h' },
  { name: 'Fabbri', slug: 'fabbro', count: '534', icon: Key, gradient: 'linear-gradient(135deg, #EF4444, #F97316)', trend: '−2%', avg: '€55/h', down: true },
  { name: 'Giardinieri', slug: 'giardiniere', count: '712', icon: TreePine, gradient: 'linear-gradient(135deg, #22C55E, #84CC16)', trend: '+22%', avg: '€28/h' },
];

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
  { cat: 'Generale', q: 'Posso annullare un preventivo dopo averlo richiesto?', a: 'Sì, puoi annullare in qualsiasi momento prima di accettarlo. Il professionista riceverà una notifica automatica e la richiesta si chiuderà.' },
  { cat: 'Pagamenti', q: 'Cosa succede se il lavoro non viene completato?', a: 'I pagamenti sono protetti da Stripe Connect: il professionista riceve i fondi solo dopo conferma del lavoro completato. In caso di problemi, il rimborso è automatico.' },
  { cat: 'Tempi', q: 'Quanto tempo ci mette un professionista a rispondere?', a: 'In media meno di 2 ore per i preventivi standard, meno di 30 minuti per le emergenze. Vedi il tempo medio sul profilo di ogni professionista.' },
];

const POPULAR_QUERIES = ['Elettricista urgente', 'Idraulico h24', 'Imbianchino casa', 'Pulizie domestiche', 'Riparazione caldaia', 'Montaggio mobili'];

const LIVE_ACTIVITY = [
  { who: 'Anna M.', action: 'ha richiesto un elettricista', city: 'Roma', t: 'ora' },
  { who: 'Marco T.', action: 'ha lasciato 5★ a Mario R.', city: 'Roma', t: '2m fa' },
  { who: 'Sofia L.', action: 'ha completato un lavoro', city: 'Milano', t: '4m fa' },
  { who: 'Luca B.', action: 'ha chiesto un preventivo', city: 'Torino', t: '6m fa' },
  { who: 'Elena C.', action: 'ha valutato 5★ Giuseppe V.', city: 'Torino', t: '8m fa' },
];

function Sparkline({ data, color = accent, height = 32, width = 80 }: { data: number[]; color?: string; height?: number; width?: number }) {
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

export default function DesignPreviewPage() {
  return (
    <main>
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes typing-dot { 0%, 60%, 100% { transform: scale(0.85); opacity: 0.4; } 30% { transform: scale(1.1); opacity: 1; } }
        @keyframes notif-in { 0% { transform: translateY(-12px) scale(0.9); opacity: 0; } 100% { transform: translateY(0) scale(1); opacity: 1; } }
        @keyframes ticker-up { 0% { transform: translateY(100%); opacity: 0; } 20%, 80% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-100%); opacity: 0; } }

        /* ─── Light cards (wow style, mirrors dark-card energy) ─── */
        .light-card {
          background: white;
          border: 1px solid ${border};
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease, box-shadow 0.4s ease;
          position: relative;
          isolation: isolate;
        }
        .light-card::before {
          content: ""; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
          background: linear-gradient(135deg, transparent 30%, rgba(0,112,243,0.5) 50%, transparent 70%);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          opacity: 0; transition: opacity 0.4s ease; pointer-events: none;
        }
        .light-card:hover {
          transform: translateY(-4px);
          border-color: rgba(0,112,243,0.25);
          box-shadow: 0 30px 60px -20px rgba(0,112,243,0.28), 0 0 60px -10px rgba(0,112,243,0.15);
        }
        .light-card:hover::before { opacity: 1; }
        .light-premium { box-shadow: 0 0 0 1px rgba(0,112,243,0.18), 0 12px 40px -10px rgba(0,112,243,0.22); }

        /* ─── Dark cards ─── */
        .dark-card {
          background: ${cardBgD};
          border: 1px solid ${borderD};
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          isolation: isolate;
        }
        .dark-card::before {
          content: ""; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
          background: linear-gradient(135deg, transparent 30%, rgba(0,112,243,0.6) 50%, transparent 70%);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          opacity: 0; transition: opacity 0.4s ease; pointer-events: none;
        }
        .dark-card:hover {
          background: ${cardBgDHover};
          border-color: ${borderD2};
          transform: translateY(-3px);
          box-shadow: 0 30px 60px -20px rgba(0,112,243,0.4), 0 0 60px -10px rgba(0,112,243,0.2);
        }
        .dark-card:hover::before { opacity: 1; }
        .dark-premium { box-shadow: 0 0 0 1px rgba(0,112,243,0.25), 0 8px 40px -8px rgba(0,112,243,0.25); }

        /* ─── Aurora ─── */
        .aurora-d { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .aurora-d::before, .aurora-d::after {
          content: ""; position: absolute; width: 800px; height: 800px;
          border-radius: 50%; filter: blur(80px); opacity: 0.45;
        }
        .aurora-d::before { background: radial-gradient(circle, ${accent} 0%, transparent 50%); top: -300px; left: -200px; }
        .aurora-d::after  { background: radial-gradient(circle, ${violet} 0%, transparent 50%); top: -200px; right: -300px; }

        .aurora-d-soft { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .aurora-d-soft::before, .aurora-d-soft::after {
          content: ""; position: absolute; width: 600px; height: 600px;
          border-radius: 50%; filter: blur(100px); opacity: 0.18;
        }
        .aurora-d-soft::before { background: radial-gradient(circle, ${accent} 0%, transparent 60%); top: 50%; left: -200px; }
        .aurora-d-soft::after  { background: radial-gradient(circle, ${violet} 0%, transparent 60%); top: 20%; right: -200px; }

        /* ─── Aurora light (visible, like dark sections but inverted intensity) ─── */
        .aurora-l { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .aurora-l::before, .aurora-l::after {
          content: ""; position: absolute; width: 800px; height: 800px;
          border-radius: 50%; filter: blur(80px);
        }
        .aurora-l::before { background: radial-gradient(circle, ${accent} 0%, transparent 50%); top: -300px; left: -200px; opacity: 0.13; }
        .aurora-l::after  { background: radial-gradient(circle, ${violet} 0%, transparent 50%); top: -200px; right: -300px; opacity: 0.10; }

        .aurora-l-soft { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .aurora-l-soft::before, .aurora-l-soft::after {
          content: ""; position: absolute; width: 600px; height: 600px;
          border-radius: 50%; filter: blur(100px);
        }
        .aurora-l-soft::before { background: radial-gradient(circle, ${accent} 0%, transparent 60%); top: 50%; left: -200px; opacity: 0.10; }
        .aurora-l-soft::after  { background: radial-gradient(circle, ${violet} 0%, transparent 60%); top: 20%; right: -200px; opacity: 0.08; }

        /* ─── Section backgrounds (uniform monochrome) ─── */
        .bg-stats { background: ${dark2}; }
        .bg-featured { background: ${surface}; }
        .bg-testimonials { background: ${dark2}; }
        .bg-faq { background: ${surface}; }

        /* ─── Glass cards on color bg ─── */
        .glass-on-color {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease, border-color 0.3s ease, box-shadow 0.4s ease;
          position: relative; isolation: isolate;
        }

        /* ─── Glass card with embossed relief (no colored border) ─── */
        .glass-emboss {
          position: relative; isolation: isolate;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%);
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.18),
            inset 0 -1px 0 rgba(0,0,0,0.2),
            0 20px 40px -16px rgba(0,0,0,0.5),
            0 8px 16px -8px rgba(0,0,0,0.3);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease, box-shadow 0.4s ease;
        }
        .glass-emboss:hover {
          transform: translateY(-3px);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.22),
            inset 0 -1px 0 rgba(0,0,0,0.2),
            0 30px 60px -20px rgba(0,0,0,0.6),
            0 12px 24px -8px rgba(0,0,0,0.4);
        }

        /* ─── Translucent etched number ─── */
        .num-etched {
          background: linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.45) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 1px 0 rgba(255,255,255,0.1);
        }

        /* ─── Mono icon container on glass ─── */
        .icon-mono {
          background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.15);
        }

        /* ─── Light glass embossed (for light sections) ─── */
        .glass-emboss-light {
          position: relative; isolation: isolate;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 100%);
          border: 1px solid rgba(0,0,0,0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,1),
            inset 0 -1px 0 rgba(0,0,0,0.04),
            0 12px 32px -12px rgba(0,0,0,0.12),
            0 4px 8px -4px rgba(0,0,0,0.06);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease;
        }
        .glass-emboss-light:hover {
          transform: translateY(-3px);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,1),
            inset 0 -1px 0 rgba(0,0,0,0.04),
            0 24px 48px -16px rgba(0,0,0,0.15),
            0 8px 16px -4px rgba(0,0,0,0.08);
        }

        .icon-mono-light {
          background: linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.02) 100%);
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.6);
        }

        .num-etched-dark {
          background: linear-gradient(180deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.55) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glass-on-color::before {
          content: ""; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
          background: linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          opacity: 0; transition: opacity 0.4s ease; pointer-events: none;
        }
        .glass-on-color:hover {
          background: rgba(255,255,255,0.10);
          border-color: rgba(255,255,255,0.22);
          transform: translateY(-4px);
          box-shadow: 0 30px 60px -20px rgba(0,0,0,0.5), 0 0 60px -10px rgba(255,255,255,0.1);
        }
        .glass-on-color:hover::before { opacity: 1; }

        /* ─── Cream/beige editorial card ─── */
        .cream-card {
          background: white;
          border: 1px solid rgba(0,0,0,0.06);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease;
          box-shadow: 0 1px 0 rgba(0,0,0,0.04);
          position: relative; isolation: isolate;
        }
        .cream-card::before {
          content: ""; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
          background: linear-gradient(135deg, transparent 30%, rgba(184, 134, 70, 0.5) 50%, transparent 70%);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          opacity: 0; transition: opacity 0.4s ease; pointer-events: none;
        }
        .cream-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 30px 60px -20px rgba(140,90,40,0.25), 0 0 0 1px rgba(184,134,70,0.15);
        }
        .cream-card:hover::before { opacity: 1; }

        /* ─── Lavender soft card ─── */
        .lavender-card {
          background: white;
          border: 1px solid rgba(0,112,243,0.10);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease, box-shadow 0.4s ease;
        }
        .lavender-card:hover {
          transform: translateY(-2px);
          border-color: rgba(0,112,243,0.4);
          box-shadow: 0 12px 32px -12px rgba(0,112,243,0.25), 0 0 0 1px rgba(0,112,243,0.15);
        }

        /* ─── Pill on color bg ─── */
        .pill-on-color {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.16);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        /* ─── Conic border on light pill ─── */
        .conic-border-light { position: relative; background: white; border-radius: 999px; }
        .conic-border-light::before {
          content: ""; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
          background: conic-gradient(from 0deg, transparent 0%, rgba(0,112,243,0.5) 25%, transparent 50%, rgba(123,97,255,0.5) 75%, transparent 100%);
          animation: spin-slow 8s linear infinite;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
        }

        .grid-bg-dark {
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 80% 50% at 50% 30%, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 80% 50% at 50% 30%, black 30%, transparent 80%);
        }
        .grid-bg-light {
          background-image:
            linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 80% 50% at 50% 30%, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 80% 50% at 50% 30%, black 30%, transparent 80%);
        }

        .gradient-text-dark { background: linear-gradient(180deg, #FFFFFF 0%, #888 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .accent-text { background: linear-gradient(90deg, ${violet} 0%, ${accent} 50%, #00B5D6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

        .number-xl { font-feature-settings: "tnum"; letter-spacing: -0.06em; }
        .pulse-dot { animation: pulse-glow 2s ease-in-out infinite; }
        .float { animation: float 5s ease-in-out infinite; }

        .conic-border-dark { position: relative; background: rgba(255,255,255,0.04); border-radius: 16px; }
        .conic-border-dark::before {
          content: ""; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
          background: conic-gradient(from 0deg, transparent 0%, rgba(0,112,243,0.5) 25%, transparent 50%, rgba(123,97,255,0.5) 75%, transparent 100%);
          animation: spin-slow 8s linear infinite;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
        }

        .cat-card {
          position: relative; isolation: isolate; overflow: hidden;
          background: white;
          border: 1px solid ${border};
          transition: all 0.3s ease;
        }
        .cat-card .cat-blob {
          position: absolute; bottom: -40px; right: -40px; width: 140px; height: 140px;
          border-radius: 50%; opacity: 0; transition: opacity 0.5s ease, transform 0.5s ease;
          filter: blur(20px); transform: scale(0.8);
        }
        .cat-card:hover { transform: translateY(-3px); border-color: ${borderStrong}; box-shadow: 0 12px 32px -12px rgba(0,0,0,0.1); }
        .cat-card:hover .cat-blob { opacity: 0.35; transform: scale(1); }
        .cat-card .cat-arrow { opacity: 0; transition: opacity 0.3s ease, transform 0.3s ease; }
        .cat-card:hover .cat-arrow { opacity: 1; transform: translate(2px, -2px); }

        details.faq[open] summary .faq-icon { transform: rotate(45deg); }
        details.faq summary { list-style: none; cursor: pointer; }
        details.faq summary::-webkit-details-marker { display: none; }
        details.faq .faq-icon { transition: transform 0.25s ease; }
        details.faq[open].faq-light { background: ${surface}; border-color: ${borderStrong}; }

        .chip-active-light { background: ${ink}; color: white; border: 1px solid ${ink}; }
        .chip-default-light { background: white; color: ${ink}; border: 1px solid ${border}; }
        .chip-default-light:hover { background: ${surface}; border-color: ${borderStrong}; }

        .plan-popular {
          position: relative;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 100%);
          color: white;
          border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.3),
            inset 0 -1px 0 rgba(0,0,0,0.2),
            0 30px 60px -20px rgba(0,0,0,0.6),
            0 0 0 1px rgba(255,255,255,0.04);
        }

        .typing-dot { animation: typing-dot 1.4s ease-in-out infinite; }
        .typing-dot:nth-child(2) { animation-delay: 0.15s; }
        .typing-dot:nth-child(3) { animation-delay: 0.3s; }

        .notif-pop { animation: notif-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1.2s both; }

        .live-ticker { position: relative; height: 32px; overflow: hidden; }
        .live-ticker > * {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
          animation: ticker-up 12s ease-in-out infinite;
        }
        .live-ticker > *:nth-child(1) { animation-delay: 0s; }
        .live-ticker > *:nth-child(2) { animation-delay: 2.4s; }
        .live-ticker > *:nth-child(3) { animation-delay: 4.8s; }
        .live-ticker > *:nth-child(4) { animation-delay: 7.2s; }
        .live-ticker > *:nth-child(5) { animation-delay: 9.6s; }

        .nav-link-dark { position: relative; }
        .nav-link-dark::after {
          content: ""; position: absolute; left: 50%; bottom: -4px; height: 1px; width: 0;
          background: white; transition: all 0.3s ease;
        }
        .nav-link-dark:hover::after { left: 0; width: 100%; }

        .quick-chip {
          transition: all 0.3s ease;
          border: 1px solid ${borderD};
          background: ${cardBgD};
        }
        .quick-chip:hover { background: ${cardBgDHover}; border-color: ${borderD2}; transform: translateY(-1px); }

        .toggle-pill-dark {
          position: relative; background: rgba(255,255,255,0.05); border: 1px solid ${borderD};
          border-radius: 999px; padding: 4px; display: inline-flex;
        }
        .toggle-pill-dark button { position: relative; z-index: 1; padding: 6px 16px; font-size: 12px; font-weight: 600; color: ${subtleD}; transition: color 0.3s ease; }
        .toggle-pill-dark .toggle-active { color: ${dark}; }
        .toggle-bg-dark {
          position: absolute; top: 4px; bottom: 4px; left: 4px; width: calc(50% - 4px);
          background: white; border-radius: 999px;
          box-shadow: 0 4px 12px rgba(255,255,255,0.15);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feed-item:hover { background: rgba(0,112,243,0.04); }
        .feed-item { transition: background 0.2s ease; }

        .stat-card { transition: all 0.3s ease; position: relative; background: white; }
        .stat-card:hover { background: ${surface}; }
        .stat-card .stat-arrow { opacity: 0; transition: opacity 0.3s ease, transform 0.3s ease; }
        .stat-card:hover .stat-arrow { opacity: 1; transform: translate(2px, -2px); }

        .input-light::placeholder { color: ${fade}; }
        .input-dark::placeholder { color: ${fadeD}; }

        .btn-accent {
          background: ${accent}; color: white;
          transition: all 0.2s ease;
        }
        .btn-accent:hover { background: ${accentDark}; box-shadow: 0 8px 24px -6px rgba(0,112,243,0.4); }

        .btn-outline-light {
          background: white; color: ${ink}; border: 1px solid ${border};
          transition: all 0.2s ease;
        }
        .btn-outline-light:hover { border-color: ${ink}; background: ${surface}; }
      `}</style>

      {/* ───────── Notice ───────── */}
      <div style={{ background: dark, color: subtleD }} className="text-xs">
        <div className="max-w-[1280px] mx-auto px-6 py-2 flex items-center justify-between">
          <span style={{ fontFamily: 'var(--font-mono)' }}>DESIGN PREVIEW · v1.0 · ALTERNATING</span>
          <Link href="/" className="hover:text-white transition-colors">← Sito attuale</Link>
        </div>
      </div>

      {/* ═══════════════════ HERO (DARK) ═══════════════════ */}
      <section className="relative overflow-hidden" style={{ background: dark }}>
        <div className="aurora-d" />
        <div className="absolute inset-0 grid-bg-dark" />

        <header className="relative z-10 border-b" style={{ borderColor: borderD }}>
          <div className="max-w-[1280px] mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'white' }}>
                  <Zap className="w-3.5 h-3.5" style={{ color: dark }} strokeWidth={2.5} />
                </div>
                <span className="text-[15px] font-semibold tracking-tight text-white" style={{ letterSpacing: '-0.01em' }}>trovapro</span>
              </div>
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium" style={{ color: subtleD }}>
                <a className="nav-link-dark hover:text-white transition-colors" href="#">Cerca</a>
                <a className="nav-link-dark hover:text-white transition-colors" href="#">Categorie</a>
                <a className="nav-link-dark hover:text-white transition-colors" href="#">Per professionisti</a>
                <a className="nav-link-dark hover:text-white transition-colors" href="#">Prezzi</a>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <a className="text-sm px-3 py-1.5 rounded-md transition-colors hover:bg-white/5" style={{ color: textMidD }} href="#">Accedi</a>
              <button className="text-sm font-semibold px-3.5 py-1.5 rounded-md transition-all hover:opacity-90 flex items-center gap-1" style={{ background: 'white', color: dark }}>
                Inizia <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </header>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-24 pb-32">
          <div className="flex justify-center mb-12">
            <a href="#" className="conic-border-dark inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={{ background: accent, color: 'white', fontFamily: 'var(--font-mono)' }}>NEW</span>
              <span className="text-white/80">Pagamenti garantiti via Stripe</span>
              <ArrowRight className="w-3 h-3 text-white/50" />
            </a>
          </div>

          <h1 className="text-center font-bold tracking-[-0.05em] mx-auto max-w-7xl" style={{ fontSize: 'clamp(48px, 8vw, 104px)', lineHeight: 0.95 }}>
            <span className="gradient-text-dark lg:whitespace-nowrap">Trovare un professionista,</span><br />
            <span className="accent-text lg:whitespace-nowrap">finalmente semplice.</span>
          </h1>

          <p className="text-center mt-8 max-w-xl mx-auto text-[17px] leading-relaxed" style={{ color: subtleD }}>
            Confronta professionisti verificati nella tua zona, leggi le recensioni e ricevi preventivi gratuiti in poche ore.
          </p>

          <div className="mt-14 max-w-2xl mx-auto relative">
            <div className="absolute inset-0 -z-10 rounded-2xl" style={{ background: `radial-gradient(50% 50% at 50% 50%, ${accent}30, transparent 70%)`, filter: 'blur(40px)' }} />
            <div className="rounded-2xl p-1.5 flex items-center gap-1 backdrop-blur-xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex items-center gap-2.5 px-3.5 flex-1 min-w-0">
                <Search className="w-4 h-4 flex-shrink-0" style={{ color: subtleD }} />
                <input placeholder="Elettricista, idraulico…" className="input-dark bg-transparent outline-none text-sm w-full text-white" />
              </div>
              <div className="w-px self-stretch my-2" style={{ background: borderD }} />
              <div className="flex items-center gap-2.5 px-3.5 flex-1 min-w-0">
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: subtleD }} />
                <input placeholder="La tua città" className="input-dark bg-transparent outline-none text-sm w-full text-white" />
              </div>
              <button className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 flex-shrink-0 hover:opacity-90" style={{ background: 'white', color: dark }}>
                Cerca <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <span className="text-[11px] font-bold" style={{ color: fadeD, fontFamily: 'var(--font-mono)' }}>POPOLARI:</span>
              {POPULAR_QUERIES.map((q) => (
                <a key={q} href="#" className="quick-chip text-xs px-3 py-1 rounded-full font-medium" style={{ color: textMidD }}>
                  {q}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-medium" style={{ color: subtleD }}>
            {['Gratuito', 'P.IVA verificate', 'Risposta < 2h', 'Pagamento garantito'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" style={{ color: successD }} strokeWidth={3} />
                {t}
              </span>
            ))}
          </div>

          <div className="mt-12 max-w-md mx-auto">
            <div className="rounded-full px-4 py-1 flex items-center gap-3 text-xs" style={{ background: cardBgD, border: `1px solid ${borderD}` }}>
              <span className="pulse-dot w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: successD, boxShadow: `0 0 8px ${successD}` }} />
              <span className="flex-shrink-0 text-[10px] font-bold" style={{ color: subtleD, fontFamily: 'var(--font-mono)' }}>LIVE</span>
              <div className="live-ticker flex-1">
                {LIVE_ACTIVITY.map((a, i) => (
                  <span key={i} className="text-[12px] whitespace-nowrap" style={{ color: textMidD }}>
                    <span className="text-white font-semibold">{a.who}</span> {a.action} · {a.city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ STATS — dark monocromatico ═══════════════════ */}
      <section className="relative overflow-hidden bg-stats">
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
            <a className="text-sm flex items-center gap-1 hover:gap-2 transition-all font-semibold text-white">
              Vedi report completo <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Hero stat XL + 3 secondary */}
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5 mb-5">
            {/* HERO STAT — Lavori completati (glass embossed dark) */}
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
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>vs. mese scorso</span>
                </div>

                <div className="flex items-end gap-3 mb-3">
                  <div className="num-etched number-xl font-bold leading-none" style={{ fontSize: 'clamp(80px, 11vw, 144px)', letterSpacing: '-0.06em' }}>
                    12.847
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1 text-white">Lavori completati</h3>
                <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Negli ultimi 30 giorni in tutta Italia.
                </p>

                <div className="relative">
                  <svg viewBox="0 0 600 80" className="w-full h-20">
                    <defs>
                      <linearGradient id="hero-spark" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="white" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <polyline
                      fill="url(#hero-spark)"
                      stroke="rgba(255,255,255,0.7)"
                      strokeWidth="1.5"
                      points="0,60 50,55 100,50 150,48 200,42 250,40 300,32 350,28 400,25 450,18 500,12 550,8 600,4 600,80 0,80"
                    />
                  </svg>
                  <div className="flex justify-between text-[10px] mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {['1 apr', '8 apr', '15 apr', '22 apr', '29 apr', '6 mag'].map((d) => <span key={d}>{d}</span>)}
                  </div>
                </div>
              </div>
            </article>

            {/* 3 secondary stats stacked */}
            <div className="grid grid-rows-3 gap-5">
              {[
                { value: '4.8', suffix: '/ 5', label: 'Stelle medie', sub: 'su 2.143 recensioni verificate', trend: '+0.2', spark: [4.5,4.6,4.6,4.7,4.7,4.8,4.7,4.8,4.8,4.9,4.8,4.8], icon: Star },
                { value: '< 2h', suffix: '', label: 'Tempo di risposta', sub: '−24m vs. mese scorso', trend: 'più veloce', spark: [180,165,155,140,130,125,118,112,108,102,98,95].reverse(), icon: Bolt },
                { value: '98', suffix: '%', label: 'Tasso completamento', sub: 'lavori portati a termine', trend: '+3%', spark: [88,89,90,91,92,93,94,95,96,97,97,98], icon: BadgeCheck },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <article key={i} className="glass-emboss rounded-2xl p-6 flex items-center gap-5 group cursor-pointer">
                    <div className="icon-mono w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.85)' }} strokeWidth={1.75} />
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

          {/* Activity feed — vertical timeline cards */}
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
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Stream delle ultime azioni in piattaforma</p>
                </div>
              </div>
              <a className="text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all text-white">
                Vedi tutto <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {LIVE_ACTIVITY.map((a, i) => {
                // Categorize each action with type + visual identity
                const types = [
                  { label: 'Richiesta',  color: '#3B92FF', icon: Search },
                  { label: 'Recensione', color: '#FBBF24', icon: Star },
                  { label: 'Completato', color: '#4ADE80', icon: Check },
                  { label: 'Preventivo', color: '#3B92FF', icon: Search },
                  { label: 'Recensione', color: '#FBBF24', icon: Star },
                ];
                const type = types[i];
                const TypeIcon = type.icon;
                const palette = ['#3B92FF','#A78BFA','#4ADE80','#FBBF24','#F87171'];

                return (
                  <div key={i} className="feed-item p-6 flex flex-col gap-4 cursor-pointer relative group">
                    {/* Top: avatar with action badge overlay */}
                    <div className="relative w-14 h-14">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-[15px] font-bold text-white"
                        style={{
                          background: `linear-gradient(135deg, ${palette[i]}, ${palette[i]}AA)`,
                          boxShadow: `0 8px 20px -6px ${palette[i]}66, inset 0 1px 0 rgba(255,255,255,0.2)`,
                        }}
                      >
                        {a.who.split(' ').map((s) => s[0]).join('')}
                      </div>
                      {/* Action badge */}
                      <div
                        className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
                        style={{
                          background: type.color,
                          border: `2px solid ${dark2}`,
                          boxShadow: `0 4px 10px ${type.color}66`,
                        }}
                      >
                        <TypeIcon
                          className="w-3.5 h-3.5"
                          style={{ color: type.label === 'Recensione' ? dark : 'white' }}
                          strokeWidth={2.5}
                          fill={type.label === 'Recensione' ? dark : 'none'}
                        />
                      </div>
                    </div>

                    {/* Type pill */}
                    <span
                      className="self-start text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1"
                      style={{
                        background: `${type.color}18`,
                        color: type.color,
                        border: `1px solid ${type.color}33`,
                      }}
                    >
                      <TypeIcon className="w-2.5 h-2.5" strokeWidth={3} />
                      {type.label}
                    </span>

                    {/* Person + city */}
                    <div>
                      <p className="text-base font-bold truncate text-white">{a.who}</p>
                      <p className="text-xs flex items-center gap-1 truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        <MapPin className="w-3 h-3" />
                        {a.city}
                      </p>
                    </div>

                    {/* Action description */}
                    <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      {a.action}
                    </p>

                    {/* Timestamp footer */}
                    <div className="flex items-center justify-between gap-2 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <span className="flex items-center gap-1.5 text-[11px] font-medium">
                        <span className="pulse-dot w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: i === 0 ? '#4ADE80' : 'rgba(255,255,255,0.3)', boxShadow: i === 0 ? '0 0 6px #4ADE80' : 'none' }} />
                        <span style={{ color: i === 0 ? '#4ADE80' : 'rgba(255,255,255,0.55)' }}>
                          {i === 0 ? 'ora' : a.t}
                        </span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: 'rgba(255,255,255,0.4)' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        </div>
      </section>

      {/* ═══════════════════ CATEGORIE — iOS minimal ═══════════════════ */}
      <section className="relative" style={{ background: dark }}>
        <div className="aurora-d-soft" />
        <div className="relative max-w-[1280px] mx-auto px-6 py-28">
          <div className="flex items-end justify-between gap-6 mb-14 flex-wrap">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: subtleD, fontFamily: 'var(--font-mono)' }}>01 ◆</span>
                <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)' }}>Categorie</span>
              </div>
              <h2 className="text-4xl lg:text-5xl tracking-[-0.04em] font-bold mb-3">
                <span className="gradient-text-dark">Cosa</span><br />
                <span className="accent-text">stai cercando?</span>
              </h2>
              <p className="text-base" style={{ color: subtleD }}>
                Più di 8.000 professionisti verificati in 6 categorie principali.
              </p>
            </div>
            <a className="text-sm flex items-center gap-1 hover:gap-2 transition-all font-semibold text-white">
              Tutte le categorie <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* iOS-style grid: 3x2 large cards with generous space */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((c, i) => {
              const Icon = c.icon;
              return (
                <a
                  key={i}
                  href={`#${c.slug}`}
                  className="glass-emboss group block transition-all duration-500 hover:-translate-y-1"
                  style={{ borderRadius: '28px', padding: '28px 28px 24px' }}
                >
                  {/* Top: large icon + minimal trend */}
                  <div className="flex items-start justify-between mb-12">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: 'rgba(255,255,255,0.92)' }} strokeWidth={1.5} />
                    </div>
                    <span
                      className="text-[13px] font-semibold inline-flex items-center gap-1 transition-opacity opacity-70 group-hover:opacity-100"
                      style={{ color: c.down ? '#F87171' : '#4ADE80' }}
                    >
                      {c.down ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
                      {c.trend}
                    </span>
                  </div>

                  {/* Title + count */}
                  <h3 className="text-2xl font-semibold tracking-[-0.02em] text-white mb-1">
                    {c.name}
                  </h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {c.count} professionisti
                  </p>

                  {/* Footer: rate + arrow */}
                  <div
                    className="flex items-center justify-between mt-8 pt-5"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      Tariffa media · {c.avg}
                    </span>
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:translate-x-0.5"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <ArrowUpRight className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.7)' }} />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURED — light monocromatico ═══════════════════ */}
      <section className="relative overflow-hidden bg-featured">
        <div className="relative max-w-[1280px] mx-auto px-6 py-28">
          <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5" style={{ background: 'white', color: ink, border: `1px solid ${border}` }}>
                <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: ink }} />
                In evidenza
              </span>
              <h2 className="text-4xl lg:text-5xl tracking-[-0.04em] font-bold mb-3">
                <span style={{ color: ink }}>Professionisti</span><br />
                <span className="accent-text">consigliati.</span>
              </h2>
              <p className="text-base" style={{ color: subtle }}>
                I migliori della tua zona, scelti per te in base a recensioni, esperienza e disponibilità.
              </p>
            </div>
            <a className="text-sm flex items-center gap-1 hover:gap-2 transition-all font-semibold" style={{ color: ink }}>
              Esplora tutti <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs px-3 py-1.5 rounded-full font-semibold" style={{ background: ink, color: 'white' }}>Tutti</span>
            {['Disponibili oggi', 'Premium', 'Top rated', 'Vicino a me', 'Risposta rapida'].map((c) => (
              <span key={c} className="text-xs px-3 py-1.5 rounded-full font-semibold cursor-pointer transition-colors" style={{ background: 'white', color: ink, border: `1px solid ${border}` }}>
                {c}
              </span>
            ))}
            <span className="ml-auto text-xs font-medium" style={{ color: subtle }}>
              {FEATURED.length} risultati · ordinati per rilevanza
            </span>
          </div>

          <div className="grid lg:grid-cols-[1.4fr_1fr_1fr] gap-4">
            <article className="glass-emboss-light lg:row-span-2 group rounded-2xl overflow-hidden cursor-pointer relative">
              <div className="relative h-48 overflow-hidden" style={{ background: `linear-gradient(135deg, ${FEATURED[0].avatar}, ${FEATURED[0].avatar}AA)` }}>
                <div className="absolute inset-0 grid-bg-dark opacity-30" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2 py-1 rounded text-[10px] uppercase tracking-wider font-bold backdrop-blur-md" style={{ background: 'rgba(0,0,0,0.6)', color: 'white', fontFamily: 'var(--font-mono)' }}>
                    ★ Spotlight
                  </span>
                  <span className="px-2 py-1 rounded text-[10px] uppercase tracking-wider font-bold" style={{ background: 'white', color: ink, fontFamily: 'var(--font-mono)' }}>
                    Premium
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-base font-bold border-2" style={{ background: 'white', color: FEATURED[0].avatar, borderColor: 'rgba(255,255,255,0.4)' }}>
                    {FEATURED[0].initials}
                  </div>
                </div>
                <ArrowUpRight className="absolute top-4 right-4 w-5 h-5 text-white/80 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="p-7">
                <h3 className="text-3xl tracking-[-0.02em] font-bold mb-1 flex items-center gap-2" style={{ color: ink }}>
                  {FEATURED[0].name}
                  <BadgeCheck className="w-5 h-5" style={{ color: ink }} fill={ink} fillOpacity={0.12} strokeWidth={2} />
                </h3>
                <p className="text-sm mb-3 font-medium" style={{ color: subtle }}>
                  {FEATURED[0].category} · {FEATURED[0].city}
                </p>

                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded" style={{ color: success, background: successSoft }}>
                    <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: success }} />
                    Online ora
                  </span>
                  <span className="text-[11px] inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold" style={{ color: ink, background: surface, fontFamily: 'var(--font-mono)' }}>
                    <Bolt className="w-3 h-3" /> {FEATURED[0].responseTime}
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-6" style={{ color: ink }}>
                  &ldquo;Elettricista qualificato con 15 anni di esperienza. Specializzato in impianti civili e industriali, domotica e certificazioni.&rdquo;
                </p>

                <div className="grid grid-cols-4 gap-3 py-5 border-t" style={{ borderColor: border }}>
                  <div>
                    <div className="text-2xl flex items-center gap-1 number-xl font-bold" style={{ color: ink }}>
                      <Star className="w-4 h-4" fill={ink} strokeWidth={0} />
                      {FEATURED[0].rating}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider mt-1 font-bold" style={{ color: fade }}>{FEATURED[0].reviews} review</div>
                  </div>
                  <div>
                    <div className="text-2xl number-xl font-bold" style={{ color: ink }}>{FEATURED[0].completedJobs}</div>
                    <div className="text-[10px] uppercase tracking-wider mt-1 font-bold" style={{ color: fade }}>Lavori</div>
                  </div>
                  <div>
                    <div className="text-2xl number-xl font-bold" style={{ color: ink }}>{FEATURED[0].distance}</div>
                    <div className="text-[10px] uppercase tracking-wider mt-1 font-bold" style={{ color: fade }}>Distanza</div>
                  </div>
                  <div>
                    <div className="text-2xl number-xl font-bold" style={{ color: ink }}>{FEATURED[0].price.replace('/h','')}</div>
                    <div className="text-[10px] uppercase tracking-wider mt-1 font-bold" style={{ color: fade }}>al ora</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-5">
                  <button className="btn-accent flex-1 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5">
                    Richiedi preventivo <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button className="btn-outline-light px-4 py-2.5 rounded-lg text-sm font-semibold">
                    Profilo
                  </button>
                </div>
              </div>
            </article>

            {FEATURED.slice(1, 5).map((p, i) => (
              <article key={i} className="glass-emboss-light group rounded-2xl p-5 cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: p.avatar }}>
                      {p.initials}
                    </div>
                    {p.plan === 'premium' && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-bold" style={{ background: ink, color: 'white', fontFamily: 'var(--font-mono)' }}>
                        Premium
                      </span>
                    )}
                  </div>
                  <ArrowUpRight className="w-4 h-4 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: subtle }} />
                </div>

                <h3 className="text-lg tracking-[-0.02em] font-bold mb-0.5 flex items-center gap-1.5" style={{ color: ink }}>
                  {p.name}
                  <BadgeCheck className="w-3.5 h-3.5" style={{ color: ink }} fill={ink} fillOpacity={0.12} strokeWidth={2} />
                </h3>
                <p className="text-xs mb-3 font-medium" style={{ color: subtle }}>
                  {p.category} · {p.city}
                </p>

                <div className="flex items-center gap-1.5 flex-wrap mb-4">
                  {p.available ? (
                    <span className="text-[10px] inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold" style={{ color: success, background: successSoft }}>
                      <span className="pulse-dot w-1 h-1 rounded-full" style={{ background: success }} /> Online
                    </span>
                  ) : (
                    <span className="text-[10px] inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold" style={{ color: subtle, background: surface }}>
                      <span className="w-1 h-1 rounded-full" style={{ background: subtle }} /> Occupato
                    </span>
                  )}
                  <span className="text-[10px] inline-flex items-center gap-1 font-semibold" style={{ color: subtle, fontFamily: 'var(--font-mono)' }}>
                    <Bolt className="w-2.5 h-2.5" /> {p.responseTime}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t text-xs" style={{ borderColor: border, fontFamily: 'var(--font-mono)' }}>
                  <span className="inline-flex items-center gap-1 font-bold" style={{ color: ink }}>
                    <Star className="w-3 h-3" fill={ink} strokeWidth={0} /> {p.rating}
                    <span style={{ color: subtle, fontWeight: 400 }}>({p.reviews})</span>
                  </span>
                  <span style={{ color: subtle, fontWeight: 500 }}>{p.distance}</span>
                  <span className="font-bold" style={{ color: ink }}>{p.price}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ BENTO (DARK) ═══════════════════ */}
      <section className="relative" style={{ background: dark2 }}>
        <div className="relative max-w-[1280px] mx-auto px-6 py-28">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: subtleD, fontFamily: 'var(--font-mono)' }}>03 ◆</span>
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-8" style={{ background: 'rgba(255,255,255,0.08)', border: `1px solid ${borderD}` }}>
                  <Bolt className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.85)' }} />
                  <span style={{ color: textMidD, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>RISPOSTA RAPIDA</span>
                </div>
                <h3 className="text-3xl lg:text-4xl tracking-[-0.03em] font-bold mb-4 max-w-md text-white">
                  Ricevi i primi preventivi entro 2 ore dalla richiesta.
                </h3>
                <p className="text-base mb-10 max-w-md" style={{ color: subtleD }}>
                  Niente attese, niente call center. I professionisti ti rispondono direttamente con preventivi dettagliati.
                </p>

                <div className="rounded-xl p-4 backdrop-blur-sm max-w-sm" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${borderD}` }}>
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b" style={{ borderColor: borderD }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: 'rgba(255,255,255,0.18)', color: 'white' }}>MR</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate text-white">Mario Rossi</p>
                      <p className="text-[10px] flex items-center gap-1" style={{ color: subtleD }}>
                        Elettricista · sta scrivendo
                        <span className="inline-flex gap-0.5 ml-0.5">
                          <span className="typing-dot w-1 h-1 rounded-full" style={{ background: subtleD }} />
                          <span className="typing-dot w-1 h-1 rounded-full" style={{ background: subtleD }} />
                          <span className="typing-dot w-1 h-1 rounded-full" style={{ background: subtleD }} />
                        </span>
                      </p>
                    </div>
                    <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: successD, boxShadow: `0 0 8px ${successD}` }} />
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs px-3 py-2 rounded-lg max-w-[85%] text-white" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      Salve! Per quel tipo di intervento il preventivo è di €120 + IVA.
                    </div>
                    <div className="text-xs px-3 py-2 rounded-lg max-w-[85%] text-white" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      Posso passare domani mattina alle 10. Le va bene?
                    </div>
                    <div className="text-[10px] mt-2 font-bold" style={{ color: fadeD, fontFamily: 'var(--font-mono)' }}>RICEVUTO 12 MIN FA</div>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mt-10">
                  <span className="number-xl font-bold" style={{ fontSize: 'clamp(56px, 7vw, 80px)', lineHeight: 1, color: 'white', letterSpacing: '-0.05em' }}>1h 47m</span>
                  <span className="text-sm" style={{ color: subtleD }}>tempo medio</span>
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
                <div key={i} className="glass-emboss rounded-2xl p-6">
                  <div className="icon-mono w-11 h-11 rounded-xl mb-5 flex items-center justify-center">
                    <Icon className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.85)' }} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg tracking-[-0.02em] font-bold mb-2 text-white">{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: subtleD }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS — dark monocromatico ═══════════════════ */}
      <section className="relative overflow-hidden bg-testimonials">
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

          <div className="mb-12 max-w-2xl mx-auto rounded-2xl p-5 flex items-center justify-center gap-6 flex-wrap glass-emboss">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded flex items-center justify-center font-bold text-white text-xs" style={{ background: '#00B67A' }}>★</div>
              <span className="text-sm font-bold text-white">Trustpilot</span>
            </div>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((i) => (
                <div key={i} className="w-6 h-6 rounded-sm flex items-center justify-center" style={{ background: '#00B67A' }}>
                  <Star className="w-3.5 h-3.5 text-white" fill="white" strokeWidth={0} />
                </div>
              ))}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold number-xl text-white">4.7</span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>/5 — basato su <span className="font-bold text-white">2.143</span> recensioni</span>
            </div>
            <a className="text-xs flex items-center gap-1 underline ml-auto font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }} href="#">Vedi tutte <ArrowUpRight className="w-3 h-3" /></a>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="glass-emboss relative rounded-2xl p-7">
                <Quote className="absolute top-6 right-6 w-9 h-9" style={{ color: 'rgba(251,191,36,0.25)' }} fill="rgba(251,191,36,0.25)" strokeWidth={0} />
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4" fill="#FBBF24" strokeWidth={0} />
                  ))}
                  <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(251,191,36,0.15)', color: '#FBBF24' }}>VERIFICATA</span>
                </div>
                <p className="text-[15px] leading-relaxed mb-6 font-medium text-white">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: t.color, boxShadow: `0 0 16px -2px ${t.color}80` }}>
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate text-white">{t.name}</p>
                    <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.6)' }}>{t.role}</p>
                  </div>
                  <BadgeCheck className="w-4 h-4 flex-shrink-0" style={{ color: '#7AA8FF' }} fill="#0070F3" fillOpacity={0.3} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PRICING (DARK) ═══════════════════ */}
      <section className="relative" style={{ background: dark }}>
        <div className="aurora-d-soft" />
        <div className="relative max-w-[1280px] mx-auto px-6 py-28">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: subtleD, fontFamily: 'var(--font-mono)' }}>05 ◆</span>
              <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)' }}>Piani</span>
            </div>
            <h2 className="text-4xl lg:text-5xl tracking-[-0.04em] font-bold mb-4">
              <span className="gradient-text-dark">Inizia gratis.</span><br />
              <span className="accent-text">Cresci quando vuoi.</span>
            </h2>
            <p className="text-base" style={{ color: subtleD }}>
              I clienti non pagano nulla. I professionisti scelgono il piano che preferiscono.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="toggle-pill-dark">
              <span className="toggle-bg-dark" />
              <button className="toggle-active">Mensile</button>
              <button>Annuale</button>
            </div>
            <span className="text-xs px-2 py-0.5 rounded inline-flex items-center gap-1 font-semibold" style={{ background: 'rgba(34,197,94,0.15)', color: successD, fontFamily: 'var(--font-mono)' }}>
              <Sparkles className="w-3 h-3" /> Risparmia fino al 25%
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {PLANS.map((p, i) => (
              <div key={i} className={`relative rounded-2xl p-7 ${p.popular ? 'plan-popular' : 'glass-emboss'}`}>
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: 'white', color: dark, fontFamily: 'var(--font-mono)' }}>
                    Più scelto
                  </span>
                )}

                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-bold text-white" style={{ fontFamily: 'var(--font-mono)' }}>
                    {p.name.toUpperCase()}
                  </h3>
                  {p.popular && <Sparkles className="w-4 h-4" style={{ color: 'white' }} fill="white" fillOpacity={0.4} />}
                </div>
                <p className="text-xs mb-6" style={{ color: subtleD }}>
                  {p.period}
                </p>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-xs" style={{ color: subtleD }}>€</span>
                  <span className="text-5xl number-xl font-bold text-white">
                    {p.priceMonthly === 0 ? '0' : p.priceMonthly.toString().replace('.', ',')}
                  </span>
                  {p.priceMonthly !== 0 && <span className="text-xs" style={{ color: subtleD }}>/mese</span>}
                </div>
                {p.priceMonthly !== 0 ? (
                  <p className="text-[11px] mb-7 font-semibold" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-mono)' }}>
                    o €{p.priceAnnual.toString().replace('.', ',')}/m con piano annuale
                  </p>
                ) : <div className="mb-7" />}

                <button className="w-full py-3 rounded-lg text-sm font-bold transition-all hover:opacity-90 mb-7" style={{ background: p.popular ? 'white' : 'rgba(255,255,255,0.08)', color: p.popular ? dark : 'white', border: p.popular ? 'none' : `1px solid ${borderD2}` }}>
                  {p.cta}
                </button>

                <ul className="space-y-2.5">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm font-medium text-white">
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: p.popular ? 'white' : 'rgba(255,255,255,0.6)' }} strokeWidth={3} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-xs text-center mt-10" style={{ color: subtleD }}>
            Tutti i piani includono cancellazione gratuita in qualsiasi momento. Nessun vincolo.
          </p>
        </div>
      </section>

      {/* ═══════════════════ FAQ — light monocromatico ═══════════════════ */}
      <section className="relative overflow-hidden bg-faq">
        <div className="relative max-w-[1280px] mx-auto px-6 py-28">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5" style={{ background: 'white', color: ink, border: `1px solid ${border}` }}>
                <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: ink }} />
                Domande frequenti
              </span>
              <h2 className="text-4xl lg:text-5xl tracking-[-0.04em] font-bold mb-4">
                <span style={{ color: ink }}>Tutto quello che</span><br />
                <span className="accent-text">vuoi sapere.</span>
              </h2>
              <p className="text-base mb-6" style={{ color: subtle }}>
                Non trovi una risposta? Scrivici a{' '}
                <a href="mailto:hello@trovapro.it" className="underline font-semibold" style={{ color: ink }}>hello@trovapro.it</a>
              </p>
              <a className="text-sm flex items-center gap-1 hover:gap-2 transition-all font-bold" style={{ color: ink }}>
                Centro assistenza <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div>
              <div className="mb-6 rounded-xl p-1.5 flex items-center gap-2 bg-white" style={{ border: `1px solid ${border}`, boxShadow: '0 4px 16px -4px rgba(0,0,0,0.06)' }}>
                <Search className="w-4 h-4 ml-2" style={{ color: subtle }} />
                <input placeholder="Cerca tra le FAQ…" className="input-light bg-transparent outline-none text-sm flex-1 py-1.5" style={{ color: ink }} />
                <span className="text-[10px] mr-2 px-1.5 py-0.5 rounded font-bold" style={{ background: surface, color: subtle }}>⌘K</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-6">
                {['Tutte', 'Generale', 'Pagamenti', 'Sicurezza', 'Tempi'].map((c, i) => (
                  <span key={c} className="text-xs px-3 py-1.5 rounded-full font-semibold cursor-pointer transition-colors" style={i === 0
                    ? { background: ink, color: 'white', border: `1px solid ${ink}` }
                    : { background: 'white', color: ink, border: `1px solid ${border}` }
                  }>
                    {c}
                  </span>
                ))}
              </div>

              <div className="space-y-3">
                {FAQS.map((f, i) => (
                  <details key={i} className="glass-emboss-light faq group rounded-xl transition-all">
                    <summary className="flex items-center justify-between gap-4 p-5">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <span className="text-[10px] px-1.5 py-0.5 rounded mt-1 flex-shrink-0 font-bold" style={{ background: surface, color: subtle }}>
                          {f.cat.toUpperCase()}
                        </span>
                        <h3 className="text-[15px] font-bold tracking-[-0.01em] flex-1" style={{ color: ink }}>
                          {f.q}
                        </h3>
                      </div>
                      <div className="icon-mono-light w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Plus className="faq-icon w-4 h-4" style={{ color: ink }} strokeWidth={2.5} />
                      </div>
                    </summary>
                    <div className="px-5 pb-5 -mt-1">
                      <p className="text-sm leading-relaxed pl-[68px]" style={{ color: subtle }}>{f.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ PRO CTA (DARK) ═══════════════════ */}
      <section className="relative overflow-hidden" style={{ background: dark }}>
        <div className="aurora-d" style={{ opacity: 0.6 }} />

        <div className="relative max-w-[1280px] mx-auto px-6 py-28">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: fadeD, fontFamily: 'var(--font-mono)' }}>07 ◆</span>
                <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)' }}>Per professionisti</span>
              </div>
              <h2 className="font-bold tracking-[-0.05em]" style={{ fontSize: 'clamp(48px, 6vw, 72px)', lineHeight: 0.95 }}>
                <span className="gradient-text-dark">Più clienti.</span><br />
                <span className="accent-text">Meno fatica.</span>
              </h2>
              <p className="mt-8 max-w-md text-base" style={{ color: textMidD }}>
                Crea il tuo profilo in 5 minuti. Ricevi richieste qualificate, gestisci tutto da una sola dashboard.
              </p>

              <div className="mt-10 flex items-center gap-3 flex-wrap">
                <button className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 flex items-center gap-1.5" style={{ background: 'white', color: dark }}>
                  Inizia gratis <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-white/5 border" style={{ borderColor: borderD2, color: 'white' }}>
                  Vedi i piani
                </button>
              </div>

              <div className="mt-12 flex items-center gap-6 pt-8 border-t" style={{ borderColor: borderD }}>
                <div>
                  <div className="text-2xl number-xl font-bold text-white">1.247</div>
                  <div className="text-xs" style={{ color: subtleD }}>professionisti attivi</div>
                </div>
                <div>
                  <div className="text-2xl number-xl font-bold text-white">€2.4M</div>
                  <div className="text-xs" style={{ color: subtleD }}>fatturato generato</div>
                </div>
                <div>
                  <div className="text-2xl number-xl font-bold text-white">4.7★</div>
                  <div className="text-xs" style={{ color: subtleD }}>valutazione pro</div>
                </div>
              </div>
            </div>

            <div className="relative float">
              <div className="absolute inset-0 -z-10 rounded-3xl" style={{ background: `radial-gradient(50% 50% at 50% 50%, ${accent}50, transparent 70%)`, filter: 'blur(60px)' }} />

              <div className="notif-pop absolute -top-6 -right-4 z-10 rounded-xl p-3.5 backdrop-blur-xl flex items-center gap-3 max-w-[260px]" style={{ background: 'white', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.6)' }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,0,0,0.05)' }}>
                  <Bell className="w-4 h-4" style={{ color: ink }} fill={ink} fillOpacity={0.15} strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold mb-0.5" style={{ color: ink }}>Nuova richiesta!</p>
                  <p className="text-[10px] truncate" style={{ color: subtle }}>Anna M. · Impianto cucina · Roma</p>
                </div>
                <span className="pulse-dot w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: success, boxShadow: `0 0 8px ${success}` }} />
              </div>

              <div className="rounded-2xl p-2 backdrop-blur-xl" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${borderD2}` }}>
                <div className="rounded-xl overflow-hidden" style={{ background: dark3 }}>
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: borderD }}>
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FFBD2E' }} />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28CA42' }} />
                    </div>
                    <div className="ml-3 px-2 py-0.5 rounded text-[10px] font-bold" style={{ background: cardBgD, color: subtleD, fontFamily: 'var(--font-mono)' }}>
                      trovapro.it/dashboard
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <h4 className="text-sm text-white font-bold">Buongiorno, Mario</h4>
                        <p className="text-[10px] mt-0.5 font-bold" style={{ color: fadeD, fontFamily: 'var(--font-mono)' }}>
                          <Calendar className="w-3 h-3 inline mr-1" />
                          MARTEDÌ, 6 MAGGIO
                        </p>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded inline-flex items-center gap-1 font-bold" style={{ background: 'rgba(34,197,94,0.2)', color: '#4ADE80', fontFamily: 'var(--font-mono)' }}>
                        <TrendingUp className="w-2.5 h-2.5" /> +18% MESE
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-5">
                      {[
                        { v: '€3.420', l: 'Fatturato', c: '#4ADE80' },
                        { v: '24', l: 'Lead', c: 'rgba(255,255,255,0.6)' },
                        { v: '4.9', l: 'Rating', c: '#FFB020' },
                      ].map((k, i) => (
                        <div key={i} className="rounded-lg p-3" style={{ background: cardBgD, border: `1px solid ${borderD}` }}>
                          <div className="text-base text-white font-bold number-xl">{k.v}</div>
                          <div className="text-[10px] mt-0.5 inline-flex items-center gap-1" style={{ color: subtleD }}>
                            <span className="w-1 h-1 rounded-full" style={{ background: k.c }} />
                            {k.l}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-lg p-3 mb-5" style={{ background: cardBgD, border: `1px solid ${borderD}` }}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold" style={{ color: subtleD, fontFamily: 'var(--font-mono)' }}>VISUALIZZAZIONI · 30G</span>
                        <span className="text-[10px] inline-flex items-center gap-1 font-bold" style={{ color: '#4ADE80', fontFamily: 'var(--font-mono)' }}>
                          <TrendingUp className="w-2.5 h-2.5" /> +24%
                        </span>
                      </div>
                      <Sparkline data={[12,18,22,15,28,32,38,35,42,48,45,52]} color="rgba(255,255,255,0.7)" height={48} width={280} />
                    </div>

                    <div className="space-y-2">
                      {[
                        { n: 'Anna M.', d: 'Impianto cucina', t: '2m fa', dot: '#4ADE80' },
                        { n: 'Roberto C.', d: 'Quadro elettrico', t: '15m fa', dot: '#FFB020' },
                        { n: 'Laura S.', d: 'Domotica', t: '1h fa', dot: subtleD },
                      ].map((l, i) => (
                        <div key={i} className="flex items-center gap-3 rounded-lg p-2.5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: l.dot, boxShadow: i === 0 ? `0 0 8px ${l.dot}` : 'none' }} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-white truncate font-medium">{l.n}</p>
                            <p className="text-[10px] truncate" style={{ color: subtleD }}>{l.d}</p>
                          </div>
                          <span className="text-[10px] font-bold" style={{ color: fadeD, fontFamily: 'var(--font-mono)' }}>{l.t}</span>
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

      {/* ═══════════════════ FOOTER (DARK) ═══════════════════ */}
      <footer style={{ background: '#000' }}>
        <div className="max-w-[1280px] mx-auto px-6 pt-20 pb-12">
          <div className="rounded-2xl p-8 lg:p-12 mb-16 grid md:grid-cols-[1.4fr_1fr] gap-8 items-center" style={{ background: dark2, border: `1px solid ${borderD}` }}>
            <div>
              <h3 className="text-2xl tracking-[-0.02em] font-bold mb-2 text-white">
                La newsletter dei professionisti.
              </h3>
              <p className="text-sm" style={{ color: subtleD }}>
                Ogni 2 settimane: novità, consigli, casi studio. Niente spam, cancellazione in 1 click.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 rounded-lg p-1 flex items-center" style={{ background: cardBgD, border: `1px solid ${borderD}` }}>
                <Mail className="w-4 h-4 ml-2 mr-2 flex-shrink-0" style={{ color: subtleD }} />
                <input placeholder="tu@email.it" className="input-dark bg-transparent outline-none text-sm flex-1 py-2 text-white" />
              </div>
              <button className="btn-accent px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-1.5">
                Iscriviti <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="rounded-xl py-5 mb-12 flex items-center justify-center gap-x-10 gap-y-3 flex-wrap" style={{ borderTop: `1px solid ${borderD}`, borderBottom: `1px solid ${borderD}` }}>
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold" style={{ color: subtleD, fontFamily: 'var(--font-mono)' }}>VISTI SU</span>
            {['IL SOLE 24 ORE', 'CORRIERE', 'WIRED IT', 'ECONOMYUP', 'STARTUP ITALIA'].map((m, i) => (
              <span key={i} className="text-sm font-bold" style={{ color: subtleD, opacity: 0.5, letterSpacing: '0.02em' }}>{m}</span>
            ))}
          </div>

          <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-12 mb-16">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'white' }}>
                  <Zap className="w-3.5 h-3.5" style={{ color: dark }} strokeWidth={2.5} />
                </div>
                <span className="text-[15px] font-bold tracking-tight text-white" style={{ letterSpacing: '-0.01em' }}>trovapro</span>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: subtleD }}>
                Il modo più semplice di trovare professionisti qualificati nella tua zona. Verificati, valutati, pronti a partire.
              </p>
              <div className="flex items-center gap-2">
                {[Twitter, Instagram, Linkedin, Mail].map((Icon, i) => (
                  <a key={i} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5" style={{ border: `1px solid ${borderD}`, color: textMidD }}>
                    <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                  </a>
                ))}
              </div>
            </div>

            {[
              { title: 'Prodotto', links: ['Cerca professionisti', 'Categorie', 'Mappa', 'Mobile app'] },
              { title: 'Per professionisti', links: ['Iscriviti', 'Piani e prezzi', 'Centro risorse', 'Affiliati'] },
              { title: 'Azienda', links: ['Chi siamo', 'Blog', 'Lavora con noi', 'Press'] },
              { title: 'Legale', links: ['Termini', 'Privacy', 'Cookie', 'Aiuto'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs uppercase tracking-[0.15em] mb-4 text-white font-bold" style={{ fontFamily: 'var(--font-mono)' }}>
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a className="text-sm hover:text-white transition-colors" style={{ color: subtleD }}>{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4 pt-8 border-t text-xs" style={{ borderColor: borderD, color: subtleD }}>
            <div className="flex items-center gap-4">
              <span style={{ fontFamily: 'var(--font-mono)' }}>© 2026 TrovaPro · P.IVA 12345678901</span>
              <span className="hidden md:inline">·</span>
              <a className="hidden md:inline hover:text-white transition-colors">Sitemap</a>
            </div>
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3 h-3" /> Italia (IT)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: successD }} />
                All systems operational
              </span>
            </div>
          </div>
        </div>

        <div className="border-t" style={{ borderColor: borderD, background: '#000' }}>
          <div className="max-w-[1280px] mx-auto px-6 py-4 text-center text-xs" style={{ color: subtleD }}>
            v1.0 · Alternating: hero(D) → stats(L) → cat(D) → featured(L) → bento(D) → testim(L) → pricing(D) → faq(L) → cta(D) → footer(D) ·{' '}
            <Link href="/" className="text-white font-semibold">Torna al sito attuale →</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
