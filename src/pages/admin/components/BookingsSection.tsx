import { useEffect, useState } from 'react';
import { Download, RefreshCw } from 'lucide-react';
import { getAdminBookings, type AdminBooking } from '../../../api/admin';

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

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    confirmed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    cancelled: 'bg-red-100 text-red-700',
  };
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${map[status] ?? 'bg-gray-100 text-gray-600'}`}
    >
      {status}
    </span>
  );
}

export default function BookingsSection() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    getAdminBookings()
      .then(setBookings)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleExport = () => {
    exportToCsv(
      `bokningar-${new Date().toISOString().slice(0, 10)}.csv`,
      bookings.map(b => ({
        Ref: b.booking_ref,
        Bana: b.course_name,
        'Datum/tid': b.start_time,
        Spelare: b.players,
        'Belopp (€)': b.total_amount,
        Email: b.email,
        Status: b.status,
        Skapad: b.created_at,
      }))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-serif text-2xl font-bold text-tee-green">Bokningsöversikt</h2>
          {!loading && (
            <p className="text-sm text-tee-green/50 mt-0.5">
              {bookings.length} bokningar totalt
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
            disabled={!bookings.length}
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
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 text-tee-green/40">
            Inga bokningar hittades
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-tee-sand/40">
                <tr>
                  {['Ref', 'Bana', 'Datum/tid', 'Spel.', 'Belopp', 'Email', 'Status', 'Skapad'].map(
                    h => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-tee-green/60 font-medium whitespace-nowrap"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-tee-sand/50">
                {bookings.map(b => (
                  <tr key={b.id} className="hover:bg-tee-sand/20 transition">
                    <td className="px-4 py-3 font-mono text-xs text-tee-green font-semibold whitespace-nowrap">
                      {b.booking_ref}
                    </td>
                    <td className="px-4 py-3 text-tee-green whitespace-nowrap">{b.course_name}</td>
                    <td className="px-4 py-3 text-tee-green/70 whitespace-nowrap text-xs">
                      {new Date(b.start_time).toLocaleString('sv-SE')}
                    </td>
                    <td className="px-4 py-3 text-tee-green/70 text-center">{b.players}</td>
                    <td className="px-4 py-3 text-tee-green font-medium whitespace-nowrap">
                      €{b.total_amount}
                    </td>
                    <td className="px-4 py-3 text-tee-green/70 text-xs">{b.email}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="px-4 py-3 text-tee-green/40 whitespace-nowrap text-xs">
                      {new Date(b.created_at).toLocaleDateString('sv-SE')}
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
