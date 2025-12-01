import React from 'react';
import { LessonSummary } from './LessonSummary';
import { VocabularySection } from './VocabularySection';
import { QCMSection } from './QCMSection';
import { QuestionsSection } from './question/QuestionsSection';
import type { LessonResponse } from '../../lib/types';

interface LessonContentProps {
  activeTab: 'summary' | 'vocabulary' | 'vocabulary-qcm' | 'quiz' | 'questions';
  data: LessonResponse;
  mode?: 'lesson' | 'history';
  historyId?: string;
  onQCMAnswer: (index: number, answer: string, type?: 'quiz' | 'vocabulary') => void;
  onQCMReset: (type?: 'quiz' | 'vocabulary') => void;
   onComplete?: () => void;
}

export function LessonContent({ 
  activeTab, 
  data,
  mode,
  historyId,
  onQCMAnswer,
  onQCMReset,
  onComplete 
}: LessonContentProps) {
  // Early return if data is not valid
  if (!data || !data.summary) {
    return null;
  }

  switch (activeTab) {
    case 'summary':
      return (
        <div className="animate-pop">
          <LessonSummary 
            data={data.summary}
            title={data.lesson_analysis?.title || 'Leçon'}
            mode={mode}
            difficulty={data.lesson_analysis?.difficulty_level || 'moyen'}
            topics={data.lesson_analysis?.main_topics || []}
          />
        </div>
      );
    
    case 'vocabulary':
      return (
        <div className="animate-pop">
          <VocabularySection vocabulary={data.summary.vocabulary || []} />
        </div>
      );
    
    case 'vocabulary-qcm':
      return (
        <div className="animate-pop">
          <QCMSection 
            questions={data.vocabulary_qcm_questions || []}
            historyId={historyId}
            onAnswerChange={(index, answer) => onQCMAnswer(index, answer, 'vocabulary')}
            onReset={() => onQCMReset('vocabulary')}
            type="vocabulary"
          />
        </div>
      );
    
    case 'quiz':
      return (
        <div className="animate-pop">
          <QCMSection 
            questions={data.qcm_questions || []}
            historyId={historyId}
            onAnswerChange={(index, answer) => onQCMAnswer(index, answer, 'quiz')}
            onReset={() => onQCMReset('quiz')}
            type="quiz"
          />
        </div>
      );
    
    case 'questions':
      return (
        <div className="animate-pop">
          <QuestionsSection 
            questions={data.understanding_questions || []}
            historyId={historyId}
           onComplete={onComplete} 
           mode={mode}
          />
        </div>
      );
    
    default:
      return null;
  }
}
