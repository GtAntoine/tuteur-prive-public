import { supabase } from '../../supabase/client';
import type { HistoryEntry } from '../../types';

export async function getHistory(): Promise<HistoryEntry[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('user_history')
    .select('*, profiles:profile_id(*)')
    .eq('user_id', user.id)
    .order('timestamp', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getHistoryEntry(id: string): Promise<HistoryEntry | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('user_history')
    .select('*, profiles:profile_id(*)')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error) return null;
  return data;
}

export async function updateHistoryEntry(id: string, newData: any): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
console.log("newData", newData)
  const { error } = await supabase
    .from('user_history')
    .update({ data: newData })
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;
}

export async function deleteHistoryEntry(id: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  console.log("delete")
  const { error } = await supabase
    .from('user_history')
    .delete()
    .eq('id', id);

  if (error) throw error;
}