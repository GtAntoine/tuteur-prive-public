// src/components/shared/SharedContentDisplay.tsx
import React from 'react';
import { FeedbackDisplay } from '../FeedbackDisplay';
import { useSharedContent } from '../../hooks/useSharedContent';
import type { HistoryEntry } from '../../types';

interface SharedContentDisplayProps {
  entry: HistoryEntry;
}

export function SharedContentDisplay({ entry }: SharedContentDisplayProps) {
  const {
    qcmAnswers,
    vocabularyAnswers,
    understandingAnswers,
    handleQCMAnswer,
    handleUnderstandingAnswer,
    resetAnswers
  } = useSharedContent();

  // Create a copy of the entry data with local answers
  const localData = React.useMemo(() => {
    const data = { ...entry.data };
    
    if ('qcm_questions' in data) {
      data.qcm_questions = data.qcm_questions.map((q: any, i: number) => ({
        ...q,
        userAnswer: qcmAnswers[i]
      }));
    }

    if ('vocabulary_qcm_questions' in data) {
      data.vocabulary_qcm_questions = data.vocabulary_qcm_questions.map((q: any, i: number) => ({
        ...q,
        userAnswer: vocabularyAnswers[i]
      }));
    }

    if ('understanding_questions' in data) {
      data.understanding_questions = data.understanding_questions.map((q: any, i: number) => ({
        ...q,
        userAnswer: understandingAnswers[i]?.answer,
        feedback: understandingAnswers[i]?.feedback
      }));
    }

    return data;
  }, [entry.data, qcmAnswers, vocabularyAnswers, understandingAnswers]);

  return (
    <FeedbackDisplay
      data={localData}
      type={entry.type}
      mode="shared"
      onQCMAnswer={handleQCMAnswer}
      onUnderstandingAnswer={handleUnderstandingAnswer}
      onReset={resetAnswers}
    />
  );
}
