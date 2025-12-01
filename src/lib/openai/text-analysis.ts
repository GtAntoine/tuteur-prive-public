import { secureOpenAI } from './secure-client';
import { MODELS } from './constants';

export async function analyzeLessonText(text: string): Promise<string> {
  try {
    const response = await secureOpenAI.chat.completions.create({
      model: MODELS.CHAT,
      messages: [
        {
          role: "user",
          content: `Please analyze this lesson text and provide:
            1. A simple summary that a young student can understand
            2. 3 practice questions to test understanding
            3. Constructive feedback on the content
            
            Text: ${text}`
        }
      ]
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Error in analyzeLessonText:', error);
    throw new Error('Failed to analyze lesson text. Please try again later.');
  }
}