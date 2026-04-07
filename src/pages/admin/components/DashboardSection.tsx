// src/pages/admin/components/DashboardSection.tsx
import { useState, useEffect } from 'react';

const API = import.meta.env.VITE_API_URL || 'https://teeradar-backend-production.up.railway.app';

interface Stats {
  bookings_today: number;
  bookings_week: number;
  bookings_month: number;
  revenue_month: number;
  active_courses: number;
  subscribers: number;
  active_deals: number;
  last_sm_run: string | null;
}

interface RecentBooking {
  id: number;
  booking_ref: string;
  course_slug: string;
  start_time: string;
  players: number;
  total_amount: number;
  email: string;
  status: string;
  created_at: string;
}

function StatCard({ icon, label, value, sub, color = 'tee-green' }: {
  icon: string; label: string; value: string | number; sub?: string; color?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-tee-green/10 flex items-center justify-center`}>
          <i className={`${icon} text-tee-green text-lg`} />
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-0.5">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  );
}

export default function DashboardSection() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<RecentBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/admin/stats`).then(r => r.json()).catch(() => null),
      fetch(`${API}/api/admin/bookings?limit=10`).then(r => r.json()).catch(() => []),
    ]).then(([s, b]) => {
      setStats(s);
      setRecent(Array.isArray(b) ? b : []);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-tee-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-tee-green">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Översikt av TeeRadar</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="ri-calendar-check-line" label="Bokningar idag" value={stats?.bookings_today ?? 0} />
        <StatCard icon="ri-calendar-line" label="Bokningar denna vecka" value={stats?.bookings_week ?? 0} />
        <StatCard icon="ri-money-euro-circle-line" label="Intäkt denna månad" value={`€${stats?.revenue_month ?? 0}`} />
        <StatCard icon="ri-flag-2-line" label="Aktiva klubbar" value={stats?.active_courses ?? 0} />
        <StatCard icon="ri-mail-line" label="Prenumeranter" value={stats?.subscribers ?? 0} />
        <StatCard icon="ri-timer-flash-line" label="Aktiva deals" value={stats?.active_deals ?? 0} />
        <StatCard icon="ri-calendar-2-line" label="Bokningar denna månad" value={stats?.bookings_month ?? 0} />
        <StatCard icon="ri-clockwise-line" label="Senaste SM-körning"
          value={stats?.last_sm_run ? new Date(stats.last_sm_run).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }) : '–'}
          sub={stats?.last_sm_run ? new Date(stats.last_sm_run).toLocaleDateString('sv-SE') : 'Aldrig körts'} />
      </div>

      {/* Recent bookings */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Senaste bokningar</h2>
        </div>
        {recent.length === 0 ? (
          <div className="px-5 py-8 text-center text-gray-400 text-sm">Inga bokningar än</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Ref', 'Bana', 'Datum', 'Spelare', 'Belopp', 'Status', 'Tidpunkt'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recent.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-tee-green">{b.booking_ref}</td>
                    <td className="px-4 py-3 text-gray-700">{b.course_slug}</td>
                    <td className="px-4 py-3 text-gray-600">{new Date(b.start_time).toLocaleDateString('sv-SE')}</td>
                    <td className="px-4 py-3 text-gray-600">{b.players}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">€{b.total_amount}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        b.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        b.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-600'}`}>
                        {b.status === 'confirmed' ? 'Bekräftad' : b.status === 'cancelled' ? 'Avbokad' : b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{new Date(b.created_at).toLocaleString('sv-SE')}</td>
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
