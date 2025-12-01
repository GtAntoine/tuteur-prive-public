import React, { useState, useEffect } from 'react';
import { Trophy, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { HistoryEntry } from '../lib/types';

interface TotalScoreProps {
  history: HistoryEntry[];
}

export function TotalScore({ history }: TotalScoreProps) {
  const [score, setScore] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (!Array.isArray(history)) return;

    let totalPoints = 0;

    history.forEach(entry => {
      // QCM questions (1 point each)
      if ('qcm_questions' in entry.data && Array.isArray(entry.data.qcm_questions)) {
        entry.data.qcm_questions.forEach(q => {
          if (q.userAnswer === q.correctAnswer) {
            totalPoints += 1;
          }
        });
      }

      // Vocabulary QCM questions (1 point each)
      if ('vocabulary_qcm_questions' in entry.data && Array.isArray(entry.data.vocabulary_qcm_questions)) {
        entry.data.vocabulary_qcm_questions.forEach(q => {
          if (q.userAnswer === q.correctAnswer) {
            totalPoints += 1;
          }
        });
      }

      // Understanding questions (3 points each)
      if ('understanding_questions' in entry.data && Array.isArray(entry.data.understanding_questions)) {
        entry.data.understanding_questions.forEach(q => {
          if (q.feedback?.isCorrect) {
            totalPoints += 3;
          }
        });
      }
    });

    setScore(totalPoints);
  }, [history]);

  return (
    <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg p-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8" />
          <div>
            <h2 className="text-xl font-semibold">{t('stats.totalScore.title')}</h2>
            <p className="text-white/80 text-sm">{t('stats.totalScore.pointsExplanation')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6" />
          <span className="text-3xl font-bold">{score}</span>
          <span className="text-lg">{t('stats.totalScore.points')}</span>
        </div>
      </div>
    </div>
  );
}