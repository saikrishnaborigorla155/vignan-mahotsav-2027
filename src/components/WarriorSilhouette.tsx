import React from 'react';

interface WarriorSilhouetteProps {
  mouseOffset: { x: number; y: number };
  scrollY?: number;
  className?: string;
  showClimber?: boolean;
}

export const WarriorSilhouette: React.FC<WarriorSilhouetteProps> = ({
  mouseOffset,
  scrollY = 0,
  className = '',
  showClimber = true,
}) => {
  // Foreground depth factor (moves slightly faster than distant mountain ridges)
  const warriorX = mouseOffset.x * 0.7 * 20;
  const warriorY = mouseOffset.y * 0.7 * 10 + scrollY * 0.25;

  const climberX = mouseOffset.x * 0.85 * 22;
  const climberY = mouseOffset.y * 0.85 * 12 + scrollY * 0.35;

  return (
    <div className={`absolute inset-0 w-full h-full pointer-events-none select-none z-10 ${className}`} aria-hidden="true">
      {/* Standing Warrior on the summit ridge */}
      <div
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{
          transform: `translate3d(${warriorX}px, ${warriorY}px, 0)`,
          transition: 'transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        <img
          src="/assets/warrior_standing.png"
          alt="Warrior standing silhouette on mountain ridge"
          className="w-full h-full object-cover object-bottom filter drop-shadow-[0_15px_30px_rgba(28,5,10,0.9)]"
          loading="eager"
        />
      </div>

      {/* Climber Warrior ascending the ridge face */}
      {showClimber && (
        <div
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{
            transform: `translate3d(${climberX}px, ${climberY}px, 0)`,
            transition: 'transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <img
            src="/assets/warrior_climbing.png"
            alt="Warrior climbing cliff silhouette"
            className="w-full h-full object-cover object-bottom filter drop-shadow-[0_10px_20px_rgba(28,5,10,0.8)] opacity-95"
            loading="eager"
          />
        </div>
      )}
    </div>
  );
};
