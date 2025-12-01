import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCheckoutSession } from '../lib/stripe/subscription';
import { supabase } from '../lib/supabase/client';

export function useSubscriptionFlow() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string) => {
    if (!priceId) return;
    
    try {
      console.log("hook useSubscriptionFlow try")
      setIsProcessing(true);
      setError(null);
      
      // Vérifier si l'utilisateur est authentifié
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Sauvegarder l'intention d'abonnement
        sessionStorage.setItem('intended_subscription', priceId);
        navigate('/auth/login');
        return;
      }

      // Créer la session de paiement et rediriger
      const session = await createCheckoutSession(priceId);
      if (session?.url) {
        window.location.href = session.url;
      } else {
        throw new Error('Impossible de créer la session de paiement');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    error,
    handleSubscribe
  };
}
