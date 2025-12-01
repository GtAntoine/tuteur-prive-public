import React, { useEffect } from 'react';
import { Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';

interface QuizScoreProps {
  score: number;
  total: number;
}

export function QuizScore({ score, total }: QuizScoreProps) {
  const { t } = useTranslation();
  const percentage = (score / total) * 100;
  
  useEffect(() => {
    if (percentage >= 70) {
      const intensity = percentage >= 90 ? 2 : 1;
      
      for (let i = 0; i < intensity; i++) {
        setTimeout(() => {
          confetti({
            particleCount: percentage >= 90 ? 150 : 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }, i * 600);
      }
    }
  }, [percentage]);

  const getMessage = () => {
    if (percentage >= 90) return t('lesson.quiz.score.excellent');
    if (percentage >= 70) return t('lesson.quiz.score.good');
    if (percentage >= 50) return t('lesson.quiz.score.average');
    return t('lesson.quiz.score.needsWork');
  };

  return (
    <div className={`text-center p-6 rounded-lg ${
      percentage >= 90 ? 'bg-green-50' :
      percentage >= 70 ? 'bg-blue-50' :
      percentage >= 50 ? 'bg-yellow-50' :
      'bg-red-50'
    }`}>
      <Trophy className={`w-12 h-12 mx-auto mb-3 ${
        percentage >= 90 ? 'text-green-500' :
        percentage >= 70 ? 'text-blue-500' :
        percentage >= 50 ? 'text-yellow-500' :
        'text-red-500'
      }`} />
      <h4 className="text-xl font-bold mb-2">
        {t('lesson.quiz.score.title')}  {score}/{total}
       
      {/*   Score final : {score}/{total}
      {t('lesson.quiz.score.title', { score, total })} */}
      </h4>
      <p className={`text-lg ${
        percentage >= 90 ? 'text-green-700' :
        percentage >= 70 ? 'text-blue-700' :
        percentage >= 50 ? 'text-yellow-700' :
        'text-red-700'
      }`}>
        {getMessage()}
      </p>
    </div>
  );
}