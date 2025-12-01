import { secureOpenAI } from './secure-client';
import { MODELS } from './constants';
import { convertAudioToMp3 } from '../utils/audio-conversion';

export async function validateAnswer(question: string, userAnswer: string, expectedAnswer: string): Promise<string> {
  try {
    const response = await secureOpenAI.chat.completions.create({
      model: MODELS.CHAT,
      messages: [
        {
          role: "system",
          content: `Tu es un professeur bienveillant qui évalue les réponses des élèves.
          Ne dit pas "L'élève" a mais "Tu as". Tu parles directement à l'élève.
          
          Compare la réponse de l'élève avec la réponse attendue et fournis ton évaluation sous forme de JSON :
          
          {
            "isCorrect": true|false,
            "explanation": "Explication détaillée de l'évaluation",
            "suggestions": [
              "Suggestion d'amélioration 1",
              "Suggestion d'amélioration 2"
            ]
          }`
        },
        {
          role: "user",
          content: `Question : ${question}
Réponse attendue : ${expectedAnswer}
Réponse de l'élève : ${userAnswer}

Évalue cette réponse de manière constructive et encourageante.`
        }
      ]
    });

    return response.choices[0].message.content || JSON.stringify({
      isCorrect: false,
      explanation: "Désolé, je n'ai pas pu évaluer la réponse."
    });
  } catch (error) {
    console.error('Error validating answer:', error);
    throw new Error('Impossible d\'évaluer la réponse. Veuillez réessayer plus tard.');
  }
}


export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  try {
    // Convertir l'audio en MP3 (format supporté par l'API)
    const mp3Blob = await convertAudioToMp3(audioBlob);
    
    const audioFile = new File([mp3Blob], 'audio.mp3', { 
      type: 'audio/mpeg'
    });
    
    const response = await secureOpenAI.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'fr'
    });

    return response.text;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw new Error('Impossible de transcrire l\'audio. Veuillez réessayer.');
  }
}