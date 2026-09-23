import React from 'react';
import { Mail, Globe, MapPin, Phone, ArrowUp, Sparkles } from 'lucide-react';
import { Badge20th } from './Badge20th';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-maroon-950 border-t border-gold-500/25 pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gold-500/15">
          
          {/* Col 1: University & Festival Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge20th size="md" />
              <div>
                <h3 className="font-cinzel font-bold text-lg text-parchment leading-tight">
                  VIGNAN MAHOTSAV
                </h3>
                <p className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
                  The Arc of Becoming • 2027
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              A premier National Level Youth Festival organized by Vignan's Foundation for Science, Technology & Research (Deemed to be University). Celebrating 20 years of sporting excellence, cultural triumphs, and innovation.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-maroon-900/80 border border-gold-500/20 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-maroon-950 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-maroon-900/80 border border-gold-500/20 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-maroon-950 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-maroon-900/80 border border-gold-500/20 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-maroon-950 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-maroon-900/80 border border-gold-500/20 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-maroon-950 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-cinzel text-sm uppercase font-bold text-gold-300 tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" /> Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="text-zinc-400 hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span>›</span> Hero Warrior Showcase
                </a>
              </li>
              <li>
                <a href="#about" className="text-zinc-400 hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span>›</span> The Arc of Becoming Theme
                </a>
              </li>
              <li>
                <a href="#events" className="text-zinc-400 hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span>›</span> 80+ Event Categories
                </a>
              </li>
              <li>
                <a href="#schedule" className="text-zinc-400 hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span>›</span> 3-Day Schedule (Feb 11-13)
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-zinc-400 hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span>›</span> Pass Tiers & Registration
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Event Arenas */}
          <div>
            <h4 className="font-cinzel text-sm uppercase font-bold text-gold-300 tracking-wider mb-4">
              Fest Arenas
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>Performing Arts (Battle of Bands & Dance)</li>
              <li>Visual Arts & Digital Creation</li>
              <li>Literary Events & Youth Parliament</li>
              <li>Gaming & Esports Arena</li>
              <li>Robo Wars & Agility Cage</li>
              <li>Track & Field (Olympic Synthetic Track)</li>
              <li>Para Sports Championship</li>
            </ul>
          </div>

          {/* Col 4: Official Contact & Venue */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm uppercase font-bold text-gold-300 tracking-wider mb-4">
              Contact & Venue
            </h4>

            <div className="flex items-start gap-2.5 text-xs text-zinc-400">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <span>
                Vignan University, Vadlamudi, Guntur - 522213, Andhra Pradesh, India
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-zinc-400">
              <Mail className="w-4 h-4 text-gold-400 shrink-0" />
              <a href="mailto:mahotsav@vignan.ac.in" className="hover:text-gold-300 transition-colors">
                mahotsav@vignan.ac.in
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-zinc-400">
              <Globe className="w-4 h-4 text-gold-400 shrink-0" />
              <a href="https://www.vignanmahotsav.in" className="hover:text-gold-300 transition-colors">
                www.vignanmahotsav.in
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-zinc-400">
              <Phone className="w-4 h-4 text-gold-400 shrink-0" />
              <span>+91 863 2344700 / Ext 402</span>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-maroon-900 border border-gold-500/30 text-gold-300 text-xs hover:bg-gold-500 hover:text-maroon-950 transition-all"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Summit</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2027 Vignan Mahotsav. 20th Edition. All rights reserved.</p>
          <div className="flex items-center gap-2 text-zinc-400">
            <span>Crafted with obsessive precision for Vignan University</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
