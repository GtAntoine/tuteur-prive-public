import React from 'react';
import { RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LessonActionsProps {
  onNewLesson: () => void;
}

export function LessonActions({ onNewLesson }: LessonActionsProps) {
  const { t } = useTranslation();
  
  return (
    <button
      onClick={onNewLesson}
      className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
        text-white rounded-full transition-all duration-300 hover:scale-105 group relative overflow-hidden"
    >
      <RotateCcw className="w-5 h-5" />
      <span>{t('modes.lesson.newLesson')}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
        animate-shimmer opacity-0 group-hover:opacity-100" 
        style={{ backgroundSize: '200% 100%' }}
      />
    </button>
  );
}