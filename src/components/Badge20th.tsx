import React from 'react';

interface Badge20thProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Badge20th: React.FC<Badge20thProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-16 h-12',
    md: 'w-24 h-16 md:w-28 md:h-20',
    lg: 'w-32 h-24 md:w-36 md:h-28',
  };

  return (
    <div 
      className={`relative inline-flex items-center justify-center transition-transform hover:scale-105 duration-300 drop-shadow-xl select-none ${sizeClasses[size]} ${className}`}
      aria-label="20th Edition lockup"
    >
      <img
        src="/assets/badge_20th.png"
        alt="20th Edition Vignan Mahotsav"
        className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(245,158,11,0.35)]"
        loading="eager"
      />
    </div>
  );
};
