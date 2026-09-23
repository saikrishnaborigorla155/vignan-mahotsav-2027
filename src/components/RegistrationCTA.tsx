import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Check, ArrowRight, ShieldCheck, Star } from 'lucide-react';

interface RegistrationCTAProps {
  onOpenRegisterWithTier?: (tier: string) => void;
}

export const RegistrationCTA: React.FC<RegistrationCTAProps> = ({ onOpenRegisterWithTier }) => {
  const tiers = [
    {
      name: 'Culturals Pass',
      price: '₹250',
      period: 'per participant',
      tag: 'Stage & Arts',
      desc: 'Full entry to all Performing Arts, Visual Arts, Literary Competitions, and Open Mic stages.',
      features: [
        'Eligible for Performing & Visual Arts events',
        'Official Delegate Kit & Certificate',
        'Access to General Pronite Concerts',
        'Compete for ₹6,75,000 Cultural Prize Pool',
      ],
      popular: false,
      btnColor: 'from-amber-600 to-gold-500',
    },
    {
      name: 'Sports Pass (Men)',
      price: '₹350',
      period: 'per athlete',
      tag: 'Athletics & Games',
      desc: 'Complete sports credential for all male collegiate athletes across Track & Field and Team sports.',
      features: [
        'Participation in Track & Field and Tournaments',
        'Access to Olympic Synthetic Track',
        'Official Athlete Credential & Kit',
        'Compete for ₹5,50,000 Sports Prize Pool',
        'Complimentary Pronite Day Passes',
      ],
      popular: true,
      btnColor: 'from-gold-500 via-sunset-500 to-amber-600',
    },
    {
      name: 'Sports Pass (Women)',
      price: '₹250',
      period: 'per athlete',
      tag: 'Subsidized Tier',
      desc: 'Special incentive tier promoting women in collegiate athletics, team sports, and fitness arenas.',
      features: [
        'Full participation across all Women categories',
        'Dedicated training slots & locker amenities',
        'Official Athlete Credential & Kit',
        'Compete for Full Sports Cash Prizes',
        'Complimentary Pronite Day Passes',
      ],
      popular: false,
      btnColor: 'from-rose-600 to-sunset-500',
    },
    {
      name: 'All-Access Warrior Pass',
      price: '₹500',
      period: 'ultimate pass',
      tag: 'VIP Access',
      desc: 'The complete festival credential: unlimited Culturals, Sports, Gaming & VIP Pronite zones.',
      features: [
        'Unlimited event entries across ALL categories',
        'VIP Stage Front Standing at Mega Pronite',
        'Exclusive 20th Edition Commemorative Badge & Merch',
        'Fast-track reporting & priority tech arena access',
      ],
      popular: false,
      btnColor: 'from-purple-600 to-gold-500',
    },
  ];

  return (
    <section id="pricing" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-maroon-950 border-t border-gold-500/20">
      {/* Background ambient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-gold-500/10 via-sunset-500/10 to-maroon-800/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-900/80 border border-gold-500/30 text-gold-300 text-xs uppercase tracking-widest font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            <span>Official Fee Structure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-parchment">
            Registration <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-sunset-400">Passes</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 mt-2 font-light">
            Secure your credential for the 20th Edition. Compete for national glory and ₹15,00,000 in cash prizes.
          </p>
        </div>

        {/* Cash Prize Banner */}
        <div className="max-w-4xl mx-auto mb-12 p-6 rounded-2xl bg-gradient-to-r from-maroon-900 via-maroon-850 to-maroon-900 border border-gold-500/40 shadow-gold-glow flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 shrink-0 mx-auto sm:mx-0">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs uppercase font-cinzel tracking-wider text-gold-300 font-bold">
                National Youth Talent Benchmark
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-parchment font-outfit">
                Cash Prizes Worth <span className="text-gold-400">₹15,00,000</span>
              </h3>
            </div>
          </div>
          <div className="shrink-0">
            <button
              onClick={() => onOpenRegisterWithTier?.('Culturals (₹250)')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-sunset-500 text-maroon-950 font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-2xl glass-panel p-6 sm:p-7 flex flex-col justify-between border transition-all duration-300 hover:-translate-y-2 ${
                tier.popular
                  ? 'border-gold-500/70 shadow-gold-glow bg-gradient-to-b from-maroon-900/80 to-maroon-950/90'
                  : 'border-gold-500/20 hover:border-gold-500/50 hover:shadow-gold-glow'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-gold-500 to-sunset-500 text-maroon-950 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-md">
                  <Star className="w-3 h-3 fill-maroon-950" />
                  <span>Most Popular</span>
                </div>
              )}

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-maroon-900 text-gold-300 border border-gold-500/30">
                    {tier.tag}
                  </span>
                </div>

                <h3 className="text-xl font-cinzel font-bold text-parchment mb-2">
                  {tier.name}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  {tier.desc}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-1.5 pb-5 border-b border-gold-500/20 mb-5">
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-400 font-outfit">
                    {tier.price}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">/{tier.period}</span>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 mb-6">
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <div className="w-4 h-4 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onOpenRegisterWithTier?.(`${tier.name} (${tier.price})`)}
                className={`w-full py-3 rounded-xl bg-gradient-to-r ${tier.btnColor} text-maroon-950 font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5`}
              >
                <span>Select Pass</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Verification and FAQ hint */}
        <div className="mt-12 text-center text-xs text-zinc-400">
          <p>
            Official registrations are processed through Vignan University portal. For bulk institutional contingents, contact{' '}
            <a href="mailto:mahotsav@vignan.ac.in" className="text-gold-400 hover:underline">
              mahotsav@vignan.ac.in
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};
