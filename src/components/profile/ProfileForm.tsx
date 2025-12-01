import React, { useState } from 'react';
import { AvatarSelector } from './AvatarSelector';
import { useTranslation } from 'react-i18next';
import { GRADES, GRADE_EQUIVALENTS } from '../../lib/constants/grades';
import type { Grade, UserProfile } from '../../lib/types';

const AVATAR_COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];

interface ProfileFormProps {
  initialValues?: Partial<UserProfile>;
  onSubmit: (values: {
    name: string;
    grade: Grade;
    avatar_color: string;
    avatar_id?: string;
  }) => void;
  submitLabel: string;
}

export function ProfileForm({ initialValues, onSubmit, submitLabel }: ProfileFormProps) {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState(initialValues?.name || '');
  const [grade, setGrade] = useState<Grade>(initialValues?.grade || 'CP');
  const [avatar_color, setAvatarColor] = useState(initialValues?.avatar_color || AVATAR_COLORS[0]);
  const [avatar_id, setAvatarId] = useState(initialValues?.avatar_id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit({ name: name.trim(), grade, avatar_color, avatar_id });
    }
  };

  // Obtenir la langue actuelle
  const currentLang = i18n.language.split('-')[0]; // Prend la partie principale du code de langue (fr-FR -> fr)
  
  // Utiliser les équivalents de grade dans la langue actuelle
  const getGradeLabel = (gradeKey: Grade) => {
    const langEquivalents = GRADE_EQUIVALENTS[currentLang as keyof typeof GRADE_EQUIVALENTS] || GRADE_EQUIVALENTS.fr;
    return langEquivalents[gradeKey] || gradeKey;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-white mb-2">
          {t('profile.create.name')}
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-white mb-2">
          {t('profile.create.grade')}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {GRADES.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGrade(g)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                grade === g
                  ? 'bg-white text-purple-900'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {getGradeLabel(g)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white/10 p-4 rounded-lg">
        <AvatarSelector
          selectedAvatar={avatar_id}
          onSelectAvatar={setAvatarId}
          selectedColor={avatar_color}
        />
      </div>

      <div>
        <label className="block text-white mb-2">
          {t('profile.create.avatarColor')}
        </label>
        <div className="flex justify-between md:flex-wrap md:gap-2">
          {AVATAR_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setAvatarColor(color)}
              className={`w-10 h-10 rounded-full bg-${color}-300 transition-transform ${
                avatar_color === color ? 'scale-110 ring-2 ring-white' : 'hover:scale-105'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="py-6">
        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full px-6 py-3 bg-white text-purple-900 rounded-lg font-medium 
            transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}