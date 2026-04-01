import { useEffect, useState } from 'react';
import { TrendingUp, ShoppingBag, MapPin, Users, RefreshCw } from 'lucide-react';
import { getAdminStats, type AdminStats, type AdminBooking } from '../../../api/admin';

export default function DashboardSection() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAdminStats()
      .then(setStats)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState />;

  if (error) return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold text-tee-green">Dashboard</h2>
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-600">
        <p className="font-medium">Kunde inte hämta statistik</p>
        <p className="text-sm mt-1 opacity-70">{error}</p>
      </div>
    </div>
  );

  if (!stats) return null;

  const statCards = [
    {
      label: 'Bokningar totalt',
      value: stats.totalBookings,
      icon: ShoppingBag,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Total omsättning',
      value: `€${(stats.totalRevenue ?? 0).toLocaleString('sv-SE')}`,
      icon: TrendingUp,
      color: 'text-tee-gold',
      bg: 'bg-yellow-50',
    },
    {
      label: 'Aktiva banor',
      value: stats.activeCourses,
      icon: MapPin,
      color: 'text-tee-green',
      bg: 'bg-green-50',
    },
    {
      label: 'Prenumeranter',
      value: stats.subscribers,
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold text-tee-green">Dashboard</h2>

      {/* Nyckeltal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map(card => (
          <div
            key={card.label}
            className="bg-white rounded-2xl p-6 shadow-sm border border-tee-sand"
          >
            <div className={`inline-flex p-3 rounded-xl ${card.bg} mb-4`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <div className="text-2xl font-bold text-tee-green">{card.value}</div>
            <div className="text-sm text-tee-green/60 mt-1">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Senaste bokningar */}
      {stats.recentBookings?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-tee-sand overflow-hidden">
          <div className="px-6 py-4 border-b border-tee-sand">
            <h3 className="font-serif text-lg font-semibold text-tee-green">
              Senaste bokningar
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-tee-sand/40">
                <tr>
                  {['Ref', 'Bana', 'Datum', 'Spelare', 'Belopp', 'Status'].map(h => (
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
                {stats.recentBookings.slice(0, 10).map((b: AdminBooking) => (
                  <tr key={b.id} className="hover:bg-tee-sand/20 transition">
                    <td className="px-4 py-3 font-mono text-xs text-tee-green font-medium whitespace-nowrap">
                      {b.booking_ref}
                    </td>
                    <td className="px-4 py-3 text-tee-green">{b.course_name}</td>
                    <td className="px-4 py-3 text-tee-green/70 whitespace-nowrap">
                      {new Date(b.start_time).toLocaleDateString('sv-SE')}
                    </td>
                    <td className="px-4 py-3 text-tee-green/70 text-center">{b.players}</td>
                    <td className="px-4 py-3 text-tee-green font-medium whitespace-nowrap">
                      €{b.total_amount}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={b.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
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

function LoadingState() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-32 bg-tee-sand rounded-xl animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 shadow-sm border border-tee-sand h-32 animate-pulse"
          />
        ))}
      </div>
      <div className="bg-white rounded-2xl h-64 border border-tee-sand animate-pulse" />
    </div>
  );
}

export { StatusBadge };
