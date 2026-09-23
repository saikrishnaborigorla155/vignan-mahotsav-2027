import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Mail, Globe, ArrowRight } from 'lucide-react';

interface InfoPanelLeftProps {
  isInstant?: boolean;
  onOpenRegister?: () => void;
}

export const InfoPanelLeft: React.FC<InfoPanelLeftProps> = ({ isInstant = false, onOpenRegister }) => {
  const tiers = [
    { label: 'Culturals', fee: '₹250', tag: 'All Stage Events' },
    { label: 'Sports (Men)', fee: '₹350', tag: 'Athletics & Games' },
    { label: 'Sports (Women)', fee: '₹250', tag: 'Special Tier' },
  ];

  return (
    <motion.div
      initial={isInstant ? false : { opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: isInstant ? 0 : 1.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-stretch gap-2.5 z-20 group"
    >
      {/* Rotated Vertical Badge */}
      <div className="flex items-center justify-center bg-gradient-to-b from-maroon-800 to-maroon-950 border border-gold-500/30 rounded-l-lg px-2 py-4 shadow-lg">
        <span className="writing-mode-vertical transform -rotate-180 text-[10px] md:text-xs font-black tracking-[0.25em] text-gold-300 uppercase whitespace-nowrap">
          REGISTRATION
        </span>
      </div>

      {/* Main Content Card with Glassmorphic Aesthetic */}
      <div className="flex-1 glass-panel rounded-r-xl p-4 sm:p-5 flex flex-col justify-between max-w-[280px] sm:max-w-[310px] shadow-maroon-glass border-l-0">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-gold-500/20 mb-3">
            <span className="text-xs uppercase font-cinzel tracking-widest text-gold-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" /> Pass Tiers
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/30">
              Early Access
            </span>
          </div>

          {/* Pricing List with Micro-interactions */}
          <div className="space-y-2">
            {tiers.map((t, idx) => (
              <div
                key={idx}
                className="group/item flex items-center justify-between p-2 rounded-lg bg-maroon-900/40 hover:bg-maroon-800/80 border border-gold-500/10 hover:border-gold-500/60 transition-all duration-300 hover:translate-x-1 hover:shadow-gold-glow cursor-pointer"
                onClick={onOpenRegister}
              >
                <div>
                  <p className="text-xs font-semibold text-parchment group-hover/item:text-gold-200 transition-colors">
                    {t.label}
                  </p>
                  <p className="text-[10px] text-zinc-400">{t.tag}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gold-400 font-outfit">
                    {t.fee}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Cash Prizes Highlight */}
          <div className="mt-3 p-2.5 rounded-lg bg-gradient-to-r from-maroon-900/90 via-maroon-800/60 to-maroon-900/90 border border-gold-500/40 flex items-center gap-2.5 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center shrink-0">
              <Trophy className="w-4 h-4 text-gold-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-300">Cash Prizes Worth</p>
              <p className="text-base font-extrabold text-gold-300 font-outfit tracking-wide drop-shadow">
                ₹15,00,000
              </p>
            </div>
          </div>
        </div>

        {/* Footer info & Register CTA */}
        <div className="mt-4 pt-3 border-t border-gold-500/20 text-[10px] text-zinc-400 space-y-1">
          <button
            onClick={onOpenRegister}
            className="w-full py-2 px-3 mb-2 rounded-md bg-gradient-to-r from-gold-600 via-gold-500 to-sunset-500 text-maroon-950 font-bold text-xs tracking-wider uppercase hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-md"
          >
            <span>Register Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <p className="flex items-center gap-1 truncate text-zinc-400 hover:text-gold-300 transition-colors">
            <Globe className="w-3 h-3 text-gold-400 shrink-0" />
            <span>www.vignanmahotsav.in</span>
          </p>
          <p className="flex items-center gap-1 truncate text-zinc-400 hover:text-gold-300 transition-colors">
            <Mail className="w-3 h-3 text-gold-400 shrink-0" />
            <span>mahotsav@vignan.ac.in</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};
