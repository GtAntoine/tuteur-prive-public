// Import individual prompt files
import { lessonAnalysisPrompt } from './lesson-analysis';
import { exerciseCorrectionPrompt } from './exercise-correction';
import { guidedHelpPrompt } from './guided-help';

// Create a combined systemPrompts object for backward compatibility
export const systemPrompts = {
  lessonAnalysis: lessonAnalysisPrompt,
  exerciseCorrection: exerciseCorrectionPrompt,
  guidedHelp: guidedHelpPrompt
};

// Export individual prompts for direct import
export { lessonAnalysisPrompt, exerciseCorrectionPrompt, guidedHelpPrompt };