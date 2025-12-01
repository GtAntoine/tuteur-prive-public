// src/components/common/ImageGalleryStrip.tsx
import React from 'react';
import { X } from 'lucide-react';
import { LazyImage } from './LazyImage';

interface ImageGalleryStripProps {
  images: string[];
  onImageClick?: (index: number) => void;
}

export function ImageGalleryStrip({ images, onImageClick }: ImageGalleryStripProps) {
  if (images.length === 0) return null;

  return (
    <div 
      className="flex overflow-x-auto pb-2 mb-6 pt-3 px-4 gap-4 snap-x snap-mandatory 
        [&::-webkit-scrollbar]:h-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-white/10
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-white/40
        [&::-webkit-scrollbar-thumb:hover]:bg-white/50"
    >
      {images.map((image, index) => (
        <button
          key={index}
          onClick={() => onImageClick?.(index)}
          className="flex-none relative aspect-video w-60 rounded-lg overflow-hidden 
            transition-transform hover:scale-105 snap-center"
        >
        
          <LazyImage
            src={image}
            alt={`Document ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
        </button>
      ))}
    </div>
  );
}
