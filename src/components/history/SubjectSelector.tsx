import React from 'react';
import { Check, X } from 'lucide-react';
import { useProfileStore } from '../../lib/stores/profile-store';
import { SUBJECTS } from '../../lib/constants/subjects';
import { SubjectIcon } from './subjects/SubjectIcon';
import { useTranslation } from 'react-i18next';
import type { SubjectId } from '../../lib/types';

interface SubjectSelectorProps {
  currentSubject?: SubjectId;
  onSelect: (subject: SubjectId) => void;
  onCancel: () => void;
}

export function SubjectSelector({ currentSubject, onSelect, onCancel }: SubjectSelectorProps) {
  const { currentProfile, isLoading } = useProfileStore();
  const currentGrade = currentProfile?.grade;
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white rounded-lg shadow-xl p-4 w-full max-w-sm mx-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="space-y-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const availableSubjects = Object.entries(SUBJECTS).filter(([_, subject]) => 
    currentGrade && subject.grades.includes(currentGrade)
  );

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50" 
      onClick={onCancel}
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-4 w-full max-w-sm mx-4" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 pb-2 border-b">
          <h3 className="text-lg font-semibold text-gray-800">{t('history.filters.subject')}</h3>
          <button
            onClick={onCancel}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="space-y-2">
          {availableSubjects.map(([id, subject]) => {
            const isSelected = currentSubject === id;
            
            return (
              <button
                key={id}
                onClick={() => onSelect(id as SubjectId)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isSelected
                    ? `bg-${subject.color}-50 text-${subject.color}-700`
                    : 'hover:bg-gray-50'
                }`}
              >
                <SubjectIcon icon={subject.icon} className="w-5 h-5 mr-3" />
                <span className="flex-1 text-left">{t(`subjects.${id}`)}</span>
                {isSelected && <Check className="w-5 h-5" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}