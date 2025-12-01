import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { HistoryEntry } from '../../lib/types';

interface WeeklyActivityProps {
  history: HistoryEntry[];
}

export function WeeklyActivity({ history }: WeeklyActivityProps) {
  const [weekData, setWeekData] = useState<Array<{ day: string; count: number }>>([]);
  const [maxCount, setMaxCount] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (!Array.isArray(history)) return;

    const days = t('stats.weeklyActivity.days', { returnObjects: true }) as string[];
    const today = new Date();
    
    const data = days.map((day, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (today.getDay() - index));
      
      const count = history.filter(entry => {
        const entryDate = new Date(entry.timestamp);
        return entryDate.toDateString() === date.toDateString();
      }).length;

      return { day, count };
    });

    setWeekData(data);
    setMaxCount(Math.max(...data.map(d => d.count)));
  }, [history, t]);

  return (
    <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-white" />
        <h2 className="text-xl font-semibold text-white">{t('stats.weeklyActivity.title')}</h2>
      </div>

      <div className="flex items-end justify-between h-48 gap-2">
        {weekData.map(({ day, count }, index) => (
          <div key={day} className="flex flex-col items-center flex-1">
            <div className="w-full">
              <div 
                className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg transition-all duration-500"
                style={{ 
                  height: `${(count / Math.max(maxCount, 1)) * 150}px`,
                  opacity: count ? '1' : '0.2'
                }}
              />
            </div>
            <span className="mt-2 text-sm text-white/80">{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}