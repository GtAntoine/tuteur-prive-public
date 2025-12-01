// src/components/History.tsx
import React, { useState } from 'react';
import { Clock, Filter } from 'lucide-react';
import { useHistory } from '../hooks/useHistory';
import { filterHistory } from '../lib/utils/filters';
import { HistoryHeader } from './history/HistoryHeader';
import { HistoryFilters } from './history/HistoryFilters';
import { HistoryList } from './history/HistoryList';
import { HistoryEmpty } from './history/HistoryEmpty';
import { HistoryLoading } from './history/HistoryLoading';
import { BackButton } from './common/BackButton';
import { useTranslation } from 'react-i18next';
import type { HistoryFilters as HistoryFiltersType } from '../lib/types';

export function History() {
  const { history, isLoading, error, refreshHistory } = useHistory();
  const [filters, setFilters] = useState<HistoryFiltersType>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { t } = useTranslation();

  if (isLoading) {
    return <HistoryLoading />;
  }

  if (history.length === 0) {
    return <HistoryEmpty />;
  }

  const filteredHistory = filterHistory(history, filters);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <BackButton />
      <HistoryHeader />

      <HistoryFilters 
        filters={filters}
        showMobileFilters={showMobileFilters}
        onShowMobileFilters={setShowMobileFilters}
        onFilterChange={setFilters}
      />

      <HistoryList 
        history={filteredHistory}
        onRefresh={refreshHistory}
      />
    </div>
  );
}