// src/components/history/HistoryImages.tsx
import React, { useState } from 'react';
import { ImageGalleryModal } from '../common/ImageGalleryModal';
import { ImageGalleryStrip } from '../common/ImageGalleryStrip';

interface HistoryImagesProps {
  images: string[];
}

export function HistoryImages({ images }: HistoryImagesProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <ImageGalleryStrip 
        images={images}
        onImageClick={setSelectedImageIndex}
      />

      {selectedImageIndex !== null && (
        <ImageGalleryModal
          images={images}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </>
  );
}
