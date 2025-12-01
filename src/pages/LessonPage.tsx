import React, { useState, useRef } from 'react';
import { BookOpen, RotateCcw } from 'lucide-react';
import { LessonInput } from '../components/LessonInput';
import { FeedbackDisplay } from '../components/FeedbackDisplay';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { BackButton } from '../components/common/BackButton';
import { ErrorHandling } from '../components/common/ErrorHandling';
import { useLessonAnalysis } from '../hooks/useLessonAnalysis';
import { LessonHeader } from '../components/lesson/LessonHeader';
import { LessonActions } from '../components/lesson/LessonActions';
import { TokenDisplay } from '../components/common/TokenDisplay';
import { useTranslation } from 'react-i18next';

export function LessonPage() {
  const { 
    isLoading, 
    error, 
    feedback, 
    feedbackId, 
    handleAnalysis,
    resetAnalysis 
  } = useLessonAnalysis();

  const [showInput, setShowInput] = React.useState(true);
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
  const topRef = React.useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const handleSubmit = (files: File[]) => {
    setShowInput(false);
    setUploadedFiles(files);
    handleAnalysis(files, 'lesson');
  };

  const handleNewLesson = () => {
    setShowInput(true);
    resetAnalysis();
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleRetry = () => {
    if (uploadedFiles.length) {
      handleAnalysis(uploadedFiles, 'lesson');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div ref={topRef} className="flex items-center justify-between">
        <BackButton 
          showConfirm={!!feedback} 
          type="lesson"
        />

        <div className="flex items-center gap-4">
          <TokenDisplay />
          {feedback && (
            <LessonActions onNewLesson={handleNewLesson} />
          )}
        </div>
      </div>

      <LessonHeader />

      {showInput && (
        <LessonInput onSubmit={handleSubmit} isLoading={isLoading} />
      )}
      
      {error && (
        <ErrorHandling 
          error={error}
          onRetry={handleRetry}
          onRestart={handleNewLesson}
        />
      )}
      
      {isLoading ? (
        <LoadingSpinner 
          message={t('modes.lesson.loading')} 
          totalFiles={uploadedFiles?.length || 1}
        />
      ) : feedback ? (
        <FeedbackDisplay 
          data={feedback} 
          historyId={feedbackId} 
          type="lesson"
          mode="lesson" 
        />
      ) : null}
    </div>
  );
}