import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderControlsProps {
  currentIndex: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
  isTransitioning: boolean;
}

export function SliderControls({
  currentIndex,
  totalSlides,
  onPrevious,
  onNext,
  onDotClick,
  isTransitioning
}: SliderControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={onPrevious}
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Fonctionnalité précédente"
        disabled={isTransitioning}
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <div className="flex gap-2">
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            disabled={isTransitioning}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Voir la fonctionnalité ${index + 1}`}
          />
        ))}
      </div>
      
      <button
        onClick={onNext}
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Fonctionnalité suivante"
        disabled={isTransitioning}
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}