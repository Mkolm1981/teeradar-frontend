import { useNavigate } from 'react-router-dom';
import type { CourseDetail } from '../../../mocks/courseDetail';

interface CourseHeaderProps {
  course: CourseDetail;
}

const difficultyColor: Record<string, string> = {
  Utmanande: 'bg-orange-100 text-orange-700',
  Expert: 'bg-red-100 text-red-700',
  Medel: 'bg-green-100 text-green-700',
};

export default function CourseHeader({ course }: CourseHeaderProps) {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero */}
      <div className="relative w-full h-[420px] overflow-hidden">
        <img
          src={course.heroImage}
          alt={course.name}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-tee-green via-tee-green/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-8">
          <div className="max-w-7xl mx-auto flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColor[course.difficulty]}`}>
                  {course.difficulty}
                </span>
                <span className="text-white/60 text-sm">{course.holes} hål · Par {course.par}</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-1">{course.name}</h1>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-map-pin-line text-sm"></i>
                </span>
                {course.location}, Costa del Sol, {course.country}
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-star-fill text-tee-gold text-sm"></i>
                </span>
                <span className="text-white font-bold text-lg">{course.rating}</span>
                <span className="text-white/60 text-sm">({course.reviews} omdömen)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick action bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 hover:text-tee-green transition-colors cursor-pointer whitespace-nowrap"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-left-line text-sm"></i>
              </span>
              Tillbaka till sökning
            </button>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('timeslots');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-tee-gold text-tee-green px-5 py-2 rounded-lg text-sm font-semibold hover:bg-tee-gold-light transition-colors cursor-pointer whitespace-nowrap"
          >
            Se tillgängliga tider
          </button>
        </div>
      </div>
    </>
  );
}
