import { useState } from 'react';
import type { CourseDetail } from '../../../mocks/courseDetail';

interface CourseFactsProps {
  course: CourseDetail;
}

const COURSE_MAP_URL = "https://readdy.ai/api/search-image?query=illustrated%20aerial%20top-down%20golf%20course%20hole%20layout%20map%20with%20numbered%20tee%20boxes%2C%20lush%20green%20fairways%2C%20white%20sand%20bunkers%2C%20light%20blue%20water%20hazards%20and%20cart%20paths%2C%20clean%20minimalist%20cartographic%20scorecard%20style%2C%20professional%20golf%20course%20illustration%2C%20cream%20white%20background%2C%20no%20text%2C%20bird%20eye%20view&width=700&height=460&seq=7741&orientation=landscape";

export default function CourseFacts({ course }: CourseFactsProps) {
  const [mapOpen, setMapOpen] = useState(false);

  const facts = [
    { label: 'Antal hål', value: String(course.holes), icon: 'ri-flag-line' },
    { label: 'Par', value: String(course.par), icon: 'ri-golf-line' },
    { label: 'Längd', value: `${course.lengthMeters.toLocaleString('sv-SE')} m`, icon: 'ri-ruler-line' },
    { label: 'Svårighetsgrad', value: course.difficulty, icon: 'ri-bar-chart-line' },
    { label: 'Banskapare', value: course.designer, icon: 'ri-user-star-line' },
    { label: 'Öppningsår', value: String(course.openedYear), icon: 'ri-calendar-line' },
  ];

  return (
    <>
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: facts + description */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-tee-gold" />
                <span className="text-tee-gold text-xs font-semibold tracking-widest uppercase">Banfakta</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-7">
                {facts.map((fact) => (
                  <div key={fact.label} className="bg-tee-sand/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-4 h-4 flex items-center justify-center">
                        <i className={`${fact.icon} text-tee-gold text-sm`} />
                      </span>
                      <span className="text-xs text-gray-500">{fact.label}</span>
                    </div>
                    <p className="font-semibold text-tee-green text-sm">{fact.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-tee-gold" />
                <span className="text-tee-gold text-xs font-semibold tracking-widest uppercase">Om banan</span>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm mb-5">{course.description}</p>
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="w-4 h-4 flex items-center justify-center">
                      <i className={`ri-star-${i < Math.floor(course.rating) ? 'fill' : 'half-fill'} text-tee-gold text-sm`} />
                    </span>
                  ))}
                </div>
                <span className="font-bold text-tee-green">{course.rating}</span>
                <span className="text-gray-400 text-sm">{course.reviews} omdömen</span>
              </div>
            </div>

            {/* Right: course map */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tee-gold" />
                  <span className="text-tee-gold text-xs font-semibold tracking-widest uppercase">Bankarta</span>
                </div>
                <button
                  onClick={() => setMapOpen(true)}
                  className="flex items-center gap-1.5 text-xs text-tee-green hover:text-tee-gold transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-fullscreen-line text-sm" />
                  </span>
                  Visa i helskärm
                </button>
              </div>
              <div
                className="relative rounded-2xl overflow-hidden border border-gray-100 cursor-zoom-in group"
                onClick={() => setMapOpen(true)}
              >
                <div className="w-full h-72">
                  <img
                    src={COURSE_MAP_URL}
                    alt={`Bankarta – ${course.name}`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-tee-green/0 group-hover:bg-tee-green/20 transition-all flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all bg-white/90 rounded-full px-5 py-2.5 flex items-center gap-2">
                    <span className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-zoom-in-line text-tee-green text-base" />
                    </span>
                    <span className="text-tee-green text-sm font-semibold">Klicka för att zooma</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                {course.holes} hål · {course.lengthMeters.toLocaleString('sv-SE')} meter · Par {course.par}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {mapOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setMapOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMapOpen(false)}
              className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors"
            >
              <span className="w-5 h-5 flex items-center justify-center">
                <i className="ri-close-line text-tee-green text-lg" />
              </span>
            </button>
            <img
              src={COURSE_MAP_URL}
              alt={`Bankarta – ${course.name}`}
              className="w-full h-auto object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-4">
              <p className="text-white font-serif text-lg font-semibold">{course.name}</p>
              <p className="text-white/70 text-sm">{course.holes} hål · Par {course.par} · {course.lengthMeters.toLocaleString('sv-SE')} m</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
