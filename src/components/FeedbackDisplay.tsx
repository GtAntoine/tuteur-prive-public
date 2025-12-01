import React from 'react';
import { SubjectBadge } from './SubjectBadge';
import { SubjectSelector } from './history/SubjectSelector';
import { updateHistoryEntry } from '../lib/utils/history';
import { getSubjectFromData } from '../lib/utils/subject';
import { LessonDisplay } from './lesson/LessonDisplay';
import { CorrectionDisplay } from './correction/CorrectionDisplay';
import { GuidedDisplay } from './guided/GuidedDisplay';
import type { 
  CorrectionResponse, 
  GuidedExerciseResponse, 
  LessonResponse, 
  SubjectId 
} from '../types';

interface FeedbackDisplayProps {
  data: any;
  type: 'lesson' | 'correction' | 'guided';
  mode?: 'lesson' | 'history' | 'shared';
  historyId?: string;
  onQCMAnswer?: (index: number, answer: string, type: 'quiz' | 'vocabulary') => void;
  onUnderstandingAnswer?: (index: number, answer: string, feedback?: any) => void;
  onReset?: (type?: 'quiz' | 'vocabulary' | 'understanding') => void;
}

export function FeedbackDisplay({ 
  data, 
  type = 'lesson',
  historyId, 
  mode = 'lesson',
  onQCMAnswer,
  onUnderstandingAnswer,
  onReset
}: FeedbackDisplayProps) {
  const [localData, setLocalData] = React.useState(data);
  const [isEditingSubject, setIsEditingSubject] = React.useState(false);

  if (!localData) return null;

  const subject = getSubjectFromData(localData);

  const handleSubjectChange = async (newSubject: SubjectId) => {
    if (!historyId || !localData) return;
    
    const updatedData = { 
      ...localData,
      subject: newSubject,
      ...(type === 'lesson' && {
        lesson_analysis: {
          ...localData.lesson_analysis,
          subject: newSubject
        }
      }),
      ...(type === 'guided' && {
        exercise_analysis: {
          ...localData.exercise_analysis,
          subject: newSubject
        }
      })
    };

    try {
      await updateHistoryEntry(historyId, updatedData);
      setLocalData(updatedData);
      setIsEditingSubject(false);
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {subject && mode === 'history' && (
        <div className="mb-4">
          <SubjectBadge 
            subject={subject}
            onEdit={() => setIsEditingSubject(true)}
          />
        </div>
      )}

      {isEditingSubject && (
        <SubjectSelector
          currentSubject={subject}
          onSelect={handleSubjectChange}
          onCancel={() => setIsEditingSubject(false)}
        />
      )}

      <FeedbackContent 
        data={localData} 
        type={type}
        historyId={historyId} 
        mode={mode}
        onQCMAnswer={onQCMAnswer}
        onReset={onReset}
      />
    </div>
  );
}

function FeedbackContent({ 
  data, 
  type,
  historyId, 
  mode,
  onQCMAnswer,
  onReset
}: { 
  data: CorrectionResponse | GuidedExerciseResponse | LessonResponse;
  type: 'lesson' | 'correction' | 'guided';
  historyId?: string;
  mode: 'lesson' | 'history' | 'shared';
  onQCMAnswer?: (index: number, answer: string, type: 'quiz' | 'vocabulary') => void;
  onReset?: (type?: 'quiz' | 'vocabulary' | 'understanding') => void;
}) {
  switch (type) {
    case 'lesson':
      return (
        <LessonDisplay 
          data={data as LessonResponse} 
          historyId={historyId} 
          mode={mode}
          onQCMAnswer={onQCMAnswer}
          onReset={onReset}
        />
      );
    case 'correction':
      return (
        <CorrectionDisplay 
          data={data as CorrectionResponse} 
          historyId={historyId} 
        />
      );
    case 'guided':
      return (
        <GuidedDisplay 
          data={data as GuidedExerciseResponse} 
          historyId={historyId} 
        />
      );
    default:
      return null;
  }
}