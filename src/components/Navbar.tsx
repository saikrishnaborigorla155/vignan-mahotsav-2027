import React, { useState, useEffect } from 'react';
import { MenuDrawer } from './MenuDrawer';

interface NavbarProps {
  onOpenRegister: (tier?: string) => void;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister, onReplayIntro }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          UNCLUTTERED FLOATING HEADER
          Top-Left: Single animated hamburger button (morphs to 'X')
                    + Mahotsav eagle "M" logo directly below it
          Top-Right: Full institutional Vignan logo lockup
                     (ABET / NAAC A+ / NIRF 70 badges)
          Center: Pure open space — NO horizontal nav row in hero!
          ───────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 pointer-events-none ${
          scrolled
            ? 'py-1.5 sm:py-2 bg-maroon-950/85 backdrop-blur-md border-b border-gold-500/20 shadow-xl'
            : 'py-2 sm:py-2.5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between">
          {/* Top-Left: Menu Hamburger and Garuda Eagle SIDE BY SIDE */}
          <div className="flex flex-row items-center gap-2.5 sm:gap-3 pointer-events-auto">
            {/* Animated Hamburger Button that morphs to 'X' */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={drawerOpen}
              className="p-2 sm:p-2.5 rounded-lg bg-maroon-950/80 hover:bg-maroon-900 border border-gold-500/35 hover:border-gold-500/70 backdrop-blur-md shadow-lg transition-all active:scale-95 group cursor-pointer"
            >
              <div className="w-4 h-3.5 flex flex-col justify-between items-center relative">
                <span
                  className={`w-full h-0.5 bg-gold-400 rounded-full transition-all duration-300 transform origin-center ${
                    drawerOpen ? 'rotate-45 translate-y-[6px]' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-gold-400 rounded-full transition-all duration-200 ${
                    drawerOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-gold-400 rounded-full transition-all duration-300 transform origin-center ${
                    drawerOpen ? '-rotate-45 -translate-y-[6px]' : ''
                  }`}
                />
              </div>
            </button>

            {/* Garuda / Mahotsav Crest - Side by Side with Menu */}
            <a
              href="#hero"
              aria-label="Vignan Mahotsav 2027 Crest"
              className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 focus:outline-none"
            >
              <img
                src="/assets/mahotsav_eagle.png"
                alt="Mahotsav Garuda Crest"
                className="h-8 sm:h-9 md:h-10 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(251,191,36,0.6)]"
              />
              <span className="hidden sm:inline-block font-cinzel font-bold text-xs md:text-sm text-gold-300 tracking-wider">
                MAHOTSAV
              </span>
            </a>
          </div>

          {/* Top-Right: Compact Institutional Vignan Logo Lockup */}
          <div className="pointer-events-auto">
            <a
              href="https://vignan.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              title="Vignan's Foundation for Science, Technology & Research"
              className="block p-1 sm:p-1.5 rounded-lg bg-maroon-950/65 hover:bg-maroon-900/85 border border-gold-500/25 hover:border-gold-500/50 backdrop-blur-md shadow-md transition-all"
            >
              <img
                src="/assets/vignan_lockup_clean.png"
                alt="Vignan University Institutional Lockup - ABET, NAAC A+, NIRF 70"
                className="h-6 sm:h-7 md:h-8 w-auto object-contain filter drop-shadow-sm"
              />
            </a>
          </div>
        </div>
      </header>

      {/* Slide-In Navigation & Information Drawer */}
      <MenuDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpenRegister={onOpenRegister}
        onReplayIntro={onReplayIntro}
      />
    </>
  );
};
