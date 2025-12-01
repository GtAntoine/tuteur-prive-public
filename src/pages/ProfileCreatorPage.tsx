import React from 'react';
import { ProfileForm } from '../components/profile/ProfileForm';
import { BackButton } from '../components/common/BackButton';
import { useTranslation } from 'react-i18next';
import type { Grade } from '../lib/types';

interface ProfileCreatorProps {
  onSubmit: (name: string, grade: Grade, avatar_color: string, avatar_id?: string) => void;
  onBack: () => void;
}

export function ProfileCreator({ onSubmit, onBack }: ProfileCreatorProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <BackButton 
          className="mb-6 text-white" 
          label={t('profile.create.back')}
        />
        <h1 className="text-3xl font-bold text-white mb-8">{t('profile.create.title')}</h1>

        <ProfileForm
          onSubmit={values => onSubmit(
            values.name, 
            values.grade, 
            values.avatar_color, 
            values.avatar_id
          )}
          submitLabel={t('profile.create.submit')}
        />
      </div>
    </div>
  );
}