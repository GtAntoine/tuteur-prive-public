// src/hooks/useAuth.ts
import { useAuthStore } from '../lib/stores/auth-store';
import { useProfileStore } from '../lib/stores/profile-store';

export function useAuth() {
  const { user, isLoading: authLoading } = useAuthStore();
  const { 
    selectedProfileId, 
    currentProfile,
    isLoading: profileLoading 
  } = useProfileStore();
  
  const isAuthenticated = !!user;
  const isLoading = authLoading || profileLoading;

  return {
    user,
    isLoading,
    isAuthenticated,
    selectedProfileId,
    currentProfile
  };
}
