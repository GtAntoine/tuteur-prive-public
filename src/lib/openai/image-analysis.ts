import { secureOpenAI } from './secure-client';
import { MODELS } from './constants';
import { prepareImagesForAPI } from './image-utils';
import type { AnalyzeImagesParams } from './types';

export async function analyzeImages({
  images,
  question = "What are in these images? Please explain in simple terms for young students."
}: AnalyzeImagesParams): Promise<string> {
  try {
    const preparedImages = await prepareImagesForAPI(images);

    const response = await secureOpenAI.chat.completions.create({
      model: MODELS.VISION,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: question },
            ...preparedImages.map(url => ({
              type: "image_url",
              image_url: { url }
            }))
          ]
        }
      ]
    });

    return response.choices[0].message.content || "I couldn't analyze the images. Please try again.";
  } catch (error) {
    console.error('Error in analyzeImages:', error);
    throw new Error('Failed to analyze images. Please try again later.');
  }
}