import { useState } from 'react';
import { analyzeLessonContent, analyzeExerciseCorrection, provideGuidedHelp } from '../lib/openai/analysis';
import { processFiles } from '../lib/utils/file-processing';
import { extractAndParseJSON } from '../lib/utils/json-parser';
import { saveToHistory } from '../lib/utils/history';
import { useTokens } from './useTokens';
import { useTranslation } from 'react-i18next';
import { useProfileStore } from '../lib/stores/profile-store';
import type { LessonResponse, CorrectionResponse, GuidedExerciseResponse } from '../lib/types';

export function useLessonAnalysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<LessonResponse | CorrectionResponse | GuidedExerciseResponse | null>(null);
  const [feedbackId, setFeedbackId] = useState<string | null>(null);
  const { tokens, updateTokens, loadTokens } = useTokens();
  const { i18n } = useTranslation();
  const { currentProfile } = useProfileStore();

  const resetAnalysis = () => {
    setFeedback(null);
    setFeedbackId(null);
    setError(null);
  };

  const handleAnalysis = async (files: File[], mode: 'lesson' | 'correction' | 'guided') => {
    if (!tokens || tokens.tokens_remaining <= 0) {
      setError('Vous n\'avez plus de jetons disponibles. Revenez demain pour en obtenir de nouveaux.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { files: processedFiles, originalFiles } = await processFiles(files);
      const currentLang = i18n.language || 'fr';
      const studentGrade = currentProfile?.grade || 'CM1';
      
      let result = '';
      switch (mode) {
        case 'correction': {
          result = await analyzeExerciseCorrection('', processedFiles, currentLang, studentGrade);
          const correctionData = extractAndParseJSON<CorrectionResponse>(result);
          if (correctionData) {
            setFeedback(correctionData);
            const id = await saveToHistory(mode, originalFiles, correctionData);
            setFeedbackId(id);
            await updateTokens();
            // Add delay before refreshing token count
            setTimeout(async () => {
              await loadTokens();
            }, 1000);
          } else {
            throw new Error('Désolé il y a eu une erreur lors de l\'analyse.');
          }
          break;
        }
        case 'guided': {
          result = await provideGuidedHelp('', processedFiles, currentLang, studentGrade);
          const guidedData = extractAndParseJSON<GuidedExerciseResponse>(result);
          if (guidedData) {
            setFeedback(guidedData);
            const id = await saveToHistory(mode, originalFiles, guidedData);
            setFeedbackId(id);
            await updateTokens();
            // Add delay before refreshing token count
            setTimeout(async () => {
              await loadTokens();
            }, 1000);
          } else {
            throw new Error('Désolé il y a eu une erreur lors de l\'analyse.');
          }
          break;
        }
        case 'lesson': {
          result = await analyzeLessonContent('', processedFiles, currentLang, studentGrade);
          const lessonData = extractAndParseJSON<LessonResponse>(result);
          if (lessonData) {
            setFeedback(lessonData);
            const id = await saveToHistory(mode, originalFiles, lessonData);
            setFeedbackId(id);
            await updateTokens();
            // Add delay before refreshing token count
            setTimeout(async () => {
              await loadTokens();
            }, 1000);
          } else {
            throw new Error('Désolé il y a eu une erreur lors de l\'analyse.');
          }
          break;
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'analyse:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue. Veuillez réessayer plus tard.');
      setFeedback(null);
      setFeedbackId(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    feedback,
    feedbackId,
    handleAnalysis,
    resetAnalysis
  };
}