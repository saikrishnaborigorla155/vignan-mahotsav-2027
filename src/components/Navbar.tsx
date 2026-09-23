import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, RotateCcw } from 'lucide-react';
import { Badge20th } from './Badge20th';

interface NavbarProps {
  onOpenRegister?: () => void;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister, onReplayIntro }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Theme', href: '#about' },
    { label: 'Events (80+)', href: '#events' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Registration', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-maroon-950/90 backdrop-blur-md border-b border-gold-500/25 py-2.5 shadow-2xl'
          : 'bg-gradient-to-b from-maroon-950/80 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand identity */}
        <a href="#hero" className="flex items-center gap-3 group">
          <Badge20th size="sm" />
          <div className="flex flex-col">
            <span className="font-cinzel font-bold text-sm sm:text-base tracking-wider text-parchment group-hover:text-gold-300 transition-colors">
              VIGNAN MAHOTSAV
            </span>
            <span className="text-[10px] uppercase font-outfit tracking-widest text-gold-400">
              The Arc of Becoming • 2027
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-xs uppercase font-semibold tracking-widest text-zinc-300 hover:text-gold-300 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gold-400 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Replay Intro choreography */}
          <button
            onClick={onReplayIntro}
            title="Replay cinematic entrance animation"
            className="p-2 rounded-lg bg-maroon-900/60 hover:bg-maroon-800 border border-gold-500/20 text-gold-300 hover:text-gold-200 transition-all active:scale-95 text-xs flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Replay Intro</span>
          </button>

          {/* Quick Register CTA */}
          <button
            onClick={onOpenRegister}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-gold-500 via-sunset-500 to-gold-600 text-maroon-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Register Now</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenRegister}
            className="px-3 py-1.5 rounded-lg bg-gold-500 text-maroon-950 font-bold text-[11px] uppercase tracking-wider"
          >
            Register
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-maroon-900/80 border border-gold-500/30 text-gold-400"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-panel mt-2 mx-4 p-4 rounded-xl border border-gold-500/30 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold tracking-wider text-parchment hover:text-gold-300 py-1 border-b border-gold-500/10"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReplayIntro?.();
                }}
                className="w-full py-2 rounded-lg bg-maroon-900 border border-gold-500/20 text-gold-300 text-xs flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Intro Animation</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister?.();
                }}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-gold-500 to-sunset-500 text-maroon-950 font-bold text-xs uppercase tracking-wider"
              >
                Register For Mahotsav (From ₹250)
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
