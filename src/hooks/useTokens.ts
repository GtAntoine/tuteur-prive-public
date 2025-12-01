import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';
import type { AccountTokens } from '../lib/types';

export function useTokens() {
  const [tokens, setTokens] = useState<AccountTokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initializeTokens = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('account_tokens')
        .insert([{
          user_id: userId,
          tokens_remaining: 30,
          last_reset_date: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      setTokens(data);
    } catch (error) {
      console.error('Error initializing tokens:', error);
    }
  };

  const loadTokens = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('account_tokens')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error?.code === 'PGRST116') {
        // No tokens found, initialize them
        await initializeTokens(user.id);
        return;
      }

      if (error) throw error;
      setTokens(data);
    } catch (error) {
      console.error('Error loading tokens:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTokens = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !tokens) return;

      const { error } = await supabase
        .from('account_tokens')
        .update({ 
          tokens_remaining: tokens.tokens_remaining - 1,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;
      
      // Update local state immediately
      setTokens(prev => prev ? {
        ...prev,
        tokens_remaining: prev.tokens_remaining - 1,
        updated_at: new Date().toISOString()
      } : null);
      
    } catch (error) {
      console.error('Error updating tokens:', error);
    }
  };

  useEffect(() => {
    loadTokens();
  }, []);

  return {
    tokens,
    isLoading,
    updateTokens,
    loadTokens
  };
}
