import { supabase } from '../supabase/client';

export async function uploadImage(file: File): Promise<string> {
  if (!file || !(file instanceof File)) {
    throw new Error('Invalid file provided');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('user_images')
    .upload(filePath, file);

  if (uploadError) {
    throw new Error(`Error uploading file: ${uploadError.message}`);
  }

  const { data: { publicUrl } } = supabase.storage
    .from('user_images')
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function deleteImage(url: string): Promise<void> {
  if (!url) throw new Error('No URL provided');
  
  const path = url.split('/').pop();
  if (!path) throw new Error('Invalid image URL');

  const { error } = await supabase.storage
    .from('user_images')
    .remove([path]);

  if (error) {
    throw new Error(`Error deleting image: ${error.message}`);
  }
}

export async function uploadImages(files: File[]): Promise<string[]> {
  console.log("uploadImages 1")
  if (!Array.isArray(files) || files.length === 0) {
    throw new Error('No valid files provided for upload');
  }
  console.log("uploadImages 2")
  const validFiles = files.filter(file => file instanceof File);
  if (validFiles.length === 0) {
    throw new Error('No valid files to upload');
  }

  const uploadPromises = validFiles.map(async (file) => {
    try {
      console.log("uploadImages 3")
      return await uploadImage(file);
    } catch (error) {
      console.log("uploadImages 4")
      console.error(`Error uploading file ${file.name}:`, error);
      throw error;
    }
  });

  return Promise.all(uploadPromises);
}