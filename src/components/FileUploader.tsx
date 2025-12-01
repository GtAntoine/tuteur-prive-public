import React, { useCallback, useState, useRef } from 'react';
import { Camera, Upload, X, Send } from 'lucide-react';
import { validateFiles } from '../lib/utils/file-validation';
import { useTranslation } from 'react-i18next';

interface FileUploaderProps {
  onFilesSubmit: (files: File[]) => void;
  disabled?: boolean;
  accept: string;
  mode?: 'lesson' | 'correction' | 'guided';
  icon: React.ReactNode;
  text: string;
  subtext: string;
}

export function FileUploader({ 
  onFilesSubmit, 
  disabled, 
  accept, 
  mode = 'lesson',
  icon,
  text,
  subtext = 'documents'
}: FileUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const dragCounter = useRef(0);
  const { t } = useTranslation();

  const handleFiles = useCallback(async (files: File[]) => {
    const totalFiles = selectedFiles.length + files.length;
    
    if (totalFiles > 10) {
      setError('Vous ne pouvez pas ajouter plus de 10 documents au total');
      return;
    }
    
    try {
      const validFiles = await validateFiles(files);
      setSelectedFiles(prev => [...prev, ...validFiles]);
      setHasUploaded(true);
      setError(null);
      
      const urls = validFiles
        .filter(file => file.type.startsWith('image/'))
        .map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...urls]);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Une erreur est survenue lors de la validation des fichiers');
    }
  }, [selectedFiles]);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    
    await handleFiles(Array.from(fileList));
    e.target.value = '';
  }, [handleFiles]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    const files = Array.from(e.dataTransfer.files);
    await handleFiles(files);
  }, [handleFiles]);

  const handleRemove = useCallback((index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  }, [previewUrls]);

  const handleSubmit = useCallback(() => {
    if (selectedFiles.length === 0 || disabled) return;
    onFilesSubmit(selectedFiles);
    
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setPreviewUrls([]);
    setSelectedFiles([]);
  }, [selectedFiles, previewUrls, onFilesSubmit, disabled]);

  const handleClick = useCallback(() => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  }, [disabled]);

  const handleCameraClick = useCallback(() => {
    if (!disabled) {
      cameraInputRef.current?.click();
    }
  }, [disabled]);

  const getButtonStyles = () => {
    switch (mode) {
      case 'correction':
        return 'bg-gradient-to-br from-emerald-500 to-green-600 hover:bg-green-600';
      case 'guided':
        return 'bg-gradient-to-br from-purple-500 to-pink-600 hover:bg-purple-600';
      default:
        return 'bg-gradient-to-br from-blue-500 to-indigo-600 hover:bg-blue-600';
    }
  };

  const getSubmitButtonText = () => {
    switch (mode) {
      case 'correction':
        return t('modes.correction.title');
      case 'guided':
        return t('modes.guided.title');
      default:
        return t('modes.lesson.title');
    }
  };

  return (
    <div className="space-y-4">
      <div 
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`w-full bg-white rounded-2xl shadow-sm border-2 border-dashed transition-all duration-300 
          ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}
          ${hasUploaded ? 'p-4' : 'p-8'} 
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
        />
        
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
        />
        
        <div className={`flex flex-col items-center transition-all duration-300`}>
          {!hasUploaded ? (
            <>
              <div className="flex gap-4 mb-6">
                <button
                  type="button"
                  onClick={handleCameraClick}
                  className={`relative animate-float w-24 h-24 rounded-full ${getButtonStyles()} flex items-center justify-center transition-transform hover:scale-110`}
                >
                  <Camera className="w-12 h-12 text-white" />
                </button>
                
                <button
                  type="button"
                  onClick={handleClick}
                  className={`relative animate-float w-24 h-24 rounded-full ${getButtonStyles()} flex items-center justify-center transition-transform hover:scale-110`}
                >
                  <Upload className="w-12 h-12 text-white" />
                </button>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{text}</h3>
                <p className="text-gray-500">
                  {isDragging ? t('upload.dropHere') : t('upload.takePhotoOrSelect', { type: subtext })}
                </p>
              </div>
            </>
          ) : (
            <div className="flex items-center flex-col gap-3 animate-pop">
              <div className="flex gap-4 mb-3">
                <button
                  type="button"
                  onClick={handleCameraClick}
                  className={`relative animate-float w-20 h-20 rounded-full ${getButtonStyles()} flex items-center justify-center transition-transform hover:scale-110`}
                >
                  <Camera className="w-12 h-12 text-white" />
                </button>
                
                <button
                  type="button"
                  onClick={handleClick}
                  className={`relative animate-float w-20 h-20 rounded-full ${getButtonStyles()} flex items-center justify-center transition-transform hover:scale-110`}
                >
                  <Upload className="w-12 h-12 text-white" />
                </button>
              </div>
              
              <div className="text-gray-700 font-medium">
                {isDragging ? t('upload.dropHere') : t('upload.addMore')}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rest of the component remains the same */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 flex items-center gap-2 text-gray-600 bg-blue-50 p-3 rounded-lg">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
          <p className="text-sm">
            {t('upload.timeEstimate', { seconds: selectedFiles.length * 30 })}
            {selectedFiles.length > 1 ? t('upload.multipleFiles', { count: selectedFiles.length }) : ''}
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-start gap-2 animate-pop">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-2" />
          <p>{error}</p>
        </div>
      )}

      {previewUrls.length > 0 && (
        <div className="space-y-6">
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
                    handleRemove(index);
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 transform hover:scale-110"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={disabled || selectedFiles.length === 0}
            className={`mx-auto flex items-center justify-center gap-3 px-8 py-4 
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
              hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600
              text-white text-lg font-medium rounded-full 
              disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 
              hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl 
              w-auto max-w-sm relative overflow-hidden
              before:absolute before:inset-0 before:bg-white/20 before:transform before:-skew-x-12
              before:translate-x-[-150%] hover:before:translate-x-[150%] before:transition-transform
              before:duration-700`}
          >
            <Send className="w-6 h-6 animate-bounce-slow" />
            <span className="relative">
              {getSubmitButtonText()}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
              animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
          </button>
        </div>
      )}
    </div>
  );
}