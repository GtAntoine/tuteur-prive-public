import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../supabase/client';
import type { UserProfile } from '../types';

interface ProfileState {
  profiles: UserProfile[];
  selectedProfileId: string | null;
  currentProfile: UserProfile | null;
  isLoading: boolean;
  setProfiles: (profiles: UserProfile[]) => void;
  setSelectedProfileId: (id: string | null) => void;
  setCurrentProfile: (profile: UserProfile | null) => void;
  setLoading: (isLoading: boolean) => void;
  loadProfiles: () => Promise<void>;
  loadSelectedProfile: () => Promise<void>;
  saveSelectedProfile: (profileId: string) => Promise<void>;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profiles: [],
      selectedProfileId: null,
      currentProfile: null,
      isLoading: false,
      lastLoadTime: 0, // Ajouter un timestamp du dernier chargement
      isInitialized: false, // Initialiser à false

      setProfiles: (profiles) => set({ profiles }),
      setSelectedProfileId: (id) => set({ selectedProfileId: id }),
      setCurrentProfile: (profile) => set({ currentProfile: profile }),
      setLoading: (isLoading) => set({ isLoading }),

      loadProfiles: async () => {
        const now = Date.now();
        const lastLoad = get().lastLoadTime;
        const CACHE_DURATION = 5000; // 5 secondes de cache
        // Si les données sont en cache et récentes, ne pas recharger
        if ((now - lastLoad) < CACHE_DURATION) {
            return;
        }

        console.log("load user")
        try {
          set({ isLoading: true });
          const { data: { user } } = await supabase.auth.getUser();
        
          if (!user) {
            set({ 
              profiles: [],
              isInitialized: true,
              lastLoadTime: now 
            });
            return;
          }

          const { data: profiles, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: true });

          if (error) throw error;
          
          set({ 
            profiles: profiles || [],
            lastLoadTime: now, // Mettre à jour le timestamp
            isInitialized: true // Marquer comme initialisé
          });

          // Charger le profil sélectionné seulement si nécessaire
          if (!get().selectedProfileId) {
            await get().loadSelectedProfile();
          }
        } catch (error) {
          console.error('Error loading profiles:', error);
          set({ profiles: [] });
        } finally {
          set({ isLoading: false });
        }
      },

      loadSelectedProfile: async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return;

          const { data: selectedProfile } = await supabase
            .from('user_selected_profile')
            .select('profile_id')
            .eq('user_id', user.id)
            .single();

          if (selectedProfile?.profile_id) {
            set({ selectedProfileId: selectedProfile.profile_id });
            const currentProfile = get().profiles.find(p => p.id === selectedProfile.profile_id);
            if (currentProfile) {
              set({ currentProfile });
            }
          }
        } catch (error) {
          console.error('Error loading selected profile:', error);
        }
      },

      saveSelectedProfile: async (profileId: string) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        try {
          const { error } = await supabase
            .from('user_selected_profile')
            .upsert({
              user_id: user.id,
              profile_id: profileId,
              updated_at: new Date().toISOString()
            });

          if (error) throw error;

          set({ selectedProfileId: profileId });
          const profile = get().profiles.find(p => p.id === profileId);
          if (profile) {
            set({ currentProfile: profile });
          }
        } catch (error) {
          console.error('Error saving selected profile:', error);
          throw error;
        }
      }
    }),
    {
      name: 'profile-store',
      partialize: (state) => ({
        selectedProfileId: state.selectedProfileId,
        currentProfile: state.currentProfile,
        profiles: state.profiles, // Ajouter les profils à la persistance
        lastLoadTime: state.lastLoadTime, // Persister aussi le timestamp
         isInitialized: state.isInitialized // Persister aussi l'état d'initialisation
      })
    }
  )
);