import { useNavigate } from 'react-router-dom';
import { useProfileStore } from '../lib/stores/profile-store';

export function useAuthNavigation() {
  const navigate = useNavigate();
  const { loadProfiles, profiles } = useProfileStore();

  const handleAuthSuccess = async () => {
    try {
      // Load profiles first
      await loadProfiles();
      
      // Check if there are any profiles
      if (profiles.length > 0) {
        navigate('/app', { replace: true });
      } else {
        navigate('/profiles', { replace: true });
      }
    } catch (error) {
      console.error('Navigation error:', error);
      navigate('/profiles', { replace: true });
    }
  };

  return { handleAuthSuccess };
}