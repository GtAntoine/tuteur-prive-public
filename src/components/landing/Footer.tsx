import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Shield, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {t('landing.footer.about.title')}
            </h3>
            <p className="text-gray-400">
              {t('landing.footer.about.description')}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              {t('landing.footer.commitment.title')}
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>{t('landing.footer.commitment.items.data')}</li>
              <li>{t('landing.footer.commitment.items.security')}</li>
              <li>{t('landing.footer.commitment.items.privacy')}</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('landing.footer.links.title')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/auth/login" className="text-gray-400 hover:text-white transition-colors">
                  {t('landing.footer.links.login')}
                </Link>
              </li>
              <li>
                <Link to="/auth/register" className="text-gray-400 hover:text-white transition-colors">
                  {t('landing.footer.links.signup')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  {t('landing.footer.links.faq')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('landing.footer.legal.title')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/cgu" className="text-gray-400 hover:text-white transition-colors">
                  {t('landing.footer.legal.terms')}
                </Link>
              </li>
              <li>
                <Link to="/cgv" className="text-gray-400 hover:text-white transition-colors">
                  {t('landing.footer.legal.privacy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p className="flex items-center justify-center gap-2">
            {t('landing.footer.madeWith')} <Heart className="w-4 h-4 text-red-500" />
          </p>
          <p className="mt-2">{t('landing.footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}