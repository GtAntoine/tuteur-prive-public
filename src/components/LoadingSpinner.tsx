import React, { useState, useEffect } from 'react';
import { Bot } from 'lucide-react';
import { AnimatedDots } from './common/AnimatedDots';
import { RevisionGame } from './revision-game/RevisionGame';
import { useTranslation } from 'react-i18next';

interface LoadingSpinnerProps {
  message: string;
  totalFiles?: number;
}

export function LoadingSpinner({ message, totalFiles = 1 }: LoadingSpinnerProps) {
  const [showTimeEstimate, setShowTimeEstimate] = useState(false);
  const [progress, setProgress] = useState(0);
  const { t } = useTranslation();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimeEstimate(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const totalDuration = totalFiles * 30000; // 30 seconds per file
    let startTime = Date.now();
    let animationFrame: number;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const remaining = totalDuration - elapsed;

      if (remaining <= 0) {
        setProgress(100);
        return;
      }

      const baseProgress = (elapsed / totalDuration) * 100;
      const randomVariation = (Math.random() * 4) - 2;
      const newProgress = Math.min(100, Math.max(0, baseProgress + randomVariation));
      
      setProgress(newProgress);
      animationFrame = requestAnimationFrame(updateProgress);
    };

    animationFrame = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [totalFiles]);

  return (
    <div className="space-y-8">
      <div className="loading-spinner text-center md:py-6">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-indigo-500 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Bot className="w-8 h-8 text-white floating-animation" />
          </div>
        </div>

        <p className="text-lg text-white font-medium">
          {message}
          <AnimatedDots />
        </p>

        {showTimeEstimate && (
          <div className="mt-4 flex items-center justify-center gap-2 text-white animate-pop">
            <p className="text-sm flex items-center flex-col justify-center">
              <span>{t('analysis.loading.timeEstimate', { seconds: totalFiles * 30 })}</span>
              {totalFiles > 1 && (
                <span>{t('analysis.loading.multipleFiles', { count: totalFiles })}</span>
              )}
            </p>
          </div>
        )}

        <div className="mt-6 max-w-sm mx-auto px-4">
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300"
              style={{ 
                width: `${progress}%`,
                transition: 'width 0.3s ease-out'
              }} 
            />
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto">
        <RevisionGame />
      </div>
    </div>
  );
}