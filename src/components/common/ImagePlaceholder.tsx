import React from 'react';
import { ImageOff } from 'lucide-react';

interface ImagePlaceholderProps {
  className?: string;
}

export function ImagePlaceholder({ className = '' }: ImagePlaceholderProps) {
  return (
    <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
      <div className="text-center p-4">
        <ImageOff className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-500">Image non disponible</p>
      </div>
    </div>
  );
}