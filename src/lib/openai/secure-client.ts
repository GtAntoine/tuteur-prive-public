import { supabase } from '../supabase/client';

interface ChatCompletionMessage {
  role: 'system' | 'user' | 'assistant';
  content: any;
}

interface ChatCompletionResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface TranscriptionResponse {
  text: string;
}

/**
 * Secure OpenAI client that calls Supabase Edge Functions
 * instead of exposing the API key on the frontend
 */
export const secureOpenAI = {
  chat: {
    completions: {
      async create(params: {
        model: string;
        messages: ChatCompletionMessage[];
        max_completion_tokens?: number;
      }): Promise<ChatCompletionResponse> {
        const { data, error } = await supabase.functions.invoke('openai-chat', {
          body: {
            model: params.model,
            messages: params.messages,
            max_tokens: params.max_completion_tokens,
          },
        });

        if (error) {
          console.error('Error calling openai-chat function:', error);
          throw new Error(`Erreur lors de l'appel à l'API: ${error.message}`);
        }

        if (!data) {
          throw new Error('La réponse de l\'API est vide');
        }

        return data as ChatCompletionResponse;
      },
    },
  },
  audio: {
    transcriptions: {
      async create(params: {
        file: File;
        model: string;
        language?: string;
      }): Promise<TranscriptionResponse> {
        const formData = new FormData();
        formData.append('file', params.file);
        formData.append('model', params.model);
        if (params.language) {
          formData.append('language', params.language);
        }

        const { data, error } = await supabase.functions.invoke('openai-transcribe', {
          body: formData,
        });

        if (error) {
          console.error('Error calling openai-transcribe function:', error);
          throw new Error(`Erreur lors de la transcription: ${error.message}`);
        }

        if (!data) {
          throw new Error('La réponse de transcription est vide');
        }

        return data as TranscriptionResponse;
      },
    },
  },
};
