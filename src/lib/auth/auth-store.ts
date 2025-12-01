import { create } from 'zustand';
import type { AuthUser } from '../types';

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  selectedProfileId: string | null;
  setUser: (user: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setSelectedProfileId: (profileId: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  selectedProfileId: null,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setSelectedProfileId: (profileId) => set({ selectedProfileId }),
}));