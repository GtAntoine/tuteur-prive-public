import React from 'react';
import { useTranslation } from 'react-i18next';

const AVATARS = [
  // Female avatars row
  [
    { id: 'f1', src: '/images/avatar/avatarf1.svg' },
    { id: 'f2', src: '/images/avatar/avatarf2.svg' },
    { id: 'f3', src: '/images/avatar/avatarf3.svg' },
    { id: 'f4', src: '/images/avatar/avatarf4.svg' },
    { id: 'f5', src: '/images/avatar/avatarf5.svg' },
    { id: 'f6', src: '/images/avatar/avatarf6.svg' },
    { id: 'f7', src: '/images/avatar/avatarf7.svg' },
    { id: 'f8', src: '/images/avatar/avatarf8.svg' },
    { id: 'f9', src: '/images/avatar/avatarf9.svg' },
    { id: 'f10', src: '/images/avatar/avatarf10.svg' },
    { id: 'f11', src: '/images/avatar/avatarf11.svg' },
    { id: 'f12', src: '/images/avatar/avatarf12.svg' },
    { id: 'f13', src: '/images/avatar/avatarf13.svg' },
    { id: 'f14', src: '/images/avatar/avatarf14.svg' },
  ],
  // Male avatars row
  [
    { id: 'm1', src: '/images/avatar/avatarm1.svg' },
    { id: 'm2', src: '/images/avatar/avatarm2.svg' },
    { id: 'm3', src: '/images/avatar/avatarm3.svg' },
    { id: 'm4', src: '/images/avatar/avatarm4.svg' },
    { id: 'm5', src: '/images/avatar/avatarm5.svg' },
    { id: 'm6', src: '/images/avatar/avatarm6.svg' },
    { id: 'm7', src: '/images/avatar/avatarm7.svg' },
    { id: 'm8', src: '/images/avatar/avatarm8.svg' },
    { id: 'm9', src: '/images/avatar/avatarm9.svg' },
    { id: 'm10', src: '/images/avatar/avatarm10.svg' },
    { id: 'm11', src: '/images/avatar/avatarm11.svg' },
    { id: 'm12', src: '/images/avatar/avatarm12.svg' },
    { id: 'm13', src: '/images/avatar/avatarm13.svg' },
    { id: 'm14', src: '/images/avatar/avatarm14.svg' },
  ]
];

interface AvatarSelectorProps {
  selectedAvatar?: string;
  onSelectAvatar: (avatarId: string) => void;
  selectedColor?: string; // Nouvelle prop pour la couleur sélectionnée
}

export function AvatarSelector({ selectedAvatar, onSelectAvatar, selectedColor = 'purple' }: AvatarSelectorProps) {
  const { t } = useTranslation();
  
  return (
    <div>
      <label className="block text-white mb-2">
        {t('profile.create.avatar')}
      </label>
      <div className="space-y-4">
        {AVATARS.map((row, rowIndex) => (
          <div 
            key={rowIndex}
            className="flex overflow-x-auto pb-4 pt-3 px-4 gap-4 snap-x snap-mandatory 
              [&::-webkit-scrollbar]:h-2
              [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-track]:bg-white/10
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-white/40
              [&::-webkit-scrollbar-thumb:hover]:bg-white/50"
          >
            {row.map((avatar) => (
              <button
                key={avatar.id}
                type="button"
                onClick={() => onSelectAvatar(avatar.id)}
                className={`flex-none w-20 h-20 p-2 relative aspect-square rounded-lg overflow-hidden 
                  transition-transform hover:scale-105 snap-center ${
                  selectedAvatar === avatar.id 
                    ? `ring-4 ring-${selectedColor}-500 ring-offset-4 ring-offset-purple-900 bg-${selectedColor}-300` 
                    : ''
                }`}
              >
                <img
                  src={avatar.src}
                  alt={`Avatar ${avatar.id}`}
                  className="w-full h-full object-cover rounded-full"
                />
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}