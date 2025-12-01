import { secureOpenAI } from './secure-client';
import { MODELS } from './constants';
import { systemPrompts } from './prompts';
import type { OpenAIMessage } from './types';
import { useProfileStore } from '../stores/profile-store';

function prepareContentForAPI(files: Array<{ type: string; content: string }>) {
  const messages = [];
  let textContent = '';

  // Combine all text content first
  for (const file of files) {
    if (file.type === 'text') {
      textContent += file.content + '\n\n';
    }
  }

  // Add text content first if exists
  if (textContent.trim()) {
    messages.push({
      type: "text",
      text: textContent.trim()
    });
  }

  // Then add images
  for (const file of files) {
    if (file.type === 'image') {
      messages.push({
        type: "image_url",
        image_url: { url: file.content }
      });
    }
  }

  return messages;
}

export async function analyzeLessonContent(
  text: string, 
  files: Array<{ type: string; content: string }> = [],
  currentLang: string = 'fr',
  studentGrade: string = 'CM1'
): Promise<string> {
  try {
    const content = prepareContentForAPI(files);
    
    // Get the appropriate prompt for the current language
    const prompt = systemPrompts.lessonAnalysis[currentLang] || systemPrompts.lessonAnalysis.fr;
    
    const messages: OpenAIMessage[] = [
      {
        role: "system",
        content: `${prompt}\n\nNiveau de l'élève : ${studentGrade}`
      },
      {
        role: "user",
        content: [
          ...content,
          text ? {
            type: "text",
            text: `Contenu textuel supplémentaire : ${text}`
          } : null
        ].filter(Boolean)
      }
    ];

    const response = await secureOpenAI.chat.completions.create({
      model: MODELS.CHAT,
      messages,
      max_completion_tokens: 20000,
    });

    if (!response.choices[0]?.message?.content) {
      throw new Error('La réponse de l\'API est vide ou invalide.');
    }

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Erreur lors de l\'analyse:', error);
    if (error instanceof Error) {
      throw new Error(`Erreur d'analyse: ${error.message}`);
    }
    throw new Error('Une erreur inattendue est survenue lors de l\'analyse.');
  }
}

export async function analyzeExerciseCorrection(
  text: string, 
  files: Array<{ type: string; content: string }> = [],
  currentLang: string = 'fr',
  studentGrade: string = 'CM1'
): Promise<string> {
  try {
    const content = prepareContentForAPI(files);
    
    // Get the appropriate prompt for the current language
    const prompt = systemPrompts.exerciseCorrection[currentLang] || systemPrompts.exerciseCorrection.fr;
    
    const messages: OpenAIMessage[] = [
      {
        role: "system",
        content: `${prompt}\n\nNiveau de l'élève : ${studentGrade}`
      },
      {
        role: "user",
        content: [
          ...content,
          text ? {
            type: "text",
            text: `Contenu textuel supplémentaire : ${text}`
          } : null
        ].filter(Boolean)
      }
    ];

    const response = await secureOpenAI.chat.completions.create({
      model: MODELS.CHAT,
      messages,
      max_completion_tokens: 20000
    });

    if (!response.choices[0]?.message?.content) {
      throw new Error('La réponse de l\'API est vide ou invalide.');
    }

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Erreur lors de l\'analyse:', error);
    if (error instanceof Error) {
      throw new Error(`Erreur d'analyse: ${error.message}`);
    }
    throw new Error('Une erreur inattendue est survenue lors de l\'analyse.');
  }
}

export async function provideGuidedHelp(
  text: string, 
  files: Array<{ type: string; content: string }> = [],
  currentLang: string = 'fr',
  studentGrade: string = 'CM1'
): Promise<string> {
  try {
    const content = prepareContentForAPI(files);
    
    // Get the appropriate prompt for the current language
    const prompt = systemPrompts.guidedHelp[currentLang] || systemPrompts.guidedHelp.fr;
    
    const messages: OpenAIMessage[] = [
      {
        role: "system",
        content: `${prompt}\n\nNiveau de l'élève : ${studentGrade}`
      },
      {
        role: "user",
        content: [
          ...content,
          text ? {
            type: "text",
            text: `Contenu textuel supplémentaire : ${text}`
          } : null
        ].filter(Boolean)
      }
    ];

    const response = await secureOpenAI.chat.completions.create({
      model: MODELS.CHAT,
      messages,
      max_completion_tokens: 20000
    });

    if (!response.choices[0]?.message?.content) {
      throw new Error('La réponse de l\'API est vide ou invalide.');
    }

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Erreur lors de l\'analyse:', error);
    if (error instanceof Error) {
      throw new Error(`Erreur d'analyse: ${error.message}`);
    }
    throw new Error('Une erreur inattendue est survenue lors de l\'analyse.');
  }
}
