import React from 'react';
import { CheckSquare, Upload } from 'lucide-react';
import { FileUploader } from './FileUploader';
import { useTranslation } from 'react-i18next';

interface ExerciseCorrectionProps {
  onSubmit: (files: File[]) => void;
  isLoading: boolean;
}

export function ExerciseCorrection({ onSubmit, isLoading }: ExerciseCorrectionProps) {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <FileUploader
        onFilesSubmit={onSubmit}
        disabled={isLoading}
        accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.txt,.doc,.docx"
        mode="correction"
        icon={<Upload className="w-5 h-5" />}
        text={t('upload.correction.title')}
        subtext={t('upload.correction.type')}
      />
    </div>
  );
}