import React from 'react';
import { BackButton } from '../components/common/BackButton';
import { MetaTags } from '../components/common/MetaTags';

export function CGUPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900">
      <MetaTags 
        title="Conditions Générales d'Utilisation | Tuteur Privé"
        description="Conditions Générales d'Utilisation de Tuteur Privé"
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackButton to="/" />
        
        <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Conditions Générales d'Utilisation
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">
              Les présentes conditions générales d'utilisation seront complétées ultérieurement.
            </p>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Introduction</h2>
                <p>Section à compléter</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Définitions</h2>
                <p>Section à compléter</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Accès au service</h2>
                <p>Section à compléter</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Propriété intellectuelle</h2>
                <p>Section à compléter</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Protection des données</h2>
                <p>Section à compléter</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}