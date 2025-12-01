// src/hooks/useHistory.ts
import { useState, useEffect } from 'react';
import { getHistory } from '../lib/utils/history';
import type { HistoryEntry } from '../lib/types';

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const historyData = await getHistory();
      setHistory(Array.isArray(historyData) ? historyData : []);
    } catch (error) {
      console.error('Error loading history:', error);
      setError('Impossible de charger l\'historique');
      setHistory([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const refreshHistory = () => {
    return loadHistory();
  };

  return {
    history,
    isLoading,
    error,
    refreshHistory
  };
}
