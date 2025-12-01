import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import mammoth from 'mammoth';

// Configure PDF.js worker
GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export async function extractTextFromFile(file: File): Promise<string> {
  try {
    switch (file.type) {
      case 'text/plain':
        return await file.text();
        
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        const buffer = await file.arrayBuffer();
        try {
          const result = await mammoth.extractRawText({ arrayBuffer: buffer });
          return result.value || `[Document Word vide]`;
        } catch (error) {
          console.error('Erreur lors de l\'extraction du texte Word:', error);
          return `[Erreur de lecture du document Word]`;
        }
        
      default:
        return '';
    }
  } catch (error) {
    console.error('Erreur lors de l\'extraction du texte:', error);
    return '';
  }
}