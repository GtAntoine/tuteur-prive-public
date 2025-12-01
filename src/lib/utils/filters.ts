import type { HistoryEntry, HistoryFilters } from '../types';
import { getSubjectFromData } from './subject';

export function filterHistory(history: HistoryEntry[], filters: HistoryFilters): HistoryEntry[] {
  // Return empty array if history is not valid
  if (!Array.isArray(history)) {
    console.warn('Invalid history data provided to filterHistory');
    return [];
  }

  return history.filter(entry => {
    // Filter by subject
    if (filters.subject) {
      const subject = getSubjectFromData(entry.data);
      if (subject !== filters.subject) return false;
    }

    // Filter by type
    if (filters.type && entry.type !== filters.type) {
      return false;
    }

    return true;
  });
}
