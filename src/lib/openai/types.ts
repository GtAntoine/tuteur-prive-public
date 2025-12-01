export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | Array<{
    type: 'text' | 'image_url' | 'file_url';
    text?: string;
    image_url?: {
      url: string;
    };
    file_url?: {
      url: string;
      type: string;
    };
  }>;
}

export interface AnalyzeImagesParams {
  images: string[];
  question?: string;
}

export interface ImageAnalysisResponse {
  content: string;
}