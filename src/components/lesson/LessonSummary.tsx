import React from 'react';
import { BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { LessonResponse } from '../../lib/types';

interface LessonSummaryProps {
  data: LessonResponse['summary'];
  title: string;
  difficulty: string;
  topics: string[];
  mode?: 'lesson' | 'history';
}

export function LessonSummary({ 
  data, 
  title, 
  difficulty, 
  topics = [], 
  mode = 'lesson' 
}: LessonSummaryProps) {
  const { t } = useTranslation();
  
  if (!data) {
    return (
      <div className="bg-white rounded-lg p-3 md:p-6 shadow-sm">
        <p className="text-gray-500">Aucun résumé disponible</p>
      </div>
    );
  }

  const getDifficultyLabel = (level: string) => {
    switch(level) {
      case 'facile': return t('lesson.summary.difficulty.easy');
      case 'moyen': return t('lesson.summary.difficulty.medium');
      case 'difficile': return t('lesson.summary.difficulty.hard');
      default: return level;
    }
  };

  return (
    <div className="bg-white rounded-lg p-3 md:p-6 shadow-sm">
      {mode === 'lesson' && (
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      )}
      
      <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
        <span className={`px-3 py-1 rounded-full ${
          difficulty === 'facile' ? 'bg-green-100 text-green-700' :
          difficulty === 'moyen' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {getDifficultyLabel(difficulty)}
        </span>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(topics) && topics.map((topic, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            {t('lesson.summary.title')}
          </h3>
          <p className="text-gray-700">{data.brief}</p>
        </div>

        {Array.isArray(data.key_concepts) && data.key_concepts.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-700 mb-2">{t('lesson.summary.keyConcepts')}</h4>
            <div className="flex flex-wrap gap-2">
              {data.key_concepts.map((concept, index) => (
                <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {concept}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}