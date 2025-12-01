import { supabase } from '../../supabase/client';

export async function saveSelectedProfile(profileId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  console.log("saveSelectedProfile user_selected_profile")
  const { error } = await supabase
    .from('user_selected_profile')
    .upsert([{
      user_id: user.id,
      profile_id: profileId,
      updated_at: new Date().toISOString()
    }]);

  if (error) throw error;
}

export async function getSelectedProfile(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  console.log("getSelectedProfile user_selected_profile")

  const { data, error } = await supabase
    .from('user_selected_profile')
    .select('profile_id')
    .eq('user_id', user.id)
    .single();

  if (error) return null;
  return data?.profile_id || null;
}

export async function clearSelectedProfile(): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
console.log("clearSelectedProfile user_selected_profile")
  
  const { error } = await supabase
    .from('user_selected_profile')
    .delete()
    .eq('user_id', user.id);

  if (error) throw error;
}