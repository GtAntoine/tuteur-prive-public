// src/lib/openai/image-processing.ts
export async function prepareImagesForOpenAI(files: File[]): Promise<string[]> {
  const processedImages = await Promise.all(
    files.map(async (file) => {
      // Convertir en base64 pour OpenAI
      const reader = new FileReader();
      return new Promise<string>((resolve, reject) => {
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('Failed to convert image to base64'));
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    })
  );

  return processedImages;
}
