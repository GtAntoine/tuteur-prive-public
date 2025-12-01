import { supabase } from '../supabase/client';
import { useAuthStore } from '../stores/auth-store';
import { useProfileStore } from '../stores/profile-store';
import type { AuthResponse } from '../types';

export async function signUp(email: string, password: string): Promise<AuthResponse> {
  try {
    // First check if user exists
    const { data: existingUser } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (existingUser?.user) {
      return {
        user: null,
        error: { message: 'Un compte existe déjà avec cet email' }
      };
    }

    // Create new user with email confirmation disabled
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/login`,
        data: {
          email_confirmed: true // Bypass email confirmation
        }
      }
    });

    if (error) throw error;

    // Auto sign in after signup
    if (data.user) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Small delay to allow DB triggers to complete
      
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) throw signInError;
      useAuthStore.getState().setUser(signInData.user);
    }

    return { user: data.user, error: null };
  } catch (error) {
    console.error('Signup error:', error);
    return { 
      user: null, 
      error: { 
        message: error instanceof Error 
          ? error.message === 'Database error saving new user'
            ? 'Une erreur est survenue lors de la création du compte. Veuillez réessayer.'
            : error.message
          : 'Une erreur est survenue lors de l\'inscription'
      } 
    };
  }
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('Email ou mot de passe incorrect');
      }
      throw error;
    }

    if (!data.user) {
      throw new Error('Aucun utilisateur trouvé');
    }

    useAuthStore.getState().setUser(data.user);
    return { user: data.user, error: null };
  } catch (error) {
    return { 
      user: null, 
      error: { 
        message: error instanceof Error ? error.message : 'Une erreur est survenue lors de la connexion'
      } 
    };
  }
}

export async function signOut(): Promise<void> {
  try {
    await supabase.auth.signOut();
    useAuthStore.getState().setUser(null);
    useProfileStore.getState().setSelectedProfileId(null);
    useProfileStore.getState().setCurrentProfile(null);
  } catch (error) {
    console.error('Error signing out:', error);
    throw new Error('Une erreur est survenue lors de la déconnexion');
  }
}

export async function resetPassword(email: string): Promise<AuthResponse> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`
    });
    
    if (error) throw error;
    return { user: null, error: null };
  } catch (error) {
    return { 
      user: null, 
      error: { 
        message: error instanceof Error ? error.message : 'Une erreur est survenue'
      } 
    };
  }
}