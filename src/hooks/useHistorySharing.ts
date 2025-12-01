// src/hooks/useHistorySharing.ts
import { useState } from 'react';
import { supabase } from '../lib/supabase/client';

export function useHistorySharing() {
  const [isSharing, setIsSharing] = useState(false);

  const shareEntry = async (id: string) => {
    try {
      setIsSharing(true);
      const { error } = await supabase
        .from('user_history')
        .update({ 
          is_public: true,
          shared_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error sharing entry:', error);
      return false;
    } finally {
      setIsSharing(false);
    }
  };

  return {
    isSharing,
    shareEntry
  };
}
