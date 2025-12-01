// src/components/history/HistoryList.tsx
import React from 'react';
import { HistoryCard } from './HistoryCard';
import type { HistoryEntry } from '../../lib/types';

interface HistoryListProps {
  history: HistoryEntry[];
  onRefresh: () => void;
}

export function HistoryList({ history, onRefresh }: HistoryListProps) {
  const [localHistory, setLocalHistory] = React.useState(history);

  React.useEffect(() => {
    setLocalHistory(history);
  }, [history]);

  const handleDelete = (deletedId: string) => {
    setLocalHistory(prev => prev.filter(entry => entry.id !== deletedId));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {localHistory.map((entry) => (
        <HistoryCard 
          key={entry.id} 
          entry={entry}
          onDelete={() => handleDelete(entry.id)}
          onChange={onRefresh}
        />
      ))}
    </div>
  );
}