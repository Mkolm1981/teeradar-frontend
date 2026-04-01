import { useEffect, useState } from 'react';
import { Download, RefreshCw, Mail } from 'lucide-react';
import { getAdminSubscribers, type AdminSubscriber } from '../../../api/admin';

function exportToCsv(filename: string, rows: Record<string, unknown>[]) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(','),
    ...rows.map(row =>
      headers.map(h => JSON.stringify(row[h] ?? '')).join(',')
    ),
  ].join('\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function SubscribersSection() {
  const [subscribers, setSubscribers] = useState<AdminSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    getAdminSubscribers()
      .then(setSubscribers)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleExport = () => {
    exportToCsv(
      `prenumeranter-${new Date().toISOString().slice(0, 10)}.csv`,
      subscribers.map(s => ({
        Email: s.email,
        Registrerad: new Date(s.created_at).toLocaleString('sv-SE'),
      }))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-serif text-2xl font-bold text-tee-green">Prenumeranter</h2>
          {!loading && (
            <p className="text-sm text-tee-green/50 mt-0.5">
              {subscribers.length} registrerade e-postadresser
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={load}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-tee-sand text-tee-green hover:bg-tee-sand/40 transition text-sm font-medium"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            Uppdatera
          </button>
          <button
            onClick={handleExport}
            disabled={!subscribers.length}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-tee-green text-tee-gold hover:bg-tee-green-light transition text-sm font-medium disabled:opacity-50"
          >
            <Download size={15} />
            Exportera CSV
          </button>
        </div>
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
        ) : subscribers.length === 0 ? (
          <div className="text-center py-20 text-tee-green/40">
            <Mail size={40} className="mx-auto mb-3 opacity-30" />
            <p>Inga prenumeranter hittades</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-tee-sand/40">
                <tr>
                  {['#', 'Email', 'Registrerad'].map(h => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-tee-green/60 font-medium"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-tee-sand/50">
                {subscribers.map((s, i) => (
                  <tr key={s.id} className="hover:bg-tee-sand/20 transition">
                    <td className="px-4 py-3 text-tee-green/30 text-xs w-12">{i + 1}</td>
                    <td className="px-4 py-3 text-tee-green">{s.email}</td>
                    <td className="px-4 py-3 text-tee-green/50 text-xs whitespace-nowrap">
                      {new Date(s.created_at).toLocaleString('sv-SE')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
