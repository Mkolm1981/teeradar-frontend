import { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Settings,
  MapPin,
  Mail,
  Zap,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import DashboardSection from './DashboardSection';
import BookingsSection from './BookingsSection';
import CoursesSection from './CoursesSection';
import CostaCoursesSection from './CostaCoursesSection';
import SubscribersSection from './SubscribersSection';
import SmMotorSection from './SmMotorSection';

type Section = 'dashboard' | 'bookings' | 'courses' | 'costa' | 'subscribers' | 'sm-motor';

interface NavItem {
  id: Section;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'bookings', label: 'Bokningar', icon: BookOpen },
  { id: 'courses', label: 'Klubbhantering', icon: Settings },
  { id: 'costa', label: 'Costa del Sol', icon: MapPin },
  { id: 'subscribers', label: 'Prenumeranter', icon: Mail },
  { id: 'sm-motor', label: 'SM-motor', icon: Zap },
];

interface Props {
  onLogout: () => void;
}

function Sidebar({
  active,
  onNavigate,
  onLogout,
  onClose,
}: {
  active: Section;
  onNavigate: (id: Section) => void;
  onLogout: () => void;
  onClose?: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-xl font-bold text-tee-gold">TeeRadar</h1>
          <p className="text-white/40 text-xs mt-0.5">Administrationspanel</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-white/50 hover:text-white transition">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition text-left ${
              active === item.id
                ? 'bg-tee-gold text-tee-green'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <item.icon size={17} />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:bg-white/10 hover:text-white transition"
        >
          <LogOut size={17} />
          Logga ut
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({ onLogout }: Props) {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (id: Section) => {
    setActiveSection(id);
    setMobileOpen(false);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <DashboardSection />;
      case 'bookings': return <BookingsSection />;
      case 'courses': return <CoursesSection />;
      case 'costa': return <CostaCoursesSection />;
      case 'subscribers': return <SubscribersSection />;
      case 'sm-motor': return <SmMotorSection />;
    }
  };

  const activeLabel = navItems.find(n => n.id === activeSection)?.label ?? '';

  return (
    <div className="min-h-screen bg-tee-white font-sans flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-tee-green flex-shrink-0 sticky top-0 h-screen">
        <Sidebar
          active={activeSection}
          onNavigate={navigate}
          onLogout={onLogout}
        />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-tee-green z-50">
            <Sidebar
              active={activeSection}
              onNavigate={navigate}
              onLogout={onLogout}
              onClose={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center justify-between px-4 py-4 bg-tee-green sticky top-0 z-30 shadow">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="text-white/70 hover:text-white transition"
            >
              <Menu size={22} />
            </button>
            <span className="font-serif text-lg font-bold text-tee-gold">TeeRadar</span>
          </div>
          <span className="text-white/50 text-sm">{activeLabel}</span>
        </header>

        {/* Content */}
        <main className="flex-1 p-5 md:p-8 max-w-7xl w-full mx-auto">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
