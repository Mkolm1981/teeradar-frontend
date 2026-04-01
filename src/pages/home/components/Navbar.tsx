import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ensurePulseStyle() {
  const id = 'radar-pulse-css';
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = `
    @keyframes radarRing {
      0%   { scale: 1;   opacity: 0.6; }
      100% { scale: 2.8; opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

const RING_PX = 54;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    ensurePulseStyle();
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ringBase: React.CSSProperties = {
    position: 'absolute',
    width: RING_PX,
    height: RING_PX,
    borderRadius: '50%',
    border: '2px solid #C9A84C',
    top: 'calc(42% + 4px)',
    left: 'calc(50% + 1px)',
    translate: '-50% -50%',
    pointerEvents: 'none',
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? 'bg-tee-green shadow-xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="cursor-pointer" style={{ display: 'inline-block', position: 'relative' }}>
          <img
            src="https://storage.readdy-site.link/project_files/44032055-2130-4249-b8fd-91dc718af6a8/08b61115-9011-4ade-9b5f-9f3a15a3a7f6_teeradar_clean_1024.png?v=a5ae6871e7d0e29a3596bc7b7bd7ea9a"
            alt="TeeRadar"
            className="h-16 md:h-28 w-auto relative"
            style={{ zIndex: 10 }}
          />
          <div style={{ ...ringBase, animation: 'radarRing 2.2s ease-out infinite' }} />
          <div style={{ ...ringBase, animation: 'radarRing 2.2s ease-out infinite 0.9s' }} />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#deals"
            className="text-white/80 hover:text-tee-gold transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
          >
            Erbjudanden
          </a>
          <Link
            to="/alla-banor"
            className="text-white/80 hover:text-tee-gold transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
          >
            Banor
          </Link>
          <a
            href="#hur"
            className="text-white/80 hover:text-tee-gold transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
          >
            Hur det fungerar
          </a>
          <a
            href="#prenumerera"
            className="text-white/80 hover:text-tee-gold transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
          >
            Sista minuten
          </a>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/sok"
            className="bg-tee-gold text-tee-green px-5 py-2 rounded-md text-sm font-semibold hover:bg-tee-gold-light transition-colors cursor-pointer whitespace-nowrap"
          >
            Boka starttid
          </Link>
        </div>

        {/* Mobile menu toggle */}
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
        <div className="md:hidden bg-tee-green border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          <a href="#deals" onClick={() => setMenuOpen(false)} className="text-white/80 text-sm font-medium cursor-pointer whitespace-nowrap">Erbjudanden</a>
          <Link to="/alla-banor" onClick={() => setMenuOpen(false)} className="text-white/80 text-sm font-medium cursor-pointer whitespace-nowrap">Banor</Link>
          <a href="#hur" onClick={() => setMenuOpen(false)} className="text-white/80 text-sm font-medium cursor-pointer whitespace-nowrap">Hur det fungerar</a>
          <a href="#prenumerera" onClick={() => setMenuOpen(false)} className="text-white/80 text-sm font-medium cursor-pointer whitespace-nowrap">Sista minuten</a>
          <a
            href="#search"
            onClick={() => setMenuOpen(false)}
            className="bg-tee-gold text-tee-green px-5 py-2 rounded-md text-sm font-semibold text-center cursor-pointer whitespace-nowrap"
          >
            Boka starttid
          </a>
        </div>
      )}
    </nav>
  );
}
