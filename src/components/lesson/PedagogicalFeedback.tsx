import React from 'react';
import { Star, Lightbulb } from 'lucide-react';
import type { LessonResponse } from '../../lib/types';

interface PedagogicalFeedbackProps {
  data?: LessonResponse['pedagogical_feedback'];
}

export function PedagogicalFeedback({ data }: PedagogicalFeedbackProps) {
  // Return null if no data is provided
  if (!data) return null;

  const { strengths = [], areas_for_improvement = [] } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-green-800 mb-4">
          <Star className="w-5 h-5" />
          Points forts
        </h3>
        <ul className="space-y-2">
          {strengths.map((strength, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 mt-2" />
              <span className="text-green-700">{strength}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-orange-50 rounded-lg p-6">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-orange-800 mb-4">
          <Lightbulb className="w-5 h-5" />
          Points à améliorer
        </h3>
        <ul className="space-y-2">
          {areas_for_improvement.map((area, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 mt-2" />
              <span className="text-orange-700">{area}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}