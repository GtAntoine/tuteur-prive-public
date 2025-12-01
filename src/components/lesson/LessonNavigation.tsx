import React from 'react';
import { BookOpen, BookText, CheckSquare, HelpCircle } from 'lucide-react';

interface LessonNavigationProps {
  onNavigate: (section: 'summary' | 'vocabulary' | 'qcm' | 'questions') => void;
}

export function LessonNavigation({ onNavigate }: LessonNavigationProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <button
        onClick={() => onNavigate('summary')}
        className="flex items-center gap-2 px-2 md:px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
      >
        <BookOpen className="w-5 h-5" />
        <span>Résumé</span>
      </button>

      <button
        onClick={() => onNavigate('vocabulary')}
        className="flex items-center gap-2 px-2 md:px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
      >
        <BookText className="w-5 h-5" />
        <span>Vocabulaire</span>
      </button>

      <button
        onClick={() => onNavigate('qcm')}
        className="flex items-center gap-2 px-2 md:px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
      >
        <CheckSquare className="w-5 h-5" />
        <span>Quiz</span>
      </button>

      <button
        onClick={() => onNavigate('questions')}
        className="flex items-center gap-2 px-2 md:px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
      >
        <HelpCircle className="w-5 h-5" />
        <span>Questions</span>
      </button>
    </div>
  );
}