import { MAX_IMAGE_SIZE, JPEG_QUALITY } from '../constants/files';

export async function processImageForUpload(file: File | null): Promise<File | null> {
  // Early return if file is null or not an image
  if (!file || !file.type.startsWith('image/')) {
    return null;
  }

  try {
    // Create image and wait for load
    const img = new Image();
    const imageUrl = URL.createObjectURL(file);

    return new Promise((resolve, reject) => {
      img.onload = () => {
        URL.revokeObjectURL(imageUrl);

        // Calculate new dimensions
        let width = img.width;
        let height = img.height;
        
        if (width > MAX_IMAGE_SIZE || height > MAX_IMAGE_SIZE) {
          if (width > height) {
            height = Math.round(height * (MAX_IMAGE_SIZE / width));
            width = MAX_IMAGE_SIZE;
          } else {
            width = Math.round(width * (MAX_IMAGE_SIZE / height));
            height = MAX_IMAGE_SIZE;
          }
        }

        // Create canvas for resizing
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to create canvas context'));
          return;
        }

        // Improve resize quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw resized image
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to Blob with JPEG compression
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to convert to Blob'));
              return;
            }
            // Create new File with same name
            const processedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: file.lastModified
            });
            resolve(processedFile);
          },
          'image/jpeg',
          JPEG_QUALITY
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(imageUrl);
        reject(new Error(`Failed to load image ${file.name}`));
      };

      img.src = imageUrl;
    });
  } catch (error) {
    console.error('Error processing image:', error);
    return null;
  }
}

// Process multiple images
export async function processImagesForUpload(files: File[]): Promise<File[]> {
  if (!Array.isArray(files)) {
    console.error('Invalid files array provided to processImagesForUpload');
    return [];
  }

  const processedFiles = await Promise.all(
    files.map(async (file) => {
      try {
        const processed = await processImageForUpload(file);
        return processed || file; // Return original file if processing fails
      } catch (error) {
        console.error(`Error processing ${file.name}:`, error);
        return file; // Return original file on error
      }
    })
  );

  return processedFiles.filter(Boolean) as File[];
}

export async function resizeImage(file: File | null): Promise<string | null> {
  if (!file) {
    return null;
  }

  try {
    const processedFile = await processImageForUpload(file);
    if (!processedFile) {
      return null;
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert to base64'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(processedFile);
    });
  } catch (error) {
    console.error('Error resizing image:', error);
    return null;
  }
}