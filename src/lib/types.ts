import type { Grade } from './constants/grades';

export type SubjectId = 'FRENCH' | 'MATH' | 'HISTORY_GEO' | 'ENGLISH' | 'EMC' | 'SCIENCE' | 'SVT' | 'PHYSIQUE_CHIMIE';

export interface AuthUser {
  id: string;
  email: string;
  created_at: string;
}

export interface AuthError {
  message: string;
}

export interface AuthResponse {
  user: AuthUser | null;
  error: AuthError | null;
}

export interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  grade: Grade;
  avatar_color: string;
  avatar_id?: string;
  created_at: string;
  updated_at: string;
}

export interface HistoryEntry {
  id: string;
  user_id: string;
  profile_id: string;
  type: 'lesson' | 'correction' | 'guided';
  data: any;
  images: string[];
  timestamp: string;
  is_public?: boolean;
  shared_at?: string;
}

export interface HistoryFilters {
  subject?: SubjectId;
  type?: 'lesson' | 'correction' | 'guided';
}

export interface GameQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  priority: number;
  lessonTitle: string;
}

export interface AccountTokens {
  user_id: string;
  tokens_remaining: number;
  last_reset_date: string;
  updated_at: string;
}

export interface QCMQuestion {
  question: string;
  options: string[] | Record<string, string>; // Support both old (array) and new (key-value) format
  correctAnswer: string; // In new format, this is a key (A, B, C, D); in old format, it's the full answer text
  explanation?: string;
  userAnswer?: string;
}

export interface UnderstandingQuestion {
  question: string;
  topic: string;
  hint: string;
  answer: string;
  userAnswer?: string;
  feedback?: {
    isCorrect: boolean;
    explanation: string;
    suggestions?: string[];
  };
}

export interface LessonResponse {
  subject: SubjectId;
  lesson_analysis: {
    title: string;
    difficulty_level: string;
    main_topics: string[];
  };
  summary: {
    brief: string;
    key_concepts: string[];
    vocabulary: Array<{
      term: string;
      definition: string;
    }>;
  };
  vocabulary_qcm_questions: QCMQuestion[];
  qcm_questions: QCMQuestion[];
  understanding_questions: UnderstandingQuestion[];
}

export interface CorrectionResponse {
  subject: SubjectId;
  evaluation_detailed_responses: Array<{
    question: string;
    response: string;
    status: 'correct' | 'partly' | 'incorrect';
    evaluation: string;
  }>;
  elements_corrects: string[];
  elements_incorrects_or_incompletes: string[];
  specific_improvement_suggestions: Array<{
    question: string;
    suggestion: string;
  }>;
  general_appreciation: string;
}

export interface GuidedExerciseResponse {
  subject: SubjectId;
  exercise_analysis: {
    title: string;
    difficulty_level: string;
    main_concepts: string[];
  };
  guided_steps: Array<{
    step_number: number;
    description: string;
    hint: string;
  }>;
  key_points: string[];
  learning_objectives: string[];
  encouragement_message?: string;
}