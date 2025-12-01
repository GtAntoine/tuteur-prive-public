// src/components/history/HistoryFilters.tsx
import React from 'react';
import { Filter } from 'lucide-react';
import { SubjectFilter } from './subjects/SubjectFilter';
import { TypeFilter } from './TypeFilter';
import { MobileFilters } from './MobileFilters';
import { useTranslation } from 'react-i18next';
import type { HistoryFilters as HistoryFiltersType } from '../../lib/types';

interface HistoryFiltersProps {
  filters: HistoryFiltersType;
  showMobileFilters: boolean;
  onShowMobileFilters: (show: boolean) => void;
  onFilterChange: (filters: HistoryFiltersType) => void;
}

export function HistoryFilters({
  filters,
  showMobileFilters,
  onShowMobileFilters,
  onFilterChange
}: HistoryFiltersProps) {
  const { t } = useTranslation();
  
  const handleSubjectChange = (subject: string | undefined) => {
    onFilterChange({ ...filters, subject });
  };

  const handleTypeChange = (type: 'lesson' | 'correction' | 'guided' | undefined) => {
    onFilterChange({ ...filters, type });
  };

  return (
    <>
      <button
        onClick={() => onShowMobileFilters(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg"
      >
        <Filter className="w-5 h-5" />
        <span>{t('history.filters.title')}</span>
      </button>

      <div className="hidden lg:block bg-white/10 p-4 rounded-lg shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Filter className="w-5 h-5 text-white" />
          <h2 className="text-lg font-semibold text-white">{t('history.filters.title')}</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-white mb-2">{t('history.filters.subject')}</h3>
            <SubjectFilter
              selectedSubject={filters.subject}
              onSubjectChange={handleSubjectChange}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-white mb-2">{t('history.filters.type')}</h3>
            <TypeFilter
              selectedType={filters.type}
              onTypeChange={handleTypeChange}
            />
          </div>
        </div>
      </div>

      <MobileFilters
        isOpen={showMobileFilters}
        onClose={() => onShowMobileFilters(false)}
        filters={filters}
        onSubjectChange={handleSubjectChange}
        onTypeChange={handleTypeChange}
      />
    </>
  );
}