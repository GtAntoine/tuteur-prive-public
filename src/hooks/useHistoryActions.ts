import { useState } from 'react';
import { updateHistoryEntry } from '../lib/utils/history';
import type { HistoryEntry } from '../lib/types';

export function useHistoryActions(
  entry: HistoryEntry | null,
  id: string | undefined,
  setEntry: (entry: HistoryEntry | null) => void,
  setIsUpdating: (isUpdating: boolean) => void
) {
  const handleTitleSave = async (newTitle: string) => {
    if (!entry || !id) return;
    
    setIsUpdating(true);
    try {
      const updatedData = { 
        ...entry.data,
        lesson_analysis: {
          ...entry.data.lesson_analysis,
          title: newTitle
        }
      };
      
      await updateHistoryEntry(id, updatedData);
      setEntry(prev => prev ? { ...prev, data: updatedData } : null);
    } catch (error) {
      console.error('Error updating title:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSubjectChange = async (newSubject: string) => {
    if (!entry || !id) return;
    
    setIsUpdating(true);
    try {
      const updatedData = { 
        ...entry.data,
        subject: newSubject,
        lesson_analysis: entry.data.lesson_analysis ? {
          ...entry.data.lesson_analysis,
          subject: newSubject
        } : undefined,
        exercise_analysis: entry.data.exercise_analysis ? {
          ...entry.data.exercise_analysis,
          subject: newSubject
        } : undefined
      };
      
      await updateHistoryEntry(id, updatedData);
      setEntry(prev => prev ? { ...prev, data: updatedData } : null);
    } catch (error) {
      console.error('Error updating subject:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleQCMAnswer = async (index: number, answer: string, type: 'quiz' | 'vocabulary') => {
    if (!entry || !id) return;

    try {
      const updatedData = { ...entry.data };
      if (type === 'vocabulary') {
        updatedData.vocabulary_qcm_questions[index].userAnswer = answer;
      } else {
        updatedData.qcm_questions[index].userAnswer = answer;
      }
      
      await updateHistoryEntry(id, updatedData);
      setEntry(prev => prev ? { ...prev, data: updatedData } : null);
    } catch (error) {
      console.error('Error updating answer:', error);
    }
  };

  const handleReset = async (type?: 'quiz' | 'vocabulary' | 'understanding') => {
    if (!entry || !id) return;

    try {
      const updatedData = { ...entry.data };
      
      if (!type || type === 'quiz') {
        updatedData.qcm_questions = updatedData.qcm_questions.map(q => {
          const { userAnswer, ...rest } = q;
          return rest;
        });
      }
      
      if (!type || type === 'vocabulary') {
        updatedData.vocabulary_qcm_questions = updatedData.vocabulary_qcm_questions.map(q => {
          const { userAnswer, ...rest } = q;
          return rest;
        });
      }
      
      if (!type || type === 'understanding') {
        updatedData.understanding_questions = updatedData.understanding_questions.map(q => {
          const { userAnswer, feedback, ...rest } = q;
          return rest;
        });
      }
      
      await updateHistoryEntry(id, updatedData);
      setEntry(prev => prev ? { ...prev, data: updatedData } : null);
    } catch (error) {
      console.error('Error resetting answers:', error);
    }
  };

  return {
    handleTitleSave,
    handleSubjectChange,
    handleQCMAnswer,
    handleReset
  };
}