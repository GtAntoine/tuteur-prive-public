import React from 'react';
import { X } from 'lucide-react';

interface ImagePreviewProps {
  images: string[];
  onRemove: (index: number) => void;
}

export function ImagePreview({ images, onRemove }: ImagePreviewProps) {
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
      {images.map((url, index) => (
        <div key={url} className="relative group">
          <img
            src={url}
            alt={`Uploaded image ${index + 1}`}
            className="w-full h-40 object-cover rounded-lg"
          />
          <button
            onClick={() => onRemove(index)}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}