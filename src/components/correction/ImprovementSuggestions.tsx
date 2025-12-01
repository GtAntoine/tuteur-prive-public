import React from 'react';
import { Lightbulb } from 'lucide-react';

interface Suggestion {
  question: string;
  suggestion: string;
}

interface ImprovementSuggestionsProps {
  suggestions: Suggestion[];
}

export function ImprovementSuggestions({ suggestions }: ImprovementSuggestionsProps) {
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
      <h3 className="font-semibold text-lg text-purple-800 mb-3 flex items-center gap-2">
        <Lightbulb className="w-5 h-5" />
        Suggestions d'amélioration
      </h3>
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="bg-white rounded p-3 shadow-sm">
            <p className="font-medium text-purple-700 mb-1">{suggestion.question}</p>
            <p className="text-gray-600">{suggestion.suggestion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}