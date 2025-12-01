import React from 'react';
import { useTranslation } from 'react-i18next';
import { useProfileStore } from '../../../lib/stores/profile-store';
import { SUBJECTS } from '../../../lib/constants/subjects';
import { SubjectButton } from './SubjectButton';
import type { SubjectId } from '../../../lib/types';

interface SubjectFilterProps {
  selectedSubject: SubjectId | undefined;
  onSubjectChange: (subject: SubjectId | undefined) => void;
}

export function SubjectFilter({ selectedSubject, onSubjectChange }: SubjectFilterProps) {
  const { currentProfile, isLoading } = useProfileStore();
  const currentGrade = currentProfile?.grade;
  const { t } = useTranslation();

  if (isLoading) {
    return <div className="h-10 bg-white/10 rounded-lg animate-pulse" />;
  }

  const availableSubjects = Object.entries(SUBJECTS).filter(([_, subject]) => 
    currentGrade && subject.grades.includes(currentGrade)
  );

  const handleSubjectClick = (id: string, isSelected: boolean) => {
    onSubjectChange(isSelected ? undefined : id as SubjectId);
  };

  return (
    <div className="flex flex-wrap gap-2" onClick={e => e.stopPropagation()}>
      {availableSubjects.map(([id, subject]) => (
        <SubjectButton
          key={id}
          id={id}
          name={t(`subjects.${id}`)}
          icon={subject.icon}
          color={subject.color}
          isSelected={selectedSubject === id}
          onClick={handleSubjectClick}
        />
      ))}
    </div>
  );
}