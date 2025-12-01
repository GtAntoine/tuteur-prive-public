// src/lib/utils/history/copy-shared.ts
import { supabase } from '../../supabase/client';
import { useProfileStore } from '../../stores/profile-store';

export async function copySharedEntryToHistory(sharedEntryOrId: any): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { selectedProfileId } = useProfileStore.getState();
  if (!selectedProfileId) {
    throw new Error('No profile selected');
  }

  try {
    console.log("copySharedEntryToHistory", sharedEntryOrId)
    // If we received just an ID, fetch the entry first
    let entryData;
    if (typeof sharedEntryOrId === 'string') {
      const { data: fetchedEntry, error: fetchError } = await supabase
        .from('user_history')
        .select('*')
        .eq('id', sharedEntryOrId)
        .single();

      if (fetchError || !fetchedEntry) {
        throw new Error('Entry not found');
      }
      entryData = fetchedEntry;
    } else {
      entryData = sharedEntryOrId;
    }
    
    const id = crypto.randomUUID();
    const { error } = await supabase
      .from('user_history')
      .insert([{
        id,
        user_id: user.id,
        profile_id: selectedProfileId,
        type: entryData.type,
        images: entryData.images,
        data: entryData.data,
        timestamp: new Date().toISOString()
      }]);

    if (error) throw error;
    return id;
  } catch (error) {
    console.error('Error copying shared entry:', error);
    throw error instanceof Error ? error : new Error('Failed to copy shared entry');
  }
}
