import React from 'react';
import { SubjectFilter } from '../history/subjects/SubjectFilter';
import { TypeFilter } from '../history/TypeFilter';
import { GRADES } from '../../lib/constants/grades';

interface CommunityFiltersProps {
  filters: {
    subject?: string;
    type?: 'lesson' | 'correction' | 'guided';
    grade?: string;
  };
  onFilterChange: (filters: any) => void;
}

export function CommunityFilters({ filters, onFilterChange }: CommunityFiltersProps) {
  return (
    <div className="bg-white/10 rounded-lg p-4 space-y-4">
      <div>
        <h3 className="text-sm font-medium text-white mb-2">Matière</h3>
        <SubjectFilter
          selectedSubject={filters.subject}
          onSubjectChange={(subject) => onFilterChange({ ...filters, subject })}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-white mb-2">Type</h3>
        <TypeFilter
          selectedType={filters.type}
          onTypeChange={(type) => onFilterChange({ ...filters, type })}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-white mb-2">Niveau</h3>
        <div className="grid grid-cols-3 gap-2">
          {GRADES.map((grade) => (
            <button
              key={grade}
              onClick={() => onFilterChange({ 
                ...filters, 
                grade: filters.grade === grade ? undefined : grade 
              })}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filters.grade === grade
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}