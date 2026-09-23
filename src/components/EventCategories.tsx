import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Music,
  Palette,
  BookOpen,
  Gamepad2,
  Bot,
  Award,
  Flame,
  Trophy,
  CheckCircle,
  X,
  ArrowRight,
} from 'lucide-react';

interface EventCategoriesProps {
  onOpenRegister?: () => void;
}

export const EventCategories: React.FC<EventCategoriesProps> = ({ onOpenRegister }) => {
  const [filter, setFilter] = useState<'all' | 'culturals' | 'sports' | 'tech'>('all');
  const [selectedEventModal, setSelectedEventModal] = useState<any | null>(null);

  const categories = [
    {
      id: 'performing-arts',
      name: 'Performing Arts',
      type: 'culturals',
      icon: Music,
      count: '18 Competitions',
      prize: '₹3,50,000',
      description: 'Battle of the Bands, Classical Solo & Group Dance, Western Vocals, Theatrical Drama, and Beatboxing.',
      borderColor: 'border-amber-500/40',
      tag: 'Main Stage',
      subEvents: ['Acoustic Unplugged', 'Eastern Classical Dance', 'Western Group Dance', 'Street Play (Nukkad Natak)', 'War of DJs'],
    },
    {
      id: 'visual-arts',
      name: 'Visual Arts',
      type: 'culturals',
      icon: Palette,
      count: '14 Competitions',
      prize: '₹1,75,000',
      description: 'Live Canvas Painting, Digital Concept Art, Charcoal Sketching, Clay Modeling, and Photography Exhibits.',
      borderColor: 'border-orange-500/40',
      tag: 'Creative Gallery',
      subEvents: ['Spot Sketching', 'Digital Character Design', 'Street Photography', 'Installation Art', 'Face Painting'],
    },
    {
      id: 'literary-events',
      name: 'Literary Events',
      type: 'culturals',
      icon: BookOpen,
      count: '12 Competitions',
      prize: '₹1,50,000',
      description: 'National Youth Parliament, Parliamentary Debate, Poetry Slams, General & Pop-Culture Quizzing.',
      borderColor: 'border-rose-500/40',
      tag: 'Debate Hall',
      subEvents: ['National Youth Debate', 'Slam Poetry (Hindi & English)', 'Mega General Quiz', 'Micro-fiction Writing', 'JAM (Just A Minute)'],
    },
    {
      id: 'gaming-esports',
      name: 'Gaming & Esports',
      type: 'tech',
      icon: Gamepad2,
      count: '8 Tournaments',
      prize: '₹2,00,000',
      description: 'Competitive arenas for PC and Mobile esports with live broadcast casting and LAN final showdowns.',
      borderColor: 'border-purple-500/40',
      tag: 'Esports Arena',
      subEvents: ['BGMI Quad Championship', 'Valorant 5v5 Invitational', 'EA FC 25 Console Clash', 'Street Fighter 6 Duel', 'Chess Blitz Online'],
    },
    {
      id: 'robo-games',
      name: 'Robo Games',
      type: 'tech',
      icon: Bot,
      count: '6 Arenas',
      prize: '₹2,25,000',
      description: 'Combat robotics battle cage, autonomous line-following maze racers, and precision drone agility obstacles.',
      borderColor: 'border-cyan-500/40',
      tag: 'Robotics Pit',
      subEvents: ['Robo Wars (15kg & 30kg)', 'Robo Soccer Rumble', 'Autonomous Maze Solver', 'FPV Drone Obstacle Sprint', 'Water Rocketry Challenge'],
    },
    {
      id: 'track-field',
      name: 'Track & Field',
      type: 'sports',
      icon: Flame,
      count: '15 Disciplines',
      prize: '₹2,50,000',
      description: 'Official synthetic 400m track sprints, relays, long jump, triple jump, high jump, shot put, and javelin.',
      borderColor: 'border-yellow-500/40',
      tag: 'Athletics Stadium',
      subEvents: ['100m Lightning Sprint', '4x100m Inter-College Relay', 'Long Jump', 'Shot Put', '800m Middle Distance'],
    },
    {
      id: 'sports-games',
      name: 'Sports & Games',
      type: 'sports',
      icon: Trophy,
      count: '22 Disciplines',
      prize: '₹3,00,000',
      description: 'Men & Women collegiate tournaments in Cricket, Football, Basketball, Volleyball, Kabaddi, and Badminton.',
      borderColor: 'border-red-500/40',
      tag: 'Indoor & Outdoor',
      subEvents: ['Inter-Varsity Cricket Cup', 'Floodlight Football 7s', 'Basketball Invitational', 'Kabaddi Pro-League', 'Badminton Singles/Doubles'],
    },
    {
      id: 'para-sports',
      name: 'Para Sports',
      type: 'sports',
      icon: Award,
      count: 'Special Arenas',
      prize: '₹1,00,000',
      description: 'Empowering differently-abled athletes with Wheelchair Basketball, Para Badminton, and Blind Chess championships.',
      borderColor: 'border-emerald-500/40',
      tag: 'Inclusive Arena',
      subEvents: ['Wheelchair Basketball 3v3', 'Para Badminton Singles', 'Blind Chess Open', 'Seated Shot Put', 'Tandem Athletics'],
    },
  ];

  const filteredCategories = categories.filter((c) => {
    if (filter === 'all') return true;
    return c.type === filter;
  });

  return (
    <section id="events" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-maroon-950/90 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-900/80 border border-gold-500/30 text-gold-300 text-xs uppercase tracking-widest font-semibold mb-3">
              <Trophy className="w-3.5 h-3.5 text-gold-400" />
              <span>Championships & Contests</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-parchment">
              Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-sunset-400">Categories</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 mt-2 max-w-xl font-light">
              Over 80 curated competitions across arts, physical dominance, robotics, and competitive gaming. Choose your arena.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-maroon-900/60 p-1.5 rounded-xl border border-gold-500/20 self-start md:self-auto">
            {[
              { id: 'all', label: 'All 80+ Events' },
              { id: 'culturals', label: 'Culturals & Arts' },
              { id: 'sports', label: 'Sports & Athletics' },
              { id: 'tech', label: 'Tech & Gaming' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all ${
                  filter === tab.id
                    ? 'bg-gradient-to-r from-gold-500 to-sunset-500 text-maroon-950 shadow-md font-bold'
                    : 'text-zinc-300 hover:text-gold-200 hover:bg-maroon-800/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCategories.map((c, idx) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                onClick={() => setSelectedEventModal(c)}
                className={`group relative rounded-2xl glass-panel p-6 border transition-all duration-300 hover:-translate-y-2 hover:shadow-gold-glow flex flex-col justify-between cursor-pointer ${c.borderColor}`}
              >
                <div>
                  {/* Top Tags */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-maroon-900/90 text-gold-300 border border-gold-500/30">
                      {c.tag}
                    </span>
                    <span className="text-xs font-semibold text-sunset-400 font-outfit">
                      {c.count}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-maroon-800/80 to-maroon-900/80 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4 group-hover:scale-110 group-hover:border-gold-400 transition-all shadow-md">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-cinzel font-bold text-parchment group-hover:text-gold-300 transition-colors mb-2">
                    {c.name}
                  </h3>

                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3 mb-4">
                    {c.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gold-500/15 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-zinc-400 block">Prizes up to</span>
                    <span className="text-sm font-bold text-gold-300 font-outfit">{c.prize}</span>
                  </div>
                  <button className="p-2 rounded-lg bg-maroon-900/80 border border-gold-500/30 text-gold-400 group-hover:bg-gold-500 group-hover:text-maroon-950 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal for viewing category event rulebook & sub-events */}
        <AnimatePresence>
          {selectedEventModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-maroon-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-lg glass-panel rounded-2xl p-6 sm:p-8 border border-gold-500/40 shadow-gold-glow-lg max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setSelectedEventModal(null)}
                  className="absolute top-5 right-5 p-2 rounded-lg bg-maroon-900/80 text-zinc-400 hover:text-gold-300 border border-gold-500/20"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
                    {React.createElement(selectedEventModal.icon, { className: 'w-6 h-6' })}
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-gold-400 tracking-wider">
                      {selectedEventModal.tag} • {selectedEventModal.count}
                    </span>
                    <h3 className="text-2xl font-cinzel font-bold text-parchment">
                      {selectedEventModal.name}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
                  {selectedEventModal.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-xs uppercase font-cinzel tracking-wider text-gold-300 font-bold mb-3">
                    Featured Competitions
                  </h4>
                  <div className="space-y-2">
                    {selectedEventModal.subEvents.map((item: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-maroon-900/50 border border-gold-500/15"
                      >
                        <span className="text-xs font-medium text-parchment flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                          {item}
                        </span>
                        <span className="text-[10px] text-gold-300/80 font-mono">National Trophy</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-maroon-900/80 border border-gold-500/30 flex items-center justify-between mb-6">
                  <div>
                    <span className="text-[10px] uppercase text-zinc-400 block">Total Arena Prize</span>
                    <span className="text-lg font-bold text-gold-300 font-outfit">{selectedEventModal.prize}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-zinc-400 block">Entry Pass</span>
                    <span className="text-xs font-semibold text-parchment">From ₹250</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedEventModal(null);
                      onOpenRegister?.();
                    }}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-sunset-500 text-maroon-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Register For This Category</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
