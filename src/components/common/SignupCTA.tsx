// src/components/common/SignupCTA.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function SignupCTA() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 md:py-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-md md:text-lg">Vous aimez ce contenu ?</h3>
          <p className="text-white/90 text-sm md:text-md">Créez votre compte gratuit pour sauvegarder vos progrès !</p>
        </div>
        <button
          onClick={() => navigate('/auth/register')}
          className="px-3 md:px-6 py-2 bg-white text-purple-600 rounded-full font-medium min-w-fit	
            hover:bg-white/90 transition-all duration-300 hover:scale-105"
        >
          Créer un compte
        </button>
      </div>
    </div>
  );
}
