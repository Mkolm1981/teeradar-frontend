import { AREAS, DIFFICULTIES } from '../../../mocks/allCourses';

const RADAR_PIN_URL = 'https://storage.readdy-site.link/project_files/44032055-2130-4249-b8fd-91dc718af6a8/97b3bb18-fb70-45dd-8871-116c521b9a06_radar-pin.png?v=b9793d3a2f136679dcf5503613d8ec0e';

interface Filters {
  search: string;
  area: string;
  difficulty: string;
  lastMinuteOnly: boolean;
}

interface Props {
  filters: Filters;
  onChange: (f: Partial<Filters>) => void;
  totalCount: number;
  filteredCount: number;
  view: 'grid' | 'map';
  onViewChange: (v: 'grid' | 'map') => void;
}

export default function CourseFilters({ filters, onChange, totalCount, filteredCount, view, onViewChange }: Props) {
  return (
    <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center gap-3">

          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 flex-1 min-w-48 max-w-64">
            <i className="ri-search-line text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Sök klubb eller ort..."
              value={filters.search}
              onChange={(e) => onChange({ search: e.target.value })}
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none w-full"
            />
          </div>

          {/* Area */}
          <select
            value={filters.area}
            onChange={(e) => onChange({ area: e.target.value })}
            className="bg-gray-50 text-sm text-gray-700 rounded-lg px-3 py-2 focus:outline-none cursor-pointer"
          >
            {AREAS.map((a) => (
              <option key={a} value={a}>{a === 'Alla' ? 'Alla områden' : a}</option>
            ))}
          </select>

          {/* Difficulty */}
          <select
            value={filters.difficulty}
            onChange={(e) => onChange({ difficulty: e.target.value })}
            className="bg-gray-50 text-sm text-gray-700 rounded-lg px-3 py-2 focus:outline-none cursor-pointer"
          >
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>{d === 'Alla' ? 'Alla svårigheter' : d}</option>
            ))}
          </select>

          {/* Last minute toggle */}
          <button
            onClick={() => onChange({ lastMinuteOnly: !filters.lastMinuteOnly })}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              filters.lastMinuteOnly
                ? 'bg-tee-gold text-tee-green'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <img src={RADAR_PIN_URL} alt="radar" className="w-5 h-5 object-contain flex-shrink-0" />
            Sista minuten
          </button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Result count */}
          <p className="text-sm text-gray-400 whitespace-nowrap">
            <span className="font-semibold text-tee-green">{filteredCount}</span> av {totalCount} klubbar
          </p>

          {/* View toggle */}
          <div className="flex items-center bg-gray-50 rounded-lg p-1 gap-1">
            <button
              onClick={() => onViewChange('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                view === 'grid' ? 'bg-white text-tee-green' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <i className="ri-grid-line text-sm" />
              Rutnät
            </button>
            <button
              onClick={() => onViewChange('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                view === 'map' ? 'bg-white text-tee-green' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <i className="ri-map-2-line text-sm" />
              Karta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
