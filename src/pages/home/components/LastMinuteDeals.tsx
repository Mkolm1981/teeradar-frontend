import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { allCourses } from '../../../mocks/allCourses';
import { getCourseLiveInfo } from '../../../utils/liveDeals';

const RADAR_PIN_URL = 'https://storage.readdy-site.link/project_files/44032055-2130-4249-b8fd-91dc718af6a8/97b3bb18-fb70-45dd-8871-116c521b9a06_radar-pin.png?v=b9793d3a2f136679dcf5503613d8ec0e';

const baseDeals = allCourses.filter((c) => c.hasLastMinute);
const AREAS = ['Alla', 'Sotogrande', 'Marbella', 'Benahavís', 'Estepona', 'Nerja', 'Benalmádena', 'Málaga'];

function nextTimeLabel(minutes: number): string {
  if (minutes < 60) return `om ${minutes} min`;
  const h = Math.floor(minutes / 60);
  const mn = minutes % 60;
  return mn > 0 ? `om ${h}h ${mn}m` : `om ${h}h`;
}

function DealCard({ course }: { course: typeof baseDeals[0] }) {
  const navigate = useNavigate();

  const { nextSlot, allSlots } = getCourseLiveInfo(course.slug);
  const noTimesLeft = nextSlot === null;

  const nextMinutes = nextSlot?.minutesFromNow ?? 0;
  const spotsLeft   = nextSlot?.spotsLeft ?? 0;
  const timesToday  = allSlots.length;
  const priceFrom   = nextSlot?.discountedPrice ?? course.lastMinuteFrom ?? course.fromPrice;
  const priceOrig   = nextSlot?.originalPrice ?? course.fromPrice;
  const discount    = nextSlot?.discount ?? Math.round((1 - priceFrom / priceOrig) * 100);
  const isNextDay   = nextSlot?.isNextDay ?? false;

  // Tag based on area / special properties
  const tagMap: Record<string, string> = {
    'valderrama-golf-club':   'Mest bokad',
    'finca-cortesin':         'Lyx',
    'los-naranjos-golf-club': 'Populär',
    'la-quinta-golf-cc':      'Bästa pris',
    'las-brisas-golf-club':   'Nu tillgänglig',
    'estepona-golf':          'Bästa pris',
    'la-dama-de-noche':       'Kväll',
    'nerja-golf-club':        'Bästa pris',
  };
  const tag = tagMap[course.slug];

  return (
    <div
      onClick={() => navigate(`/banor/${course.slug}`)}
      className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col ${noTimesLeft ? 'border-gray-100 opacity-60' : 'border-gray-100 hover:-translate-y-1'}`}
    >
      {/* Image */}
      <div className="relative w-full h-44 overflow-hidden flex-shrink-0">
        <img
          src={course.image}
          alt={course.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        {tag && (
          <span className="absolute top-3 left-3 bg-tee-gold text-tee-green text-xs font-bold px-2.5 py-0.5 rounded-full">
            {tag}
          </span>
        )}
        {!noTimesLeft && (
          <span className="absolute top-3 right-3 bg-tee-green text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          <img src={RADAR_PIN_URL} alt="" className="w-4 h-4 object-contain flex-shrink-0" />
          {noTimesLeft ? 'Slut för idag' : `${timesToday} tid${timesToday !== 1 ? 'er' : ''} kvar`}
        </div>
        <div className="absolute bottom-2.5 right-2.5 bg-white/90 rounded-md px-1.5 py-0.5 flex items-center gap-1">
          <i className="ri-star-fill text-tee-gold text-xs" />
          <span className="text-xs font-semibold text-tee-green">{course.rating}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-serif font-semibold text-tee-green text-base leading-tight mb-0.5 line-clamp-1">
          {course.name}
        </h3>
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
          <span className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
            <i className="ri-map-pin-line text-xs"></i>
          </span>
          {course.location} · {course.holes} hål, par {course.par}
        </div>

        {/* Next tee time chip */}
        <div className="flex items-center gap-1.5 mb-4">
          {noTimesLeft ? (
            <span className="flex items-center gap-1 bg-gray-100 text-gray-400 text-xs font-semibold px-2.5 py-1 rounded-full">
              Inga tider kvar idag
            </span>
          ) : isNextDay ? (
            <span className="flex items-center gap-1 bg-tee-gold/10 text-tee-green text-xs font-semibold px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-tee-gold animate-pulse inline-block"></span>
              Imorgon kl {nextSlot?.time} · {nextTimeLabel(nextMinutes)}
            </span>
          ) : (
            <>
              <span className="flex items-center gap-1 bg-tee-gold/10 text-tee-green text-xs font-semibold px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-tee-gold animate-pulse inline-block"></span>
                Nästa: {nextTimeLabel(nextMinutes)}
              </span>
              <span className="text-gray-300 text-xs">·</span>
              <span className="text-gray-500 text-xs">{spotsLeft} platser kvar</span>
            </>
          )}
        </div>

        {/* Price row */}
        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-400 leading-none mb-0.5">Sista minuten – från</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-tee-green leading-none">€{priceFrom}</span>
              <span className="text-sm text-gray-400 line-through">€{priceOrig}</span>
              <span className="text-xs text-gray-400">/ sp</span>
            </div>
          </div>
          <span className="text-tee-green text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all whitespace-nowrap">
            Boka <i className="ri-arrow-right-line text-sm"></i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function LastMinuteDeals() {
  const [activeArea, setActiveArea] = useState('Alla');
  // Re-render every 60 s so "nästa om X min" stays accurate
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 60000);
    return () => clearInterval(id);
  }, []);

  const filtered = activeArea === 'Alla'
    ? baseDeals
    : baseDeals.filter((c) => c.area === activeArea);

  // Sort: nearest next slot first; courses with no slots go last
  const sorted = [...filtered].sort((a, b) => {
    const ai = getCourseLiveInfo(a.slug).nextSlot;
    const bi = getCourseLiveInfo(b.slug).nextSlot;
    if (ai && bi) return ai.minutesFromNow - bi.minutesFromNow;
    if (ai) return -1;
    if (bi) return 1;
    return 0;
  });

  const areasWithDeals = AREAS.filter((a) => {
    if (a === 'Alla') return true;
    return baseDeals.some((c) => c.area === a);
  });

  return (
    <section id="deals" className="py-24 bg-tee-sand/50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-tee-gold"></span>
              <span className="text-tee-gold text-sm font-semibold tracking-widest uppercase">Exklusiva deals</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-tee-green leading-tight">
              Alla dagens banor med deals
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg leading-relaxed text-sm">
              {baseDeals.length} banor har sista-minuten tider just nu. Bara tillgängliga via TeeRadar.
            </p>
          </div>

          {/* Exclusive badge */}
          <div className="flex items-center gap-2 bg-tee-green/5 border border-tee-green/10 rounded-xl px-5 py-4 flex-shrink-0">
            <span className="w-5 h-5 flex items-center justify-center">
              <i className="ri-lock-line text-tee-green text-base"></i>
            </span>
            <div>
              <p className="text-tee-green text-sm font-semibold">Exklusivt för TeeRadar</p>
              <p className="text-gray-500 text-xs">Syns ej på golfbanornas egna sajter</p>
            </div>
          </div>
        </div>

        {/* Area filter tabs */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          {areasWithDeals.map((area) => {
            const count = area === 'Alla' ? baseDeals.length : baseDeals.filter((c) => c.area === area).length;
            return (
              <button
                key={area}
                onClick={() => setActiveArea(area)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeArea === area
                    ? 'bg-tee-green text-white'
                    : 'bg-white text-gray-600 hover:bg-tee-green/5 border border-gray-200'
                }`}
              >
                {area}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                  activeArea === area ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Deal cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sorted.map((course) => (
            <DealCard key={course.id} course={course} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <span className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <i className="ri-calendar-line text-4xl"></i>
            </span>
            <p className="font-medium">Inga deals i detta område just nu.</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-14">
          <p className="text-gray-500 text-sm mb-4">
            Vill du aldrig missa kvällens deal-släpp?
          </p>
          <a
            href="#prenumerera"
            className="inline-flex items-center gap-2 bg-tee-green text-white px-7 py-3 rounded-lg font-semibold text-sm hover:bg-tee-green-light transition-colors cursor-pointer whitespace-nowrap"
          >
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-mail-line text-sm"></i>
            </span>
            Prenumerera på dagliga deals
          </a>
        </div>

      </div>
    </section>
  );
}
