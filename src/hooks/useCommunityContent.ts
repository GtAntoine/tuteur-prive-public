import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';
import { copySharedEntryToHistory } from '../lib/utils/history/copy-shared';
import { useAuth } from '../hooks/useAuth';

interface CommunityFilters {
  subject?: string;
  type?: 'lesson' | 'correction' | 'guided';
  grade?: string;
  period: 'weekly' | 'monthly' | 'all_time';
}

export function useCommunityContent(filters: CommunityFilters) {
  const [content, setContent] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentProfile } = useAuth();

  console.log("currentProfile", currentProfile)
  useEffect(() => {
    if (currentProfile) {
      loadContent();
      loadRankings();
    }
  }, [filters, currentProfile]);

  const loadContent = async () => {
    try {
      setIsLoading(true);
      
      let query = supabase
        .from('user_history')
        .select(`
          *,
          profiles:profile_id(*),
          user_profiles!inner(id, name, grade),
          likes:user_likes(count)
        `)
        .eq('is_public', true)
        .eq('user_profiles.grade', filters.grade || currentProfile?.grade) // Use filter grade or default to user's grade
        .order('timestamp', { ascending: false })
        .limit(100); // Limit to 100 results

      // Apply additional filters if specified
      if (filters.subject) {
        query = query.eq('data->subject', filters.subject);
      }
      if (filters.type) {
        query = query.eq('type', filters.type);
      }

      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      setContent(data || []);
    } catch (error) {
      console.error('Error loading community content:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadRankings = async () => {
    try {
      let query = supabase
        .from('user_scores')
        .select(`
          *,
          profiles:profile_id(*)
        `)
        .eq('period_type', filters.period)
        .eq('profiles.grade', filters.grade || currentProfile?.grade) // Filter rankings by grade
        .order('score', { ascending: false })
        .limit(10);

      const { data, error } = await query;

      if (error) throw error;
      setRankings(data || []);
    } catch (error) {
      console.error('Error loading rankings:', error);
    }
  };

  // Rest of the code remains the same...
  const handleLike = async (historyId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_likes')
        .insert({ user_id: user.id, history_id: historyId });

      if (error) throw error;
      await loadContent(); // Reload content after liking
    } catch (error) {
      console.error('Error liking content:', error);
    }
  };

  const handleSaveToHistory = async (historyId: string) => {
    try {
      await copySharedEntryToHistory(historyId);
      // Show success message or handle UI feedback
    } catch (error) {
      console.error('Error saving to history:', error);
       throw error; // Re-throw to handle in the UI
    }
  };

  return {
    content,
    rankings,
    isLoading,
    error,
    handleLike,
    handleSaveToHistory
  };
}
