import React, { useState, useRef } from 'react';
import { CheckSquare, RotateCcw } from 'lucide-react';
import { ExerciseCorrection } from '../components/ExerciseCorrection';
import { FeedbackDisplay } from '../components/FeedbackDisplay';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorHandling } from '../components/common/ErrorHandling';
import { useLessonAnalysis } from '../hooks/useLessonAnalysis';
import { BackButton } from '../components/common/BackButton';
import { TokenDisplay } from '../components/common/TokenDisplay';
import { useTranslation } from 'react-i18next';

export function CorrectionPage() {
  const [showInput, setShowInput] = useState(true);
  const topRef = useRef<HTMLDivElement>(null);
  const { isLoading, error, feedback, feedbackId, handleAnalysis } = useLessonAnalysis();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { t } = useTranslation();

  const handleSubmit = (files: File[]) => {
    setShowInput(false);
    setUploadedFiles(files);
    handleAnalysis(files, 'correction');
  };

  const handleNewCorrection = () => {
    setShowInput(true);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleRetry = () => {
    if (uploadedFiles.length) {
      handleAnalysis(uploadedFiles, 'correction');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div ref={topRef} className="flex items-center justify-between">
        <BackButton 
          showConfirm={!!feedback} 
          type="correction"
        />

        <div className="flex items-center gap-4">
          <TokenDisplay />
          {feedback && (
            <button
              onClick={handleNewCorrection}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                text-white rounded-full transition-all duration-300 hover:scale-105 group relative overflow-hidden"
            >
              <RotateCcw className="w-5 h-5" />
              <span>{t('modes.correction.newCorrection')}</span>
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
          <CheckSquare className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">{t('modes.correction.title')}</h1>
      </div>

      {showInput && (
        <ExerciseCorrection onSubmit={handleSubmit} isLoading={isLoading} />
      )}
      
      {error && (
        <ErrorHandling 
          error={error}
          onRetry={handleRetry}
          onRestart={handleNewCorrection}
        />
      )}
      
      {isLoading ? (
        <LoadingSpinner 
          message={t('modes.correction.loading')} 
          totalFiles={uploadedFiles?.length || 1}
        />
      ) : feedback ? (
        <FeedbackDisplay 
          data={feedback} 
          historyId={feedbackId} 
          type="correction"
        />
      ) : null}
    </div>
  );
}