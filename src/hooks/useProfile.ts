import { useState, useEffect } from 'react';
import { getProfile } from '../lib/utils/profiles';
import type { UserProfile } from '../lib/types';

export function useProfile(profileId: string | null) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      if (!profileId) {
        setProfile(null);
        setIsLoading(false);
        return;
      }

      try {
        const data = await getProfile(profileId);
        if (mounted) {
          setProfile(data);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        if (mounted) {
          setProfile(null);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, [profileId]);

  return { profile, isLoading };
}