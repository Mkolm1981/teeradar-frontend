// src/pages/admin/components/SubscribersSection.tsx
import { useState, useEffect } from 'react';

const API = import.meta.env.VITE_API_URL || 'https://teeradar-backend-production.up.railway.app';

interface Subscriber { id: number; email: string; active: boolean; created_at: string; }

export function SubscribersSection() {
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/admin/subscribers`, { headers: { 'x-admin-password': 'TeeRadar2026!' } })
      .then(r => r.json())
      .then(d => { setSubs(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const exportCSV = () => {
    const csv = ['Email,Aktiv,Registrerad', ...subs.map(s =>
      `${s.email},${s.active ? 'Ja' : 'Nej'},${new Date(s.created_at).toLocaleDateString('sv-SE')}`)].join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'prenumeranter.csv'; a.click();
  };

  const active = subs.filter(s => s.active).length;

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-tee-green">Prenumeranter</h1>
          <p className="text-gray-500 text-sm mt-1">{subs.length} totalt · {active} aktiva</p>
        </div>
        <button onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-tee-green text-white text-sm font-semibold rounded-xl">
          <i className="ri-download-line" /> Exportera CSV
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-tee-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {['Email', 'Status', 'Registrerad'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {subs.map(s => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">{s.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {s.active ? 'Aktiv' : 'Avprenumererad'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{new Date(s.created_at).toLocaleDateString('sv-SE')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default SubscribersSection;
