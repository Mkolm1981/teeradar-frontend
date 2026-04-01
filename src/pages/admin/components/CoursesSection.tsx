import { useEffect, useState } from 'react';
import { Edit2, RefreshCw, X, Check, ToggleLeft, ToggleRight } from 'lucide-react';
import {
  getAdminCourses,
  updateAdminCourse,
  type AdminCourse,
  type CourseUpdateData,
} from '../../../api/admin';

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-tee-sand bg-tee-white text-tee-green focus:outline-none focus:ring-2 focus:ring-tee-gold/40 focus:border-tee-gold transition text-sm';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-tee-green/70 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

// ── Edit Modal ────────────────────────────────────────────────────

interface EditModalProps {
  course: AdminCourse;
  onClose: () => void;
  onSave: (id: number, data: CourseUpdateData) => Promise<void>;
}

function EditModal({ course, onClose, onSave }: EditModalProps) {
  const [form, setForm] = useState<CourseUpdateData>({
    name: course.name,
    description: course.description ?? '',
    image: course.image,
    active: course.active,
    gm_version: course.gm_version ?? '',
    from_price: course.from_price,
    has_buggy: course.has_buggy,
    has_restaurant: course.has_restaurant,
    has_pro_shop: course.has_pro_shop,
    has_driving_range: course.has_driving_range,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof CourseUpdateData>(key: K, value: CourseUpdateData[K]) =>
    setForm(f => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSave(course.id, form);
    } catch (err) {
      setError((err as Error).message);
      setSaving(false);
    }
  };

  const facilities = [
    { key: 'has_buggy' as const, label: 'Buggy' },
    { key: 'has_restaurant' as const, label: 'Restaurang' },
    { key: 'has_pro_shop' as const, label: 'Pro shop' },
    { key: 'has_driving_range' as const, label: 'Driving range' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-tee-sand flex-shrink-0">
          <h3 className="font-serif text-lg font-bold text-tee-green truncate pr-4">
            Editera: {course.name}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-tee-sand/50 transition flex-shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-4">
          <Field label="Namn">
            <input
              value={form.name ?? ''}
              onChange={e => set('name', e.target.value)}
              className={inputCls}
            />
          </Field>

          <Field label="Beskrivning">
            <textarea
              value={form.description ?? ''}
              onChange={e => set('description', e.target.value)}
              rows={4}
              className={`${inputCls} resize-none`}
            />
          </Field>

          <Field label="Bild-URL">
            <input
              value={form.image ?? ''}
              onChange={e => set('image', e.target.value)}
              className={inputCls}
              placeholder="https://..."
            />
          </Field>

          {form.image && (
            <div className="rounded-xl overflow-hidden h-36 bg-tee-sand">
              <img
                src={form.image}
                alt=""
                className="w-full h-full object-cover"
                onError={e => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Field label="Från-pris (€)">
              <input
                type="number"
                value={form.from_price ?? ''}
                onChange={e => set('from_price', Number(e.target.value))}
                className={inputCls}
                min={0}
              />
            </Field>
            <Field label="GM-version">
              <input
                value={form.gm_version ?? ''}
                onChange={e => set('gm_version', e.target.value)}
                className={inputCls}
                placeholder="t.ex. 4"
              />
            </Field>
          </div>

          <div>
            <p className="text-sm font-medium text-tee-green/70 mb-3">Faciliteter</p>
            <div className="grid grid-cols-2 gap-2">
              {facilities.map(({ key, label }) => (
                <label
                  key={key}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-tee-sand cursor-pointer hover:bg-tee-sand/30 transition"
                >
                  <input
                    type="checkbox"
                    checked={!!form[key]}
                    onChange={e => set(key, e.target.checked)}
                    className="rounded accent-tee-green"
                  />
                  <span className="text-sm text-tee-green">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-tee-sand cursor-pointer hover:bg-tee-sand/30 transition">
            <input
              type="checkbox"
              checked={!!form.active}
              onChange={e => set('active', e.target.checked)}
              className="rounded accent-tee-green"
            />
            <span className="text-sm font-medium text-tee-green">
              Aktiv (visas på sajten)
            </span>
          </label>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 px-4 py-2.5 rounded-xl border border-red-100">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-tee-sand text-tee-green hover:bg-tee-sand/40 transition font-medium text-sm"
            >
              Avbryt
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-tee-green text-tee-gold hover:bg-tee-green-light transition font-medium text-sm disabled:opacity-50"
            >
              {saving ? (
                <><RefreshCw size={15} className="animate-spin" />Sparar...</>
              ) : (
                <><Check size={15} />Spara</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────

export default function CoursesSection() {
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editCourse, setEditCourse] = useState<AdminCourse | null>(null);
  const [toggling, setToggling] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    getAdminCourses()
      .then(setCourses)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (id: number, data: CourseUpdateData) => {
    const updated = await updateAdminCourse(id, data);
    setCourses(cs => cs.map(c => (c.id === id ? { ...c, ...updated } : c)));
    setEditCourse(null);
  };

  const handleToggle = async (course: AdminCourse) => {
    setToggling(course.id);
    try {
      const updated = await updateAdminCourse(course.id, { active: !course.active });
      setCourses(cs => cs.map(c => (c.id === course.id ? { ...c, ...updated } : c)));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setToggling(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-tee-green">Klubbhantering</h2>
          {!loading && (
            <p className="text-sm text-tee-green/50 mt-0.5">{courses.length} banor</p>
          )}
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-tee-sand text-tee-green hover:bg-tee-sand/40 transition text-sm font-medium"
        >
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          Uppdatera
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-tee-sand overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-tee-green/30">
            <RefreshCw size={28} className="animate-spin" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 text-tee-green/40">Inga banor hittades</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-tee-sand/40">
                <tr>
                  {['Bana', 'Område', 'Hål', 'Par', 'Från', 'GM-ver.', 'Status', ''].map(h => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-tee-green/60 font-medium whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-tee-sand/50">
                {courses.map(c => (
                  <tr key={c.id} className="hover:bg-tee-sand/20 transition">
                    <td className="px-4 py-3 font-medium text-tee-green whitespace-nowrap">
                      {c.name}
                    </td>
                    <td className="px-4 py-3 text-tee-green/70 whitespace-nowrap">{c.area}</td>
                    <td className="px-4 py-3 text-tee-green/70">{c.holes}</td>
                    <td className="px-4 py-3 text-tee-green/70">{c.par}</td>
                    <td className="px-4 py-3 text-tee-green/70 whitespace-nowrap">
                      €{c.from_price}
                    </td>
                    <td className="px-4 py-3 text-tee-green/50 font-mono text-xs">
                      {c.gm_version ?? '—'}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggle(c)}
                        disabled={toggling === c.id}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition disabled:opacity-50 ${
                          c.active
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {toggling === c.id ? (
                          <RefreshCw size={12} className="animate-spin" />
                        ) : c.active ? (
                          <><ToggleRight size={13} />Aktiv</>
                        ) : (
                          <><ToggleLeft size={13} />Inaktiv</>
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setEditCourse(c)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-tee-sand/60 text-tee-green hover:bg-tee-sand transition text-xs font-medium"
                      >
                        <Edit2 size={12} />
                        Editera
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editCourse && (
        <EditModal
          course={editCourse}
          onClose={() => setEditCourse(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
