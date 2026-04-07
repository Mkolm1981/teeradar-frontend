// src/pages/admin/components/AdminLayout.tsx
import { useState } from 'react';
import DashboardSection from './DashboardSection';
import CoursesSection from './CoursesSection';
import BookingsSection from './BookingsSection';
import SubscribersSection from './SubscribersSection';
import SmMotorSection from './SmMotorSection';
import SettingsSection from './SettingsSection';

type Section = 'dashboard' | 'courses' | 'bookings' | 'subscribers' | 'sm' | 'settings';

const NAV = [
  { id: 'dashboard',    label: 'Dashboard',        icon: 'ri-dashboard-line' },
  { id: 'courses',      label: 'Golfklubbar',       icon: 'ri-flag-2-line' },
  { id: 'bookings',     label: 'Bokningar',         icon: 'ri-calendar-check-line' },
  { id: 'subscribers',  label: 'Prenumeranter',     icon: 'ri-mail-line' },
  { id: 'sm',           label: 'Sista-minuten',     icon: 'ri-timer-flash-line' },
  { id: 'settings',     label: 'Inställningar',     icon: 'ri-settings-3-line' },
] as const;

interface Props { onLogout: () => void; }

export default function AdminLayout({ onLogout }: Props) {
  const [active, setActive] = useState<Section>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderSection = () => {
    switch (active) {
      case 'dashboard':   return <DashboardSection />;
      case 'courses':     return <CoursesSection />;
      case 'bookings':    return <BookingsSection />;
      case 'subscribers': return <SubscribersSection />;
      case 'sm':          return <SmMotorSection />;
      case 'settings':    return <SettingsSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex flex-col w-60 bg-tee-green min-h-screen fixed left-0 top-0 z-30">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <div className="font-serif font-bold text-xl text-white">
            Tee<span className="text-tee-gold">Radar</span>
          </div>
          <div className="text-white/40 text-xs mt-0.5">Administration</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV.map(item => (
            <button key={item.id}
              onClick={() => setActive(item.id as Section)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left w-full
                ${active === item.id
                  ? 'bg-tee-gold text-tee-green font-semibold'
                  : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
              <i className={`${item.icon} text-base`} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <button onClick={onLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/10 transition-all w-full">
            <i className="ri-logout-box-line text-base" />
            Logga ut
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-tee-green px-4 py-3 flex items-center justify-between">
        <div className="font-serif font-bold text-white">
          Tee<span className="text-tee-gold">Radar</span>
          <span className="text-white/40 text-xs ml-2 font-sans font-normal">Admin</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white p-1">
          <i className={`ri-${mobileOpen ? 'close' : 'menu'}-line text-xl`} />
        </button>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-tee-green pt-14">
          <nav className="px-3 py-4 flex flex-col gap-1">
            {NAV.map(item => (
              <button key={item.id}
                onClick={() => { setActive(item.id as Section); setMobileOpen(false); }}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium w-full text-left
                  ${active === item.id ? 'bg-tee-gold text-tee-green' : 'text-white/70'}`}>
                <i className={`${item.icon} text-base`} />
                {item.label}
              </button>
            ))}
            <button onClick={onLogout}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-white/50 w-full mt-4">
              <i className="ri-logout-box-line" /> Logga ut
            </button>
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-60 pt-14 md:pt-0">
        <div className="p-6 max-w-7xl mx-auto">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}
