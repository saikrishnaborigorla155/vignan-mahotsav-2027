import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronDown,
  Sparkles,
  Trophy,
  Calendar,
  Compass,
  Phone,
  RotateCcw,
  ArrowRight,
  ExternalLink,
  Users,
  Ticket,
} from 'lucide-react';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: (tier?: string) => void;
  onReplayIntro?: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onOpenRegister,
  onReplayIntro,
}) => {
  const [eventsOpen, setEventsOpen] = useState(false);
  const [feesOpen, setFeesOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleLinkClick = (href: string) => {
    onClose();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegisterTier = (tier: string) => {
    onClose();
    onOpenRegister(tier);
  };

  const culturalCategories = [
    'Dance (Classical & Western)',
    'Music (Vocal & Instrumental)',
    'Fine Arts & Digital Painting',
    'Literary & Debate',
    'Theatre & Skits',
    'Short Film Contest',
    'Fashion & Persona',
  ];

  const sportsCategories = [
    'Cricket & Football',
    'Basketball & Volleyball',
    'Kabaddi & Kho-Kho',
    'Athletics & Track Events',
    'Badminton & Table Tennis',
    'Chess & Powerlifting',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 cursor-pointer"
            aria-hidden="true"
          />

          {/* Slide-In Drawer Container */}
          <motion.div
            ref={drawerRef}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 left-0 bottom-0 w-full sm:w-[400px] max-w-[90vw] z-50 bg-gradient-to-b from-[#2A060C] via-[#1B050A] to-[#120306] border-r border-gold-500/25 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col text-parchment overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Fest Navigation Menu"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-gold-500/20 bg-maroon-950/80 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/mahotsav_eagle.png"
                  alt="Mahotsav Crest"
                  className="w-10 h-10 object-contain filter drop-shadow-[0_2px_8px_rgba(251,191,36,0.5)]"
                />
                <div className="flex flex-col">
                  <span className="font-cinzel font-bold text-sm tracking-widest text-gold-300">
                    MAHOTSAV 2027
                  </span>
                  <span className="text-[10px] uppercase font-outfit tracking-widest text-zinc-400">
                    20th Edition • 11-13 Feb
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 rounded-full bg-maroon-900/60 border border-gold-500/25 text-gold-400 hover:text-gold-200 hover:bg-maroon-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Nav Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 custom-scrollbar">
              {/* Quick Links Section */}
              <div className="space-y-1">
                <button
                  onClick={() => handleLinkClick('#about')}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-maroon-900/50 border border-transparent hover:border-gold-500/20 text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Compass className="w-4 h-4 text-gold-400 group-hover:rotate-45 transition-transform" />
                    <div>
                      <div className="text-sm font-semibold tracking-wide text-parchment group-hover:text-gold-300">
                        Theme & Legacy
                      </div>
                      <div className="text-[11px] text-zinc-400">The Arc of Becoming</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gold-500/40 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                </button>

                {/* Events Accordion */}
                <div className="rounded-xl border border-gold-500/20 overflow-hidden bg-maroon-950/40">
                  <button
                    onClick={() => setEventsOpen(!eventsOpen)}
                    className="w-full flex items-center justify-between p-3 text-left transition-colors hover:bg-maroon-900/40"
                    aria-expanded={eventsOpen}
                  >
                    <div className="flex items-center gap-3">
                      <Trophy className="w-4 h-4 text-gold-400" />
                      <div>
                        <div className="text-sm font-semibold tracking-wide text-parchment">
                          Events (80+)
                        </div>
                        <div className="text-[11px] text-zinc-400">Culturals & Sports Competitions</div>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gold-400 transition-transform duration-200 ${
                        eventsOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {eventsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-3 pb-3 pt-1 border-t border-gold-500/10 space-y-3"
                      >
                        {/* Culturals */}
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-gold-400 mb-1.5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                            Culturals (₹250 / participant)
                          </div>
                          <ul className="text-xs text-zinc-300 space-y-1 pl-3 border-l border-gold-500/20">
                            {culturalCategories.map((c, i) => (
                              <li key={i}>{c}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Sports */}
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-sunset-400 mb-1.5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-sunset-400" />
                            Sports (Men ₹350 | Women ₹250)
                          </div>
                          <ul className="text-xs text-zinc-300 space-y-1 pl-3 border-l border-sunset-500/20">
                            {sportsCategories.map((s, i) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </div>

                        <button
                          onClick={() => handleLinkClick('#events')}
                          className="w-full mt-2 py-1.5 px-3 rounded-lg bg-maroon-900/60 border border-gold-500/30 text-gold-300 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-maroon-800 transition-colors"
                        >
                          <span>Explore All 80+ Events</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Schedule Link */}
                <button
                  onClick={() => handleLinkClick('#schedule')}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-maroon-900/50 border border-transparent hover:border-gold-500/20 text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gold-400" />
                    <div>
                      <div className="text-sm font-semibold tracking-wide text-parchment group-hover:text-gold-300">
                        Schedule
                      </div>
                      <div className="text-[11px] text-zinc-400">Day 1 to Day 3 (11-13 Feb)</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gold-500/40 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                </button>

                {/* Registration Accordion */}
                <div className="rounded-xl border border-gold-500/20 overflow-hidden bg-maroon-950/40">
                  <button
                    onClick={() => setFeesOpen(!feesOpen)}
                    className="w-full flex items-center justify-between p-3 text-left transition-colors hover:bg-maroon-900/40"
                    aria-expanded={feesOpen}
                  >
                    <div className="flex items-center gap-3">
                      <Ticket className="w-4 h-4 text-gold-400" />
                      <div>
                        <div className="text-sm font-semibold tracking-wide text-parchment">
                          Registration & Passes
                        </div>
                        <div className="text-[11px] text-zinc-400">Tier Pricing & Verification</div>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gold-400 transition-transform duration-200 ${
                        feesOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {feesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-3 pb-3 pt-1 border-t border-gold-500/10 space-y-2.5"
                      >
                        <div className="p-2.5 rounded-lg bg-maroon-900/50 border border-gold-500/15 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold text-parchment">Culturals Pass</div>
                            <div className="text-[10px] text-zinc-400">All dance, music & arts</div>
                          </div>
                          <button
                            onClick={() => handleRegisterTier('Culturals (₹250)')}
                            className="px-2.5 py-1 rounded bg-gold-500/20 hover:bg-gold-500 border border-gold-500/40 text-gold-300 hover:text-maroon-950 text-xs font-bold transition-colors"
                          >
                            ₹250
                          </button>
                        </div>

                        <div className="p-2.5 rounded-lg bg-maroon-900/50 border border-gold-500/15 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold text-parchment">Sports (Men)</div>
                            <div className="text-[10px] text-zinc-400">Tournaments & tracks</div>
                          </div>
                          <button
                            onClick={() => handleRegisterTier('Sports - Men (₹350)')}
                            className="px-2.5 py-1 rounded bg-gold-500/20 hover:bg-gold-500 border border-gold-500/40 text-gold-300 hover:text-maroon-950 text-xs font-bold transition-colors"
                          >
                            ₹350
                          </button>
                        </div>

                        <div className="p-2.5 rounded-lg bg-maroon-900/50 border border-gold-500/15 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold text-parchment">Sports (Women)</div>
                            <div className="text-[10px] text-zinc-400">Tournaments & tracks</div>
                          </div>
                          <button
                            onClick={() => handleRegisterTier('Sports - Women (₹250)')}
                            className="px-2.5 py-1 rounded bg-gold-500/20 hover:bg-gold-500 border border-gold-500/40 text-gold-300 hover:text-maroon-950 text-xs font-bold transition-colors"
                          >
                            ₹250
                          </button>
                        </div>

                        <div className="text-[10px] text-zinc-400 pt-1 border-t border-gold-500/10 space-y-0.5">
                          <div>Official: <span className="text-gold-300">mahotsav.vignan.ac.in</span></div>
                          <div>Helpdesk: <span className="text-gold-300">mahotsav@vignan.ac.in</span></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Contact Link */}
                <button
                  onClick={() => handleLinkClick('#contact')}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-maroon-900/50 border border-transparent hover:border-gold-500/20 text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gold-400" />
                    <div>
                      <div className="text-sm font-semibold tracking-wide text-parchment group-hover:text-gold-300">
                        Contact & Venue
                      </div>
                      <div className="text-[11px] text-zinc-400">Helpdesk & Directions</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gold-500/40 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                </button>
              </div>

              {/* Institutional Accreditation Pill */}
              <div className="p-3 rounded-xl bg-maroon-900/30 border border-gold-500/15 flex items-center gap-3 text-xs text-zinc-300">
                <Users className="w-4 h-4 text-gold-400 shrink-0" />
                <span>
                  Vignan's Foundation for Science, Technology & Research (Deemed to be University)
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-5 border-t border-gold-500/20 bg-maroon-950/95 space-y-2.5">
              {onReplayIntro && (
                <button
                  onClick={() => {
                    onClose();
                    onReplayIntro();
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-maroon-900/70 hover:bg-maroon-800 border border-gold-500/25 text-gold-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Cinematic Intro</span>
                </button>
              )}

              <button
                onClick={() => handleRegisterTier('Culturals (₹250)')}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-gold-500 via-sunset-500 to-gold-600 text-maroon-950 font-bold text-xs uppercase tracking-widest shadow-gold-glow hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Register Now (From ₹250)</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
