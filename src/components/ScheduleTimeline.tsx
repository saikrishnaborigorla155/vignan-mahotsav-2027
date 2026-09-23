import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Star } from 'lucide-react';

export const ScheduleTimeline: React.FC = () => {
  const [activeDay, setActiveDay] = useState<'day1' | 'day2' | 'day3'>('day1');

  const daysData = {
    day1: {
      date: 'Feb 11, 2027',
      title: 'Day 1 — The Awakening',
      subtitle: 'Inaugural Torch Relay, Classical Mastery & Heats',
      events: [
        {
          time: '09:00 AM - 10:30 AM',
          title: 'Grand Inauguration & Flame Lighting Ceremony',
          venue: 'Mahotsav Main Amphitheatre',
          category: 'Ceremony',
          desc: 'Official 20th Edition opening with national dignitaries, university chancellor, and ceremonial warrior torch relay.',
          highlight: true,
        },
        {
          time: '11:00 AM - 01:30 PM',
          title: 'Eastern Classical & Folk Group Dance',
          venue: 'Kala Bhavan Stage 1',
          category: 'Culturals',
          desc: 'Over 25 premier collegiate troupes competing in Bharatanatyam, Kathak, Kuchipudi, and regional folk narratives.',
          highlight: false,
        },
        {
          time: '11:30 AM - 03:00 PM',
          title: 'Track & Field: 100m / 200m Preliminary Sprints',
          venue: 'Olympic Synthetic Track',
          category: 'Sports',
          desc: 'Athletes from 120+ colleges battling through qualification heats for the grand sprint showdowns.',
          highlight: false,
        },
        {
          time: '02:00 PM - 05:30 PM',
          title: 'Robo Wars & Drone Agility Heats',
          venue: 'Tech Arena Cage B',
          category: 'Robo Games',
          desc: '15kg combat bots clashing in the steel cage, alongside obstacle course drone time-trials.',
          highlight: false,
        },
        {
          time: '06:00 PM - 09:30 PM',
          title: 'Acoustic Unplugged & Youth Fusion Night',
          venue: 'Sunset Open Stage',
          category: 'Pronite',
          desc: 'Intimate indie band sets, beatboxing cyphers, and atmospheric sunset acoustics under the night sky.',
          highlight: true,
        },
      ],
    },
    day2: {
      date: 'Feb 12, 2027',
      title: 'Day 2 — The Arena of Titans',
      subtitle: 'Battle of the Bands, Parliamentary Clashes & Semis',
      events: [
        {
          time: '09:00 AM - 12:00 PM',
          title: 'National Youth Parliamentary Debate: Finals',
          venue: 'Vivekananda Auditorium',
          category: 'Literary',
          desc: 'High-stakes debate on technology policy, national sports reform, and youth leadership with national adjudicators.',
          highlight: false,
        },
        {
          time: '10:00 AM - 02:00 PM',
          title: 'Para-Sports Invitational & Wheelchair Basketball',
          venue: 'Indoor Sports Complex',
          category: 'Para Sports',
          desc: 'Inspiring collegiate para-athletes competing with unmatched intensity and sportsmanship.',
          highlight: true,
        },
        {
          time: '01:30 PM - 05:00 PM',
          title: 'Esports Championship: Valorant & BGMI Semis',
          venue: 'Cyber Arena Hall 3',
          category: 'Gaming',
          desc: 'Live casted big-screen LAN battles with professional commentary and audience giveaways.',
          highlight: false,
        },
        {
          time: '02:00 PM - 06:00 PM',
          title: 'Inter-College Football 7s & Cricket Semifinals',
          venue: 'University Stadium',
          category: 'Sports',
          desc: 'Fierce knockout matches under high energy crowd support.',
          highlight: false,
        },
        {
          time: '06:30 PM - 10:30 PM',
          title: 'National Battle of the Bands (Rock & Metal Showdown)',
          venue: 'Mahotsav Main Stage',
          category: 'Culturals',
          desc: 'The fiercest 10 college rock and fusion bands battling for the coveted ₹1,00,000 top title.',
          highlight: true,
        },
      ],
    },
    day3: {
      date: 'Feb 13, 2027',
      title: 'Day 3 — The Arc of Triumph',
      subtitle: 'Grand Finals, ₹15 Lakhs Awards & Mega Pronite',
      events: [
        {
          time: '09:30 AM - 01:00 PM',
          title: 'Robo Wars Steel Cage Heavyweight Finals',
          venue: 'Tech Arena Cage A',
          category: 'Robo Games',
          desc: 'The ultimate 30kg destruction derby where only one engineered beast survives.',
          highlight: true,
        },
        {
          time: '11:00 AM - 03:00 PM',
          title: 'Athletics & Track & Field Grand Finals (Relay & Sprints)',
          venue: 'Olympic Synthetic Track',
          category: 'Sports',
          desc: '4x100m relay spectacles and crowning of the Fastest Man & Woman of Mahotsav 2027.',
          highlight: false,
        },
        {
          time: '03:30 PM - 05:30 PM',
          title: 'Grand Valedictory & ₹15 Lakhs Prize Distribution',
          venue: 'Main Amphitheatre',
          category: 'Ceremony',
          desc: 'Awarding trophies, certificates, and cash prizes to the champions of all 80+ events.',
          highlight: true,
        },
        {
          time: '06:30 PM - 11:00 PM',
          title: 'Mega Pronite: Star Celebrity Concert & DJ Blast',
          venue: 'Grand Festival Arena',
          category: 'Celebrity Night',
          desc: 'High-octane headline concert featuring a top Bollywood/South playback sensation, laser show, and DJ.',
          highlight: true,
        },
      ],
    },
  };

  const currentDay = daysData[activeDay];

  return (
    <section id="schedule" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-maroon-950">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-900/80 border border-gold-500/30 text-gold-300 text-xs uppercase tracking-widest font-semibold mb-3">
            <Calendar className="w-3.5 h-3.5 text-gold-400" />
            <span>3 Days of Triumph</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-parchment">
            Festival <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-sunset-400">Schedule</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 mt-2 font-light">
            Plan your journey through the 20th Edition. Feb 11-13, 2027 at Vignan University.
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-maroon-900/80 border border-gold-500/30 gap-1.5 sm:gap-2">
            {[
              { id: 'day1', label: 'Day 1', date: 'Feb 11' },
              { id: 'day2', label: 'Day 2', date: 'Feb 12' },
              { id: 'day3', label: 'Day 3', date: 'Feb 13' },
            ].map((day) => (
              <button
                key={day.id}
                onClick={() => setActiveDay(day.id as any)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-cinzel text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 ${
                  activeDay === day.id
                    ? 'bg-gradient-to-r from-gold-500 to-sunset-500 text-maroon-950 shadow-gold-glow scale-105'
                    : 'text-zinc-300 hover:text-gold-200 hover:bg-maroon-800/60'
                }`}
              >
                <span>{day.label}</span>
                <span className="text-[10px] opacity-80 font-mono">({day.date})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Day Header Banner */}
        <div className="glass-panel rounded-2xl p-6 mb-8 border border-gold-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gold-400 font-mono mb-1">
              <Calendar className="w-4 h-4 text-gold-400" />
              <span>{currentDay.date}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-parchment">
              {currentDay.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 mt-0.5">
              {currentDay.subtitle}
            </p>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-semibold">
            {currentDay.events.length} Major Milestones
          </div>
        </div>

        {/* Timeline Events Cards */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {currentDay.events.map((evt, idx) => (
                <div
                  key={idx}
                  className={`group relative glass-panel rounded-xl p-5 border transition-all duration-300 hover:border-gold-500/60 hover:shadow-gold-glow flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    evt.highlight
                      ? 'border-gold-500/50 bg-gradient-to-r from-maroon-900/60 via-maroon-900/40 to-transparent'
                      : 'border-gold-500/15'
                  }`}
                >
                  {/* Left: Time & Badge */}
                  <div className="flex items-start md:items-center gap-4 min-w-[240px]">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-gold-300 block">
                        {evt.time}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-maroon-900 text-zinc-300 border border-gold-500/20 inline-block mt-1">
                        {evt.category}
                      </span>
                    </div>
                  </div>

                  {/* Middle: Title & Description */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {evt.highlight && (
                        <Star className="w-4 h-4 text-gold-400 fill-gold-400 shrink-0" />
                      )}
                      <h4 className="text-base sm:text-lg font-cinzel font-bold text-parchment group-hover:text-gold-200 transition-colors">
                        {evt.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                      {evt.desc}
                    </p>
                  </div>

                  {/* Right: Venue Location */}
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 min-w-[200px] justify-start md:justify-end">
                    <MapPin className="w-4 h-4 text-sunset-400 shrink-0" />
                    <span className="text-zinc-300 font-medium">{evt.venue}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
