import React from 'react';
import { Lightbulb } from 'lucide-react';

interface QuestionFeedbackProps {
  hint: string;
  feedback: {
    isCorrect: boolean;
    explanation: string;
    suggestions?: string[];
  } | null;
  showHint: boolean;
}

export function QuestionFeedback({ hint, feedback, showHint }: QuestionFeedbackProps) {
  if (feedback === null && !showHint) {
    return null;
  }

  if (feedback === null && showHint) {
    return (
      <div className="mt-4 bg-purple-50 p-3 rounded-lg">
        <div className="flex items-start gap-2">
          <Lightbulb className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
          <p className="text-purple-700">{hint}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={` p-4 rounded-lg ${
      feedback?.isCorrect ? 'bg-green-50' : 'bg-orange-50'
    }`}>
      <p className={`font-medium ${
        feedback?.isCorrect ? 'text-green-700' : 'text-orange-700'
      }`}>
        {feedback?.explanation}
      </p>
      
      {feedback?.suggestions && feedback.suggestions.length > 0 && (
        <ul className="mt-2 space-y-1">
          {feedback.suggestions.map((suggestion, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-2" />
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}