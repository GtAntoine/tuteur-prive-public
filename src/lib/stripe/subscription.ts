import { supabase } from '../supabase/client';

export async function createCheckoutSession(priceId: string) {
  try {
    const { data: { session_url }, error } = await supabase.functions.invoke('create-checkout-session', {
      body: { priceId }
    });

    if (error) throw error;
    return { url: session_url };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new Error('Impossible de créer la session de paiement');
  }
}

export async function getSubscriptionStatus() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // Modifié pour gérer le cas où il n'y a pas d'abonnement
    const { data: subscriptions, error } = await supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .eq('user_id', user.id)
      .order('created', { ascending: false })
      .limit(1);

    if (error) throw error;
    
    // Retourne le premier abonnement actif ou null s'il n'y en a pas
    return subscriptions && subscriptions.length > 0 ? subscriptions[0] : null;
  } catch (error) {
    console.error('Error getting subscription status:', error);
    return null;
  }
}

export async function createPortalSession(customerId: string) {
  try {
    const { data: { url }, error } = await supabase.functions.invoke('create-portal-session', {
      body: { customerId }
    });

    if (error) throw error;
    return url;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw new Error('Impossible de créer la session du portail client');
  }
}