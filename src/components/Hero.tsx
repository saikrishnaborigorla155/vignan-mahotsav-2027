import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MountainLayer } from './MountainLayer';
import { GlowSource } from './GlowSource';
import { WarriorSilhouette } from './WarriorSilhouette';
import { CloudLayers } from './CloudLayers';
import { WordmarkReveal } from './WordmarkReveal';
import { InfoPanelLeft } from './InfoPanelLeft';
import { InfoPanelRight } from './InfoPanelRight';
import { Badge20th } from './Badge20th';
import { ChevronDown, FastForward } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenRegister?: () => void;
  onSelectCategory?: (cat: string) => void;
  replayTrigger?: number;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister, onSelectCategory, replayTrigger = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  // Mouse Parallax coordinates (normalized -1 to 1)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Entrance choreography state
  const [isInstant, setIsInstant] = useState(false);
  const [animationStep, setAnimationStep] = useState(0); // 0: init, 1: mountains, 2: glow, 3: warrior, 4: wordmark, 5: panels/done

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
    const t1 = setTimeout(() => setAnimationStep(2), 400); // glow in
    const t2 = setTimeout(() => setAnimationStep(3), 850); // warrior in
    const t3 = setTimeout(() => setAnimationStep(4), 1300); // wordmark draws
    const t4 = setTimeout(() => {
      setAnimationStep(5); // panels slide in
      sessionStorage.setItem('mahotsav_hero_visited', 'true');
    }, 2200);

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

    // GSAP ScrollTrigger setup for hero elements
    const ctx = gsap.context(() => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && containerRef.current) {
        gsap.to('.hero-mountain-1', {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
        gsap.to('.hero-mountain-2', {
          yPercent: 22,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
        gsap.to('.hero-mountain-3', {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
        gsap.to('.hero-mountain-4', {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
        gsap.to('.hero-ridge-fg', {
          yPercent: -5,
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
            end: '80% top',
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
      className="relative w-full min-h-screen h-[100svh] overflow-hidden bg-maroon-950 flex flex-col justify-between"
      style={{
        background: 'linear-gradient(180deg, #F5A623 0%, #D96B1E 20%, #B84718 40%, #7A1F2A 70%, #2A060C 95%, #1C050A 100%)',
      }}
      aria-label="Vignan Mahotsav 2027 Hero Showcase"
    >
      {/* Layer 0: Sky background texture from official poster */}
      <div 
        className="absolute inset-0 w-full h-full opacity-65 pointer-events-none select-none mix-blend-multiply"
        style={{
          backgroundImage: 'url(/assets/sky_bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />

      {/* Skip button during initial choreography */}
      {!isInstant && animationStep < 5 && (
        <button
          onClick={handleSkipIntro}
          className="absolute top-20 right-6 z-40 px-3 py-1.5 rounded-full bg-maroon-900/80 border border-gold-500/40 text-gold-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:bg-maroon-800 transition-all shadow-lg animate-fade-in"
        >
          <span>Skip Intro</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Layer 1: Mountain Layer 1 (Farthest - moves slowest) */}
      <div className={`hero-mountain-1 transition-opacity duration-700 ${animationStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
        <MountainLayer
          layerIndex={1}
          src="/assets/mountain_1.png"
          alt="Distant mountain silhouette"
          depthFactor={0.12}
          mouseOffset={mouseOffset}
          scrollY={scrollY}
        />
      </div>

      {/* Layer 2: Mountain Layer 2 */}
      <div className={`hero-mountain-2 transition-opacity duration-700 ${animationStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
        <MountainLayer
          layerIndex={2}
          src="/assets/mountain_2.png"
          alt="Mid-distant mountain ridge silhouette"
          depthFactor={0.22}
          mouseOffset={mouseOffset}
          scrollY={scrollY}
        />
      </div>

      {/* Layer 3: Pulsing Radial Light Source (Glow behind the tallest ridge and warrior) */}
      <div className={`transition-all duration-1000 ${animationStep >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
        <GlowSource
          className="top-[48%] left-[50%]"
          mouseOffset={mouseOffset}
        />
      </div>

      {/* Layer 4: Mountain Layer 3 */}
      <div className={`hero-mountain-3 transition-opacity duration-700 ${animationStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
        <MountainLayer
          layerIndex={3}
          src="/assets/mountain_3.png"
          alt="Intermediate mountain silhouette"
          depthFactor={0.35}
          mouseOffset={mouseOffset}
          scrollY={scrollY}
        />
      </div>

      {/* Layer 5: Cloud and smoke layers */}
      <div className={`transition-opacity duration-1000 ${animationStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
        <CloudLayers mouseOffset={mouseOffset} />
      </div>

      {/* Layer 6: Mountain Layer 4 (Nearer ridge) */}
      <div className={`hero-mountain-4 transition-opacity duration-700 ${animationStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
        <MountainLayer
          layerIndex={4}
          src="/assets/mountain_4.png"
          alt="Foreground mountain ridge silhouette"
          depthFactor={0.5}
          mouseOffset={mouseOffset}
          scrollY={scrollY}
        />
      </div>

      {/* Layer 7: Ridge & Peak Crags where the warrior stands */}
      <div className={`hero-ridge-fg transition-opacity duration-700 ${animationStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
        <MountainLayer
          layerIndex={5}
          src="/assets/mountain_ridge.png"
          alt="Tall mountain ridge crest"
          depthFactor={0.65}
          mouseOffset={mouseOffset}
          scrollY={scrollY}
        />
      </div>

      {/* Layer 8: Lone Standing Warrior on tallest ridge + Climber on cliff face */}
      <div className={`transition-all duration-1000 ${animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <WarriorSilhouette
          mouseOffset={mouseOffset}
          scrollY={scrollY}
          showClimber={true}
        />
      </div>

      {/* Hero Foreground Content: Top Wordmark, 20th Edition Lockup, and Symmetric Side Panels */}
      <div className="relative z-30 flex-1 flex flex-col justify-between pt-16 sm:pt-20 pb-4 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pointer-events-none">
        
        {/* Top Center: 20th Edition Ribbon Lockup and Official University Emblem */}
        <div className="flex items-center justify-between w-full pointer-events-auto">
          {/* Vignan Emblem badge */}
          <motion.div
            initial={isInstant ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: isInstant ? 0 : 0.4 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-maroon-900/60 backdrop-blur-sm border border-gold-500/25"
          >
            <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-300 font-bold text-xs">
              V
            </div>
            <div className="leading-none">
              <span className="text-[11px] font-bold text-gold-300 tracking-wider">VIGNAN</span>
              <span className="text-[9px] block text-zinc-400">Deemed to be University</span>
            </div>
          </motion.div>

          {/* 20th Edition Ribbon Badge Lockup */}
          <motion.div
            initial={isInstant ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: isInstant ? 0 : 0.4 }}
            className="flex items-center gap-2"
          >
            <Badge20th size="md" />
          </motion.div>
        </div>

        {/* Center: The Bold Angular MAHOTSAV Wordmark & Tagline */}
        <div ref={heroContentRef} className="hero-center-content my-auto py-2 pointer-events-auto">
          {animationStep >= 4 && (
            <WordmarkReveal isInstant={isInstant} />
          )}
        </div>

        {/* Desktop Symmetric Side Info Panels: Left = Registration Fee Tiers, Right = Event Categories */}
        <div className="hidden lg:flex items-end justify-between w-full pointer-events-auto mb-2">
          {/* Left Side: Registration Fee Tiers */}
          <div className="w-auto">
            {animationStep >= 5 && (
              <InfoPanelLeft isInstant={isInstant} onOpenRegister={onOpenRegister} />
            )}
          </div>

          {/* Center Scroll Indicator */}
          <motion.a
            href="#about"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
            className="flex flex-col items-center gap-1 text-gold-400/80 hover:text-gold-300 transition-colors pb-1 cursor-pointer group"
          >
            <span className="text-[10px] uppercase font-cinzel tracking-widest font-semibold">Explore The Arc</span>
            <div className="w-6 h-9 rounded-full border-2 border-gold-500/40 flex items-start justify-center p-1 group-hover:border-gold-400">
              <div className="w-1.5 h-2.5 rounded-full bg-gold-400 animate-bounce" />
            </div>
            <ChevronDown className="w-4 h-4 text-gold-400 group-hover:translate-y-0.5 transition-transform" />
          </motion.a>

          {/* Right Side: Event Categories */}
          <div className="w-auto">
            {animationStep >= 5 && (
              <InfoPanelRight isInstant={isInstant} onSelectCategory={onSelectCategory} />
            )}
          </div>
        </div>

        {/* Mobile / Tablet View: Collapsed Quick Chips and Scroll Cue */}
        <div className="lg:hidden flex flex-col items-center gap-3 w-full pointer-events-auto pb-2">
          <div className="flex items-center justify-center gap-3 w-full max-w-sm">
            <button
              onClick={onOpenRegister}
              className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-gold-500 to-sunset-500 text-maroon-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-1.5"
            >
              <span>Passes from ₹250</span>
            </button>
            <a
              href="#events"
              className="flex-1 py-2 px-3 rounded-lg bg-maroon-900/80 border border-gold-500/30 text-gold-300 font-semibold text-xs text-center uppercase tracking-wider"
            >
              80+ Events
            </a>
          </div>

          <a
            href="#about"
            className="flex items-center gap-1 text-[11px] uppercase font-cinzel tracking-widest text-gold-300/80 hover:text-gold-300"
          >
            <span>Scroll to Enter</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>

      {/* Atmospheric bottom gradient fade to transition smoothly into the dark sections below */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to top, #1C050A 0%, rgba(28, 5, 10, 0.85) 45%, transparent 100%)',
        }}
      />
    </section>
  );
};
