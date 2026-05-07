'use client';

import { useState, useMemo, useEffect, useTransition, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import ProfessionalCard from '@/components/ui/ProfessionalCard';
import { italianRegions } from '@/data';
import type { Professional } from '@/types';
import type { PublicCategory } from '@/lib/professionals';

const provinceToName: Record<string, string> = {
  MI: 'Milano', BG: 'Bergamo', BS: 'Brescia', CO: 'Como', CR: 'Cremona', LC: 'Lecco',
  LO: 'Lodi', MN: 'Mantova', MB: 'Monza e Brianza', PV: 'Pavia', SO: 'Sondrio', VA: 'Varese',
  TO: 'Torino', AL: 'Alessandria', AT: 'Asti', BI: 'Biella', CN: 'Cuneo', NO: 'Novara',
  RM: 'Roma', FR: 'Frosinone', LT: 'Latina', RI: 'Rieti', VT: 'Viterbo',
  NA: 'Napoli', AV: 'Avellino', BN: 'Benevento', CE: 'Caserta', SA: 'Salerno',
  VE: 'Venezia', VR: 'Verona', PD: 'Padova', VI: 'Vicenza', TV: 'Treviso', BL: 'Belluno', RO: 'Rovigo',
  BO: 'Bologna', FE: 'Ferrara', FC: 'Forlì-Cesena', MO: 'Modena', PR: 'Parma',
  PC: 'Piacenza', RA: 'Ravenna', RE: 'Reggio Emilia', RN: 'Rimini',
  FI: 'Firenze', AR: 'Arezzo', GR: 'Grosseto', LI: 'Livorno', LU: 'Lucca',
  MS: 'Massa-Carrara', PI: 'Pisa', PO: 'Prato', PT: 'Pistoia', SI: 'Siena',
  BA: 'Bari', BR: 'Brindisi', FG: 'Foggia', LE: 'Lecce', TA: 'Taranto',
  PA: 'Palermo', CT: 'Catania', ME: 'Messina', AG: 'Agrigento', CL: 'Caltanissetta',
  EN: 'Enna', RG: 'Ragusa', SR: 'Siracusa', TP: 'Trapani',
  CA: 'Cagliari', SS: 'Sassari', NU: 'Nuoro', OR: 'Oristano',
  GE: 'Genova', IM: 'Imperia', SP: 'La Spezia', SV: 'Savona',
  TS: 'Trieste', UD: 'Udine', GO: 'Gorizia', PN: 'Pordenone',
  AN: 'Ancona', AP: 'Ascoli Piceno', FM: 'Fermo', MC: 'Macerata',
  AQ: "L'Aquila", CH: 'Chieti', PE: 'Pescara', TE: 'Teramo',
  PG: 'Perugia', TR: 'Terni',
  CZ: 'Catanzaro', CS: 'Cosenza', KR: 'Crotone', RC: 'Reggio Calabria',
  TN: 'Trento', BZ: 'Bolzano',
  PZ: 'Potenza', MT: 'Matera',
  CB: 'Campobasso', IS: 'Isernia',
  AO: 'Aosta',
};

const provinceCities: Record<string, string[]> = {};
for (const regionData of Object.values(italianRegions)) {
  for (const prov of regionData.provinces) {
    if (!provinceCities[prov]) provinceCities[prov] = [];
    for (const city of regionData.cities) {
      if (!provinceCities[prov].includes(city)) provinceCities[prov].push(city);
    }
  }
}

const allProvinces = Object.entries(provinceToName)
  .sort((a, b) => a[1].localeCompare(b[1]))
  .map(([code, name]) => ({ code, name }));

interface Props {
  initialProfessionals: Professional[];
  total: number;
  page: number;
  totalPages: number;
  categories: PublicCategory[];
  initialFilters: {
    category: string;
    province: string;
    city: string;
    minRating: number;
    sortBy: 'relevance' | 'rating';
  };
}

export default function SearchPageClient({
  initialProfessionals,
  total,
  page,
  totalPages,
  categories,
  initialFilters,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category);
  const [selectedProvince, setSelectedProvince] = useState(initialFilters.province);
  const [selectedCity, setSelectedCity] = useState(initialFilters.city);
  const [minRating, setMinRating] = useState(initialFilters.minRating);
  const [sortBy, setSortBy] = useState<'relevance' | 'rating'>(initialFilters.sortBy);
  const [showFilters, setShowFilters] = useState(false);

  const citiesForProvince = useMemo(() => {
    if (!selectedProvince) return [];
    return (provinceCities[selectedProvince] || []).slice().sort();
  }, [selectedProvince]);

  const updateUrl = useCallback(
    (overrides: Partial<typeof initialFilters & { page: number }> = {}) => {
      const next = {
        category: overrides.category ?? selectedCategory,
        province: overrides.province ?? selectedProvince,
        city: overrides.city ?? selectedCity,
        minRating: overrides.minRating ?? minRating,
        sortBy: overrides.sortBy ?? sortBy,
        page: overrides.page ?? 1,
      };
      const params = new URLSearchParams();
      if (next.category) params.set('categoria', next.category);
      if (next.province) params.set('provincia', next.province);
      if (next.city) params.set('citta', next.city);
      if (next.minRating > 0) params.set('rating', String(next.minRating));
      if (next.sortBy && next.sortBy !== 'relevance') params.set('sort', next.sortBy);
      if (next.page > 1) params.set('page', String(next.page));
      const qs = params.toString();
      startTransition(() => {
        router.push(qs ? `/cerca?${qs}` : '/cerca');
      });
    },
    [router, selectedCategory, selectedProvince, selectedCity, minRating, sortBy],
  );

  useEffect(() => {
    if (selectedCity && !citiesForProvince.includes(selectedCity)) {
      setSelectedCity('');
    }
  }, [selectedProvince, citiesForProvince, selectedCity]);

  return (
    <div style={{ background: '#FFFFFF', color: '#0A0A0A' }}>
      {/* Search header on dark band */}
      <section className="relative overflow-hidden pt-24 pb-12" style={{ background: '#050505' }}>
        <div className="aurora-d-soft" />
        <div className="absolute inset-0 grid-bg-dark opacity-60" />
        <div className="relative max-w-[1280px] mx-auto px-6">
          <h1 className="text-3xl lg:text-4xl tracking-[-0.04em] font-bold mb-2">
            <span className="gradient-text-dark">Trova il professionista</span>{' '}
            <span className="accent-text">giusto per te.</span>
          </h1>
          <p className="text-sm mb-8" style={{ color: '#888' }}>
            <span className="font-bold text-white">{total}</span> professionisti verificati
            {selectedCategory && <> · categoria <span className="font-semibold text-white capitalize">{selectedCategory}</span></>}
            {selectedProvince && <> · provincia <span className="font-semibold text-white">{provinceToName[selectedProvince]}</span></>}
            {selectedCity && <> · città <span className="font-semibold text-white">{selectedCity}</span></>}
          </p>

          {/* Filter pills */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2.5 px-3.5 flex-1 min-w-0 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Search className="w-4 h-4 flex-shrink-0" style={{ color: '#888' }} />
              <select
                value={selectedCategory}
                onChange={(e) => { setSelectedCategory(e.target.value); updateUrl({ category: e.target.value }); }}
                className="bg-transparent outline-none text-sm w-full text-white py-3 appearance-none cursor-pointer"
              >
                <option value="" style={{ color: '#0A0A0A' }}>Tutte le categorie</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug} style={{ color: '#0A0A0A' }}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2.5 px-3.5 flex-1 min-w-0 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#888' }} />
              <select
                value={selectedProvince}
                onChange={(e) => { setSelectedProvince(e.target.value); setSelectedCity(''); updateUrl({ province: e.target.value, city: '' }); }}
                className="bg-transparent outline-none text-sm w-full text-white py-3 appearance-none cursor-pointer"
              >
                <option value="" style={{ color: '#0A0A0A' }}>Tutte le province</option>
                {allProvinces.map((p) => (
                  <option key={p.code} value={p.code} style={{ color: '#0A0A0A' }}>{p.name} ({p.code})</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2.5 px-3.5 flex-1 min-w-0 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', opacity: selectedProvince ? 1 : 0.5 }}>
              <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#888' }} />
              <select
                value={selectedCity}
                onChange={(e) => { setSelectedCity(e.target.value); updateUrl({ city: e.target.value }); }}
                disabled={!selectedProvince}
                className="bg-transparent outline-none text-sm w-full text-white py-3 appearance-none cursor-pointer disabled:cursor-not-allowed"
              >
                <option value="" style={{ color: '#0A0A0A' }}>{selectedProvince ? 'Tutte le città' : 'Prima la provincia'}</option>
                {citiesForProvince.map((c) => (
                  <option key={c} value={c} style={{ color: '#0A0A0A' }}>{c}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                showFilters ? '' : 'hover:bg-white/10'
              }`}
              style={{
                background: showFilters ? 'white' : 'rgba(255,255,255,0.06)',
                color: showFilters ? '#050505' : 'white',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtri
            </button>
          </div>

          {showFilters && (
            <div className="mt-5 pt-5 flex flex-wrap items-end gap-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold mb-2 block" style={{ color: '#555', fontFamily: 'var(--font-mono)' }}>Valutazione min</label>
                <select
                  value={minRating}
                  onChange={(e) => { setMinRating(Number(e.target.value)); updateUrl({ minRating: Number(e.target.value) }); }}
                  className="rounded-lg px-3 py-2 bg-transparent text-white text-sm outline-none cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <option value={0} style={{ color: '#0A0A0A' }}>Tutte</option>
                  <option value={3} style={{ color: '#0A0A0A' }}>3+ ★</option>
                  <option value={4} style={{ color: '#0A0A0A' }}>4+ ★</option>
                  <option value={4.5} style={{ color: '#0A0A0A' }}>4.5+ ★</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold mb-2 block" style={{ color: '#555', fontFamily: 'var(--font-mono)' }}>Ordina per</label>
                <select
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value as 'relevance' | 'rating'); updateUrl({ sortBy: e.target.value as 'relevance' | 'rating' }); }}
                  className="rounded-lg px-3 py-2 bg-transparent text-white text-sm outline-none cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <option value="relevance" style={{ color: '#0A0A0A' }}>Rilevanza</option>
                  <option value="rating" style={{ color: '#0A0A0A' }}>Valutazione</option>
                </select>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedProvince('');
                  setSelectedCity('');
                  setMinRating(0);
                  setSortBy('relevance');
                  startTransition(() => router.push('/cerca'));
                }}
                className="text-sm transition-all"
                style={{ color: '#3B92FF' }}
              >
                Resetta filtri
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section style={{ background: '#FAFAFA', minHeight: '60vh' }}>
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          {isPending && (
            <div className="text-center py-4 text-sm" style={{ color: '#6B7280' }}>
              <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin align-middle mr-2" />
              Aggiornamento...
            </div>
          )}

          {initialProfessionals.length === 0 ? (
            <div className="glass-emboss-light text-center py-20" style={{ borderRadius: '24px' }}>
              <Search className="w-12 h-12 mx-auto mb-4" style={{ color: '#9CA3AF' }} />
              <h3 className="text-lg font-bold mb-2" style={{ color: '#0A0A0A' }}>Nessun risultato</h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Prova a modificare i filtri o la zona.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {initialProfessionals.map((p) => (
                <ProfessionalCard key={p.id} professional={p} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                disabled={page <= 1 || isPending}
                onClick={() => updateUrl({ page: page - 1 })}
                className="h-10 px-4 flex items-center gap-1 text-sm rounded-xl disabled:opacity-40 transition-all"
                style={{ background: 'white', border: '1px solid #E5E5E5', color: '#0A0A0A' }}
              >
                <ChevronLeft className="w-4 h-4" />
                Precedente
              </button>
              <span className="text-sm px-4" style={{ color: '#6B7280' }}>
                Pagina {page} di {totalPages}
              </span>
              <button
                disabled={page >= totalPages || isPending}
                onClick={() => updateUrl({ page: page + 1 })}
                className="h-10 px-4 flex items-center gap-1 text-sm rounded-xl disabled:opacity-40 transition-all"
                style={{ background: 'white', border: '1px solid #E5E5E5', color: '#0A0A0A' }}
              >
                Successiva
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
