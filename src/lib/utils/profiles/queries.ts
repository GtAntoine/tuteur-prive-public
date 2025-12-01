import { supabase } from '../../supabase/client';
import type { UserProfile } from '../../types';
import type { ProfileData } from './types';
import { validateProfileData } from './validation';

export async function getProfiles(): Promise<UserProfile[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getProfile(id: string): Promise<UserProfile | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error) return null;
  return data;
}

export async function createProfile(profileData: ProfileData): Promise<UserProfile> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  validateProfileData(profileData);

  const { data, error } = await supabase
    .from('user_profiles')
    .insert([{
      user_id: user.id,
      name: profileData.name,
      grade: profileData.grade,
      avatar_color: profileData.avatar_color,
      avatar_id: profileData.avatar_id
    }])
    .select()
    .single();

  if (error) throw error;
  if (!data) throw new Error('Failed to create profile');

  return data;
}

export async function updateProfile(id: string, profileData: Partial<ProfileData>): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('user_profiles')
    .update({
      name: profileData.name,
      grade: profileData.grade,
      avatar_color: profileData.avatar_color,
      avatar_id: profileData.avatar_id,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;
}

export async function deleteProfile(id: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('user_profiles')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;
}