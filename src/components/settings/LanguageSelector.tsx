import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const languages = [
  { code: 'fr', name: 'settings.languages.fr' },
  { code: 'en', name: 'settings.languages.en' },
  { code: 'id', name: 'settings.languages.id' }
];

export function LanguageSelector() {
  const { t, i18n } = useTranslation();
  
  return (
    <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <Languages className="w-6 h-6 text-white" />
        <h2 className="text-xl font-semibold text-white">{t('settings.language')}</h2>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              i18n.language === lang.code
                ? 'bg-purple-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {t(lang.name)}
          </button>
        ))}
      </div>
    </div>
  );
}