import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check, Settings as SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProfileStore } from '../../lib/stores/profile-store';
import { useTranslation } from 'react-i18next';
import type { UserProfile } from '../../lib/types';

interface ProfileSelectorProps {
  onCreateProfile: () => void;
}

export function ProfileSelector({ onCreateProfile }: ProfileSelectorProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { 
    profiles,
    selectedProfileId,
    isLoading,
    loadProfiles,
    saveSelectedProfile 
  } = useProfileStore();

  React.useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  const handleSelectProfile = async (profile: UserProfile) => {
    try {
      await saveSelectedProfile(profile.id);
      navigate('/app');
    } catch (error) {
      console.error('Error selecting profile:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-t-white border-opacity-50 rounded-full animate-spin mx-auto mb-4" />
          <p>{t('profile.edit.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col items-center px-4 py-6">
      <div className="flex justify-end max-w-4xl w-full px-4 right-4">
        <button
          onClick={() => navigate('/settings')}
          className="flex items-center justify-center w-14 h-14 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          aria-label={t('profile.select.settings')}
        >
          <SettingsIcon className="w-6 h-6 text-white" />
        </button>
      </div>
      
      <div>
        <h1 className="text-3xl font-bold text-white my-12">
          {t('profile.select.title')}
        </h1>

        <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-4xl w-full">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => handleSelectProfile(profile)}
              className="relative group"
            >
              <div className={`w-20 h-20 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden transition-transform group-hover:scale-105 bg-${profile.avatar_color}-300`}>
                {profile.avatar_id ? (
                  <div className="w-full h-full">
                    <img
                      src={`/images/avatar/avatar${profile.avatar_id}.svg`}
                      alt={`Avatar de ${profile.name}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className={`w-full h-full flex items-center justify-center text-2xl md:text-4xl font-bold text-${profile.avatar_color}-600`}>
                    {profile.name[0].toUpperCase()}
                  </div>
                )}
              </div>
              <p className="text-base md:text-xl text-white text-center mt-2 md:mt-4">{profile.name}</p>
              <p className="text-xs md:text-sm text-gray-300 text-center">{profile.grade}</p>
            </button>
          ))}

          {profiles.length < 9 && (
            <button
              onClick={onCreateProfile}
              className="flex flex-col items-center justify-center gap-2 md:gap-4 transition-transform hover:scale-105"
            >
              <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-white/10 flex items-center justify-center">
                <Plus className="w-8 h-8 md:w-12 md:h-12 text-white" />
              </div>
              <p className="text-base md:text-xl text-white text-center">{t('profile.select.addProfile')}</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}