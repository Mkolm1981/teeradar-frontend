import { useEffect, useState } from 'react';
import { ToggleLeft, ToggleRight, RefreshCw, MapPin } from 'lucide-react';
import { getAdminCourses, updateAdminCourse, type AdminCourse } from '../../../api/admin';

export default function CostaCoursesSection() {
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toggling, setToggling] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    getAdminCourses()
      .then(data => setCourses(data.filter(c => c.area === 'Costa del Sol')))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleToggle = async (course: AdminCourse) => {
    setToggling(course.id);
    setError(null);
    try {
      const updated = await updateAdminCourse(course.id, { active: !course.active });
      setCourses(cs => cs.map(c => (c.id === course.id ? { ...c, ...updated } : c)));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setToggling(null);
    }
  };

  const active = courses.filter(c => c.active).length;
  const inactive = courses.filter(c => !c.active).length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-serif text-2xl font-bold text-tee-green">Costa del Sol</h2>
          <p className="text-sm text-tee-green/50 mt-0.5">
            Alla golfbanor på Costa del Sol med aktiveringsstatus
          </p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-tee-sand text-tee-green hover:bg-tee-sand/40 transition text-sm font-medium"
        >
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          Uppdatera
        </button>
      </div>

      {/* Stats */}
      {!loading && courses.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-3 text-center min-w-[80px]">
            <div className="text-2xl font-bold text-green-700">{active}</div>
            <div className="text-xs text-green-600 mt-0.5">Aktiva</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-center min-w-[80px]">
            <div className="text-2xl font-bold text-gray-400">{inactive}</div>
            <div className="text-xs text-gray-400 mt-0.5">Inaktiva</div>
          </div>
          <div className="bg-tee-sand/40 border border-tee-sand rounded-xl px-5 py-3 text-center min-w-[80px]">
            <div className="text-2xl font-bold text-tee-green">{courses.length}</div>
            <div className="text-xs text-tee-green/60 mt-0.5">Totalt</div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-sm border border-tee-sand h-24 animate-pulse"
            />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-20 text-tee-green/40 bg-white rounded-2xl border border-tee-sand">
          Inga banor hittades för Costa del Sol
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map(course => (
            <div
              key={course.id}
              className={`bg-white rounded-2xl p-5 shadow-sm border transition ${
                course.active ? 'border-green-200' : 'border-tee-sand opacity-60'
              }`}
            >
              <div className="flex items-start gap-4">
                {course.image && (
                  <img
                    src={course.image}
                    alt=""
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    onError={e => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-tee-green text-sm truncate">
                        {course.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-tee-green/50 mt-0.5">
                        <MapPin size={11} />
                        <span className="truncate">{course.location}</span>
                      </div>
                      <p className="text-xs text-tee-green/40 mt-0.5">
                        {course.holes} hål · Par {course.par} · €{course.from_price}
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggle(course)}
                      disabled={toggling === course.id}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition flex-shrink-0 disabled:opacity-50 ${
                        course.active
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {toggling === course.id ? (
                        <RefreshCw size={12} className="animate-spin" />
                      ) : course.active ? (
                        <><ToggleRight size={13} />Aktiv</>
                      ) : (
                        <><ToggleLeft size={13} />Inaktiv</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
