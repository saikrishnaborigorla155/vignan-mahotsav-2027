import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FastForward } from 'lucide-react';

/**
 * EntryGate Component for Vignan Mahotsav 2027
 * 
 * Sits in front of the homepage as a pre-loader gate:
 * 1. Checks sessionStorage to avoid replaying on refresh / same-session revisits.
 * 2. Renders a full-screen dark overlay with a glowing, pulse-animated "Enter" prompt.
 * 3. Mounts the underlying application in the background (inert, aria-hidden, opacity-0)
 *    so assets, fonts, and layouts are primed.
 * 4. On click or keyboard trigger (Enter/Space):
 *    - Fades out the "Enter" prompt (200ms).
 *    - Plays the 1080x2340 portrait video (entry_video.mp4).
 *    - On desktop/wide screens, fills pillarbox sides with a synchronized blurred copy of the video.
 *    - Respects `prefers-reduced-motion` by skipping playback straight to the site.
 * 5. Provides a discreet "Skip" button during video playback.
 * 6. Includes network/playback error fallbacks and watchdog timers to guarantee the user is never stuck.
 * 7. When playback finishes or is skipped, cross-fades (500ms) smoothly into the homepage,
 *    then unmounts the gate overlay and video DOM completely.
 */

interface EntryGateProps {
  children: React.ReactNode;
}

