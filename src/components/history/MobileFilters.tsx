import React, { useState, useEffect } from 'react';
import { X, Filter } from 'lucide-react';
import { SubjectFilter } from './subjects/SubjectFilter';
import { TypeFilter } from './TypeFilter';
import { useTranslation } from 'react-i18next';
import type { HistoryFilters, SubjectId } from '../../lib/types';
import { Portal } from '../common/Portal';

interface MobileFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: HistoryFilters;
  onSubjectChange: (subject: SubjectId | undefined) => void;
  onTypeChange: (type: 'lesson' | 'correction' | 'guided' | undefined) => void;
}

export function MobileFilters({
  isOpen,
  onClose,
  filters,
  onSubjectChange,
  onTypeChange
}: MobileFiltersProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      // Petit délai pour permettre au navigateur de traiter l'animation
      setTimeout(() => setIsInitialRender(false), 50);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsInitialRender(true);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <div 
        className="fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300"
        onClick={handleClose}
      >
        <div 
          className={`absolute inset-x-0 top-0 bg-gradient-to-br from-indigo-900 to-purple-900 
            rounded-b-xl p-6 space-y-6 max-h-[90vh] overflow-y-auto transition-transform duration-300
            ${isClosing ? '-translate-y-full' : isInitialRender ? '-translate-y-full' : 'translate-y-0'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-white" />
              <h2 className="text-lg font-semibold text-white">{t('history.filters.title')}</h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="space-y-6" onClick={e => e.stopPropagation()}>
            <div>
              <h3 className="text-sm font-medium text-white mb-4">{t('history.filters.subject')}</h3>
              <SubjectFilter
                selectedSubject={filters.subject}
                onSubjectChange={subject => {
                  onSubjectChange(subject);
                }}
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-white mb-4">{t('history.filters.type')}</h3>
              <TypeFilter
                selectedType={filters.type}
                onTypeChange={type => {
                  onTypeChange(type);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}