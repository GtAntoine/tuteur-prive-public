import React from 'react';
import { Camera } from 'lucide-react';

interface UploadButtonProps {
  icon: React.ReactNode;
  text: string;
  isCompact: boolean;
  getButtonStyles: () => string;
}

export function UploadButton({ icon, text, isCompact, getButtonStyles }: UploadButtonProps) {
  return (
    <div className={`upload-initial ${isCompact ? 'upload-compact' : ''}`}>
      <div className="relative animate-float">
        <div className={`w-24 h-24 rounded-full ${getButtonStyles()} flex items-center justify-center transition-transform hover:scale-110 upload-icon`}>
          <Camera className="w-12 h-12 text-white" />
        </div>
        <div className="absolute -right-2 -bottom-2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center animate-bounce-slow">
          {icon}
        </div>
      </div>
      
      <div className="text-center upload-text">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{text}</h3>
        <p className="text-gray-500">
          Prends en photo tes documents ou sélectionne des fichiers
        </p>
      </div>
    </div>
  );
}