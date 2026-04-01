import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import SiteNavbar from '../../components/feature/SiteNavbar';
import Footer from '../home/components/Footer';
import FilterPanel, { type Filters } from './components/FilterPanel';
import ResultsList from './components/ResultsList';
import { mockSearchResults } from '../../mocks/searchResults';

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

  const results = useMemo(() => {
    return mockSearchResults.filter((r) => {
      if (filters.destination !== 'Alla' && r.location !== filters.destination) return false;
      if (r.discountedPrice > filters.priceMax) return false;
      if (filters.difficulty.length > 0 && !filters.difficulty.includes(r.difficulty)) return false;
      if (filters.lastMinuteOnly && !r.isLastMinute) return false;
      return true;
    });
  }, [filters]);

  return (
    <main className="font-sans bg-tee-white min-h-screen">
      <SiteNavbar />

      {/* Page header */}
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
        {/* Mobile filter button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-tee-green cursor-pointer whitespace-nowrap"
          >
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-filter-3-line text-sm"></i>
            </span>
            Filter
            {(filters.difficulty.length > 0 || filters.lastMinuteOnly || filters.priceMax < 300) && (
              <span className="bg-tee-gold text-tee-green text-xs font-bold px-1.5 py-0.5 rounded-full">
                {[
                  filters.difficulty.length > 0 && filters.difficulty.length,
                  filters.lastMinuteOnly && '⚡',
                  filters.priceMax < 300 && '€',
                ].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>

        {/* Mobile filter panel */}
        {showMobileFilter && (
          <div className="md:hidden mb-6">
            <FilterPanel filters={filters} onChange={(f) => { setFilters(f); setShowMobileFilter(false); }} />
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop filter sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0 sticky top-20 self-start">
            <FilterPanel filters={filters} onChange={setFilters} />
          </div>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <ResultsList results={results} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
