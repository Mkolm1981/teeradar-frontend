import type { CourseDetail } from '../../../mocks/courseDetail';

interface Props { course: CourseDetail; }

const FACILITIES = [
  { key: 'drivingRange', label: 'Driving range', icon: 'ri-focus-3-line' },
  { key: 'restaurant', label: 'Restaurang', icon: 'ri-restaurant-line' },
  { key: 'proShop', label: 'Pro shop', icon: 'ri-shopping-bag-line' },
  { key: 'buggyRental', label: 'Buggy', icon: 'ri-car-line' },
  { key: 'changingRooms', label: 'Omklädning', icon: 'ri-shirt-line' },
  { key: 'parking', label: 'Parkering', icon: 'ri-parking-line' },
];

export default function FacilitiesBar({ course }: Props) {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          {FACILITIES.map((f) => {
            const has = course.facilities[f.key as keyof typeof course.facilities];
            return (
              <div
                key={f.key}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm whitespace-nowrap flex-shrink-0 transition-all
                  ${has
                    ? 'border-tee-green/20 bg-tee-green/5 text-tee-green'
                    : 'border-gray-100 bg-gray-50 text-gray-300'}`}
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className={`${f.icon} text-sm`} />
                </span>
                <span className="font-medium">{f.label}</span>
                <span className="w-3.5 h-3.5 flex items-center justify-center">
                  <i className={`${has ? 'ri-check-line text-tee-green' : 'ri-close-line text-gray-300'} text-xs`} />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
