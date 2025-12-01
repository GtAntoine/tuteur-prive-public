import React from 'react';
import { X } from 'lucide-react';

interface FilePreviewProps {
  previewUrls: string[];
  onRemove: (index: number) => void;
}

export function FilePreview({ previewUrls, onRemove }: FilePreviewProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {previewUrls.map((url, index) => (
        <div 
          key={url} 
          className="relative group aspect-video animate-pop"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <img
            src={url}
            alt={`Document ${index + 1}`}
            className="w-full h-full object-cover rounded-lg shadow-md transition-transform group-hover:scale-105"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(index);
            }}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 transform hover:scale-110"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}