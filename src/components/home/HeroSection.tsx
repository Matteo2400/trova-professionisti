'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { categories, italianCities, italianRegions } from '@/data';
import { useGeolocation } from '@/hooks';
import { CategorySlug } from '@/types';

export default function HeroSection() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [city, setCity] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { latitude, longitude, loading: geoLoading, requestLocation } = useGeolocation();

  useEffect(() => {
    if (city.length >= 2) {
      const q = city.toLowerCase();
      // Search in cities
      const cityMatches = italianCities.filter((c) =>
        c.toLowerCase().startsWith(q)
      );
      // Search in regions
      const regionNames = Object.keys(italianRegions).filter(r => r.includes(q));
      const regionLabels = regionNames.map(r => `${r.charAt(0).toUpperCase() + r.slice(1)} (regione)`);

      setFilteredCities([...regionLabels, ...cityMatches].slice(0, 8));
      setShowSuggestions([...regionLabels, ...cityMatches].length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [city]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      setCity('La mia posizione');
    }
  }, [latitude, longitude]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('categoria', selectedCategory);
    if (city && city !== 'La mia posizione') params.set('citta', city);
    if (latitude && longitude) {
      params.set('lat', latitude.toString());
      params.set('lng', longitude.toString());
    }
    router.push(`/cerca?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 blur-[128px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 blur-[128px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 border border-white/10 text-zinc-400 text-xs font-semibold mb-8 uppercase tracking-[0.2em]">
            La piattaforma #1 per professionisti in Italia
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-[0.95] mb-8 tracking-tight">
            Trova il{' '}
            <span className="text-primary">professionista</span>
            <br />perfetto per te
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Elettricisti, idraulici e imbianchini qualificati nella tua zona.
            Cerca, confronta e contatta in pochi click.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 p-2 max-w-4xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Category Select */}
            <div className="flex-1 relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-white/10 text-white border-0 appearance-none cursor-pointer focus:outline-none focus:bg-white/15 transition-all"
              >
                <option value="" className="text-dark">Tutti i servizi</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug} className="text-dark">
                    {cat.name}
                  </option>
                ))}
              </select>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            </div>

            {/* City Input */}
            <div className="flex-1 relative" ref={suggestionsRef}>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Città, zona o regione..."
                className="w-full h-14 pl-12 pr-12 bg-white/10 text-white placeholder:text-zinc-500 border-0 focus:outline-none focus:bg-white/15 transition-all"
              />
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />

              {/* Geolocation button */}
              <button
                onClick={requestLocation}
                disabled={geoLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-zinc-400 hover:text-primary transition-all"
                title="Usa la mia posizione"
              >
                {geoLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <MapPin className="w-5 h-5" />
                )}
              </button>

              {/* Suggestions dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-dark-secondary border border-white/10 z-50 max-h-48 overflow-y-auto">
                  {filteredCities.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCity(c.replace(' (regione)', ''));
                        setShowSuggestions(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-zinc-300 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="h-14 px-10 bg-primary text-white font-semibold hover:bg-primary-light transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span>Cerca</span>
            </button>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8"
        >
          {['Gratuito', 'Senza impegno', 'In 2 minuti'].map((label) => (
            <span key={label} className="text-xs text-zinc-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              {label}
            </span>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-12 sm:gap-16 mt-12"
        >
          <StatItem value="500+" label="Professionisti" />
          <StatItem value="10.000+" label="Lavori completati" />
          <StatItem value="4.8/5" label="Valutazione media" />
          <StatItem value="50+" label="Città coperte" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border border-white/20 flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{value}</div>
      <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}
