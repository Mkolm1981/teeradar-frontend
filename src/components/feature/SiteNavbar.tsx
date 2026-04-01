import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-tee-green sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://storage.readdy-site.link/project_files/44032055-2130-4249-b8fd-91dc718af6a8/08b61115-9011-4ade-9b5f-9f3a15a3a7f6_teeradar_clean_1024.png?v=a5ae6871e7d0e29a3596bc7b7bd7ea9a"
            alt="TeeRadar"
            className="h-24 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/#deals"
            className="text-white/70 hover:text-tee-gold transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
          >
            Erbjudanden
          </Link>
          <Link
            to="/alla-banor"
            className="text-white/70 hover:text-tee-gold transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
          >
            Banor
          </Link>
          <Link
            to="/#hur"
            className="text-white/70 hover:text-tee-gold transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
          >
            Hur det fungerar
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate('/sok')}
            className="bg-tee-gold text-tee-green px-5 py-2 rounded-md text-sm font-semibold hover:bg-tee-gold-light transition-colors cursor-pointer whitespace-nowrap"
          >
            Boka starttid
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-8 h-8 flex items-center justify-center cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Meny"
        >
          <i className={`${menuOpen ? 'ri-close-line' : 'ri-menu-3-line'} text-white text-2xl`}></i>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          <Link to="/#deals" onClick={() => setMenuOpen(false)} className="text-white/80 text-sm font-medium cursor-pointer whitespace-nowrap">Erbjudanden</Link>
          <Link to="/alla-banor" onClick={() => setMenuOpen(false)} className="text-white/80 text-sm font-medium cursor-pointer whitespace-nowrap">Banor</Link>
          <Link to="/#hur" onClick={() => setMenuOpen(false)} className="text-white/80 text-sm font-medium cursor-pointer whitespace-nowrap">Hur det fungerar</Link>
          <button
            onClick={() => { setMenuOpen(false); navigate('/sok'); }}
            className="bg-tee-gold text-tee-green px-5 py-2 rounded-md text-sm font-semibold text-center cursor-pointer whitespace-nowrap"
          >
            Boka starttid
          </button>
        </div>
      )}
    </nav>
  );
}
