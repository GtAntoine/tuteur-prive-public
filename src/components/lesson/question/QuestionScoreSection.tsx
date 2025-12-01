import React from 'react';
import { RotateCcw } from 'lucide-react';
import { QuizScore } from '../QuizScore';
import { CompleteLessonButton } from '../CompleteLessonButton';
import { useTranslation } from 'react-i18next';
import type { UnderstandingQuestion } from '../../../lib/types';

interface QuestionScoreSectionProps {
  questions: UnderstandingQuestion[];
  onReset: () => void;
  onComplete: () => void;
}

export function QuestionScoreSection({ questions, onReset, onComplete }: QuestionScoreSectionProps) {
  const { t } = useTranslation();
  
  const score = questions.reduce(
    (acc, q) => ({
      correct: acc.correct + (q.feedback?.isCorrect ? 1 : 0),
      total: acc.total + 1
    }),
    { correct: 0, total: questions.length }
  );

  return (
    <div className="mt-6 space-y-4 animate-pop">
      <QuizScore score={score.correct} total={score.total} />
      
      <div className="flex flex-col gap-3">
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 
            bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          {t('lesson.questions.resetQuestions')}
        </button>

        <CompleteLessonButton onClick={onComplete} />
      </div>
    </div>
  );
}