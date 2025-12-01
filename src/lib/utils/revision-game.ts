import type { HistoryEntry, GameQuestion } from '../types';

export function getQuestionsFromHistory(history: HistoryEntry[]): GameQuestion[] {
  // Return empty array if history is not valid
  if (!Array.isArray(history)) {
    console.warn('Invalid history data provided to getQuestionsFromHistory');
    return [];
  }

  const questions: GameQuestion[] = [];
  const seenQuestions = new Set<string>();

  // Filter only lesson entries and ensure data exists
  history
    .filter(entry => entry.type === 'lesson' && entry.data)
    .forEach(entry => {
      if ('qcm_questions' in entry.data && Array.isArray(entry.data.qcm_questions)) {
        const title = entry.data.lesson_analysis?.title || 'Leçon sans titre';
        
        entry.data.qcm_questions.forEach(q => {
          // Validate question object
          if (!q.question || !q.correctAnswer || !Array.isArray(q.options)) {
            return;
          }

          // Create unique key
          const questionKey = `${q.question}_${q.correctAnswer}`;
          
          if (!seenQuestions.has(questionKey)) {
            seenQuestions.add(questionKey);
            
            // Calculate priority based on answer correctness
            const priority = q.userAnswer 
              ? (q.userAnswer === q.correctAnswer ? 1 : 2)
              : 0;
            
            questions.push({
              question: q.question,
              options: q.options,
              correctAnswer: q.correctAnswer,
              priority,
              lessonTitle: title
            });
          }
        });
      }
    });

  // Sort by priority (incorrect answers first)
  return questions.sort((a, b) => b.priority - a.priority);
}
