import React from 'react';

interface CloudLayersProps {
  mouseOffset: { x: number; y: number };
}

export const CloudLayers: React.FC<CloudLayersProps> = ({ mouseOffset }) => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-[5]" aria-hidden="true">
      {/* Cloud 1 - Drifting slowly on left-center */}
      <div
        className="absolute top-[28%] -left-[10%] w-[60%] h-[35%] opacity-45 mix-blend-screen filter blur-[1.5px] animate-drift-left will-change-transform"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.15 * 20}px, ${mouseOffset.y * 0.15 * 10}px, 0)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <img
          src="/assets/cloud_1.png"
          alt=""
          className="w-full h-full object-contain filter hue-rotate-[-10deg] brightness-125"
        />
      </div>

      {/* Cloud 2 - Drifting on right side behind warrior */}
      <div
        className="absolute top-[32%] right-[-8%] w-[55%] h-[32%] opacity-40 mix-blend-screen filter blur-[2px] animate-drift-right will-change-transform"
        style={{
          transform: `translate3d(${mouseOffset.x * -0.12 * 20}px, ${mouseOffset.y * -0.12 * 10}px, 0)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <img
          src="/assets/cloud_2.png"
          alt=""
          className="w-full h-full object-contain filter hue-rotate-[15deg] brightness-110"
        />
      </div>

      {/* Cloud 3 - Soft low mist layer across the base */}
      <div
        className="absolute bottom-[10%] left-[15%] w-[70%] h-[25%] opacity-30 mix-blend-overlay filter blur-[4px] animate-float-slow will-change-transform"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.25 * 20}px, ${mouseOffset.y * 0.25 * 10}px, 0)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <img
          src="/assets/cloud_3.png"
          alt=""
          className="w-full h-full object-contain brightness-150"
        />
      </div>
    </div>
  );
};
