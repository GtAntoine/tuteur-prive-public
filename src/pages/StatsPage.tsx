import React, { useState, useEffect } from 'react';
import { BarChart2 } from 'lucide-react';
import { BackButton } from '../components/common/BackButton';
import { TotalScore } from '../components/stats/TotalScore';
import { StatsOverview } from '../components/stats/StatsOverview';
import { SubjectProgress } from '../components/stats/SubjectProgress';
import { WeeklyActivity } from '../components/stats/WeeklyActivity';
import { LearningStreak } from '../components/stats/LearningStreak';
import { AchievementsList } from '../components/stats/AchievementsList';
import { getHistory } from '../lib/utils/history';
import { useTranslation } from 'react-i18next';
import type { HistoryEntry } from '../lib/types';

export function StatsPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    async function loadHistory() {
      try {
        const historyData = await getHistory();
        setHistory(Array.isArray(historyData) ? historyData : []);
      } catch (error) {
        console.error('Error loading history:', error);
        setHistory([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadHistory();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackButton />
        
        <div className="flex items-center gap-4 my-6">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <BarChart2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">{t('stats.title')}</h1>
        </div>
        
        <div className="animate-pulse space-y-6 ">
          <div className="h-24 bg-white/10 rounded-lg" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-white/10 rounded-lg" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-64 bg-white/10 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <BackButton />

      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
          <BarChart2 className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">{t('stats.title')}</h1>
      </div>

      <TotalScore history={history} />
      
      <StatsOverview history={history} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SubjectProgress history={history} />
        <WeeklyActivity history={history} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LearningStreak history={history} />
        <AchievementsList history={history} />
      </div>
    </div>
  );
}