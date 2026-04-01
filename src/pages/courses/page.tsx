import { useState, useMemo } from 'react';
import SiteNavbar from '../../components/feature/SiteNavbar';
import Footer from '../home/components/Footer';
import { allCourses } from '../../mocks/allCourses';
import CourseCard from './components/CourseCard';
import CourseFilters from './components/CourseFilters';
import CourseMapView from './components/CourseMapView';

const CARDS_PER_PAGE = 16;

interface Filters {
  search: string;
  area: string;
  difficulty: string;
  lastMinuteOnly: boolean;
}

const defaultFilters: Filters = {
  search: '',
  area: 'Alla',
  difficulty: 'Alla',
  lastMinuteOnly: false,
};

export default function AllCoursesPage() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [view, setView] = useState<'grid' | 'map'>('grid');
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

  const handleFilterChange = (partial: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
    setVisibleCount(CARDS_PER_PAGE);
  };

  const filtered = useMemo(() => {
    const q = filters.search.toLowerCase();
    return allCourses.filter((c) => {
      if (q && !c.name.toLowerCase().includes(q) && !c.location.toLowerCase().includes(q)) return false;
      if (filters.area !== 'Alla' && c.area !== filters.area) return false;
      if (filters.difficulty !== 'Alla' && c.difficulty !== filters.difficulty) return false;
      if (filters.lastMinuteOnly && !c.hasLastMinute) return false;
      return true;
    });
  }, [filters]);

  const lastMinuteCount = allCourses.filter((c) => c.hasLastMinute).length;

  return (
    <main className="font-sans bg-tee-white min-h-screen">
      <SiteNavbar />

      {/* Hero header */}
      <section className="bg-tee-green pt-12 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-tee-gold" />
                <span className="text-tee-gold text-sm font-semibold tracking-widest uppercase">Costa del Sol</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
                Alla golfklubbar
              </h1>
              <p className="text-white/60 text-base max-w-lg">
                {allCourses.length} anslutna klubbar – från budgetvänliga kommunala banor 
                till världsklassens privatklubbar. Välj, jämför och boka direkt.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 rounded-xl px-5 py-4 text-center">
                <p className="text-3xl font-bold text-white">{allCourses.length}</p>
                <p className="text-white/60 text-xs mt-1">Klubbar</p>
              </div>
              <div className="bg-tee-gold/20 border border-tee-gold/30 rounded-xl px-5 py-4 text-center">
                <p className="text-3xl font-bold text-tee-gold">{lastMinuteCount}</p>
                <p className="text-tee-gold/70 text-xs mt-1">Sista minuten</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <CourseFilters
        filters={filters}
        onChange={handleFilterChange}
        totalCount={allCourses.length}
        filteredCount={filtered.length}
        view={view}
        onViewChange={setView}
      />

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-tee-sand flex items-center justify-center mb-4">
              <i className="ri-search-line text-tee-green/30 text-3xl" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-tee-green mb-2">Inga klubbar hittades</h3>
            <p className="text-gray-400 text-sm max-w-xs">Prova att justera filtren eller sök på ett annat ort</p>
            <button
              onClick={() => setFilters(defaultFilters)}
              className="mt-4 text-tee-gold text-sm font-semibold underline cursor-pointer whitespace-nowrap"
            >
              Rensa alla filter
            </button>
          </div>
        ) : view === 'grid' ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
              {filtered.slice(0, visibleCount).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {visibleCount < filtered.length && (
              <div className="text-center mt-10">
                <p className="text-sm text-gray-400 mb-4">
                  Visar {Math.min(visibleCount, filtered.length)} av {filtered.length} klubbar
                </p>
                <button
                  onClick={() => setVisibleCount((v) => v + CARDS_PER_PAGE)}
                  className="bg-tee-green text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-tee-green-light transition-colors cursor-pointer whitespace-nowrap"
                >
                  Visa fler klubbar
                </button>
              </div>
            )}
          </>
        ) : (
          <CourseMapView courses={filtered} />
        )}
      </section>

      <Footer />
    </main>
  );
}
