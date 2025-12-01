import React from 'react';
import { HelpCircle, Upload } from 'lucide-react';
import { FileUploader } from './FileUploader';
import { useTranslation } from 'react-i18next';

interface GuidedExercisesProps {
  onSubmit: (files: File[]) => void;
  isLoading: boolean;
}

export function GuidedExercises({ onSubmit, isLoading }: GuidedExercisesProps) {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <FileUploader
        onFilesSubmit={onSubmit}
        disabled={isLoading}
        accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.txt,.doc,.docx"
        mode="guided"
        icon={<Upload className="w-5 h-5" />}
        text={t('upload.guided.title')}
        subtext={t('upload.guided.type')}
      />
    </div>
  );
}