/*import { useState, useEffect } from 'react';
import { getSubscriptionStatus } from '../lib/stripe/subscription';

export function useSubscription() {
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSubscription() {
      try {
        const status = await getSubscriptionStatus();
        setSubscription(status);
      } catch (error) {
        console.error('Error loading subscription:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadSubscription();
  }, []);

  return { subscription, isLoading };
}*/

// src/hooks/useSubscription.ts
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';

export function useSubscription() {
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSubscription() {
      try {
        // Récupérer l'utilisateur actuel
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setIsLoading(false);
          return;
        }

        // Récupérer l'abonnement actif
        const { data: subscriptions, error } = await supabase
          .from('subscriptions')
          .select(`
            *,
            prices (
              *,
              products (*)
            )
          `)
          .eq('user_id', user.id)
          .eq('status', 'active')
          .single();

        if (error) throw error;
        setSubscription(subscriptions);
      } catch (error) {
        console.error('Error loading subscription:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadSubscription();
  }, []);

  return { subscription, isLoading };
}
