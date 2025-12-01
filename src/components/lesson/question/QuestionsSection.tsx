import React, { useState, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';
import { QuestionAnswer } from './QuestionAnswer';
import { QuestionScoreSection } from './QuestionScoreSection';
import { getHistoryEntry, updateHistoryEntry } from '../../../lib/utils/history';
import { useTranslation } from 'react-i18next';
import type { UnderstandingQuestion, LessonResponse } from '../../../lib/types';

interface QuestionsSectionProps {
  questions: UnderstandingQuestion[];
  historyId?: string;
  onComplete?: () => void;
  mode?: 'lesson' | 'history' | 'shared';
}

export function QuestionsSection({
    questions: initialQuestions,
    historyId,
    onComplete,
    mode
  }: QuestionsSectionProps) {
  const [questions, setQuestions] = useState<UnderstandingQuestion[]>(initialQuestions);
  const [resetKey, setResetKey] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    async function loadSavedQuestions() {
      if (!historyId) return;

      try {
        const entry = await getHistoryEntry(historyId);
        if (entry && 'understanding_questions' in entry.data) {
          const savedQuestions = (entry.data as LessonResponse).understanding_questions;
          const mergedQuestions = initialQuestions.map((q, index) => ({
            ...q,
            userAnswer: savedQuestions[index]?.userAnswer,
            feedback: savedQuestions[index]?.feedback
          }));
          setQuestions(mergedQuestions);
        }
      } catch (error) {
        console.error('Error loading saved questions:', error);
      }
    }

    loadSavedQuestions();
  }, [historyId, initialQuestions]);

  const handleQuestionAnswered = async (index: number, answer: string, feedback: {
    isCorrect: boolean;
    explanation: string;
    suggestions?: string[];
  }) => {
    if (!historyId && mode !== 'shared') return;

    try {
      const updatedQuestions = questions.map((q, i) => 
        i === index ? { 
          ...q, 
          userAnswer: answer, 
          feedback 
        } : q
      );
      setQuestions(updatedQuestions);

      if (historyId) {
        const entry = await getHistoryEntry(historyId);
        if (!entry) return;

        const updatedData = {
          ...entry.data,
          understanding_questions: updatedQuestions
        };

        await updateHistoryEntry(historyId, updatedData);
      }
    } catch (error) {
      console.error('Error saving question answer:', error);
    }
  };

  const handleReset = async () => {
    if (!historyId && mode !== 'shared') return;

    try {
      // Reset questions state by removing user answers and feedback
      const resetQuestions = questions.map(q => {
        const { userAnswer, feedback, ...rest } = q;
        return rest;
      });
      
      setQuestions(resetQuestions);
      setResetKey(prev => prev + 1);

      // Only update history if we're not in shared mode
      if (mode !== 'shared' && historyId) {
        const entry = await getHistoryEntry(historyId);
        if (!entry) return;

        const updatedData = {
          ...entry.data,
          understanding_questions: resetQuestions
        };

        await updateHistoryEntry(historyId, updatedData);
      }
    } catch (error) {
      console.error('Error resetting questions:', error);
    }
  };

  const hasAnsweredQuestions = questions.some(q => q.userAnswer);

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 rounded-lg p-3 md:p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-orange-800">{t('lesson.questions.title')}</h2>
        </div>

        <div className="space-y-6">
          {questions.map((q, index) => (
            <QuestionAnswer 
              key={`${index}-${q.question}-${resetKey}`}
              {...q}
              number={index + 1}
              onAnswered={(answer, feedback) => handleQuestionAnswered(index, answer, feedback)}
              mode={mode}
            />
          ))}
        </div>

        {hasAnsweredQuestions && (
          <QuestionScoreSection 
            questions={questions}
            onReset={handleReset}
            onComplete={onComplete || (() => {})}
          />
        )}
      </div>
    </div>
  );
}