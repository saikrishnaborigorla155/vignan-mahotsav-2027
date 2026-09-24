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
            ? 'py-2 sm:py-3 bg-maroon-950/80 backdrop-blur-md border-b border-gold-500/20 shadow-2xl'
            : 'py-4 sm:py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-start justify-between">
          {/* Top-Left: Hamburger + Eagle Logo directly below */}
          <div className="flex flex-col items-start gap-2.5 pointer-events-auto">
            {/* Animated Hamburger Button that morphs to 'X' */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={drawerOpen}
              className="p-2.5 sm:p-3 rounded-xl bg-maroon-950/80 hover:bg-maroon-900 border border-gold-500/35 hover:border-gold-500/70 backdrop-blur-md shadow-2xl transition-all active:scale-95 group cursor-pointer"
            >
              <div className="w-5 h-4 flex flex-col justify-between items-center relative">
                <span
                  className={`w-full h-0.5 bg-gold-400 rounded-full transition-all duration-300 transform origin-center ${
                    drawerOpen ? 'rotate-45 translate-y-[7px]' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-gold-400 rounded-full transition-all duration-200 ${
                    drawerOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-gold-400 rounded-full transition-all duration-300 transform origin-center ${
                    drawerOpen ? '-rotate-45 -translate-y-[7px]' : ''
                  }`}
                />
              </div>
            </button>

            {/* Mahotsav Eagle Logo directly below */}
            <a
              href="#hero"
              aria-label="Vignan Mahotsav 2027 Crest"
              className="block transition-transform hover:scale-105 active:scale-95 focus:outline-none"
            >
              <img
                src="/assets/mahotsav_eagle.png"
                alt="Mahotsav Eagle Crest"
                className="w-12 sm:w-16 md:w-20 h-auto object-contain filter drop-shadow-[0_4px_16px_rgba(251,191,36,0.6)]"
              />
            </a>
          </div>

          {/* Top-Right: Full institutional Vignan logo lockup (ABET, NAAC A+, NIRF 70) */}
          <div className="pointer-events-auto">
            <a
              href="https://vignan.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              title="Vignan's Foundation for Science, Technology & Research"
              className="block p-1.5 sm:p-2 rounded-xl bg-maroon-950/65 hover:bg-maroon-900/85 border border-gold-500/25 hover:border-gold-500/50 backdrop-blur-md shadow-xl transition-all"
            >
              <img
                src="/assets/vignan_lockup_clean.png"
                alt="Vignan University Institutional Lockup - ABET, NAAC A+, NIRF 70"
                className="h-9 sm:h-12 md:h-14 w-auto object-contain filter drop-shadow-md"
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
