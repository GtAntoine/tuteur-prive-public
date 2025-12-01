import React, { useRef, useState, useEffect } from 'react';
import { Send, Mic, Lightbulb } from 'lucide-react';
import { useAudioRecording } from '../../../hooks/useAudioRecording';
import { validateAnswer } from '../../../lib/openai/answer-validation';
import { QuestionHeader } from './QuestionHeader';
import { QuestionFeedback } from './QuestionFeedback';
import { RecordingModal } from '../../common/RecordingModal';
import { ErrorMessage } from '../../common/ErrorMessage';
import { useTranslation } from 'react-i18next';

interface QuestionAnswerProps {
  question: string;
  topic: string;
  hint: string;
  answer: string;
  number: number;
  userAnswer?: string;
  feedback?: {
    isCorrect: boolean;
    explanation: string;
    suggestions?: string[];
  };
  onAnswered?: (answer: string, feedback: {
    isCorrect: boolean;
    explanation: string;
    suggestions?: string[];
  }) => void;
  mode?: 'lesson' | 'history' | 'shared';
}

export function QuestionAnswer({ 
  question, 
  topic, 
  hint, 
  answer,
  number,
  userAnswer: savedAnswer,
  feedback: savedFeedback,
  onAnswered,
  mode = 'lesson'
}: QuestionAnswerProps) {
  const [userAnswer, setUserAnswer] = useState(savedAnswer || '');
  const [feedback, setFeedback] = useState(savedFeedback || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const submitButtonRef = useRef<any>();
  const { t } = useTranslation();

  const {
    isRecording,
    startRecording,
    stopRecording,
    cancelRecording,
    error: audioError,
    audioLevel
  } = useAudioRecording();

  useEffect(() => {
    if (savedAnswer) {
      setUserAnswer(savedAnswer);
    }
    if (savedFeedback) {
      setFeedback(savedFeedback);
    }
  }, [savedAnswer, savedFeedback]);

  useEffect(() => {
    if (audioError) {
      setRecordingError(audioError);
      setShowRecordingModal(false);
    }
  }, [audioError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (mode === 'shared') {
        // In shared mode, validate directly without saving
        const response = await validateAnswer(question, userAnswer, answer);
        const feedbackData = JSON.parse(response);
        setFeedback(feedbackData);
        onAnswered?.(userAnswer, feedbackData);
      } else {
        // Normal mode with history saving
        const response = await validateAnswer(question, userAnswer, answer);
        const feedbackData = JSON.parse(response);
        setFeedback(feedbackData);
        onAnswered?.(userAnswer, feedbackData);
      }
    } catch (error) {
      console.error('Error validating answer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartRecording = async () => {
    try {
      setRecordingError(null);
      await startRecording();
      setShowRecordingModal(true);
    } catch (error) {
      setRecordingError(error instanceof Error ? error.message : 'Erreur lors de l\'accès au microphone');
    }
  };

  const handleRestartRecording = async () => {
    try {
      // Arrêter proprement l'enregistrement actuel
      await cancelRecording(); 
      
      // Réinitialiser les états
      setProgress(0);
      setIsProcessingAudio(false);
      setRecordingError(null);
      
      // Attendre un court instant pour s'assurer que tout est bien arrêté
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Démarrer un nouvel enregistrement
      await startRecording();
    } catch (error) {
      setRecordingError(error instanceof Error ? error.message : 'Erreur lors du redémarrage de l\'enregistrement');
      setShowRecordingModal(false);
      setIsProcessingAudio(false);
    }
  };

  // Add this to your component:
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;
    const DURATION = 30000; // 30 secondes en ms

    const updateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const newProgress = Math.min(100, Math.round((elapsed / DURATION) * 100));
      
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        handleStopRecording();
        return;
      }
      
      if (isRecording) {
        animationFrame = requestAnimationFrame(updateProgress);
      }
    };

    if (isRecording) {
      startTime = null;
      setProgress(0);
      animationFrame = requestAnimationFrame(updateProgress);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isRecording]);

  const handleStopRecording = async () => {
    setIsProcessingAudio(true);
    try {
      const transcription = await stopRecording();
      if (transcription) {
        setUserAnswer(transcription);
        // Valider automatiquement après la transcription
        await new Promise(resolve => setTimeout(resolve, 300));
        // Soumettre le formulaire
        await handleSubmit(new Event('submit') as any);
        // Fermer la modale seulement après la soumission complète
        setShowRecordingModal(false);
      }
    } catch (error) {
      setRecordingError('Erreur lors de la transcription audio. Veuillez réessayer.');
      setShowRecordingModal(false);
    } finally {
      setIsProcessingAudio(false);
    }
  };

  const handleCancelRecording = async () => {
    await cancelRecording();
    setShowRecordingModal(false);
  };

  return (
    <div className="bg-white rounded-lg p-3 md:p-6 shadow-sm">
      <QuestionHeader topic={topic} number={number} />
      <p className="font-medium text-gray-800 mb-4">{question}</p>
      
      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder={t('lesson.questions.writeAnswer')}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[120px] 
              ${feedback ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            disabled={!!feedback} 
          />
          {!feedback && (
            <button
              type="button"
              onClick={handleStartRecording}
              className="absolute bottom-3 right-3 p-2 text-gray-500 hover:text-purple-500 transition-colors"
            >
              <Mic className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          {!feedback && (
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
            >
              <Lightbulb className="w-4 h-4" />
              {showHint ? t('lesson.questions.hideHint') : t('lesson.questions.showHint')}
            </button>
          )}
          
          {!feedback && (
            <button
              onClick={handleSubmit}
              ref={submitButtonRef}
              disabled={!userAnswer.trim() || isSubmitting}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 
                disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 
                transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? t('lesson.questions.validating') : t('lesson.questions.validate')}
            </button>
          )}
        </div>
      </div>

      <QuestionFeedback 
        hint={hint} 
        feedback={feedback}
        showHint={showHint}
      />
      
      {recordingError && (
        <div className="mt-4">
          <ErrorMessage message={recordingError} />
        </div>
      )}

      <RecordingModal
        isOpen={showRecordingModal}
        onClose={handleCancelRecording}
        onConfirm={handleStopRecording}
        onRestart={handleRestartRecording}
        isRecording={isRecording}
        isProcessing={isProcessingAudio}
        audioLevel={audioLevel}
        progress={progress}
      />
    </div>
  );
}