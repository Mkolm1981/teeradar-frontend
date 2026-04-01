import { useState } from 'react';

interface Filters {
  destination: string;
  players: number;
  priceMin: number;
  priceMax: number;
  difficulty: string[];
  lastMinuteOnly: boolean;
}

interface FilterPanelProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const destinations = ['Alla', 'Marbella', 'Sotogrande', 'Estepona', 'Málaga', 'Casares', 'Benahavís'];
const difficultyOptions = ['Medel', 'Utmanande', 'Expert'];

const RADAR_PIN_URL = 'https://storage.readdy-site.link/project_files/44032055-2130-4249-b8fd-91dc718af6a8/97b3bb18-fb70-45dd-8871-116c521b9a06_radar-pin.png?v=b9793d3a2f136679dcf5503613d8ec0e';

export default function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  const update = (partial: Partial<Filters>) => {
    setLocalFilters((prev) => ({ ...prev, ...partial }));
  };

  const toggleDifficulty = (d: string) => {
    const next = localFilters.difficulty.includes(d)
      ? localFilters.difficulty.filter((x) => x !== d)
      : [...localFilters.difficulty, d];
    update({ difficulty: next });
  };

  const apply = () => onChange(localFilters);

  return (
    <aside className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
      <h2 className="font-serif text-tee-green text-lg font-semibold">Filter</h2>

      {/* Destination */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
          Destination
        </label>
        <div className="relative">
          <select
            value={localFilters.destination}
            onChange={(e) => update({ destination: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-tee-green bg-white appearance-none cursor-pointer focus:outline-none focus:border-tee-gold"
          >
            {destinations.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none">
            <i className="ri-arrow-down-s-line text-gray-400 text-sm"></i>
          </span>
        </div>
      </div>

      {/* Players */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
          Antal spelare
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              onClick={() => update({ players: n })}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                localFilters.players === n
                  ? 'bg-tee-green text-white border-tee-green'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-tee-gold'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
          Prisintervall
        </label>
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-semibold text-tee-green">
            <span>€{localFilters.priceMin}</span>
            <span>€{localFilters.priceMax}</span>
          </div>
          <input
            type="range"
            min={0}
            max={300}
            step={10}
            value={localFilters.priceMax}
            onChange={(e) => update({ priceMax: Number(e.target.value) })}
            className="w-full accent-tee-green cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>€0</span>
            <span>€300</span>
          </div>
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
          Svårighetsgrad
        </label>
        <div className="space-y-2">
          {difficultyOptions.map((d) => (
            <label key={d} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={localFilters.difficulty.includes(d)}
                onChange={() => toggleDifficulty(d)}
                className="w-4 h-4 rounded accent-tee-green cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-tee-green transition-colors">{d}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Last minute toggle */}
      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 cursor-pointer">
            Visa bara sista-minuten
          </label>
          <button
            onClick={() => update({ lastMinuteOnly: !localFilters.lastMinuteOnly })}
            className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
              localFilters.lastMinuteOnly ? 'bg-tee-green' : 'bg-gray-200'
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all shadow-sm ${
                localFilters.lastMinuteOnly ? 'left-5' : 'left-0.5'
              }`}
            ></span>
          </button>
        </div>
        {localFilters.lastMinuteOnly && (
          <p className="text-xs text-tee-gold mt-1.5 flex items-center gap-1.5">
            <img src={RADAR_PIN_URL} alt="radar" className="w-5 h-5 object-contain flex-shrink-0" />
            Visar endast rabatterade tider
          </p>
        )}
      </div>

      {/* Apply */}
      <button
        onClick={apply}
        className="w-full bg-tee-green text-white py-3 rounded-lg text-sm font-semibold hover:bg-tee-green-light transition-colors cursor-pointer whitespace-nowrap"
      >
        Uppdatera sökning
      </button>
    </aside>
  );
}

export type { Filters };
