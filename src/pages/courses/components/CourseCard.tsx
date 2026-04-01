import { useNavigate } from 'react-router-dom';
import type { CourseEntry } from '../../../mocks/allCourses';

const RADAR_PIN_URL = 'https://storage.readdy-site.link/project_files/44032055-2130-4249-b8fd-91dc718af6a8/97b3bb18-fb70-45dd-8871-116c521b9a06_radar-pin.png?v=b9793d3a2f136679dcf5503613d8ec0e';

const difficultyColor: Record<string, string> = {
  Lätt: 'bg-green-50 text-green-700',
  Medel: 'bg-teal-50 text-teal-700',
  Utmanande: 'bg-orange-50 text-orange-600',
  Expert: 'bg-red-50 text-red-600',
};

interface Props {
  course: CourseEntry;
}

export default function CourseCard({ course }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/banor/${course.slug}`);
  };

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col"
      onClick={handleClick}
    >
      {/* Image */}
      <div className="relative w-full h-40 overflow-hidden flex-shrink-0">
        <img
          src={course.image}
          alt={course.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        {/* Last minute badge */}
        {course.hasLastMinute && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-tee-gold text-tee-green text-xs font-bold px-2 py-0.5 rounded-full">
            <img src={RADAR_PIN_URL} alt="radar" className="w-5 h-5 object-contain flex-shrink-0" />
            Sista min
          </div>
        )}
        {/* Rating */}
        <div className="absolute top-2 right-2 bg-white/90 rounded-md px-1.5 py-0.5 flex items-center gap-1">
          <i className="ri-star-fill text-tee-gold text-xs" />
          <span className="text-xs font-semibold text-tee-green">{course.rating}</span>
        </div>
        {/* Holes + par */}
        <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
          {course.holes} hål · Par {course.par}
        </div>
      </div>

      {/* Body */}
      <div className="p-3.5 flex flex-col flex-1">
        <h3 className="font-serif font-semibold text-tee-green text-sm leading-tight mb-0.5 line-clamp-2">
          {course.name}
        </h3>
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-2">
          <i className="ri-map-pin-line text-xs" />
          {course.location}
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${difficultyColor[course.difficulty]}`}>
            {course.difficulty}
          </span>
          <span className="text-gray-300 text-xs">·</span>
          <span className="text-gray-400 text-xs">{course.reviews} omdömen</span>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-400 leading-none mb-0.5">Från</p>
            <p className="font-bold text-tee-green text-base leading-none">
              €{course.hasLastMinute ? course.lastMinuteFrom : course.fromPrice}
              <span className="text-xs font-normal text-gray-400 ml-1">/ sp</span>
            </p>
            {course.hasLastMinute && (
              <p className="text-xs text-gray-400 line-through leading-none mt-0.5">€{course.fromPrice}</p>
            )}
          </div>
          <span className="text-tee-gold text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
            Mer info <i className="ri-arrow-right-line" />
          </span>
        </div>
      </div>
    </div>
  );
}
