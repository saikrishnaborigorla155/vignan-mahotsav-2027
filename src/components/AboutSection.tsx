import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Flame, Shield, Sparkles } from 'lucide-react';
import { InfoPanelLeft } from './InfoPanelLeft';
import { InfoPanelRight } from './InfoPanelRight';

interface AboutSectionProps {
  onOpenRegister?: () => void;
  onSelectCategory?: (cat: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenRegister, onSelectCategory }) => {
  const pillars = [
    {
      icon: Compass,
      title: 'The Summit of Purpose',
      desc: 'Ascend past comfort into mastery. Mahotsav is the proving ground where collegiate ambition meets national-level competition.',
    },
    {
      icon: Flame,
      title: 'The Crucible of Expression',
      desc: 'From high-octane battle of the bands to classical dance, poetry slams, and digital visual art — ignite your purest craft.',
    },
    {
      icon: Shield,
      title: 'The Arena of Champions',
      desc: 'Olympic-grade track and field, high-stakes court battles, collegiate cricket, and inclusive Para-Sports tournaments.',
    },
    {
      icon: Sparkles,
      title: 'The 20th Edition Legacy',
      desc: 'Two decades of defining cultural and sporting benchmarks across South India, welcoming over 150 prestigious institutions.',
    },
  ];

  const stats = [
    { value: '80+', label: 'Championship Events' },
    { value: '₹15L+', label: 'Cash Prize Pool' },
    { value: '15K+', label: 'Youth Warriors' },
    { value: '20th', label: 'Historic Edition' },
  ];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-maroon-950 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sunset-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Mobile-only section displaying the side panels if screen was narrow in hero */}
        <div className="lg:hidden mb-16 space-y-6">
          <div className="text-center mb-4">
            <span className="text-[11px] font-cinzel uppercase tracking-widest text-gold-400">
              Quick Highlights
            </span>
            <h3 className="text-lg font-bold text-parchment">Passes & Disciplines</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <InfoPanelLeft isInstant={true} onOpenRegister={onOpenRegister} />
            <InfoPanelRight isInstant={true} onSelectCategory={onSelectCategory} />
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-900/80 border border-gold-500/30 text-gold-300 text-xs uppercase tracking-widest font-semibold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Festival Philosophy</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-parchment tracking-wide mb-6"
          >
            The Arc of <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-sunset-400 to-gold-500">Becoming</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light"
          >
            Becoming is not an instant; it is an arc. Like the lone warrior poised against the dawn mountain ridge, greatness demands relentless grit, courage in the face of the steep climb, and the willingness to test one's limits. For 20 years, Vignan Mahotsav has stood as the sanctuary where students transform into legends.
          </motion.p>
        </div>

        {/* 4 Thematic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative p-6 rounded-2xl glass-panel glass-panel-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500/20 to-sunset-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-cinzel font-bold text-parchment group-hover:text-gold-300 transition-colors mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gold-500/10 flex items-center text-xs text-gold-400/80 font-semibold uppercase tracking-wider group-hover:text-gold-300">
                  <span>Explore Pillar</span>
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* High-Impact Stat Counters Bar */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-gold-500/30 shadow-gold-glow">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-gold-500/20">
            {stats.map((s, idx) => (
              <div key={idx} className="pt-4 sm:pt-0 px-4">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-sunset-400 font-outfit">
                  {s.value}
                </p>
                <p className="text-xs sm:text-sm uppercase tracking-widest text-zinc-300 font-semibold mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
