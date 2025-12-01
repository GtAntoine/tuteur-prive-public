import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface ElementsListProps {
  elements: string[];
  type: 'correct' | 'incorrect';
}

export function ElementsList({ elements, type }: ElementsListProps) {
  const Icon = type === 'correct' ? CheckCircle : AlertCircle;
  const colors = type === 'correct' 
    ? 'bg-green-50 border-green-200 text-green-800' 
    : 'bg-orange-50 border-orange-200 text-orange-800';

  return (
    <div className={`rounded-lg border ${colors} p-4`}>
      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
        <Icon className="w-5 h-5" />
        {type === 'correct' ? 'Éléments corrects' : 'Points à améliorer'}
      </h3>
      <ul className="space-y-2">
        {elements.map((element, index) => (
          <li key={index} className="flex items-start gap-2">
            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
              type === 'correct' ? 'bg-green-400' : 'bg-orange-400'
            }`} />
            <span>{element}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}