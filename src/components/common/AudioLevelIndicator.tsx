import React from 'react';

interface AudioLevelIndicatorProps {
  level: number;
}

export function AudioLevelIndicator({ level }: AudioLevelIndicatorProps) {
  // Normalize level to 0-100
  const normalizedLevel = Math.min(100, (level / 255) * 100);
  
  return (
    <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
      {[...Array(5)].map((_, i) => {
        const barHeight = (i + 1) * 3;
        const isActive = normalizedLevel >= (i + 1) * 20;
        
        return (
          <div
            key={i}
            className={`w-1 rounded-full transition-all duration-100 ${
              isActive ? 'bg-white' : 'bg-white/30'
            }`}
            style={{ height: `${barHeight}px` }}
          />
        );
      })}
    </div>
  );
}