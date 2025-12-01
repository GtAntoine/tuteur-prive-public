import React from 'react';
import { BackButton } from '../components/common/BackButton';

export function CGVPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackButton to="/" />
        
        <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Conditions Générales de Vente
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">
              Les conditions générales de vente seront ajoutées ici.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}