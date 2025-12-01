import OpenAI from 'openai';

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface AnalyzeImagesParams {
  images: string[];
  question?: string;
}

export async function analyzeImages({ images, question = "What are in these images? Please explain in simple terms for young students." }: AnalyzeImagesParams) {
  try {
    const messages = [
      {
        role: "system" as const,
        content: "You are a friendly and supportive tutor for young students aged 6-14. Explain concepts in simple, clear terms that children can understand."
      },
      {
        role: "user" as const,
        content: [
          { type: "text", text: question },
          ...images.map(url => ({
            type: "image_url",
            image_url: { url }
          }))
        ]
      }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages,
      max_tokens: 500
    });

    return response.choices[0].message.content || "I couldn't analyze the images. Please try again.";
  } catch (error) {
    console.error('Error in analyzeImages:', error);
    throw new Error('Failed to analyze images. Please try again later.');
  }
}