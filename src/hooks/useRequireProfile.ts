import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileStore } from '../lib/stores/profile-store';

export function useRequireProfile() {
  const navigate = useNavigate();
  const { selectedProfileId, loadSelectedProfile, isLoading } = useProfileStore();

  useEffect(() => {
    if (!selectedProfileId && !isLoading) {
      navigate('/profiles');
    }
  }, [selectedProfileId, isLoading, navigate]);

  return { selectedProfileId, isLoading };
}