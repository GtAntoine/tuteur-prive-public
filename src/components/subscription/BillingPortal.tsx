import React, { useState } from 'react';
import { Loader } from 'lucide-react';
import { createPortalSession } from '../../lib/stripe/subscription';
import { useSubscription } from '../../hooks/useSubscription';

export function BillingPortal() {
  const [isLoading, setIsLoading] = useState(false);
  const { subscription } = useSubscription();

  const handleManageSubscription = async () => {
    try {
      setIsLoading(true);
      const url = await createPortalSession(subscription.customer);
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error opening billing portal:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleManageSubscription}
      disabled={isLoading || !subscription}
      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
        disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isLoading ? (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          Chargement...
        </>
      ) : (
        'Gérer mon abonnement'
      )}
    </button>
  );
}