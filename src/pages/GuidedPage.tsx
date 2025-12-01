import React, { useState, useRef } from 'react';
import { HelpCircle, RotateCcw } from 'lucide-react';
import { GuidedExercises } from '../components/GuidedExercises';
import { FeedbackDisplay } from '../components/FeedbackDisplay';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorHandling } from '../components/common/ErrorHandling';
import { useLessonAnalysis } from '../hooks/useLessonAnalysis';
import { BackButton } from '../components/common/BackButton';
import { TokenDisplay } from '../components/common/TokenDisplay';
import { useTranslation } from 'react-i18next';

export function GuidedPage() {
  const [showInput, setShowInput] = useState(true);
  const topRef = useRef<HTMLDivElement>(null);
  const { isLoading, error, feedback, feedbackId, handleAnalysis } = useLessonAnalysis();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { t } = useTranslation();

  const handleSubmit = (files: File[]) => {
    setShowInput(false);
    setUploadedFiles(files);
    handleAnalysis(files, 'guided');
  };

  const handleNewExercise = () => {
    setShowInput(true);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleRetry = () => {
    if (uploadedFiles.length) {
      handleAnalysis(uploadedFiles, 'guided');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div ref={topRef} className="flex items-center justify-between">
        <BackButton 
          showConfirm={!!feedback} 
          type="guided"
        />

        <div className="flex items-center gap-4">
          <TokenDisplay />
          {feedback && (
            <button
              onClick={handleNewExercise}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                text-white rounded-full transition-all duration-300 hover:scale-105 group relative overflow-hidden"
            >
              <RotateCcw className="w-5 h-5" />
              <span>{t('modes.guided.newExercise')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                animate-shimmer opacity-0 group-hover:opacity-100" 
                style={{ backgroundSize: '200% 100%' }}
              />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
          <HelpCircle className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">{t('modes.guided.title')}</h1>
      </div>

      {showInput && (
        <GuidedExercises onSubmit={handleSubmit} isLoading={isLoading} />
      )}
      
      {error && (
        <ErrorHandling 
          error={error}
          onRetry={handleRetry}
          onRestart={handleNewExercise}
        />
      )}
      
      {isLoading ? (
        <LoadingSpinner 
          message={t('modes.guided.loading')} 
          totalFiles={uploadedFiles?.length || 1}
        />
      ) : feedback ? (
        <FeedbackDisplay 
          data={feedback} 
          historyId={feedbackId} 
          type="guided"
        />
      ) : null}
    </div>
  );
}