import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileForm } from '../components/profile/ProfileForm';
import { BackButton } from '../components/common/BackButton';
import { getProfile, updateProfile } from '../lib/utils/profiles';
import { useAuth } from '../hooks/useAuth';
import { useProfileStore } from '../lib/stores/profile-store';
import { useTranslation } from 'react-i18next';
import type { UserProfile, Grade } from '../lib/types';

export function ProfileEditPage() {
  const navigate = useNavigate();
  const { selectedProfileId } = useAuth();
  const { setCurrentProfile: updateGlobalProfile } = useProfileStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    async function loadProfile() {
      try {
        if (!selectedProfileId) {
          navigate('/profiles');
          return;
        }

        const profileData = await getProfile(selectedProfileId);
        if (!profileData) {
          navigate('/profiles');
          return;
        }

        setProfile(profileData);
      } catch (error) {
        console.error('Error loading profile:', error);
        navigate('/profiles');
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, [navigate, selectedProfileId]);

  const handleSubmit = async (values: {
    name: string;
    grade: Grade;
    avatar_color: string;
    avatar_id?: string;
  }) => {
    if (!profile) return;

    try {
      await updateProfile(profile.id, {
        name: values.name,
        grade: values.grade,
        avatar_color: values.avatar_color,
        avatar_id: values.avatar_id
      });

      // Update the current profile in the store
      const updatedProfile = {
        ...profile,
        name: values.name,
        grade: values.grade,
        avatar_color: values.avatar_color,
        avatar_id: values.avatar_id
      };
      updateGlobalProfile(updatedProfile);
      
      navigate('/app');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Une erreur est survenue lors de la mise à jour du profil');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-4">
        <div className="max-w-md mx-auto">
          <div className="text-white text-center py-8">{t('profile.edit.loading')}</div>
        </div>
      </div>
    );
  }

  if (!profile) {
    navigate('/profiles');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-4">
      <div className="max-w-md mx-auto pt-4">
        <BackButton className="mb-6 text-white" />
        <h1 className="text-3xl font-bold text-white mb-8">{t('profile.edit.title')}</h1>

        <ProfileForm
          initialValues={{
            name: profile.name,
            grade: profile.grade,
            avatar_color: profile.avatar_color,
            avatar_id: profile.avatar_id
          }}
          onSubmit={handleSubmit}
          submitLabel={t('profile.edit.submit')}
        />
      </div>
    </div>
  );
}