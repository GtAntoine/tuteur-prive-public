import { supabase } from '../supabase/client';
import { uploadImages, deleteImage } from './storage';
import { useProfileStore } from '../stores/profile-store';
import { processFiles } from './file-processing';
import type { HistoryEntry } from '../types';

// src/lib/utils/history.ts

export async function saveToHistory(
  type: 'lesson' | 'correction' | 'guided',
  files: File[],
  data: any
): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { selectedProfileId } = useProfileStore.getState();
  if (!selectedProfileId) {
    throw new Error('No profile selected');
  }

  try {
    // First get the original entry to copy
    /*const { data: originalEntry } = await supabase
      .from('user_history')
      .select('*')
      .eq('id', data.id)
      .single();

    if (!originalEntry) {
      throw new Error('Entry not found');
    }*/

    const { originalFiles } = await processFiles(files);
    const imageUrls = await uploadImages(originalFiles);
    const id = crypto.randomUUID();

    const { error } = await supabase
      .from('user_history')
      .insert([{
        id,
        user_id: user.id,
        profile_id: selectedProfileId,
        type,
        images: imageUrls,
        data,
        timestamp: new Date().toISOString()
      }]);

    if (error) {
      await Promise.all(imageUrls.map(url => deleteImage(url).catch(console.error)));
      throw error;
    }

    return id;
  } catch (error) {
    console.error('Error saving to history:', error);
    throw error instanceof Error ? error : new Error('Failed to save entry to history');
  }
}


export async function getHistory(): Promise<HistoryEntry[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { selectedProfileId } = useProfileStore.getState();
  if (!selectedProfileId) return [];

  const { data, error } = await supabase
    .from('user_history')
    .select('*')
    .eq('user_id', user.id)
    .eq('profile_id', selectedProfileId)
    .order('timestamp', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getHistoryEntry(id: string): Promise<HistoryEntry | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { selectedProfileId } = useProfileStore.getState();
  if (!selectedProfileId) return null;

  const { data, error } = await supabase
    .from('user_history')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .eq('profile_id', selectedProfileId)
    .single();

  if (error) return null;
  return data;
}

export async function updateHistoryEntry(id: string, newData: any): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { selectedProfileId } = useProfileStore.getState();
  if (!selectedProfileId) throw new Error('No profile selected');

  const { error } = await supabase
    .from('user_history')
    .update({ data: newData })
    .eq('id', id)
    .eq('user_id', user.id)
    .eq('profile_id', selectedProfileId);

  if (error) throw error;
}

export async function deleteHistoryEntry(id: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { selectedProfileId } = useProfileStore.getState();
  if (!selectedProfileId) throw new Error('No profile selected');

  console.log("delete")
 
  // Delete the entry
  const { error } = await supabase
    .from('user_history')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

   // First get the entry to get the image URLs
  const { data: entry } = await supabase
    .from('user_history')
    .select('images')
    .eq('id', id)
    .eq('user_id', user.id)
    .eq('profile_id', selectedProfileId)
    .single();

  if (error) throw error;

  // After successful deletion, clean up the images
  if (entry?.images) {
    await Promise.all(entry.images.map(url => deleteImage(url).catch(console.error)));
  }
}