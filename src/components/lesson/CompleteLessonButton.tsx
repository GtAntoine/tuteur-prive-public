import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface CompleteLessonButtonProps {
  onClick?: () => void;
}

export function CompleteLessonButton({ onClick }: CompleteLessonButtonProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    navigate('/app');
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 
        bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
    >
      <CheckCircle className="w-5 h-5" />
      {t('lesson.completeButton')}
    </button>
  );
}