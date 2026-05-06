'use client';

import { useState, useMemo, useEffect, useTransition, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import ProfessionalCard from '@/components/ui/ProfessionalCard';
import { italianRegions } from '@/data';
import type { Professional } from '@/types';
import type { PublicCategory } from '@/lib/professionals';

const provinceToName: Record<string, string> = {
  MI: 'Milano', BG: 'Bergamo', BS: 'Brescia', CO: 'Como', CR: 'Cremona', LC: 'Lecco',
  LO: 'Lodi', MN: 'Mantova', MB: 'Monza e Brianza', PV: 'Pavia', SO: 'Sondrio', VA: 'Varese',
  TO: 'Torino', AL: 'Alessandria', AT: 'Asti', BI: 'Biella', CN: 'Cuneo', NO: 'Novara',
  VB: 'Verbano-Cusio-Ossola', VC: 'Vercelli',
  RM: 'Roma', FR: 'Frosinone', LT: 'Latina', RI: 'Rieti', VT: 'Viterbo',
  NA: 'Napoli', AV: 'Avellino', BN: 'Benevento', CE: 'Caserta', SA: 'Salerno',
  VE: 'Venezia', VR: 'Verona', PD: 'Padova', VI: 'Vicenza', TV: 'Treviso', BL: 'Belluno', RO: 'Rovigo',
  BO: 'Bologna', FE: 'Ferrara', FC: 'Forlì-Cesena', MO: 'Modena', PR: 'Parma',
  PC: 'Piacenza', RA: 'Ravenna', RE: 'Reggio Emilia', RN: 'Rimini',
  FI: 'Firenze', AR: 'Arezzo', GR: 'Grosseto', LI: 'Livorno', LU: 'Lucca',
  MS: 'Massa-Carrara', PI: 'Pisa', PO: 'Prato', PT: 'Pistoia', SI: 'Siena',
  BA: 'Bari', BT: 'Barletta-Andria-Trani', BR: 'Brindisi', FG: 'Foggia', LE: 'Lecce', TA: 'Taranto',
  PA: 'Palermo', CT: 'Catania', ME: 'Messina', AG: 'Agrigento', CL: 'Caltanissetta',
  EN: 'Enna', RG: 'Ragusa', SR: 'Siracusa', TP: 'Trapani',
  CA: 'Cagliari', SS: 'Sassari', NU: 'Nuoro', OR: 'Oristano', SU: 'Sud Sardegna',
  GE: 'Genova', IM: 'Imperia', SP: 'La Spezia', SV: 'Savona',
  TS: 'Trieste', UD: 'Udine', GO: 'Gorizia', PN: 'Pordenone',
  AN: 'Ancona', AP: 'Ascoli Piceno', FM: 'Fermo', MC: 'Macerata', PU: 'Pesaro e Urbino',
  AQ: "L'Aquila", CH: 'Chieti', PE: 'Pescara', TE: 'Teramo',
  PG: 'Perugia', TR: 'Terni',
  CZ: 'Catanzaro', CS: 'Cosenza', KR: 'Crotone', RC: 'Reggio Calabria', VV: 'Vibo Valentia',
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

interface SearchPageClientProps {
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
}: SearchPageClientProps) {
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
    <div className="pt-20 min-h-screen bg-white">
      <div className="bg-dark border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  const v = e.target.value;
                  setSelectedCategory(v);
                  updateUrl({ category: v });
                }}
                className="w-full h-12 pl-10 pr-4 bg-white/10 text-white border-0 appearance-none cursor-pointer focus:outline-none focus:bg-white/15 transition-all text-sm"
              >
                <option value="" className="text-dark">Tutte le categorie</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug} className="text-dark">{c.name}</option>
                ))}
              </select>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            </div>

            <div className="relative flex-1">
              <select
                value={selectedProvince}
                onChange={(e) => {
                  const v = e.target.value;
                  setSelectedProvince(v);
                  updateUrl({ province: v, city: '' });
                }}
                className="w-full h-12 pl-10 pr-4 bg-white/10 text-white border-0 appearance-none cursor-pointer focus:outline-none focus:bg-white/15 transition-all text-sm"
              >
                <option value="" className="text-dark">Tutte le province</option>
                {allProvinces.map((p) => (
                  <option key={p.code} value={p.code} className="text-dark">{p.name} ({p.code})</option>
                ))}
              </select>
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            </div>

            <div className="relative flex-1">
              <select
                value={selectedCity}
                onChange={(e) => {
                  const v = e.target.value;
                  setSelectedCity(v);
                  updateUrl({ city: v });
                }}
                disabled={!selectedProvince}
                className="w-full h-12 pl-10 pr-4 bg-white/10 text-white border-0 appearance-none cursor-pointer focus:outline-none focus:bg-white/15 transition-all text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <option value="" className="text-dark">{selectedProvince ? 'Tutte le città' : 'Seleziona prima la provincia'}</option>
                {citiesForProvince.map((c) => (
                  <option key={c} value={c} className="text-dark">{c}</option>
                ))}
              </select>
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`h-12 px-5 flex items-center gap-2 text-sm font-medium transition-all ${
                showFilters ? 'bg-primary text-white' : 'bg-white/10 text-zinc-300 hover:bg-white/15 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtri
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-5 pb-2 flex flex-wrap gap-6 items-end border-t border-white/5 mt-5">
                  <div>
                    <label className="text-xs text-zinc-400 uppercase tracking-wider block mb-2">Valutazione min</label>
                    <select
                      value={minRating}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setMinRating(v);
                        updateUrl({ minRating: v });
                      }}
                      className="h-10 px-3 bg-white/10 text-white border-0 text-sm focus:outline-none focus:bg-white/15"
                    >
                      <option value={0} className="text-dark">Tutte</option>
                      <option value={3} className="text-dark">3+ ★</option>
                      <option value={4} className="text-dark">4+ ★</option>
                      <option value={4.5} className="text-dark">4.5+ ★</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 uppercase tracking-wider block mb-2">Ordina per</label>
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        const v = e.target.value as 'relevance' | 'rating';
                        setSortBy(v);
                        updateUrl({ sortBy: v });
                      }}
                      className="h-10 px-3 bg-white/10 text-white border-0 text-sm focus:outline-none focus:bg-white/15"
                    >
                      <option value="relevance" className="text-dark">Rilevanza</option>
                      <option value="rating" className="text-dark">Valutazione</option>
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
                    className="text-sm text-primary hover:text-primary-light transition-colors h-10"
                  >
                    Resetta
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-text-secondary">
            <span className="font-bold text-text">{total}</span>{' '}
            professionisti trovati
            {selectedCategory && (
              <span> nella categoria <span className="font-semibold text-primary">{selectedCategory}</span></span>
            )}
            {selectedProvince && (
              <span> in provincia di <span className="font-semibold text-primary">{provinceToName[selectedProvince] || selectedProvince}</span></span>
            )}
            {selectedCity && (
              <span> a <span className="font-semibold text-primary">{selectedCity}</span></span>
            )}
          </p>
          {isPending && (
            <span className="text-xs text-text-secondary flex items-center gap-2">
              <span className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              Aggiornamento...
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {initialProfessionals.length === 0 ? (
            <div className="text-center py-20 border border-zinc-200 col-span-full">
              <Search className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-text mb-2">Nessun risultato</h3>
              <p className="text-text-secondary text-sm">
                Prova a modificare i filtri di ricerca o la zona.
              </p>
            </div>
          ) : (
            initialProfessionals.map((pro, i) => (
              <motion.div
                key={pro.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <ProfessionalCard professional={pro} />
              </motion.div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              disabled={page <= 1 || isPending}
              onClick={() => updateUrl({ page: page - 1 })}
              className="h-10 px-4 flex items-center gap-1 text-sm border border-zinc-200 disabled:opacity-40 hover:bg-zinc-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Precedente
            </button>
            <span className="text-sm text-text-secondary px-4">
              Pagina {page} di {totalPages}
            </span>
            <button
              disabled={page >= totalPages || isPending}
              onClick={() => updateUrl({ page: page + 1 })}
              className="h-10 px-4 flex items-center gap-1 text-sm border border-zinc-200 disabled:opacity-40 hover:bg-zinc-50 transition-colors"
            >
              Successiva
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
