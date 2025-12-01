import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà accepté les cookies
    const hasAccepted = localStorage.getItem('cookie-consent');
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 transform transition-transform duration-300">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <Cookie className="w-6 h-6 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-900">Cookies & Confidentialité</h3>
          </div>
          
          <p className="text-gray-600 flex-grow">
            Nous utilisons des cookies pour améliorer votre expérience sur notre site. En continuant à naviguer, vous acceptez notre{' '}
            <Link to="/cgu" className="text-purple-600 hover:text-purple-700 underline">
              politique de confidentialité
            </Link>.
          </p>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 
                transition-all duration-300 hover:scale-105"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}