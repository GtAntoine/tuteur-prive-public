// src/components/history/HistoryEmpty.tsx
import React from 'react';
import { Clock } from 'lucide-react';
import { BackButton } from '../common/BackButton';
import { useTranslation } from 'react-i18next';

export function HistoryEmpty() {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BackButton />
      <div className="text-center py-12">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-white">{t('history.empty.title')}</h3>
        <p className="text-gray-400">{t('history.empty.message')}</p>
      </div>
    </div>
  );
}