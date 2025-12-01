import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export function Header() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  const getCurrentLanguageLabel = () => {
    const langKey = i18n.language.split('-')[0]; // Get base language code
    return t(`settings.languages.${langKey}`);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src="/images/logotp.jpg" 
            alt="Tuteur Privé" 
            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm floating-animation" 
          />
          <div>
            <h1 className="hidden md:block text-2xl md:text-3xl font-bold text-white">{t('landing.hero.title')}</h1>
            <p className="hidden md:block text-sm md:text-base text-white/90">{t('landing.hero.subtitle')}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-full transition-colors">
              <Globe className="w-5 h-5" />
              <span className="hidden md:inline">{getCurrentLanguageLabel()}</span>
            </button>
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <button
                onClick={() => changeLanguage('fr')}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
              >
                {t('settings.languages.fr')}
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
              >
                {t('settings.languages.en')}
              </button>
              <button
                onClick={() => changeLanguage('id')}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
              >
                {t('settings.languages.id')}
              </button>
            </div>
          </div>

          <button
            onClick={() => navigate('/auth/login')}
            className="px-4 py-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            {t('landing.hero.login')}
          </button>
          
          <button
            onClick={() => navigate('/auth/register')}
            className="px-4 py-2 bg-white text-purple-600 rounded-full font-medium hover:bg-white/90 transition-colors"
          >
            {t('landing.hero.signup')}
          </button>
        </div>
      </div>
    </header>
  );
}