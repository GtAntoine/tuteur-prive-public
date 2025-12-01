import React, { useState, useEffect } from 'react';
import { Brain, Clock, Target, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { HistoryEntry } from '../lib/types';

interface StatsOverviewProps {
  history: HistoryEntry[];
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
}

function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  return (
    <div className={`bg-white/10 rounded-lg p-4 backdrop-blur-sm`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 rounded-full bg-${color}-500/20 flex items-center justify-center`}>
          <Icon className={`w-5 h-5 text-white`} />
        </div>
        <span className="text-sm text-white/80">{label}</span>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

export function StatsOverview({ history }: StatsOverviewProps) {
  const [stats, setStats] = useState({
    totalLessons: 0,
    totalTime: 0,
    successRate: 0,
    streak: 0
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (!Array.isArray(history)) return;

    // Calculate total lessons
    const totalLessons = history.filter(e => e.type === 'lesson').length;

    // Calculate total time (15 minutes per activity)
    const totalTime = Math.round(history.length * 15);

    // Calculate success rate with weighted scoring
    let totalPoints = 0;
    let maxPoints = 0;

    history.forEach(entry => {
      // QCM questions (1 point each)
      if ('qcm_questions' in entry.data) {
        entry.data.qcm_questions.forEach(q => {
          maxPoints += 1; // Each QCM question is worth 1 point
          if (q.userAnswer === q.correctAnswer) {
            totalPoints += 1;
          }
        });
      }

      // Understanding questions (3 points each)
      if ('understanding_questions' in entry.data) {
        entry.data.understanding_questions.forEach(q => {
          if (q.feedback) {
            maxPoints += 3; // Each understanding question is worth 3 points
            if (q.feedback.isCorrect) {
              totalPoints += 3;
            }
          }
        });
      }
    });

    // Calculate success rate as percentage
    const successRate = maxPoints > 0 
      ? Math.round((totalPoints / maxPoints) * 100)
      : 0;

    // Calculate streak
    const streak = calculateStreak(history);

    setStats({
      totalLessons,
      totalTime,
      successRate,
      streak
    });
  }, [history]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        icon={Brain}
        label={t('stats.overview.lessonsStudied')}
        value={stats.totalLessons}
        color="blue"
      />
      <StatCard
        icon={Clock}
        label={t('stats.overview.totalTime')}
        value={`${stats.totalTime}${t('stats.overview.minutes')}`}
        color="purple"
      />
      <StatCard
        icon={Target}
        label={t('stats.overview.successRate')}
        value={`${stats.successRate}%`}
        color="green"
      />
      <StatCard
        icon={Award}
        label={t('stats.overview.currentStreak')}
        value={`${stats.streak}${t('stats.overview.days')}`}
        color="orange"
      />
    </div>
  );
}

// Helper function to calculate streak
function calculateStreak(history: HistoryEntry[]): number {
  if (!history.length) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let currentStreak = 0;
  let date = new Date(today);

  while (true) {
    const hasActivity = history.some(entry => {
      const entryDate = new Date(entry.timestamp);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === date.getTime();
    });

    if (!hasActivity) break;
    currentStreak++;
    date.setDate(date.getDate() - 1);
  }

  return currentStreak;
}