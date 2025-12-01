import type { SubjectId } from '../types';
import { SUBJECTS } from '../constants/subjects';

// Normalize subject ID to match SUBJECTS keys
export function normalizeSubjectId(subject: string): SubjectId {
  // Convert to uppercase and replace dashes with underscores
  const normalizedId = subject.toUpperCase().replace(/-/g, '_') as SubjectId;
  return SUBJECTS[normalizedId] ? normalizedId : 'FRENCH'; // Default to FRENCH if invalid
}

// Get subject from data, handling both nested and root level subjects
export function getSubjectFromData(data: any): SubjectId | undefined {
  if (!data) return undefined;
  
  // Check root level subject first
  if (data.subject) {
    return normalizeSubjectId(data.subject);
  }
  
  // Check nested subjects
  if (data.lesson_analysis?.subject) {
    return normalizeSubjectId(data.lesson_analysis.subject);
  }
  
  if (data.exercise_analysis?.subject) {
    return normalizeSubjectId(data.exercise_analysis.subject);
  }
  
  return undefined;
}