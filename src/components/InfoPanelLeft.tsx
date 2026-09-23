import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Mail, Globe, ArrowRight } from 'lucide-react';

interface InfoPanelLeftProps {
  isInstant?: boolean;
  onOpenRegister?: () => void;
}

export const InfoPanelLeft: React.FC<InfoPanelLeftProps> = ({ isInstant = false, onOpenRegister }) => {
  const tiers = [
    { label: 'Culturals', fee: '₹250' },
    { label: 'Sports (Men)', fee: '₹350' },
    { label: 'Sports (Women)', fee: '₹250' },
  ];

  return (
    <motion.div
      initial={isInstant ? false : { opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: isInstant ? 0 : 1.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-stretch gap-1.5 z-20 group select-none"
    >
      {/* Rotated Vertical Badge: "REGISTRATION" */}
      <div className="flex items-center justify-center bg-gradient-to-b from-maroon-800/95 to-maroon-950/95 border border-gold-500/40 rounded-l-lg px-1.5 py-2 shadow-md">
        <span className="[writing-mode:vertical-rl] rotate-180 text-[9px] font-black tracking-[0.22em] text-gold-300 uppercase whitespace-nowrap">
          REGISTRATION
        </span>
      </div>

      {/* Main Glass Card */}
      <div className="glass-panel rounded-r-xl p-2.5 sm:p-3 flex flex-col justify-between w-[210px] sm:w-[230px] shadow-maroon-glass border-l-0 text-left">
        {/* Tier List */}
        <div className="space-y-1">
          {tiers.map((t, idx) => (
            <div
              key={idx}
              onClick={onOpenRegister}
              className="group/item flex items-center justify-between px-2 py-1 rounded-md bg-maroon-900/60 hover:bg-maroon-800/90 border border-gold-500/15 hover:border-gold-500/60 transition-all duration-200 cursor-pointer"
            >
              <span className="text-[11px] font-semibold text-parchment group-hover/item:text-gold-200 transition-colors">
                {t.label}
              </span>
              <span className="text-[11px] font-bold text-gold-400 font-outfit">
                {t.fee}
              </span>
            </div>
          ))}
        </div>

        {/* Links and query contacts */}
        <div className="mt-1.5 pt-1.5 border-t border-gold-500/20 text-[9px] space-y-0.5 text-zinc-300 leading-tight">
          <p className="text-[8px] uppercase tracking-wider text-zinc-400">Register at:</p>
          <a
            href="https://www.vignanmahotsav.in"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-gold-300 hover:text-gold-200 hover:underline transition-colors font-medium truncate"
          >
            <Globe className="w-2.5 h-2.5 text-gold-400 shrink-0" />
            <span>www.vignanmahotsav.in</span>
          </a>
          <p className="text-[8px] uppercase tracking-wider text-zinc-400 pt-0.5">Queries:</p>
          <a
            href="mailto:mahotsav@vignan.ac.in"
            className="flex items-center gap-1 text-gold-300 hover:text-gold-200 hover:underline transition-colors font-medium truncate"
          >
            <Mail className="w-2.5 h-2.5 text-gold-400 shrink-0" />
            <span>mahotsav@vignan.ac.in</span>
          </a>
        </div>

        {/* Cash Prize & Quick Register */}
        <div className="mt-2 pt-1.5 border-t border-gold-500/20">
          <div className="flex items-center justify-between mb-1.5">
            <div>
              <p className="text-[8px] uppercase tracking-wider text-zinc-400">Cash prizes worth</p>
              <p className="text-xs font-black text-gold-300 font-outfit tracking-wide drop-shadow">
                ₹15,00,000
              </p>
            </div>
            <div className="w-5 h-5 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 shrink-0">
              <Trophy className="w-3 h-3" />
            </div>
          </div>

          <button
            onClick={onOpenRegister}
            className="w-full py-1 px-2 rounded-md bg-gradient-to-r from-gold-500 via-sunset-500 to-gold-600 text-maroon-950 font-bold text-[10px] tracking-wider uppercase hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1 shadow-sm"
          >
            <span>Register Now</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
