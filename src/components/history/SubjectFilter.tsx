import React, { useState, useEffect } from 'react';
import { Book, Calculator, Globe2, Users, Beaker, Leaf, TestTubes, Cpu, Palette, Music, Dumbbell } from 'lucide-react';
import { SUBJECTS } from '../../lib/constants/subjects';
import { useProfileStore } from '../../lib/stores/profile-store';
import type { SubjectId } from '../../lib/types';

// ... (garder le reste du code SubjectIcon)

export function SubjectFilter({ selectedSubject, onSubjectChange }: SubjectFilterProps) {
  const { currentProfile, isLoading } = useProfileStore();
  const currentGrade = currentProfile?.grade;

  if (isLoading) {
    return <div className="h-10 bg-white/10 rounded-lg animate-pulse" />;
  }

  const availableSubjects = Object.entries(SUBJECTS).filter(([_, subject]) => 
    currentGrade && subject.grades.includes(currentGrade)
  );
  
  // ... (garder le reste du code de rendu)
}