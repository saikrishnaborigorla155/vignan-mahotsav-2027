import React from 'react';
import { motion } from 'framer-motion';
import { Music, Palette, BookOpen, Gamepad2, Bot, Award, Flame, ChevronRight } from 'lucide-react';

interface InfoPanelRightProps {
  isInstant?: boolean;
  onSelectCategory?: (category: string) => void;
}

export const InfoPanelRight: React.FC<InfoPanelRightProps> = ({ isInstant = false, onSelectCategory }) => {
  const culturals = [
    { name: 'Performing Arts', icon: Music, count: '18 Events' },
    { name: 'Visual Arts', icon: Palette, count: '14 Events' },
    { name: 'Literary Events', icon: BookOpen, count: '12 Events' },
    { name: 'Gaming & Esports', icon: Gamepad2, count: '8 Tournaments' },
    { name: 'Robo Games', icon: Bot, count: '6 Arenas' },
  ];

  const sports = [
    { name: 'Para Sports', icon: Award, count: 'Special Arena' },
    { name: 'Track & Field', icon: Flame, count: 'Olympic Track' },
    { name: 'Sports & Games', icon: Award, count: '22 Disciplines' },
  ];

  return (
    <motion.div
      initial={isInstant ? false : { opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: isInstant ? 0 : 1.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-stretch gap-2.5 z-20 group"
    >
      {/* Main Content Card */}
      <div className="flex-1 glass-panel rounded-l-xl p-4 sm:p-5 flex flex-col justify-between max-w-[290px] sm:max-w-[320px] shadow-maroon-glass border-r-0">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-gold-500/20 mb-3">
            <span className="text-xs uppercase font-cinzel tracking-widest text-gold-400 font-bold">
              Fest Arenas
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-sunset-500/20 text-sunset-300 border border-sunset-500/40">
              National Level
            </span>
          </div>

          {/* Culturals List */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gold-400/80 pl-1">
              Culturals & Tech
            </p>
            {culturals.map((c, idx) => {
              const Icon = c.icon;
              return (
                <div
                  key={idx}
                  onClick={() => onSelectCategory?.(c.name)}
                  className="group/item flex items-center justify-between p-1.5 px-2 rounded-lg bg-maroon-900/35 hover:bg-maroon-800/80 border border-gold-500/10 hover:border-gold-500/50 transition-all duration-300 hover:translate-x-[-3px] hover:shadow-gold-glow cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-gold-400 group-hover/item:scale-110 transition-transform" />
                    <span className="text-xs font-medium text-parchment group-hover/item:text-gold-200 transition-colors">
                      {c.name}
                    </span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-zinc-500 group-hover/item:text-gold-400 group-hover/item:translate-x-0.5 transition-all" />
                </div>
              );
            })}
          </div>

          {/* Sports List */}
          <div className="space-y-1.5 mt-3 pt-2 border-t border-gold-500/15">
            <p className="text-[10px] font-bold uppercase tracking-wider text-sunset-400/80 pl-1">
              Sports & Athletics
            </p>
            {sports.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  onClick={() => onSelectCategory?.(s.name)}
                  className="group/item flex items-center justify-between p-1.5 px-2 rounded-lg bg-maroon-900/35 hover:bg-maroon-800/80 border border-sunset-500/10 hover:border-sunset-500/50 transition-all duration-300 hover:translate-x-[-3px] hover:shadow-gold-glow cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-sunset-400 group-hover/item:scale-110 transition-transform" />
                    <span className="text-xs font-medium text-parchment group-hover/item:text-sunset-200 transition-colors">
                      {s.name}
                    </span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-zinc-500 group-hover/item:text-sunset-400 group-hover/item:translate-x-0.5 transition-all" />
                </div>
              );
            })}
          </div>
        </div>

        {/* 80+ Events Lockup */}
        <div className="mt-4 pt-3 border-t border-gold-500/20 flex items-center justify-between">
          <div className="leading-tight">
            <p className="text-[10px] italic text-zinc-300">Exhibit your</p>
            <p className="text-xs uppercase font-cinzel tracking-wider text-parchment font-semibold">Talent In</p>
          </div>
          <div className="flex items-baseline gap-0.5 bg-gradient-to-r from-gold-500/20 to-sunset-500/20 px-2.5 py-1 rounded-lg border border-gold-500/30">
            <span className="text-2xl font-black text-gold-300 font-outfit">80</span>
            <span className="text-base font-bold text-sunset-400">+</span>
            <span className="text-[9px] uppercase tracking-wider text-zinc-400 ml-1">events</span>
          </div>
        </div>
      </div>

      {/* Rotated Vertical Badges: "CULTURALS" & "SPORTS" */}
      <div className="flex flex-col items-center justify-around bg-gradient-to-b from-maroon-800 to-maroon-950 border border-gold-500/30 rounded-r-lg px-2 py-4 shadow-lg">
        <span className="writing-mode-vertical transform rotate-0 text-[10px] md:text-xs font-black tracking-[0.25em] text-gold-300 uppercase whitespace-nowrap">
          CULTURALS
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-gold-400/60 my-1" />
        <span className="writing-mode-vertical transform rotate-0 text-[10px] md:text-xs font-black tracking-[0.25em] text-sunset-400 uppercase whitespace-nowrap">
          SPORTS
        </span>
      </div>
    </motion.div>
  );
};
