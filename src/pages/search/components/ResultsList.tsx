import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SearchResult } from '../../../mocks/searchResults';

const RADAR_PIN_URL = 'https://storage.readdy-site.link/project_files/44032055-2130-4249-b8fd-91dc718af6a8/97b3bb18-fb70-45dd-8871-116c521b9a06_radar-pin.png?v=b9793d3a2f136679dcf5503613d8ec0e';

const difficultyColor: Record<string, string> = {
  Utmanande: 'bg-orange-50 text-orange-600',
  Expert: 'bg-red-50 text-red-600',
  Medel: 'bg-green-50 text-green-700',
};

interface ResultCardProps {
  result: SearchResult;
}

function ResultCard({ result }: ResultCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${
        result.isLastMinute
          ? 'border-tee-gold/40'
          : 'border-gray-100'
      }`}
    >
      {result.isLastMinute && (
        <div className="bg-tee-gold/10 border-b border-tee-gold/20 px-4 py-1.5 flex items-center gap-1.5">
          <img src={RADAR_PIN_URL} alt="radar" className="w-5 h-5 object-contain flex-shrink-0" />
          <span className="text-xs font-bold text-tee-gold tracking-wide uppercase">Sista Minuten</span>
        </div>
      )}

      <div className="flex items-center gap-4 p-4">
        {/* Thumbnail */}
        <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
          <img
            src={result.image}
            alt={result.course}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-1">
            <h3
              className="font-serif font-semibold text-tee-green text-base leading-tight hover:text-tee-gold transition-colors cursor-pointer whitespace-nowrap truncate"
              onClick={() => navigate(`/banor/${result.slug}`)}
            >
              {result.course}
            </h3>
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-xs mb-2">
            <span className="w-3 h-3 flex items-center justify-center">
              <i className="ri-map-pin-line text-xs"></i>
            </span>
            {result.location}, Costa del Sol
          </div>
          <div className="flex items-center flex-wrap gap-2">
            {/* Stars */}
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 flex items-center justify-center">
                <i className="ri-star-fill text-tee-gold text-xs"></i>
              </span>
              <span className="text-xs font-semibold text-gray-700">{result.rating}</span>
              <span className="text-xs text-gray-400">({result.reviews})</span>
            </div>
            <span className="text-gray-200">·</span>
            <span className="text-xs text-gray-500">{result.holes} hål · Par {result.par}</span>
            <span className="text-gray-200">·</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${difficultyColor[result.difficulty]}`}>
              {result.difficulty}
            </span>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex-shrink-0 text-right pl-4 border-l border-gray-100">
          <div className="mb-1">
            {result.discount > 0 && (
              <p className="text-xs text-gray-400 line-through">€{result.originalPrice}</p>
            )}
            <p className="text-2xl font-bold text-tee-green leading-none">€{result.discountedPrice}</p>
            <p className="text-xs text-gray-400 mt-0.5">per spelare</p>
          </div>
          <div className="flex items-center justify-end gap-1 text-xs text-gray-500 mb-1">
            <span className="w-3 h-3 flex items-center justify-center">
              <i className="ri-time-line text-xs"></i>
            </span>
            {result.time}
          </div>
          {result.spotsLeft <= 3 && (
            <p className="text-xs font-semibold text-orange-500 mb-2">
              {result.spotsLeft} platser kvar!
            </p>
          )}
          <button
            onClick={() => navigate(`/banor/${result.slug}`)}
            className="bg-tee-green text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-tee-green-light transition-colors cursor-pointer whitespace-nowrap"
          >
            Mer info
          </button>
        </div>
      </div>
    </div>
  );
}

type SortOption = 'price' | 'time' | 'discount';

interface ResultsListProps {
  results: SearchResult[];
}

export default function ResultsList({ results }: ResultsListProps) {
  const [sort, setSort] = useState<SortOption>('price');

  const sorted = [...results].sort((a, b) => {
    if (sort === 'price') return a.discountedPrice - b.discountedPrice;
    if (sort === 'time') return a.time.localeCompare(b.time);
    return b.discount - a.discount;
  });

  const lastMinute = sorted.filter((r) => r.isLastMinute);
  const regular = sorted.filter((r) => !r.isLastMinute);
  const ordered = [...lastMinute, ...regular];

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-tee-sand flex items-center justify-center mb-5">
          <span className="w-8 h-8 flex items-center justify-center">
            <i className="ri-golf-line text-tee-green/40 text-3xl"></i>
          </span>
        </div>
        <h3 className="font-serif text-xl font-semibold text-tee-green mb-2">Inga tider hittades</h3>
        <p className="text-gray-500 text-sm max-w-xs">
          Inga tider hittades för detta datum – prova ett annat datum eller se kvällens sista-minuten-deals
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-tee-green">{results.length}</span> tillgängliga tider
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Sortera:</span>
          <div className="flex items-center bg-white rounded-lg border border-gray-100 overflow-hidden">
            {([
              { key: 'price', label: 'Lägst pris' },
              { key: 'time', label: 'Starttid' },
              { key: 'discount', label: 'Rabatt' },
            ] as { key: SortOption; label: string }[]).map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSort(opt.key)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  sort === opt.key
                    ? 'bg-tee-green text-white'
                    : 'text-gray-500 hover:text-tee-green'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {ordered.map((result) => (
          <ResultCard key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
}
