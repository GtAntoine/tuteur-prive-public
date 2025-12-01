import { supabase } from '../../supabase/client';

export async function uploadImage(file: File): Promise<string> {
  if (!file || !(file instanceof File)) {
    throw new Error('Invalid file provided');
  }

  try {
    // Générer un nom de fichier unique
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    // Upload du fichier
    const { error: uploadError, data } = await supabase.storage
      .from('user_images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    if (!data?.path) {
      throw new Error('Upload successful but no path returned');
    }

    // Récupérer l'URL publique
    const { data: { publicUrl } } = supabase.storage
      .from('user_images')
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
}

export async function deleteImage(url: string): Promise<void> {
  if (!url) {
    throw new Error('No URL provided');
  }

  try {
    // Extraire le nom du fichier de l'URL
    const fileName = url.split('/').pop();
    if (!fileName) {
      throw new Error('Invalid image URL');
    }

    const { error } = await supabase.storage
      .from('user_images')
      .remove([fileName]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error in deleteImage:', error);
    throw new Error(`Failed to delete image: ${error.message}`);
  }
}