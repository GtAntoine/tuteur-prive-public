import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileSelector } from '../components/profile/ProfileSelector';
import { ProfileCreator } from './ProfileCreatorPage';
import { TokensDisplay } from '../components/profile/TokensDisplay';
import { AddToHomescreen } from '../components/common/AddToHomescreen';
import { createProfile, saveSelectedProfile } from '../lib/utils/profiles';
import { useProfileStore } from '../lib/stores/profile-store';
import { useTranslation } from 'react-i18next';
import type { Grade } from '../lib/types';

const MAX_PROFILES = 9;

export function ProfilePage() {
  const navigate = useNavigate();
  const { profiles, loadProfiles, isLoading } = useProfileStore();
  const [isCreating, setIsCreating] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  const handleCreateProfile = async (
    name: string, 
    grade: Grade, 
    avatar_color: string, 
    avatar_id?: string
  ) => {
    if (profiles.length >= MAX_PROFILES) {
      alert('Vous ne pouvez pas créer plus de 9 profils');
      return;
    }

    try {
      const newProfile = await createProfile({
        name,
        grade,
        avatar_color,
        avatar_id
      });
      
      await loadProfiles();
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Une erreur est survenue lors de la création du profil');
    }
  };

  if (isLoading) {
    return <div className="text-white text-center py-8">{t('profile.edit.loading')}</div>;
  }

  if (isCreating) {
    return (
      <ProfileCreator
        onSubmit={handleCreateProfile}
        onBack={() => setIsCreating(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ProfileSelector
          onCreateProfile={() => {
            if (profiles.length >= MAX_PROFILES) {
              alert('Vous ne pouvez pas créer plus de 9 profils');
              return;
            }
            setIsCreating(true);
          }}
        />
      </div>

      <AddToHomescreen />
    </div>
  );
}