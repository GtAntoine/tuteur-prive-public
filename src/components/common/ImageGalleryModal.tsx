// src/components/common/ImageGalleryModal.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Portal } from './Portal';

interface ImageGalleryModalProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export function ImageGalleryModal({ images, initialIndex, onClose }: ImageGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    
    // Optional: Add visual feedback during swipe
    if (containerRef.current && touchStartX.current && touchEndX.current) {
      const diff = touchEndX.current - touchStartX.current;
      const translateX = Math.min(Math.max(diff, -100), 100); // Limit translation
      containerRef.current.style.transform = `translateX(${translateX}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const diff = touchStartX.current - touchEndX.current;
    const threshold = window.innerWidth * 0.15; // 15% of screen width

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }

    // Reset transform
    if (containerRef.current) {
      containerRef.current.style.transform = '';
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') onClose();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Portal>
      <div 
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Image container */}
        <div 
          ref={containerRef}
          className="relative w-full h-full flex items-center justify-center touch-pan-y"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ transition: 'transform 0.2s ease-out' }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation buttons - Hide on mobile */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 p-2 text-white/80 hover:text-white transition-colors block"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 p-2 text-white/80 hover:text-white transition-colors block"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Current image */}
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg select-none"
            draggable={false}
          />

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </Portal>
  );
}
