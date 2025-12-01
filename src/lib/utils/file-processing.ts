import { processImageForUpload } from './image-processing';
import { convertPDFToImages } from './pdf-processing';
import { prepareImagesForOpenAI } from '../openai/image-processing';

interface ProcessedFiles {
  files: Array<{
    type: string;
    content: string;
  }>;
  originalFiles: File[];
}

export async function processFiles(files: File[]): Promise<ProcessedFiles> {
  if (!Array.isArray(files) || files.length === 0) {
    throw new Error('No valid files provided');
  }

  try {
    const processedFiles = [];
    const originalFiles: File[] = [];

    for (const file of files) {
      if (!file || !(file instanceof File)) {
        console.warn('Invalid file object encountered, skipping...');
        continue;
      }

      try {
        if (file.type === 'application/pdf') {
          const pdfImages = await convertPDFToImages(file);
          for (const image of pdfImages) {
            if (image) {
              processedFiles.push({
                type: 'image',
                content: image
              });
              // Convert base64 to File for storage
              const response = await fetch(image);
              const blob = await response.blob();
              originalFiles.push(new File([blob], `${file.name}-${processedFiles.length}.jpg`, { type: 'image/jpeg' }));
            }
          }
        } 
        else if (file.type.startsWith('image/')) {
          const processedImage = await processImageForUpload(file);
          if (processedImage) {
            const base64Image = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                if (typeof reader.result === 'string') {
                  resolve(reader.result);
                } else {
                  reject(new Error('Failed to convert image to base64'));
                }
              };
              reader.onerror = reject;
              reader.readAsDataURL(processedImage);
            });

            processedFiles.push({
              type: 'image',
              content: base64Image
            });
            originalFiles.push(processedImage);
          }
        }
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
      }
    }

    if (processedFiles.length === 0) {
      throw new Error('No content could be extracted from the files');
    }

    return { 
      files: processedFiles,
      originalFiles 
    };
  } catch (error) {
    console.error('Error processing files:', error);
    throw error;
  }
}