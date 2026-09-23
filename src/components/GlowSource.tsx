import React from 'react';

interface GlowSourceProps {
  className?: string;
  mouseOffset?: { x: number; y: number };
}

export const GlowSource: React.FC<GlowSourceProps> = ({ className = '', mouseOffset = { x: 0, y: 0 } }) => {
  return (
    <div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{
        transform: `translate3d(${mouseOffset.x * 0.08}px, ${mouseOffset.y * 0.08}px, 0)`,
        transition: 'transform 0.15s cubic-bezier(0.2, 0, 0.2, 1)',
      }}
      aria-hidden="true"
    >
      {/* Outer blurred radial aura */}
      <div 
        className="absolute -top-[180px] -left-[180px] w-[360px] h-[360px] md:w-[480px] md:h-[480px] rounded-full animate-sun-pulse opacity-85"
        style={{
          background: 'radial-gradient(circle, rgba(254, 240, 138, 0.95) 0%, rgba(245, 158, 11, 0.75) 30%, rgba(234, 88, 12, 0.4) 60%, rgba(127, 29, 29, 0) 75%)',
          filter: 'blur(30px)',
        }}
      />

      {/* High-res authentic Sun Orb extracted from the PDF */}
      <div className="relative w-[190px] h-[190px] md:w-[240px] md:h-[240px] -top-[95px] -left-[95px] md:-top-[120px] md:-left-[120px] rounded-full overflow-hidden shadow-gold-glow-lg">
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, #FFFBEB 15%, #FEF08A 45%, #F59E0B 80%, #EA580C 100%)',
            boxShadow: '0 0 60px 20px rgba(251, 191, 36, 0.8), inset 0 0 30px rgba(255, 255, 255, 0.9)',
          }}
        />
        {/* Soft edge corona ring */}
        <div className="absolute inset-0 rounded-full border-2 border-gold-300/60 animate-ping opacity-25" style={{ animationDuration: '4s' }} />
      </div>
    </div>
  );
};
