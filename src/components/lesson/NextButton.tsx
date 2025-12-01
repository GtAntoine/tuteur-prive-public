import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface NextButtonProps {
  onClick: () => void;
}

export function NextButton({ onClick }: NextButtonProps) {
  const { t } = useTranslation();
  
  return (
    <button
      onClick={onClick}
      className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
    >
      <span>{t('lesson.nextButton')}</span>
      <ArrowRight className="w-5 h-5 animate-bounce-slow" />
    </button>
  );
}