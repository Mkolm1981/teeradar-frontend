// src/pages/admin/components/CoursesSection.tsx
import { useState, useEffect, useCallback } from 'react';

const API = import.meta.env.VITE_API_URL || 'https://teeradar-backend-production.up.railway.app';

interface Course {
  id: number;
  slug: string;
  name: string;
  area: string;
  country: string;
  gm_version: string;
  active: boolean;
  has_last_minute: boolean;
  from_price?: number;
  rating?: number;
  holes?: number;
  par?: number;
  difficulty?: string;
  description?: string;
  image?: string;
  gm_tenant?: string;
  gm_resource_id?: number;
  has_buggy?: boolean;
  has_restaurant?: boolean;
  has_pro_shop?: boolean;
  has_driving_range?: boolean;
  booking_system?: string;
}

const COUNTRIES = ['Alla', 'Spain', 'Portugal', 'Italy', 'Other'];
const BOOKING_SYSTEMS = ['GolfManager V1', 'GolfManager V3', 'BRS Golf', 'Lightspeed', 'Manuell', 'Annat'];
const DIFFICULTIES = ['Lätt', 'Medel', 'Utmanande', 'Expert'];

const AREAS_BY_COUNTRY: Record<string, string[]> = {
  Spain: ['Alla', 'Costa del Sol', 'Costa Blanca', 'Mallorca', 'Barcelona', 'Spanien övrigt'],
  Portugal: ['Alla', 'Algarve', 'Lissabon', 'Portugal övrigt'],
  Italy: ['Alla', 'Italien'],
  Other: ['Alla', 'Övriga marknader'],
};

