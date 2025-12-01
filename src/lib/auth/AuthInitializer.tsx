import { useEffect } from 'react';
import { initializeAuthListener } from './session-handler';

export function AuthInitializer() {
  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;
    
    // Initialize auth listener
    initializeAuthListener().then(sub => {
      subscription = sub;
    });

    // Cleanup function
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return null;
}