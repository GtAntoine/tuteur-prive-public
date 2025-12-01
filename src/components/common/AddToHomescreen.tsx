import React, { useEffect } from 'react';

declare global {
  interface Window {
    AddToHomeScreen: any;
    AddToHomeScreenInstance: any;
  }
}

export function AddToHomescreen() {
  useEffect(() => {
    // Check if already installed
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    if (isInstalled) return;

    // Initialize AddToHomeScreen
    if (window.AddToHomeScreen) {
      window.AddToHomeScreenInstance = window.AddToHomeScreen({
        appName: 'Tuteur Privé',
        appNameDisplay: 'standalone',
        appIconUrl: '/images/icons/apple-touch-icon.png',
        assetUrl: 'https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@2.94/dist/assets/img/',
        maxModalDisplayCount: 1,
        displayOptions: { showMobile: true, showDesktop: false },
        allowClose: true
      });

      // Show the prompt
      window.AddToHomeScreenInstance.show('fr');
    }
  }, []);

  return null;
}