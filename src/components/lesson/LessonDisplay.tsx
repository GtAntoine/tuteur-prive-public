import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LessonTabs } from './LessonTabs';
import { LessonContent } from './LessonContent';
import { NextButton } from './NextButton';
import { updateHistoryEntry } from '../../lib/utils/history';
import type { LessonResponse } from '../../lib/types';
import { scrollToElement } from '../../lib/utils/scroll';

interface LessonDisplayProps {
  data: LessonResponse;
  historyId?: string;
  mode?: 'lesson' | 'history';
}

export function LessonDisplay({ data, historyId, mode = 'lesson' }: LessonDisplayProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'summary' | 'vocabulary' | 'vocabulary-qcm' | 'quiz' | 'questions'>('summary');
  const [localData, setLocalData] = useState(data);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    
     // Use a consistent header offset for all modes
    const headerOffset = 80; // Height of the fixed header
    scrollToElement(contentRef.current, headerOffset);
  };

  const handleNextTab = () => {
    const tabOrder = ['summary', 'vocabulary', 'vocabulary-qcm', 'quiz', 'questions'] as const;
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      handleTabChange(tabOrder[currentIndex + 1]);
    }
  };

  const handleQCMAnswer = async (index: number, answer: string, type: 'quiz' | 'vocabulary' = 'quiz') => {
  // Créer une copie locale des données
    const updatedData = { ...localData };

    // Mettre à jour la réponse dans la copie locale
    if (type === 'vocabulary') {
      updatedData.vocabulary_qcm_questions[index].userAnswer = answer;
    } else {
      updatedData.qcm_questions[index].userAnswer = answer;
    }

      // Mettre à jour l'état local immédiatement
      setLocalData(updatedData);

      // Si nous sommes en mode historique et que nous avons un historyId, sauvegarder dans la base de données
        if (mode === 'history' && historyId) {
          try {
            await updateHistoryEntry(historyId, updatedData);
          } catch (error) {
            console.error('Error updating history:', error);
            // Optionnel : gérer l'erreur (par exemple, revenir à l'état précédent)
          }
        }

  };

const handleQCMReset = async (type: 'quiz' | 'vocabulary' = 'quiz') => {
  // Créer une copie locale des données
  const updatedData = { ...localData };

  // Réinitialiser les réponses dans la copie locale
  if (type === 'vocabulary') {
    updatedData.vocabulary_qcm_questions = updatedData.vocabulary_qcm_questions.map(q => {
      const { userAnswer, ...rest } = q;
      return rest;
    });
  } else {
    updatedData.qcm_questions = updatedData.qcm_questions.map(q => {
      const { userAnswer, ...rest } = q;
      return rest;
    });
  }

  // Mettre à jour l'état local immédiatement
  setLocalData(updatedData);

  // Si nous sommes en mode historique et que nous avons un historyId, sauvegarder dans la base de données
  if (mode === 'history' && historyId) {
    try {
      await updateHistoryEntry(historyId, updatedData);
    } catch (error) {
      console.error('Error updating history:', error);
    }
  }
};

  const handleComplete = () => {
    if (mode === 'lesson') {
      navigate('/app');
    }
  };

  return (
    <div className="relative">
      <div className="sticky top-0 z-10 bg-gray-50 pt-2 md:pt-4 md:pb-2 px-2 md:px-4 -mx-2 md:mx-4 shadow-md rounded-lg">
        <LessonTabs activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      <div ref={contentRef} className="pt-6">
        <div className="transition-all duration-300 transform">
          <LessonContent 
            activeTab={activeTab}
            data={localData}
            mode={mode}
            historyId={historyId}
            onQCMAnswer={handleQCMAnswer}
            onQCMReset={handleQCMReset}
            onComplete={handleComplete}
          />
        </div>

        {activeTab !== 'questions' && (
          <NextButton onClick={handleNextTab} />
        )}
      </div>
    </div>
  );
}