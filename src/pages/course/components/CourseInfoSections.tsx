import type { CourseDetail } from '../../../mocks/courseDetail';

interface Props { course: CourseDetail; }

export default function CourseInfoSections({ course }: Props) {
  return (
    <>
      {/* Map */}
      <section className="py-10 bg-tee-sand/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-tee-gold" />
            <span className="text-tee-gold text-xs font-semibold tracking-widest uppercase">Plats &amp; kontakt</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-gray-100 h-64">
              <iframe
                title={`Karta – ${course.name}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(course.name + ', ' + course.location)}`}
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-tee-green/10">
                  <i className="ri-map-pin-line text-tee-green text-sm" />
                </span>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Adress</p>
                  <p className="text-sm text-tee-green font-medium">{course.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-tee-green/10">
                  <i className="ri-phone-line text-tee-green text-sm" />
                </span>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Telefon</p>
                  <a
                    href={`tel:${course.phone}`}
                    className="text-sm text-tee-green font-medium hover:text-tee-gold transition-colors cursor-pointer"
                  >
                    {course.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-tee-gold" />
            <span className="text-tee-gold text-xs font-semibold tracking-widest uppercase">Omdömen</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {course.userReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="w-3.5 h-3.5 flex items-center justify-center">
                      <i className={`ri-star-${i < review.rating ? 'fill' : 'line'} text-xs text-tee-gold`} />
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 italic">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-sm font-semibold text-tee-green">{review.name}</p>
                    <p className="text-xs text-gray-400">HCP {review.handicap}</p>
                  </div>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
