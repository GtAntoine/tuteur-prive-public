import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

// Use the same local worker configuration
GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export async function convertPDFToImages(pdfFile: File): Promise<string[]> {
  try {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    const images: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2.0 });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) continue;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;

      const base64Image = canvas.toDataURL('image/jpeg', 0.95);
      images.push(base64Image);
    }

    return images;
  } catch (error) {
    console.error('Erreur lors de la conversion du PDF:', error);
    throw new Error('Impossible de convertir le PDF en images');
  }
}