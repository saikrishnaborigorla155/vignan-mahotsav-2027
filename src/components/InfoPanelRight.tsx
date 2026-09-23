import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface InfoPanelRightProps {
  isInstant?: boolean;
  onSelectCategory?: (category: string) => void;
}

export const InfoPanelRight: React.FC<InfoPanelRightProps> = ({ isInstant = false, onSelectCategory }) => {
  const culturals = [
    'Performing Arts',
    'Visual Arts',
    'Literary Events',
    'Gaming',
    'Robo Games',
  ];

  const sports = [
    'Para Sports',
    'Track & Field',
    'Sports & Games',
  ];

  return (
    <motion.div
      initial={isInstant ? false : { opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: isInstant ? 0 : 1.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-stretch gap-1.5 z-20 group select-none"
    >
      {/* Main Glass Card */}
      <div className="glass-panel rounded-l-xl p-2.5 sm:p-3 flex flex-col justify-between w-[210px] sm:w-[230px] shadow-maroon-glass border-r-0 text-left">
        <div>
          {/* Culturals List */}
          <div className="space-y-0.5">
            <p className="text-[8px] font-bold uppercase tracking-wider text-gold-400 pb-0.5">
              Culturals
            </p>
            {culturals.map((c, idx) => (
              <div
                key={idx}
                onClick={() => onSelectCategory?.(c)}
                className="group/item flex items-center justify-between px-1.5 py-0.5 rounded hover:bg-maroon-800/60 transition-colors cursor-pointer"
              >
                <span className="text-[10px] font-medium text-parchment group-hover/item:text-gold-200 transition-colors">
                  {c}
                </span>
                <ChevronRight className="w-2 h-2 text-zinc-500 group-hover/item:text-gold-400 transition-all" />
              </div>
            ))}
          </div>

          {/* Sports List */}
          <div className="space-y-0.5 mt-1.5 pt-1.5 border-t border-gold-500/15">
            <p className="text-[8px] font-bold uppercase tracking-wider text-sunset-400 pb-0.5">
              Sports
            </p>
            {sports.map((s, idx) => (
              <div
                key={idx}
                onClick={() => onSelectCategory?.(s)}
                className="group/item flex items-center justify-between px-1.5 py-0.5 rounded hover:bg-maroon-800/60 transition-colors cursor-pointer"
              >
                <span className="text-[10px] font-medium text-parchment group-hover/item:text-sunset-200 transition-colors">
                  {s}
                </span>
                <ChevronRight className="w-2 h-2 text-zinc-500 group-hover/item:text-sunset-400 transition-all" />
              </div>
            ))}
          </div>
        </div>

        {/* 80+ Events Lockup */}
        <div className="mt-2 pt-1.5 border-t border-gold-500/20 flex items-center justify-between">
          <div className="leading-tight">
            <p className="text-[8px] italic text-zinc-300">Exhibit your</p>
            <p className="text-[9px] uppercase font-cinzel tracking-wider text-parchment font-semibold">
              Talent in
            </p>
          </div>
          <div className="flex items-baseline gap-0.5 bg-gold-500/15 px-2 py-0.5 rounded border border-gold-500/30">
            <span className="text-base font-black text-gold-300 font-outfit">80</span>
            <span className="text-xs font-bold text-sunset-400">+</span>
            <span className="text-[7px] uppercase tracking-wider text-zinc-400 ml-0.5">events</span>
          </div>
        </div>
      </div>

      {/* Rotated Vertical Badges: "CULTURALS" & "SPORTS" */}
      <div className="flex flex-col items-center justify-around bg-gradient-to-b from-maroon-800/95 to-maroon-950/95 border border-gold-500/40 rounded-r-lg px-1.5 py-2 shadow-md">
        <span className="[writing-mode:vertical-rl] rotate-180 text-[9px] font-black tracking-[0.22em] text-gold-300 uppercase whitespace-nowrap">
          CULTURALS
        </span>
        <div className="w-1 h-1 rounded-full bg-gold-400/60 my-1" />
        <span className="[writing-mode:vertical-rl] rotate-180 text-[9px] font-black tracking-[0.22em] text-sunset-400 uppercase whitespace-nowrap">
          SPORTS
        </span>
      </div>
    </motion.div>
  );
};
