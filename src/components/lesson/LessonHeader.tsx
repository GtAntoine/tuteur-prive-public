import React from 'react';
import { BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function LessonHeader() {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
        <BookOpen className="w-6 h-6 text-white" />
      </div>
      <h1 className="text-2xl font-bold text-white">{t('modes.lesson.title')}</h1>
    </div>
  );
}