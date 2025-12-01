import { supabase } from '../../supabase/client';
import { uploadImages, deleteImage } from '../storage';
import { useProfileStore } from '../../stores/profile-store';
import type { HistoryEntry } from '../../types';

export async function saveToHistory(
  type: 'lesson' | 'correction' | 'guided',
  files: File[],
  data: any
): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Get current profile ID from store
  const { selectedProfileId } = useProfileStore.getState();
  if (!selectedProfileId) {
    throw new Error('No profile selected');
  }

  try {
    // Upload images
    const imageUrls = await uploadImages(files);
    const id = crypto.randomUUID();
console.log("saveToHistory profile_id", profile_id)
    
    const { error } = await supabase
      .from('user_history')
      .insert([{
        id,
        user_id: user.id,
        profile_id: selectedProfileId, // Add profile_id here
        type,
        images: imageUrls,
        data,
        timestamp: new Date().toISOString()
      }]);

    if (error) {
      // Clean up uploaded images if database insert fails
      await Promise.all(imageUrls.map(url => deleteImage(url).catch(console.error)));
      throw error;
    }

    return id;
  } catch (error) {
    console.error('Error saving to history:', error);
    throw error instanceof Error ? error : new Error('Failed to save entry to history');
  }
}