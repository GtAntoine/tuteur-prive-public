import React from 'react';
import { Upload } from 'lucide-react';
import { FileUploader } from './FileUploader';
import { useTranslation } from 'react-i18next';

interface LessonInputProps {
  onSubmit: (files: File[]) => void;
  isLoading: boolean;
}

export function LessonInput({ onSubmit, isLoading }: LessonInputProps) {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <FileUploader
        onFilesSubmit={onSubmit}
        disabled={isLoading}
        accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.txt,.doc,.docx"
        mode="lesson"
        icon={<Upload className="w-5 h-5" />}
        text={t('upload.lesson.title')}
        subtext={t('upload.lesson.type')}
      />
    </div>
  );
}