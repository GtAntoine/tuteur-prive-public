import React, { useState, useEffect } from 'react';
import { CheckSquare, RotateCcw, BookText } from 'lucide-react';
import { QCMQuestion } from './QCMQuestion';
import { QuizScore } from './QuizScore';
import { useTranslation } from 'react-i18next';
import type { QCMQuestion as QCMQuestionType } from '../../lib/types';

interface QCMSectionProps {
  questions: QCMQuestionType[];
  historyId?: string;
  onAnswerChange: (index: number, answer: string) => void;
  onReset: () => void;
  type?: 'quiz' | 'vocabulary';
  mode?: 'lesson' | 'history' | 'shared';
}

export function QCMSection({ 
  questions, 
  historyId, 
  onAnswerChange, 
  onReset, 
  type = 'quiz',
  mode = 'lesson'
}: QCMSectionProps) {
  const [resetKey, setResetKey] = useState(0);
  const { t } = useTranslation();

  // Initialize answered questions based on history data
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(() => {
    return new Set(questions
      .map((q, index) => q.userAnswer ? index : -1)
      .filter(i => i !== -1)
    );
  });

  // Calculate score
  const score = questions.reduce((acc, q) => ({
    correct: acc.correct + (q.userAnswer === q.correctAnswer ? 1 : 0),
    total: acc.total
  }), { correct: 0, total: questions.length });

  // Show score section if there are any answered questions in history or new answers
  const showScoreSection = answeredQuestions.size > 0 || questions.some(q => q.userAnswer);

  const handleQuestionAnswer = (index: number, answer: string) => {
    onAnswerChange(index, answer);
    setAnsweredQuestions(prev => new Set([...prev, index]));
  };

  const handleReset = () => {
    setAnsweredQuestions(new Set());
    setResetKey(prev => prev + 1);
    onReset();
  };

  const bgColor = type === 'vocabulary' ? 'bg-teal-50' : 'bg-indigo-50';
  const Icon = type === 'vocabulary' ? BookText : CheckSquare;
  const iconColor = type === 'vocabulary' ? 'text-teal-600' : 'text-indigo-600';
  const titleColor = type === 'vocabulary' ? 'text-teal-800' : 'text-indigo-800';
  const buttonBgColor = type === 'vocabulary' 
    ? 'bg-teal-100 hover:bg-teal-200 text-teal-700' 
    : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700';

  return (
    <div className={`${bgColor} rounded-lg p-3 md:p-6`}>
      <div className="flex items-center gap-2 mb-4">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <h3 className={`text-xl font-semibold ${titleColor}`}>
          {type === 'vocabulary' ? t('lesson.tabs.vocabularyQuiz') : t('lesson.tabs.quiz')}
        </h3>
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <QCMQuestion
            key={`${index}-${resetKey}`}
            number={index + 1}
            {...question}
            historyId={historyId}
            savedAnswer={question.userAnswer}
            onAnswerChange={(answer) => handleQuestionAnswer(index, answer)}
            type={type}
            mode={mode}
          />
        ))}
      </div>

      {showScoreSection && (
        <div className="mt-6 space-y-4 animate-pop">
          <QuizScore 
            score={score.correct}
            total={score.total}
          />
          
          <button
            onClick={handleReset}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 ${buttonBgColor} rounded-lg transition-colors`}
          >
            <RotateCcw className="w-5 h-5" />
            {t('lesson.quiz.resetQuiz')}
          </button>
        </div>
      )}
    </div>
  );
}