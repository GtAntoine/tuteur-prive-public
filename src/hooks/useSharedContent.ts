// src/hooks/useSharedContent.ts
import { useState } from 'react';
import type { QCMQuestion, UnderstandingQuestion } from '../types';

export function useSharedContent() {
  const [qcmAnswers, setQcmAnswers] = useState<Record<number, string>>({});
  const [vocabularyAnswers, setVocabularyAnswers] = useState<Record<number, string>>({});
  const [understandingAnswers, setUnderstandingAnswers] = useState<Record<number, {
    answer: string;
    feedback?: {
      isCorrect: boolean;
      explanation: string;
      suggestions?: string[];
    };
  }>>({});

  const handleQCMAnswer = (index: number, answer: string, type: 'quiz' | 'vocabulary') => {
    if (type === 'vocabulary') {
      setVocabularyAnswers(prev => ({ ...prev, [index]: answer }));
    } else {
      setQcmAnswers(prev => ({ ...prev, [index]: answer }));
    }
  };

  const handleUnderstandingAnswer = (index: number, answer: string, feedback?: {
    isCorrect: boolean;
    explanation: string;
    suggestions?: string[];
  }) => {
    setUnderstandingAnswers(prev => ({
      ...prev,
      [index]: { answer, feedback }
    }));
  };

  const resetAnswers = (type?: 'quiz' | 'vocabulary' | 'understanding') => {
    if (!type || type === 'quiz') setQcmAnswers({});
    if (!type || type === 'vocabulary') setVocabularyAnswers({});
    if (!type || type === 'understanding') setUnderstandingAnswers({});
  };

  return {
    qcmAnswers,
    vocabularyAnswers,
    understandingAnswers,
    handleQCMAnswer,
    handleUnderstandingAnswer,
    resetAnswers
  };
}
