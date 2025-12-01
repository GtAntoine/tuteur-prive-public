import { processImagesForUpload } from './image-processing';
import { uploadImage } from './image-upload';
import { validateFiles } from '../file-validation';

export async function uploadImages(files: File[]): Promise<string[]> {
  try {
    // Valider les fichiers
    const validatedFiles = validateFiles(files);
    
    // Traiter les images avant l'upload
    const processedFiles = await processImagesForUpload(validatedFiles);
    
    // Upload des fichiers traités
    const uploadPromises = processedFiles.map(file => uploadImage(file));
    const results = await Promise.allSettled(uploadPromises);
    
    // Filtrer les uploads réussis
    const successfulUploads = results
      .filter((result): result is PromiseFulfilledResult<string> => 
        result.status === 'fulfilled'
      )
      .map(result => result.value);

    if (successfulUploads.length === 0) {
      throw new Error('Aucun fichier n\'a pu être uploadé');
    }

    return successfulUploads;
  } catch (error) {
    console.error('Erreur lors de l\'upload des images:', error);
    throw error instanceof Error ? error : new Error('Échec de l\'upload des images');
  }
}
