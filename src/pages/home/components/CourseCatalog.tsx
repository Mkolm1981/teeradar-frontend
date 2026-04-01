import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const courses = [
  {
    id: 1,
    slug: 'valderrama-golf-club',
    name: 'Valderrama Golf Club',
    location: 'Sotogrande',
    price: 95,
    rating: 4.9,
    holes: 18,
    par: 71,
    difficulty: 'Utmanande',
    image: 'https://readdy.ai/api/search-image?query=Valderrama%20famous%20golf%20course%20Sotogrande%20southern%20Spain%20iconic%20fairway%20with%20cork%20oak%20trees%20lush%20perfectly%20manicured%20green%20grass%20warm%20golden%20hour%20sunlight%20prestigious%20championship%20course%20luxury%20destination%20dramatic%20landscape&width=600&height=380&seq=cat1&orientation=landscape',
  },
  {
    id: 2,
    slug: 'finca-cortesin',
    name: 'Finca Cortesin',
    location: 'Casares',
    price: 120,
    rating: 4.9,
    holes: 18,
    par: 72,
    difficulty: 'Expert',
    image: 'https://readdy.ai/api/search-image?query=Finca%20Cortesin%20luxury%20golf%20resort%20Casares%20Costa%20del%20Sol%20Spain%20elegant%20fairway%20Mediterranean%20sea%20panoramic%20views%20golden%20hour%20warm%20light%20green%20manicured%20course%20dramatic%20coastal%20cliffs%20glamorous%20resort%20atmosphere&width=600&height=380&seq=cat2&orientation=landscape',
  },
  {
    id: 3,
    slug: 'los-naranjos-golf-club',
    name: 'Los Naranjos Golf Club',
    location: 'Marbella',
    price: 55,
    rating: 4.7,
    holes: 18,
    par: 72,
    difficulty: 'Medel',
    image: 'https://readdy.ai/api/search-image?query=Los%20Naranjos%20golf%20club%20Marbella%20Spain%20beautiful%20fairway%20with%20orange%20trees%20and%20Mediterranean%20vegetation%20warm%20golden%20afternoon%20light%20lush%20green%20grass%20scenic%20Spanish%20golf%20course%20blue%20sky%20warm%20summer%20day&width=600&height=380&seq=cat3&orientation=landscape',
  },
  {
    id: 4,
    slug: 'la-quinta-golf-cc',
    name: 'La Quinta Golf & CC',
    location: 'Benahavís',
    price: 42,
    rating: 4.6,
    holes: 18,
    par: 71,
    difficulty: 'Medel',
    image: 'https://readdy.ai/api/search-image?query=La%20Quinta%20golf%20country%20club%20Benahavis%20Spain%20mountain%20valley%20backdrop%20green%20fairways%20scenic%20panorama%20warm%20golden%20light%20luxury%20golf%20resort%20rolling%20hills%20Spanish%20landscape%20warm%20sunset%20colors&width=600&height=380&seq=cat4&orientation=landscape',
  },
  {
    id: 5,
    slug: 'las-brisas-golf-club',
    name: 'Las Brisas Golf Club',
    location: 'Marbella',
    price: 65,
    rating: 4.8,
    holes: 18,
    par: 72,
    difficulty: 'Medel',
    image: 'https://readdy.ai/api/search-image?query=Las%20Brisas%20golf%20club%20Nueva%20Andalucia%20Marbella%20Spain%20lush%20green%20fairway%20with%20palm%20trees%20Mediterranean%20sea%20views%20warm%20golden%20light%20prestigious%20golf%20club%20summer%20afternoon%20beautiful%20scenic%20landscape%20tropical%20vegetation&width=600&height=380&seq=cat5&orientation=landscape',
  },
];

const difficultyColor: Record<string, string> = {
  Utmanande: 'bg-orange-100 text-orange-700',
  Expert: 'bg-red-100 text-red-700',
  Medel: 'bg-green-100 text-green-700',
};

export default function CourseCatalog() {
  const [hovered, setHovered] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <section id="banor" className="py-24 bg-tee-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-tee-gold"></span>
            <span className="text-tee-gold text-sm font-semibold tracking-widest uppercase">Våra banor</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-tee-green leading-tight mb-4">
            Costa del Sols<br />bästa golfbanor
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
            Handplockade banor längs Costa del Sol – från klassiker som Valderrama till dolda pärlor. Alltid till bättre pris.
          </p>
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <div
              key={course.id}
              className={`group relative bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer transition-all duration-300 ${
                hovered === course.id ? '-translate-y-1' : ''
              } ${i === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              onMouseEnter={() => setHovered(course.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate(`/banor/${course.slug}`)}
            >
              {/* Image */}
              <div className="relative w-full h-52 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                {/* Rating badge */}
                <div className="absolute top-3 right-3 bg-white/90 rounded-lg px-2.5 py-1 flex items-center gap-1.5">
                  <span className="w-3 h-3 flex items-center justify-center">
                    <i className="ri-star-fill text-xs text-tee-gold"></i>
                  </span>
                  <span className="text-xs font-semibold text-tee-green">{course.rating}</span>
                </div>
                {/* Location overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColor[course.difficulty]}`}>
                    {course.difficulty}
                  </span>
                  <span className="text-white/80 text-xs">{course.holes} hål · Par {course.par}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold text-tee-green mb-1">{course.name}</h3>
                <div className="flex items-center gap-1 text-gray-400 text-sm mb-4">
                  <span className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-map-pin-line text-sm"></i>
                  </span>
                  {course.location}, Costa del Sol
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Från</p>
                    <p className="text-xl font-bold text-tee-green">
                      €{course.price}
                      <span className="text-sm font-normal text-gray-400 ml-1">/ spelare</span>
                    </p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/banor/${course.slug}`); }}
                    className="flex items-center gap-2 text-tee-gold text-sm font-semibold hover:gap-3 transition-all duration-200 cursor-pointer whitespace-nowrap"
                  >
                    Mer info
                    <span className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-arrow-right-line text-sm"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* "View all" card */}
          <div
            className="bg-tee-green rounded-2xl overflow-hidden flex flex-col items-center justify-center p-8 text-center min-h-52 cursor-pointer hover:-translate-y-1 transition-all duration-300 group"
            onClick={() => navigate('/alla-banor')}
          >
            <div className="w-14 h-14 rounded-full bg-tee-gold/20 flex items-center justify-center mb-4 group-hover:bg-tee-gold/30 transition-colors">
              <span className="w-6 h-6 flex items-center justify-center">
                <i className="ri-golf-line text-tee-gold text-xl"></i>
              </span>
            </div>
            <h3 className="font-serif text-xl font-bold text-white mb-2">Visa alla banor</h3>
            <p className="text-white/60 text-sm mb-5">20+ golfbanor längs Costa del Sol</p>
            <button
              onClick={(e) => { e.stopPropagation(); navigate('/alla-banor'); }}
              className="bg-tee-gold text-tee-green px-5 py-2 rounded-lg text-sm font-semibold hover:bg-tee-gold-light transition-colors whitespace-nowrap cursor-pointer"
            >
              Utforska alla →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
