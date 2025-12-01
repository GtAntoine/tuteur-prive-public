import React from 'react';
import { Target } from 'lucide-react';

interface QuestionHeaderProps {
  topic: string;
  number: number;
}

export function QuestionHeader({ topic, number }: QuestionHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-3">
      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
        Question {number}
      </span>
      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
        {topic}
      </span>
    </div>
  );
}