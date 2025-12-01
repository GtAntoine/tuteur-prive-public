import { blobToBase64 } from '../utils/blob';

export async function prepareImagesForAPI(images: string[]): Promise<string[]> {
  try {
    return await Promise.all(
      images.map(async (url) => {
        if (url.startsWith('blob:')) {
          const response = await fetch(url);
          const blob = await response.blob();
          return await blobToBase64(blob);
        }
        return url;
      })
    );
  } catch (error) {
    console.error('Error preparing images:', error);
    throw new Error('Failed to prepare images for analysis');
  }
}