import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTier?: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  defaultTier = 'Culturals (₹250)',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    rollNumber: '',
    tier: defaultTier,
    category: 'Performing Arts',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#F97316', '#FEF08A', '#7F1D1D'],
    });
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-maroon-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg glass-panel rounded-2xl p-6 sm:p-8 border border-gold-500/50 shadow-gold-glow-lg max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-maroon-900/80 text-zinc-400 hover:text-gold-300 border border-gold-500/20"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
                Official Registration
              </span>
            </div>

            <h3 className="text-2xl font-cinzel font-bold text-parchment mb-1">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-sunset-400">Arc of Becoming</span>
            </h3>
            <p className="text-xs text-zinc-300 mb-6">
              Vignan Mahotsav 2027 • Feb 11-13 • Cash prizes worth ₹15,00,000
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-semibold tracking-wider text-zinc-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryan Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-maroon-900/70 border border-gold-500/25 text-parchment placeholder-zinc-500 focus:outline-none focus:border-gold-400 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold tracking-wider text-zinc-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-maroon-900/70 border border-gold-500/25 text-parchment placeholder-zinc-500 focus:outline-none focus:border-gold-400 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold tracking-wider text-zinc-300 mb-1">
                    WhatsApp Phone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-maroon-900/70 border border-gold-500/25 text-parchment placeholder-zinc-500 focus:outline-none focus:border-gold-400 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold tracking-wider text-zinc-300 mb-1">
                    College / University
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="College Name"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-maroon-900/70 border border-gold-500/25 text-parchment placeholder-zinc-500 focus:outline-none focus:border-gold-400 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold tracking-wider text-zinc-300 mb-1">
                    Student Roll / Reg ID
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="231FA04000"
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-maroon-900/70 border border-gold-500/25 text-parchment placeholder-zinc-500 focus:outline-none focus:border-gold-400 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold tracking-wider text-zinc-300 mb-1">
                    Select Pass Tier
                  </label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-maroon-900/90 border border-gold-500/25 text-parchment focus:outline-none focus:border-gold-400 text-sm"
                  >
                    <option value="Culturals (₹250)">Culturals — ₹250</option>
                    <option value="Sports (Men) (₹350)">Sports (Men) — ₹350</option>
                    <option value="Sports (Women) (₹250)">Sports (Women) — ₹250</option>
                    <option value="All-Access Pass (₹500)">All-Access Warrior Pass — ₹500</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold tracking-wider text-zinc-300 mb-1">
                    Primary Interest
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-maroon-900/90 border border-gold-500/25 text-parchment focus:outline-none focus:border-gold-400 text-sm"
                  >
                    <option value="Performing Arts">Performing Arts (Dance/Music)</option>
                    <option value="Visual Arts">Visual Arts</option>
                    <option value="Literary Events">Literary Events & Debate</option>
                    <option value="Gaming & Esports">Gaming & Esports</option>
                    <option value="Robo Games">Robo Games & Robotics</option>
                    <option value="Track & Field">Track & Field Athletics</option>
                    <option value="Sports & Games">Sports Tournaments (Cricket/Football)</option>
                    <option value="Para Sports">Para Sports Arena</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-500 via-sunset-500 to-gold-600 text-maroon-950 font-bold text-sm uppercase tracking-wider shadow-gold-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm Registration & Proceed</span>
                </button>
                <p className="text-[10px] text-zinc-400 text-center mt-2">
                  Official confirmation receipt will be sent to your email.
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-gold-500/20 border-2 border-gold-400 flex items-center justify-center text-gold-400 mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-cinzel font-bold text-parchment mb-2">
              Registration Confirmed!
            </h3>
            <p className="text-sm text-zinc-300 max-w-sm mx-auto mb-6">
              Welcome, <span className="text-gold-300 font-semibold">{formData.name}</span>! Your slot for{' '}
              <span className="text-gold-300 font-semibold">{formData.tier}</span> has been provisionally reserved for Vignan Mahotsav 2027.
            </p>
            <div className="p-4 rounded-xl bg-maroon-900/60 border border-gold-500/30 max-w-xs mx-auto mb-6 text-left text-xs space-y-1 font-mono">
              <p className="text-zinc-400">Pass: <span className="text-parchment">{formData.tier}</span></p>
              <p className="text-zinc-400">College: <span className="text-parchment">{formData.college}</span></p>
              <p className="text-zinc-400">Date: <span className="text-gold-400">Feb 11-13, 2027</span></p>
            </div>
            <button
              onClick={resetAndClose}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-sunset-500 text-maroon-950 font-bold text-xs uppercase tracking-wider"
            >
              Done & Return to Fest
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
