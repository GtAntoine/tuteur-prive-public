import React from 'react';
import { BookText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface VocabularySectionProps {
  vocabulary: Array<{
    term: string;
    definition: string;
  }>;
}

export function VocabularySection({ vocabulary }: VocabularySectionProps) {
  const { t } = useTranslation();
  
  return (
    <div className="bg-green-50 rounded-lg p-3 md:p-6">
      <h3 className="flex items-center gap-2 text-xl font-semibold text-green-800 mb-6">
        <BookText className="w-5 h-5" />
        {t('lesson.vocabulary.title')}
      </h3>

      <div className="grid gap-4">
        {vocabulary.map(({ term, definition }, index) => (
          <div 
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-semibold text-green-700 mb-2">{term}</h4>
            <p className="text-gray-600">{definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}