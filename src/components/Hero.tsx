import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MountainLayer } from './MountainLayer';
import { GlowSource } from './GlowSource';
import { WarriorSilhouette } from './WarriorSilhouette';
import { CloudLayers } from './CloudLayers';
import { WordmarkReveal } from './WordmarkReveal';
import { Medal, Trophy, ArrowRight, ChevronDown, FastForward } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenRegister?: () => void;
  onSelectCategory?: (cat: string) => void;
  replayTrigger?: number;
}

// Count-up Hook with smooth ease-out-expo
function useCountUp(end: number, duration: number = 2200, trigger: boolean = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * end));
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration, trigger]);

  return count;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenRegister,
  replayTrigger = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  // Mouse Parallax coordinates (normalized -1 to 1)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Entrance choreography state
  const [isInstant, setIsInstant] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  // Stats Counters
  const eventsCount = useCountUp(80, 2000, animationStep >= 4 || isInstant);
  const prizesCount = useCountUp(1500000, 2400, animationStep >= 4 || isInstant);

  // Check sessionStorage for repeat visits
  useEffect(() => {
    const visited = sessionStorage.getItem('mahotsav_hero_visited');
    if (visited) {
      setIsInstant(true);
      setAnimationStep(5);
    } else {
      setIsInstant(false);
      startChoreography();
    }
  }, [replayTrigger]);

  const startChoreography = () => {
    setAnimationStep(1); // mountains fade up
    const t1 = setTimeout(() => setAnimationStep(2), 300); // sun & clouds
    const t2 = setTimeout(() => setAnimationStep(3), 700); // samurai & climber
    const t3 = setTimeout(() => setAnimationStep(4), 1100); // wordmark & center CTA
    const t4 = setTimeout(() => {
      setAnimationStep(5); // lower stats & cues
      sessionStorage.setItem('mahotsav_hero_visited', 'true');
    }, 1700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  };

  const handleSkipIntro = () => {
    setIsInstant(true);
    setAnimationStep(5);
    sessionStorage.setItem('mahotsav_hero_visited', 'true');
  };

  // Mousemove handler for smooth 3D GPU parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Scroll listener & GSAP ScrollTrigger
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const ctx = gsap.context(() => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && containerRef.current) {
        gsap.to('.hero-mountain-1', {
          yPercent: 24,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
        gsap.to('.hero-mountain-2', {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
        gsap.to('.hero-mountain-3', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
        gsap.to('.hero-mountain-4', {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
        gsap.to('.hero-center-content', {
          yPercent: -18,
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '70% top',
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[100vh] min-h-[640px] max-h-[1080px] overflow-hidden bg-maroon-950 flex flex-col justify-between select-none"
      style={{
        background:
          'linear-gradient(180deg, #F5A623 0%, #D9631E 20%, #B84718 38%, #6B1D28 65%, #2A060C 88%, #1A0806 100%)',
      }}
      aria-label="Vignan Mahotsav 2027 Hero"
    >
      {/* Layer 0: Sky background texture overlay */}
      <div
        className="absolute inset-0 w-full h-full opacity-60 pointer-events-none select-none mix-blend-multiply"
        style={{
          backgroundImage: 'url(/assets/sky_bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
        aria-hidden="true"
      />

      {/* Floating festival embers rising from the canyon */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20" aria-hidden="true">
        {[...Array(14)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-gold-400/80 animate-ember shadow-[0_0_8px_#F59E0B]"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              left: `${(i * 7.5 + 4) % 96}%`,
              bottom: `${(i * 5) % 25}%`,
              animationDelay: `${(i * 0.7) % 6}s`,
              animationDuration: `${6 + ((i * 1.3) % 5)}s`,
            }}
          />
        ))}
      </div>

      {/* Skip button during initial choreography */}
      {!isInstant && animationStep < 5 && (
        <button
          onClick={handleSkipIntro}
          className="absolute top-20 right-6 z-40 px-3 py-1.5 rounded-full bg-maroon-900/80 border border-gold-500/40 text-gold-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:bg-maroon-800 transition-all shadow-lg animate-fade-in pointer-events-auto"
        >
          <span>Skip Intro</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Parallax Layer 1: Distant Mountain Silhouette */}
      <div
        className={`hero-mountain-1 transition-opacity duration-700 pointer-events-none ${
          animationStep >= 1 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <MountainLayer
          layerIndex={1}
          src="/assets/mountain_1.png"
          alt="Distant mountain silhouette"
          depthFactor={0.12}
          mouseOffset={mouseOffset}
          scrollY={scrollY}
        />
      </div>

      {/* Parallax Layer 2: Mid-distant Mountain Ridge */}
      <div
        className={`hero-mountain-2 transition-opacity duration-700 pointer-events-none ${
          animationStep >= 1 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <MountainLayer
          layerIndex={2}
          src="/assets/mountain_2.png"
          alt="Mid-distant mountain ridge silhouette"
          depthFactor={0.2}
          mouseOffset={mouseOffset}
          scrollY={scrollY}
        />
      </div>

      {/* Parallax Layer 3: Pulsing Sun Orb & Corona Halo */}
      <div
        className={`transition-all duration-1000 pointer-events-none ${
          animationStep >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
      >
        <GlowSource className="top-[45%] left-[50%]" mouseOffset={mouseOffset} />
      </div>

      {/* Parallax Layer 4: Distant Cloud Layers */}
      <div
        className={`transition-opacity duration-1000 pointer-events-none ${
          animationStep >= 2 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <CloudLayers mouseOffset={mouseOffset} />
      </div>

      {/* Parallax Layer 5: Intermediate Mountain Silhouettes */}
      <div
        className={`hero-mountain-3 transition-opacity duration-700 pointer-events-none ${
          animationStep >= 1 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <MountainLayer
          layerIndex={3}
          src="/assets/mountain_3.png"
          alt="Intermediate mountain silhouette"
          depthFactor={0.32}
          mouseOffset={mouseOffset}
          scrollY={scrollY}
        />
      </div>

      {/* Parallax Layer 6: Near Mountain Silhouette */}
      <div
        className={`hero-mountain-4 transition-opacity duration-700 pointer-events-none ${
          animationStep >= 1 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <MountainLayer
          layerIndex={4}
          src="/assets/mountain_4.png"
          alt="Foreground mountain ridge silhouette"
          depthFactor={0.46}
          mouseOffset={mouseOffset}
          scrollY={scrollY}
        />
      </div>

      {/* Parallax Layer 7: Summit Ridge Crags */}
      <div
        className={`transition-opacity duration-700 pointer-events-none ${
          animationStep >= 1 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <MountainLayer
          layerIndex={5}
          src="/assets/mountain_ridge.png"
          alt="Mountain ridge crest"
          depthFactor={0.62}
          mouseOffset={mouseOffset}
          scrollY={scrollY}
        />
      </div>

      {/* Parallax Layer 8: Lone Standing Samurai on Cliff + Climber Below (Unobstructed Focal Point) */}
      <div
        className={`transition-all duration-1000 pointer-events-none ${
          animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <WarriorSilhouette mouseOffset={mouseOffset} scrollY={scrollY} showClimber={true} />
      </div>

      {/* Dark Radial Contrast Scrim behind Typography for WCAG AA readability */}
      <div
        className="absolute inset-0 pointer-events-none z-15"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 42%, rgba(28, 5, 10, 0.45) 0%, rgba(28, 5, 10, 0.15) 60%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Top Header Spacing (Handled by floating Navbar) */}
      <div className="w-full pt-6 sm:pt-8 pointer-events-none" aria-hidden="true" />


      {/* ─────────────────────────────────────────────────────────────
          HERO CENTER:
          - A National Level Youth Fest – 20th Edition
          - Bold MAHOTSAV Wordmark with vertical rotated VIGNAN
          - The Arc of Becoming + Shooting star + 11-13 Feb 2027
          - Prominent Register Now CTA Button
          ───────────────────────────────────────────────────────────── */}
      <div
        ref={heroContentRef}
        className="hero-center-content relative z-30 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto w-full pointer-events-none my-auto"
      >
        {/* National Level Youth Fest Header */}
        <motion.div
          initial={isInstant ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: isInstant ? 0 : 0.4 }}
          className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 pointer-events-auto"
        >
          <span className="h-[1px] w-6 sm:w-14 bg-gradient-to-r from-transparent to-gold-400" />
          <p className="text-[10px] sm:text-xs md:text-sm font-cinzel tracking-[0.28em] uppercase text-gold-300 font-bold drop-shadow">
            A National Level Youth Fest • 20th Edition
          </p>
          <span className="h-[1px] w-6 sm:w-14 bg-gradient-to-l from-transparent to-gold-400" />
        </motion.div>

        {/* Official MAHOTSAV Display Wordmark with Vertical Rotated VIGNAN */}
        <div className="w-full flex items-center justify-center pointer-events-auto">
          {animationStep >= 4 && <WordmarkReveal isInstant={isInstant} />}
        </div>

        {/* Tagline & Date Lockup */}
        <motion.div
          initial={isInstant ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: isInstant ? 0 : 1.2 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-2 mb-5 pointer-events-auto"
        >
          <div className="flex items-center gap-2">
            <span className="font-cinzel text-sm sm:text-base md:text-lg font-bold tracking-wide text-parchment drop-shadow-md">
              The Arc of Becoming
            </span>
            <img
              src="/assets/shooting_star.png"
              alt=""
              className="w-4 h-4 sm:w-5 sm:h-5 object-contain filter drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]"
              aria-hidden="true"
            />
          </div>

          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-gold-400" />

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-maroon-900/85 border border-gold-500/35 text-gold-300 font-outfit font-semibold text-xs tracking-wider shadow-inner">
            <span>★</span>
            <span>11-13 Feb 2027</span>
          </div>
        </motion.div>

        {/* Prominent Register Button */}
        <motion.div
          initial={isInstant ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: isInstant ? 0 : 1.4 }}
          className="pointer-events-auto"
        >
          <button
            onClick={onOpenRegister}
            className="group relative px-7 sm:px-9 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-sunset-500 to-gold-600 text-maroon-950 font-bold text-xs sm:text-sm uppercase tracking-widest shadow-gold-glow hover:brightness-110 active:scale-95 transition-all flex items-center gap-2.5 overflow-hidden cursor-pointer"
          >
            <span className="relative z-10">Register Now</span>
            <ArrowRight className="w-4 h-4 text-maroon-950 group-hover:translate-x-1 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-white/25 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </button>
        </motion.div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LOWER HERO:
          Left: Medal Icon + Animated Count-up to 80+ Events
          Center: Subtle Scroll Prompt
          Right: Trophy Icon + Animated Count-up to ₹15,00,000 Cash Prizes
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-30 w-full px-4 sm:px-8 pb-4 sm:pb-6 max-w-7xl mx-auto flex items-end justify-between pointer-events-none">
        {/* Lower Left: 80+ Events Stat */}
        <motion.div
          initial={isInstant ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: isInstant ? 0 : 1.5 }}
          className="pointer-events-auto"
        >
          <div className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-maroon-950/75 border border-gold-500/25 backdrop-blur-md shadow-2xl">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400 shadow-inner shrink-0">
              <Medal className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-cinzel font-bold text-gold-300 tracking-tight leading-none">
                {eventsCount}+
              </div>
              <div className="text-[10px] sm:text-xs text-zinc-300 uppercase tracking-widest font-outfit mt-0.5">
                National Events
              </div>
            </div>
          </div>
        </motion.div>

        {/* Center: Scroll Down Indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ repeat: Infinity, duration: 2.2, repeatType: 'reverse' }}
          className="hidden md:flex flex-col items-center gap-1 text-gold-400/80 hover:text-gold-300 transition-colors pb-1 cursor-pointer pointer-events-auto group select-none"
        >
          <span className="text-[9px] uppercase font-cinzel tracking-widest font-semibold">
            Explore The Arc
          </span>
          <div className="w-4 h-7 rounded-full border border-gold-500/40 flex items-start justify-center p-0.5 group-hover:border-gold-400">
            <div className="w-1 h-1.5 rounded-full bg-gold-400 animate-bounce" />
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gold-400 group-hover:translate-y-0.5 transition-transform" />
        </motion.a>

        {/* Lower Right: ₹15,00,000 Cash Prizes Stat */}
        <motion.div
          initial={isInstant ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: isInstant ? 0 : 1.5 }}
          className="pointer-events-auto"
        >
          <div className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-maroon-950/75 border border-gold-500/25 backdrop-blur-md shadow-2xl">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sunset-500/20 border border-sunset-500/30 flex items-center justify-center text-sunset-400 shadow-inner shrink-0">
              <Trophy className="w-5 h-5 text-sunset-400" />
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-cinzel font-bold text-parchment tracking-tight leading-none">
                ₹{prizesCount.toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] sm:text-xs text-zinc-300 uppercase tracking-widest font-outfit mt-0.5">
                Cash Prize Pool
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Atmospheric bottom fade to #1A0806 so it seamlessly merges into About section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to top, #1A0806 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  );
};
