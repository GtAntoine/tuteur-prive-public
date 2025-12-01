import React, { useState, useEffect } from 'react';
import { Book } from 'lucide-react';
import { SUBJECTS } from '../../lib/constants/subjects';
import { getSubjectFromData } from '../../lib/utils/subject';
import { useTranslation } from 'react-i18next';
import type { HistoryEntry } from '../../lib/types';

interface SubjectProgressProps {
  history: HistoryEntry[];
}

export function SubjectProgress({ history }: SubjectProgressProps) {
  const [subjectStats, setSubjectStats] = useState<Record<string, { 
    name: string; 
    color: string; 
    progress: number; 
    count: number 
  }>>({});
  const { t } = useTranslation();

  useEffect(() => {
    if (!Array.isArray(history)) return;

    const stats = Object.entries(SUBJECTS).reduce((acc, [id, subject]) => {
      const entries = history.filter(entry => getSubjectFromData(entry.data) === id);
      const correct = entries.reduce((sum, entry) => {
        if ('qcm_questions' in entry.data) {
          return sum + entry.data.qcm_questions.filter(q => q.userAnswer === q.correctAnswer).length;
        }
        return sum;
      }, 0);
      const total = entries.reduce((sum, entry) => {
        if ('qcm_questions' in entry.data) {
          return sum + entry.data.qcm_questions.length;
        }
        return sum;
      }, 0);

      return {
        ...acc,
        [id]: {
          name: subject.name,
          color: subject.color,
          progress: total ? Math.round((correct / total) * 100) : 0,
          count: entries.length
        }
      };
    }, {});

    setSubjectStats(stats);
  }, [history]);

  return (
    <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <Book className="w-6 h-6 text-white" />
        <h2 className="text-xl font-semibold text-white">{t('stats.subjectProgress.title')}</h2>
      </div>

      <div className="space-y-4">
        {Object.entries(subjectStats)
          .filter(([_, stats]) => stats.count > 0)
          .sort((a, b) => b[1].progress - a[1].progress)
          .map(([id, stats]) => (
            <div key={id} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/90">{t(`subjects.${id}`)}</span>
                <span className="text-white/80">{stats.progress}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-${stats.color}-500 transition-all duration-500`}
                  style={{ width: `${stats.progress}%` }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}