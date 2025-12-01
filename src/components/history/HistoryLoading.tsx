// src/components/History.tsx
import React, { useState } from 'react';
import { Clock, Filter } from 'lucide-react';
import { HistoryHeader } from './HistoryHeader';
import { HistoryFilters } from './HistoryFilters';
import { HistoryList } from './HistoryList';
import { HistoryEmpty } from './HistoryEmpty';
import { BackButton } from '../common/BackButton';
import type { HistoryFilters as HistoryFiltersType } from '../lib/types';


export function HistoryLoading() {
  const [filters, setFilters] = useState<HistoryFiltersType>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <BackButton />
      <div className="space-y-6 pt-6">
         <HistoryHeader />

      <HistoryFilters 
        filters={filters}
        showMobileFilters={showMobileFilters}
        onShowMobileFilters={setShowMobileFilters}
        onFilterChange={setFilters}
      />
        <div className="animate-pulse  grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-white/10 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
