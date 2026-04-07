// src/pages/admin/components/BookingsSection.tsx
import { useState, useEffect } from 'react';

const API = import.meta.env.VITE_API_URL || 'https://teeradar-backend-production.up.railway.app';

interface Booking {
  id: number;
  booking_ref: string;
  course_slug: string;
  start_time: string;
  players: number;
  email: string;
  total_amount: number;
  display_price: number;
  service_fee: number;
  status: string;
  created_at: string;
  home_club?: string;
  player_names?: string[];
}

function exportCSV(bookings: Booking[], filename: string) {
  const headers = ['Ref', 'Bana', 'Datum', 'Spelare', 'Email', 'Greenfee', 'Serviceavgift', 'Totalt', 'Hemmaklubb', 'Status', 'Bokad'];
  const rows = bookings.map(b => [
    b.booking_ref,
    b.course_slug,
    new Date(b.start_time).toLocaleDateString('sv-SE'),
    b.players,
    b.email,
    b.display_price * b.players,
    (b.service_fee || 2.5) * b.players,
    b.total_amount,
    b.home_club || '',
    b.status,
    new Date(b.created_at).toLocaleDateString('sv-SE'),
  ]);
  const csv = [headers, ...rows].map(r => r.join(';')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

function generateSelfBillingReport(bookings: Booking[], period: string) {
  // Gruppera per bana
  const byClub: Record<string, Booking[]> = {};
  bookings.forEach(b => {
    if (!byClub[b.course_slug]) byClub[b.course_slug] = [];
    byClub[b.course_slug].push(b);
  });

  let report = `SJÄLVFAKTURA – TeeRadar / CMK AB\nPeriod: ${period}\n`;
  report += `Genererad: ${new Date().toLocaleDateString('sv-SE')}\n\n`;
  report += '='.repeat(60) + '\n\n';

  Object.entries(byClub).forEach(([club, bks]) => {
    const totalGreenFee = bks.reduce((s, b) => s + b.display_price * b.players, 0);
    const ourMargin = totalGreenFee * 0.20;
    const toPay = totalGreenFee - ourMargin;
    report += `Klubb: ${club}\n`;
    report += `Antal bokningar: ${bks.length}\n`;
    report += `Total greenfee (kundpris): €${totalGreenFee.toFixed(2)}\n`;
    report += `TeeRadar provision (20%): -€${ourMargin.toFixed(2)}\n`;
    report += `Att betala till klubb: €${toPay.toFixed(2)}\n\n`;
  });

  const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `sjalvfaktura-${period}.txt`; a.click();
  URL.revokeObjectURL(url);
}

export default function BookingsSection() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [statusFilter, setStatusFilter] = useState('alla');
  const [period, setPeriod] = useState(new Date().toISOString().slice(0, 7));

  useEffect(() => {
    fetch(`${API}/api/admin/bookings?limit=200`, {
      headers: { 'x-admin-password': 'TeeRadar2026!' }
    })
      .then(r => r.json())
      .then(data => { setBookings(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = bookings.filter(b => {
    if (statusFilter !== 'alla' && b.status !== statusFilter) return false;
    if (dateFrom && new Date(b.start_time) < new Date(dateFrom)) return false;
    if (dateTo && new Date(b.start_time) > new Date(dateTo)) return false;
    return true;
  });

  const periodBookings = bookings.filter(b =>
    b.created_at.startsWith(period) && b.status === 'confirmed'
  );

  const totalRevenue = filtered.filter(b => b.status === 'confirmed')
    .reduce((s, b) => s + b.total_amount, 0);

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-tee-green">Bokningar</h1>
          <p className="text-gray-500 text-sm mt-1">{filtered.length} bokningar · €{totalRevenue.toFixed(2)} intäkt</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => exportCSV(filtered, `bokningar-${new Date().toISOString().slice(0,10)}.csv`)}
            className="flex items-center gap-2 px-4 py-2 bg-tee-green text-white text-sm font-semibold rounded-xl hover:bg-tee-green/90">
            <i className="ri-download-line" /> Exportera CSV
          </button>
        </div>
      </div>

      {/* Självfaktura */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4 flex items-center justify-between">
        <div>
          <div className="font-semibold text-amber-900 text-sm">Självfaktura-rapport</div>
          <div className="text-amber-700 text-xs mt-0.5">Generera underlag för utbetalningar till klubbar</div>
        </div>
        <div className="flex items-center gap-3">
          <input type="month" value={period} onChange={e => setPeriod(e.target.value)}
            className="border border-amber-300 rounded-xl px-3 py-2 text-sm bg-white outline-none" />
          <button onClick={() => generateSelfBillingReport(periodBookings, period)}
            className="px-4 py-2 bg-amber-600 text-white text-sm font-semibold rounded-xl hover:bg-amber-700">
            Generera ({periodBookings.length} bokningar)
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4 flex flex-wrap gap-3">
        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-tee-gold" />
        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-tee-gold" />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-tee-gold">
          <option value="alla">Alla status</option>
          <option value="confirmed">Bekräftade</option>
          <option value="cancelled">Avbokade</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-tee-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">Inga bokningar</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Ref', 'Bana', 'Datum', 'Tid', 'Spel.', 'Email', 'Hemmaklubb', 'Totalt', 'Status'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-tee-green">{b.booking_ref}</td>
                    <td className="px-4 py-3 text-gray-700 text-xs">{b.course_slug}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{new Date(b.start_time).toLocaleDateString('sv-SE')}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{new Date(b.start_time).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="px-4 py-3 text-gray-600">{b.players}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{b.email}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{b.home_club || '–'}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">€{b.total_amount}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        b.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        b.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-600'}`}>
                        {b.status === 'confirmed' ? 'Bekräftad' : b.status === 'cancelled' ? 'Avbokad' : b.status}
                      </span>
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
