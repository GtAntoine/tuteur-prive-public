import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { HistoryEntry } from '../../lib/types';

interface LearningStreakProps {
  history: HistoryEntry[];
}

export function LearningStreak({ history }: LearningStreakProps) {
  const [streak, setStreak] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (!Array.isArray(history)) return;

    const calculateStreak = () => {
      const today = new Date();
      let currentStreak = 0;
      let date = new Date(today);

      while (true) {
        const hasActivity = history.some(entry => {
          const entryDate = new Date(entry.timestamp);
          return entryDate.toDateString() === date.toDateString();
        });

        if (!hasActivity) break;
        currentStreak++;
        date.setDate(date.getDate() - 1);
      }

      return currentStreak;
    };

    setStreak(calculateStreak());
  }, [history]);

  return (
    <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <Flame className="w-6 h-6 text-white" />
        <h2 className="text-xl font-semibold text-white">{t('stats.learningStreak.title')}</h2>
      </div>

      <div className="flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4">
            <div className="text-4xl font-bold text-white">{streak}</div>
          </div>
          <p className="text-white/80">{t('stats.learningStreak.consecutiveDays')}</p>
        </div>
      </div>
    </div>
  );
}