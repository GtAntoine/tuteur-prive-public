import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { HistoryEntry } from '../../lib/types';

interface AchievementsListProps {
  history: HistoryEntry[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export function AchievementsList({ history }: AchievementsListProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (!Array.isArray(history)) {
      setAchievements([]);
      return;
    }

    // Calculate achievements based on history
    const calculatedAchievements: Achievement[] = [
      {
        id: 'first_lesson',
        title: t('stats.achievements.firstLesson.title'),
        description: t('stats.achievements.firstLesson.description'),
        icon: '🎓',
        unlocked: history.some(e => e.type === 'lesson')
      },
      {
        id: 'perfect_score',
        title: t('stats.achievements.perfectScore.title'),
        description: t('stats.achievements.perfectScore.description'),
        icon: '🎯',
        unlocked: history.some(entry => {
          if ('qcm_questions' in entry.data && Array.isArray(entry.data.qcm_questions)) {
            const questions = entry.data.qcm_questions;
            return questions.length > 0 && 
                   questions.every(q => q.userAnswer === q.correctAnswer);
          }
          return false;
        })
      },
      {
        id: 'streak_3',
        title: t('stats.achievements.streak3.title'),
        description: t('stats.achievements.streak3.description'),
        icon: '🔥',
        unlocked: calculateStreak(history) >= 3
      },
      {
        id: 'subjects_5',
        title: t('stats.achievements.subjects5.title'),
        description: t('stats.achievements.subjects5.description'),
        icon: '📚',
        unlocked: calculateUniqueSubjects(history) >= 5
      }
    ];

    setAchievements(calculatedAchievements);
  }, [history, t]);

  return (
    <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-6 h-6 text-white" />
        <h2 className="text-xl font-semibold text-white">{t('stats.achievements.title')}</h2>
      </div>

      <div className="space-y-4">
        {achievements.map(achievement => (
          <div 
            key={achievement.id}
            className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ${
              achievement.unlocked 
                ? 'bg-white/10' 
                : 'bg-white/5 opacity-50'
            }`}
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-2xl">
              {achievement.icon}
            </div>
            <div>
              <h3 className="font-medium text-white">{achievement.title}</h3>
              <p className="text-sm text-white/70">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
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

// Helper function to calculate unique subjects
function calculateUniqueSubjects(history: HistoryEntry[]): number {
  const subjects = new Set(
    history
      .map(entry => entry.data?.subject)
      .filter(Boolean)
  );
  return subjects.size;
}