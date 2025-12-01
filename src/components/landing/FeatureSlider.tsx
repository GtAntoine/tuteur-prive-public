import React from 'react';
import { features } from './features';
import { FeatureSlide } from './FeatureSlide';
import { SliderControls } from './SliderControls';
import { GetStartedButton } from './GetStartedButton';
import { useSlider } from '../../hooks/useSlider';

export function FeatureSlider() {
  const {
    currentIndex,
    isTransitioning,
    containerRef,
    handlePrevious,
    handleNext,
    handleDotClick,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useSlider(features.length);

  const currentFeature = features[currentIndex];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] overflow-hidden bg-gray-900 touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image avec Parallax */}
      <div 
        className="absolute inset-0 transition-transform duration-500"
        style={{ 
          transform: `scale(1.1) translateX(${isTransitioning ? '-5%' : '0'})`,
          backgroundImage: `url(${currentFeature.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 backdrop-blur-sm" />
      </div>

      {/* Contenu */}
      <div className="relative h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4 mt-24">
          <FeatureSlide 
            feature={currentFeature}
            isTransitioning={isTransitioning}
          />
        </div>

        {/* Contrôles et CTA */}
        <div className="pb-12 md:pb-16">
          <SliderControls
            currentIndex={currentIndex}
            totalSlides={features.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onDotClick={handleDotClick}
            isTransitioning={isTransitioning}
          />

          <div className="mt-8 md:mt-12 flex justify-center">
            <GetStartedButton />
          </div>

        </div>
      </div>

      {/* Overlay de transition */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 pointer-events-none ${
          isTransitioning ? 'opacity-20' : 'opacity-0'
        }`} 
      />
    </section>
  );
}