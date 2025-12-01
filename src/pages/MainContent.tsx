import React from 'react';
import { ModeSelector } from '../components/ModeSelector';
import { Header } from '../components/Header';
import { useRequireProfile } from '../hooks/useRequireProfile';

export function MainContent() {
  // Utilise le hook pour vérifier si un profil est sélectionné
   console.log('maincontent')
  useRequireProfile();

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col">
      <Header />
      <div className="mx-auto px-4 py-8 w-full max-w-4xl">
        <ModeSelector />
      </div>
    </main>
  );
}