const STORAGE_KEY = 'vignan_mahotsav_gate_entered';
const VIDEO_PATH = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/entry_video.mp4`;

type GateStage = 'prompt' | 'prompt_fading' | 'playing' | 'cross_fading' | 'completed';

export const EntryGate: React.FC<EntryGateProps> = ({ children }) => {
  // Check session storage synchronously on initial state to avoid any gate flash for returning users
  // (Allows ?gate in URL to easily preview/test the gate at any time)
  const [hasVisitedSession] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined' && window.location.search.includes('gate')) {
        return false;
      }
      return typeof window !== 'undefined' && sessionStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // If already visited, gate is not active at all
  const [isGateActive, setIsGateActive] = useState<boolean>(!hasVisitedSession);
  const [stage, setStage] = useState<GateStage>(hasVisitedSession ? 'completed' : 'prompt');
  const stageRef = useRef<GateStage>(stage);

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);
  
  // UI visibility states for smooth CSS transitions
  const [promptOpacity, setPromptOpacity] = useState<number>(1);
  const [gateOpacity, setGateOpacity] = useState<number>(1);
  const [siteOpacity, setSiteOpacity] = useState<number>(hasVisitedSession ? 1 : 0);

  // Video element references
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);
  const enterButtonRef = useRef<HTMLButtonElement | null>(null);

  // Timers tracker for clean unmounting
  const timersRef = useRef<number[]>([]);

  const addTimer = useCallback((fn: () => void, delayMs: number) => {
    const id = window.setTimeout(fn, delayMs);
    timersRef.current.push(id);
    return id;
  }, []);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  }, []);

  // Lock body scroll while the gate overlay is active
  useEffect(() => {
    if (isGateActive) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isGateActive]);

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  // Auto-focus the enter button on mount for immediate keyboard accessibility
  useEffect(() => {
    if (stage === 'prompt' && enterButtonRef.current) {
      enterButtonRef.current.focus();
    }
  }, [stage]);

  // Pre-prime video element on mount for instant mobile playback
  useEffect(() => {
    const mainVideo = mainVideoRef.current;
    if (mainVideo) {
      mainVideo.muted = true;
      mainVideo.defaultMuted = true;
      mainVideo.setAttribute('playsinline', 'true');
      mainVideo.setAttribute('webkit-playsinline', 'true');
      mainVideo.setAttribute('x5-playsinline', 'true');
      mainVideo.load();
    }
  }, []);

  /**
   * Completes the entry gate sequence:
   * Cross-fades into the homepage content over 500ms, then unmounts the gate overlay.
   */
  const finishGate = useCallback((instant = false) => {
    clearAllTimers();

    // Mark session so returning or refreshing skips the gate
    try {
      sessionStorage.removeItem('mahotsav_hero_visited'); // Allow hero choreography to play on entrance
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch (e) {
      console.warn('SessionStorage not available:', e);
    }

    if (instant) {
      setGateOpacity(0);
      setSiteOpacity(1);
      setStage('completed');
      setIsGateActive(false);
      return;
    }

    setStage('cross_fading');
    // Start cross-fade simultaneously: gate fades out, site fades in
    setGateOpacity(0);
    setSiteOpacity(1);

    // After cross-fade transition completes (500ms), unmount gate completely from DOM
    addTimer(() => {
      setStage('completed');
      setIsGateActive(false);

      // Clean up video playback
      if (mainVideoRef.current) {
        mainVideoRef.current.pause();
        mainVideoRef.current.src = '';
        mainVideoRef.current.load();
      }
      if (bgVideoRef.current) {
        bgVideoRef.current.pause();
        bgVideoRef.current.src = '';
        bgVideoRef.current.load();
      }
    }, 550);
  }, [addTimer, clearAllTimers]);

  /**
   * Video error or playback failure fallback
   * Guarantees user is not stuck if video fails to load or network error occurs.
   */
  const handleVideoError = useCallback(() => {
    console.warn('Entry video could not be played or loaded. Gracefully transitioning to homepage.');
    addTimer(() => {
      finishGate();
    }, 350);
  }, [addTimer, finishGate]);

  /**
   * Handle user action (Click, Touch, or Enter/Space key on "Enter" prompt)
   */
  const handleEnterClick = useCallback(() => {
    if (stageRef.current !== 'prompt') return;

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      finishGate(true);
      return;
    }

    const mainVideo = mainVideoRef.current;
    const bgVideo = bgVideoRef.current;

    // 1. Immediately switch stage so the video container becomes visible and active
    setStage('playing');
    setPromptOpacity(0);

    // 2. CRITICAL FOR MOBILE: Call play() SYNCHRONOUSLY within this user gesture!
    if (mainVideo) {
      mainVideo.muted = true;
      mainVideo.defaultMuted = true;
      mainVideo.playsInline = true;
      mainVideo.setAttribute('playsinline', 'true');
      mainVideo.setAttribute('webkit-playsinline', 'true');
      mainVideo.setAttribute('x5-playsinline', 'true');
      mainVideo.currentTime = 0;

      const playPromise = mainVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Initial play prevented, attempting muted retry:', err);
          mainVideo.muted = true;
          mainVideo.defaultMuted = true;
          mainVideo.play().catch((retryErr) => {
            console.warn('Mobile video play completely blocked:', retryErr);
            handleVideoError();
          });
        });
      }
    } else {
      finishGate();
      return;
    }

    // 3. On desktop only, also start blurred background video
    if (bgVideo && window.innerWidth >= 768) {
      bgVideo.currentTime = 0;
      bgVideo.muted = true;
      bgVideo.defaultMuted = true;
      bgVideo.play().catch(() => {});
    }

    // 4. Watchdog timer: video is ~5s. If onEnded does not fire within 7.5s, trigger completion
    addTimer(() => {
      if (stageRef.current !== 'completed' && stageRef.current !== 'cross_fading') {
        console.info('Watchdog timer triggered entry completion');
        finishGate();
      }
    }, 7500);
  }, [addTimer, finishGate, handleVideoError]);

  /**
   * Keyboard accessibility for "Enter" prompt
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleEnterClick();
    }
  };

  // If already seen this session and fully unmounted, render child directly
  if (!isGateActive && stage === 'completed') {
    return <>{children}</>;
  }

  return (
    <>
      {/* 
        The underlying homepage site:
        - Mounted immediately so fonts, CSS, hero assets & initial state load in advance
        - Kept inert and aria-hidden while gate is active
        - Transitions smoothly from opacity-0 to opacity-100 during cross-fade
      */}
      <div
        className={`w-full transition-opacity duration-500 ease-out ${
          stage === 'completed' ? '' : 'pointer-events-auto'
        }`}
        style={{
          opacity: siteOpacity,
          pointerEvents: stage === 'completed' ? 'auto' : 'none',
        }}
        aria-hidden={stage !== 'completed'}
        inert={stage !== 'completed' ? true : undefined}
      >
        {(hasVisitedSession || stage === 'cross_fading' || stage === 'completed') ? children : null}
      </div>

      {/* 
        Full-screen Gate Overlay:
        - Positioned above everything (z-[99999])
        - Transitions out with opacity over 500ms during cross_fading
        - Unmounted from DOM once completed
      */}
      {isGateActive && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Vignan Mahotsav 2027 Entry"
          className="fixed inset-0 z-[99999] bg-maroon-950 flex flex-col items-center justify-center overflow-hidden select-none transition-opacity duration-500 ease-out"
          style={{ opacity: gateOpacity }}
        >
          {/* 
            STAGE 1: "Enter" Prompt Screen
            - Centered prompt with subtle pulsating glow animation
            - Fest branding: Maroon & Gold palette, Cinzel & Outfit typography
            - Fades out cleanly in 200ms on interaction
          */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center z-20 px-6 transition-opacity duration-200 ease-out ${
              stage === 'playing' || stage === 'cross_fading' ? 'pointer-events-none' : ''
            }`}
            style={{
              opacity: promptOpacity,
              visibility: promptOpacity === 0 ? 'hidden' : 'visible',
            }}
          >
            {/* Ambient radial backdrop glow */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.15)_0%,_rgba(46,9,16,0.5)_45%,_transparent_75%)]" />

            <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-auto">
              {/* Subtle top eyebrow */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gold-400/60" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-outfit text-gold-400 font-semibold">
                  20th National Youth Fest
                </span>
                <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gold-400/60" />
              </div>

              {/* Fest Title */}
              <h1 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-extrabold text-parchment tracking-wider mb-1">
                VIGNAN MAHOTSAV
              </h1>
              <p className="text-xs sm:text-sm font-outfit text-gold-300/80 tracking-widest uppercase mb-10">
                The Arc of Becoming • 2027
              </p>

              {/* Pulsing Interactive "Enter" Button */}
              <button
                ref={enterButtonRef}
                onClick={handleEnterClick}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handleEnterClick();
                }}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                aria-label="Enter Vignan Mahotsav 2027 experience"
                className="group relative px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-maroon-900/90 via-maroon-850/90 to-maroon-900/90 border border-gold-500/50 hover:border-gold-300 text-parchment hover:text-gold-200 transition-all duration-300 active:scale-95 cursor-pointer shadow-gold-glow focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-maroon-950"
              >
                {/* Continuous subtle pulse ring animation */}
                <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-gold-500/30 via-sunset-500/20 to-gold-500/30 blur-sm animate-pulse-slow pointer-events-none" />

                {/* Shimmer inner highlight */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <span className="relative z-10 font-cinzel text-sm sm:text-base font-bold tracking-[0.25em] text-gold-200 group-hover:text-gold-100 flex items-center justify-center gap-2">
                  <span>ENTER</span>
                </span>
              </button>

              {/* Keyboard / Click hint */}
              <span className="mt-4 text-[11px] text-parchment/40 font-inter tracking-wider">
                Click or press <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-maroon-900/80 border border-gold-500/20 text-gold-300/80 font-mono">Enter</kbd>
              </span>
            </div>
          </div>

          {/* 
            STAGE 2: Video Playback Screen
            - Background: Blurred/darkened synchronized video filling pillarbox/letterbox on wide screens
            - Foreground: 1920x1080 landscape video centered and scaled to fill/fit without distortion
            - Preloaded during Stage 1 with preload="auto" and FastStart moov atom at beginning of MP4
          */}
          <div
            className={`absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-maroon-950 transition-opacity duration-300 ${
              stage === 'prompt' ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            {/* Wide/Desktop blurred pillarbox video background */}
            <video
              ref={bgVideoRef}
              src={VIDEO_PATH}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              tabIndex={-1}
              className="absolute inset-0 w-full h-full object-cover filter blur-3xl scale-110 opacity-35 brightness-45 pointer-events-none hidden md:block"
            />

            {/* Subtle dark vignette around edges */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-maroon-950/80 via-transparent to-maroon-950/80" />

            {/* Main Full-Screen Centered Video */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <video
                ref={mainVideoRef}
                src={VIDEO_PATH}
                muted
                playsInline
                preload="auto"
                onEnded={() => finishGate()}
                onError={handleVideoError}
                aria-label="Vignan Mahotsav 2027 Intro Video"
                className="w-full h-full max-h-screen object-contain shadow-2xl transition-transform duration-300"
              >
                <source src={VIDEO_PATH} type="video/mp4" />
              </video>
            </div>

            {/* 
              Skip Button:
              - Appears during video playback in the bottom-right corner
              - Unobtrusive, elegant glass-pill styling
              - Keyboard accessible, immediately transitions to homepage
            */}
            {(stage === 'playing' || stage === 'prompt_fading') && (
              <button
                onClick={() => finishGate()}
                aria-label="Skip intro video and enter site"
                className="fixed bottom-6 right-6 z-30 px-3.5 py-1.5 rounded-full bg-maroon-950/70 hover:bg-maroon-900/90 backdrop-blur-md border border-gold-500/30 hover:border-gold-400 text-parchment/80 hover:text-gold-200 text-xs font-outfit uppercase tracking-widest transition-all duration-200 active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <span>Skip</span>
                <FastForward className="w-3.5 h-3.5 text-gold-400" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EntryGate;
