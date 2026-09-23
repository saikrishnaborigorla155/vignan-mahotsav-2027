import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { EventCategories } from './components/EventCategories';
import { ScheduleTimeline } from './components/ScheduleTimeline';
import { RegistrationCTA } from './components/RegistrationCTA';
import { RegistrationModal } from './components/RegistrationModal';
import { Footer } from './components/Footer';

export function App() {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>('Culturals (₹250)');
  const [replayCount, setReplayCount] = useState(0);

  const handleOpenRegister = (tier?: string) => {
    if (tier) setSelectedTier(tier);
    setRegisterModalOpen(true);
  };

  const handleReplayIntro = () => {
    sessionStorage.removeItem('mahotsav_hero_visited');
    setReplayCount((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-maroon-950 text-parchment flex flex-col font-inter selection:bg-gold-500 selection:text-maroon-950">
      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenRegister={() => handleOpenRegister('Culturals (₹250)')}
        onReplayIntro={handleReplayIntro}
      />

      {/* Main Single Page Fest Experience */}
      <main className="flex-1 w-full">
        {/* Cinematic Parallax Hero */}
        <Hero
          onOpenRegister={() => handleOpenRegister('Culturals (₹250)')}
          onSelectCategory={() => {
            const el = document.getElementById('events');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          replayTrigger={replayCount}
        />

        {/* Section 1: About & "The Arc of Becoming" Theme */}
        <AboutSection
          onOpenRegister={() => handleOpenRegister('Culturals (₹250)')}
          onSelectCategory={() => {
            const el = document.getElementById('events');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Section 2: 80+ Event Categories Grid */}
        <EventCategories
          onOpenRegister={() => handleOpenRegister('Culturals (₹250)')}
        />

        {/* Section 3: Day-by-Day Horizontal Timeline Schedule */}
        <ScheduleTimeline />

        {/* Section 4: Registration CTA & Fee Structure Cards */}
        <RegistrationCTA
          onOpenRegisterWithTier={(tier) => handleOpenRegister(tier)}
        />
      </main>

      {/* Footer & Contact */}
      <Footer />

      {/* Interactive Registration Modal */}
      <RegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        defaultTier={selectedTier}
      />
    </div>
  );
}

export default App;
