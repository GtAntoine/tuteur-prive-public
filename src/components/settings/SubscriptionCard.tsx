// src/components/settings/SubscriptionCard.tsx
import React from 'react';
import { CreditCard, Check } from 'lucide-react';

export function SubscriptionCard() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-purple-500" />
        Abonnement
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Gratuit</h3>
          <p className="text-3xl font-bold text-purple-600 mb-4">0€ <span className="text-sm text-gray-500 font-normal">/mois</span></p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500 min-w-4" />
              <span className="text-gray-600">3 leçons par jour</span>
            </li>
             <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500 min-w-4" />
              <span className="text-gray-600">3 aides aux exercicse</span>
            </li>
             <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500 min-w-4" />
              <span className="text-gray-600">3 contrôle des réponses</span>
            </li>
             <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500 min-w-4" />
              <span className="text-gray-600">Historique des 10 derniers éléments</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500 min-w-4" />
              <span className="text-gray-600">1 profil</span>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col border-2 border-purple-500 rounded-lg p-4 relative hover:shadow-md transition-shadow">
          <div className="absolute -top-3 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
            Populaire
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Essentiel</h3>
          <p className="text-3xl font-bold text-purple-600 mb-4">6.99€ <span className="text-sm text-gray-500 font-normal">/mois</span></p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500 min-w-4" />
              <span className="text-gray-600">30 leçons par jour</span>
            </li>
             <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500 min-w-4" />
              <span className="text-gray-600">30 aides aux exercices par jour</span>
            </li>
             <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500 min-w-4" />
              <span className="text-gray-600">30 validations des devoirs par jour</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500 min-w-4" />
              <span className="text-gray-600">3 profils</span>
            </li>
             <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500 min-w-4" />
              <span className="text-gray-600">Historique des 100 derniers éléments</span>
            </li>
          </ul>
          
          <button className="self-end	 mt-auto w-full group relative cursor-pointer overflow-hidden whitespace-nowrap px-2 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_8px_rgba(62,61,117,0.7)] flex justify-center"style={{
           "--spread": "90deg",
           "--shimmer-color": "#ffffff",
           "--radius": "10px", 
           "--speed": "1.5s",
           "--cut": "0.1em",
           "--bg": "radial-gradient(ellipse 80% 50% at 50% 120%,rgba(62, 61, 117),rgba(18, 18, 38))"
          }}>
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-[-100%] rotate-gradient">
                    <div className="absolute inset-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,hsl(0_0%_100%/1)_var(--spread),transparent_var(--spread))]"></div>
                </div>
            </div>
            <div className="absolute bg-purple-600  [inset:var(--cut)]"></div>
            <span className="z-10 w-full whitespace-pre bg-gradient-to-b from-black from-30% to-gray-300/80 bg-clip-text text-center font-semibold leading-none tracking-tight text-white">S'abonner</span>
          </button>
        </div>


          <div className="border-2 border-purple-500 rounded-lg p-4 relative hover:shadow-md transition-shadow">
      
          <h3 className="text-lg font-medium text-gray-800 mb-2">Premium</h3>
          <p className="text-3xl font-bold text-purple-600 mb-4">16.99€ <span className="text-sm text-gray-500 font-normal">/mois</span></p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500 min-w-4" />
              <span className="text-gray-600">Leçons illimitées</span>
            </li>
             <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500 min-w-4" />
              <span className="text-gray-600">Aides aux exercices illimités</span>
            </li>
             <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500 min-w-4" />
              <span className="text-gray-600">Contrôle des réponses illimités</span>
            </li>
             <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500 min-w-4" />
              <span className="text-gray-600">Historique illimité</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500 min-w-4" />
              <span className="text-gray-600">9 profils</span>
            </li>
          </ul>
          <button className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            S'abonner
          </button>
        </div>
      </div>
    </div>
  );
}