function EditModal({ course, onSave, onClose }: {
  course: Course;
  onSave: (c: Course) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Course>({ ...course });
  const [saving, setSaving] = useState(false);

  const set = (field: keyof Course, value: unknown) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/admin/courses/${form.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': 'TeeRadar2026!' },
        body: JSON.stringify(form),
      });
      if (res.ok) onSave(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="font-serif font-bold text-tee-green text-lg">{form.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="ri-close-line text-xl" />
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Status toggles */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
              <span className="text-sm font-medium text-gray-700">Ansluten till TeeRadar</span>
              <input type="checkbox" checked={form.active} onChange={e => set('active', e.target.checked)}
                className="w-4 h-4 accent-tee-green" />
            </label>
            <label className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
              <span className="text-sm font-medium text-gray-700">Sista-minuten aktiv</span>
              <input type="checkbox" checked={form.has_last_minute} onChange={e => set('has_last_minute', e.target.checked)}
                className="w-4 h-4 accent-tee-green" />
            </label>
          </div>

          {/* Basic info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Namn</label>
              <input value={form.name} onChange={e => set('name', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-tee-gold" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Område</label>
              <input value={form.area} onChange={e => set('area', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-tee-gold" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Bokningssystem</label>
              <select value={form.booking_system || form.gm_version || ''} onChange={e => set('booking_system', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-tee-gold">
                <option value="">Välj system</option>
                {BOOKING_SYSTEMS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Svårighetsgrad</label>
              <select value={form.difficulty || 'Medel'} onChange={e => set('difficulty', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-tee-gold">
                {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Antal hål</label>
              <input type="number" value={form.holes || 18} onChange={e => set('holes', Number(e.target.value))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-tee-gold" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Par</label>
              <input type="number" value={form.par || 72} onChange={e => set('par', Number(e.target.value))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-tee-gold" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Pris från (€)</label>
              <input type="number" value={form.from_price || ''} onChange={e => set('from_price', Number(e.target.value))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-tee-gold" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Betyg (1-5)</label>
              <input type="number" step="0.1" min="1" max="5" value={form.rating || 4.5} onChange={e => set('rating', Number(e.target.value))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-tee-gold" />
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Huvudbild URL</label>
            <input value={form.image || ''} onChange={e => set('image', e.target.value)}
              placeholder="https://..."
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-tee-gold" />
            {form.image && <img src={form.image} alt="" className="mt-2 h-20 w-full object-cover rounded-lg" />}
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Beskrivning</label>
            <textarea value={form.description || ''} onChange={e => set('description', e.target.value)}
              rows={3} placeholder="Beskriv banan..."
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-tee-gold resize-none" />
          </div>

          {/* Facilities */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Faciliteter</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'has_buggy', label: 'Buggy' },
                { key: 'has_restaurant', label: 'Restaurang' },
                { key: 'has_pro_shop', label: 'Pro Shop' },
                { key: 'has_driving_range', label: 'Driving Range' },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox"
                    checked={!!form[key as keyof Course]}
                    onChange={e => set(key as keyof Course, e.target.checked)}
                    className="accent-tee-green" />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* GM Config */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">API-konfiguration</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Tenant ID</label>
                <input value={form.gm_tenant || ''} onChange={e => set('gm_tenant', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-tee-gold bg-white" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Resource ID</label>
                <input type="number" value={form.gm_resource_id || ''} onChange={e => set('gm_resource_id', Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-tee-gold bg-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end sticky bottom-0 bg-white">
          <button onClick={onClose} className="px-5 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50">Avbryt</button>
          <button onClick={handleSave} disabled={saving}
            className="px-5 py-2 text-sm bg-tee-green text-white rounded-xl hover:bg-tee-green/90 disabled:opacity-60 flex items-center gap-2">
            {saving && <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />}
            Spara
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CoursesSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('Alla');
  const [area, setArea] = useState('Alla');
  const [search, setSearch] = useState('');
  const [showActive, setShowActive] = useState<'alla' | 'active' | 'inactive'>('alla');
  const [editing, setEditing] = useState<Course | null>(null);
  const [saving, setSaving] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/courses`, {
        headers: { 'x-admin-password': 'TeeRadar2026!' }
      });
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleActive = async (course: Course) => {
    setSaving(course.id);
    try {
      await fetch(`${API}/api/admin/courses/${course.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': 'TeeRadar2026!' },
        body: JSON.stringify({ active: !course.active }),
      });
      setCourses(prev => prev.map(c => c.id === course.id ? { ...c, active: !c.active } : c));
    } finally {
      setSaving(null);
    }
  };

  const areas = country !== 'Alla' ? (AREAS_BY_COUNTRY[country] || ['Alla']) : ['Alla'];

  const filtered = courses.filter(c => {
    if (country !== 'Alla' && c.country !== country) return false;
    if (area !== 'Alla' && c.area !== area) return false;
    if (showActive === 'active' && !c.active) return false;
    if (showActive === 'inactive' && c.active) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const activeCount = courses.filter(c => c.active).length;

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-tee-green">Golfklubbar</h1>
          <p className="text-gray-500 text-sm mt-1">{courses.length} klubbar totalt · {activeCount} anslutna</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4 flex flex-wrap gap-3">
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Sök klubb..."
          className="flex-1 min-w-40 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-tee-gold" />

        <select value={country} onChange={e => { setCountry(e.target.value); setArea('Alla'); }}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-tee-gold">
          {COUNTRIES.map(c => <option key={c} value={c}>{c === 'Alla' ? 'Alla länder' : c}</option>)}
        </select>

        {country !== 'Alla' && (
          <select value={area} onChange={e => setArea(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-tee-gold">
            {areas.map(a => <option key={a} value={a}>{a === 'Alla' ? 'Alla områden' : a}</option>)}
          </select>
        )}

        <select value={showActive} onChange={e => setShowActive(e.target.value as typeof showActive)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-tee-gold">
          <option value="alla">Alla klubbar</option>
          <option value="active">Anslutna</option>
          <option value="inactive">Ej anslutna</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-tee-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">Inga klubbar hittades</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Klubb', 'Område', 'Land', 'System', 'Ansluten', 'SM', ''].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(c => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{c.area}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{c.country}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        c.gm_version === 'V3' ? 'bg-amber-50 text-amber-700' :
                        c.gm_version === 'V1' ? 'bg-blue-50 text-blue-700' :
                        'bg-gray-100 text-gray-500'}`}>
                        {c.booking_system || c.gm_version || '–'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleActive(c)} disabled={saving === c.id}
                        className={`relative w-10 h-5 rounded-full transition-colors ${c.active ? 'bg-tee-green' : 'bg-gray-200'}`}>
                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${c.active ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs ${c.has_last_minute ? 'text-tee-gold' : 'text-gray-300'}`}>
                        {c.has_last_minute ? '⚡' : '–'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => setEditing(c)}
                        className="text-xs text-tee-green border border-tee-green/30 px-3 py-1 rounded-lg hover:bg-tee-green/5">
                        Redigera
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <EditModal
          course={editing}
          onSave={updated => { setCourses(prev => prev.map(c => c.id === updated.id ? updated : c)); setEditing(null); }}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
