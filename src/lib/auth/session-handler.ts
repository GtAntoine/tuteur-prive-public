import { supabase } from '../supabase/client';

export async function refreshSession() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    const { data: { session: refreshedSession }, error } = await supabase.auth.refreshSession();
    if (error) throw error;

    return refreshedSession;
  } catch (error) {
    console.error('Error refreshing session:', error);
    return null;
  }
}

export async function initializeAuthListener() {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN') {
      localStorage.setItem('tuteurprive_auth', JSON.stringify(session));
    } else if (event === 'SIGNED_OUT') {
      localStorage.removeItem('tuteurprive_auth');
    } else if (event === 'TOKEN_REFRESHED') {
      localStorage.setItem('tuteurprive_auth', JSON.stringify(session));
    }
  });

  return subscription;
}