import React from 'react';
import { Link } from 'react-router-dom';
import { History, Users, BarChart2 } from 'lucide-react';
import { ProfileButton } from './profile/ProfileButton';
import { useTranslation } from 'react-i18next';

export function Header() {
  const { t } = useTranslation();
  
  return (
    <header className="text-white">
      <div className="max-w-4xl mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/history" 
              className={`flex w-14 h-14 sm:w-auto max-w-sm bg-gradient-to-tr from-indigo-500 to-pink-500 items-center gap-0.5 px-0.5 py-0.5 text-gray-900 rounded-full transition-all duration-300 hover:scale-105 hover:bg-opacity-80`}
            >
              <div className="relative bg-white rounded-full px-4 py-2 hover:bg-opacity-80 w-full h-full flex items-center gap-2">
                <History className="w-5 h-5 md:w-6 md:h-6 text-gray-900 gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                <span className="hidden sm:block text-base md:text-lg text-gray-900">{t('history.title')}</span>
              </div>
            </Link>
          </div>

          <Link
            to="/stats"
            className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Statistiques"
          >
            <BarChart2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </Link>

          <div className="flex items-center gap-4">
            <ProfileButton />
  
            <Link 
              to="/profiles"
              className="flex items-center gap-2 px-3 md:px-4 py-3 md:py-4 bg-white/10 hover:bg-white/20 
                rounded-full transition-all duration-300"
              title="Changer de profil"
            >
              <Users className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}