// src/lib/auth/auth-provider.tsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabase/client';
import { useAuthStore } from '../stores/auth-store';
import { useProfileStore } from '../stores/profile-store';

const PUBLIC_ROUTES = ['/', '/auth/login', '/auth/register', '/auth/reset-password', '/shared'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();
  const { loadSelectedProfile } = useProfileStore();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    // Ne pas initialiser l'auth sur les routes publiques
    const isPublicRoute = PUBLIC_ROUTES.some(route => 
      location.pathname.startsWith(route)
    );

    if (isPublicRoute) {
      setLoading(false);
      return;
    }

    async function initializeAuth() {
      try {
        setLoading(true);
        
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (mounted) {
          setUser(session?.user ?? null);
          if (session?.user) {
            await loadSelectedProfile();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    // Initialize auth on mount
    initializeAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        setUser(session?.user ?? null);
        if (session?.user && event === 'SIGNED_IN') {
          await loadSelectedProfile();
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [setUser, setLoading, loadSelectedProfile, location.pathname]);

  return <>{children}</>;
}
