// src/pages/search/page.tsx (uppdaterad)
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SiteNavbar from '../../components/feature/SiteNavbar';
import Footer from '../home/components/Footer';
import FilterPanel, { type Filters } from './components/FilterPanel';
import ResultsList from './components/ResultsList';
import { searchTimes, type SearchResult } from '../../api/client';

export default function SearchPage() {
  const [searchParams] = useSearchParams();

  const defaultFilters: Filters = {
    destination: searchParams.get('destination') || 'Alla',
    players: Number(searchParams.get('players')) || 2,
    priceMin: 0,
    priceMax: 300,
    difficulty: [],
    lastMinuteOnly: false,
  };

  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Hämta tider när filter ändras
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError('');
      try {
        // Datum: idag om före 17:00, annars imorgon
        const now = new Date();
        const useDate = now.getHours() < 17 ? now : new Date(now.getTime() + 86400000);
        const dateStr = useDate.toISOString().slice(0, 10);

        let data = await searchTimes({
          date: dateStr,
          destination: filters.destination,
          players: filters.players,
        });

        // Klientsidesfiltrering
        data = data.filter(r => {
          if (r.discountedPrice > filters.priceMax) return false;
          if (filters.difficulty.length > 0 && !filters.difficulty.includes(r.difficulty)) return false;
          if (filters.lastMinuteOnly && !r.isLastMinute) return false;
          return true;
        });

        setResults(data);
      } catch (err) {
        console.error('Sökning misslyckades:', err);
        setError('Kunde inte hämta tider just nu. Försök igen.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [filters]);

  // Konvertera SearchResult till det format ResultsList förväntar sig
  const adaptedResults = results.map(r => ({
    id: typeof r.id === 'string' ? parseInt(r.id.split('-')[1] || '0') : Number(r.id),
    course: r.course,
    location: r.location,
    image: r.image,
    rating: r.rating,
    reviews: r.reviews,
    holes: r.holes,
    par: r.par,
    difficulty: r.difficulty as 'Medel' | 'Utmanande' | 'Expert',
    originalPrice: r.originalPrice,
    discountedPrice: r.discountedPrice,
    discount: r.discount,
    time: r.time,
    spotsLeft: r.spotsLeft,
    isLastMinute: r.isLastMinute,
    slug: r.slug,
  }));

  return (
    <main className="font-sans bg-tee-white min-h-screen">
      <SiteNavbar />

      <div className="bg-tee-green py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-tee-gold"></span>
            <span className="text-tee-gold text-xs font-semibold tracking-widest uppercase">Starttider</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-1">
            Tillgängliga starttider
          </h1>
          <p className="text-white/60 text-sm">Costa del Sol · Idag &amp; imorgon</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-tee-green cursor-pointer whitespace-nowrap"
          >
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-filter-3-line text-sm"></i>
            </span>
            Filter
          </button>
        </div>

        {showMobileFilter && (
          <div className="md:hidden mb-6">
            <FilterPanel filters={filters} onChange={(f) => { setFilters(f); setShowMobileFilter(false); }} />
          </div>
        )}

        <div className="flex gap-8">
          <div className="hidden md:block w-64 flex-shrink-0 sticky top-20 self-start">
            <FilterPanel filters={filters} onChange={setFilters} />
          </div>

          <div className="flex-1 min-w-0">
            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-3 border-tee-gold border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-500 text-sm">Söker lediga tider...</p>
                </div>
              </div>
            )}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
                {error}
              </div>
            )}
            {!loading && !error && (
              <ResultsList results={adaptedResults} />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
