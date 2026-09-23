import React from 'react';

interface MountainLayerProps {
  layerIndex: number;
  src: string;
  alt: string;
  depthFactor: number;
  mouseOffset: { x: number; y: number };
  scrollY?: number;
  className?: string;
  opacity?: number;
}

export const MountainLayer: React.FC<MountainLayerProps> = ({
  src,
  alt,
  depthFactor,
  mouseOffset,
  scrollY = 0,
  className = '',
  opacity = 1,
}) => {
  // 3D GPU accelerated transformation combining mouse parallax and scroll parallax
  const x = mouseOffset.x * depthFactor * 25;
  const y = mouseOffset.y * depthFactor * 12 + scrollY * depthFactor * 0.45;

  return (
    <div
      className={`absolute inset-0 w-full h-full pointer-events-none select-none transition-transform will-change-transform ${className}`}
      style={{
        transform: `translate3d(${x}px, ${y}px, 0)`,
        transition: 'transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        opacity: opacity,
      }}
      aria-hidden="true"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-bottom"
        loading="eager"
      />
    </div>
  );
};
