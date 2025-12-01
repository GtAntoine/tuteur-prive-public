import React, { useCallback } from 'react';
import { ImagePlus } from 'lucide-react';
import { validateFile } from '../lib/utils/file';

interface ImageUploaderProps {
  onImagesSelected: (files: File[]) => void;
  disabled?: boolean;
  mode?: 'lesson' | 'correction' | 'guided';
}

export function ImageUploader({ onImagesSelected, disabled, mode = 'lesson' }: ImageUploaderProps) {
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    
    const files = Array.from(fileList);
    const validFiles = files.filter(validateFile);
    
    if (validFiles.length !== files.length) {
      alert('Certains fichiers ne sont pas des images valides. Seules les images JPG, PNG, GIF et WebP sont acceptées.');
      return;
    }
    
    onImagesSelected(validFiles);
    e.target.value = '';
  }, [onImagesSelected]);

  const getButtonStyles = () => {
    switch (mode) {
      case 'correction':
        return 'bg-green-500 hover:bg-green-600';
      case 'guided':
        return 'bg-purple-500 hover:bg-purple-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        multiple
        onChange={handleFileChange}
        disabled={disabled}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
      />
      <div className={`flex items-center gap-2 px-4 py-2 ${getButtonStyles()} text-white rounded-lg disabled:opacity-50`}>
        <ImagePlus className="w-5 h-5" />
        <span>Ajouter des images</span>
      </div>
    </div>
  );
}