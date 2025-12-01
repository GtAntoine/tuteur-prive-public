import React from 'react';
import { Book, Calculator, Globe2, Users, Beaker, Leaf, TestTubes, Pencil, Cpu } from 'lucide-react';
import { SUBJECTS } from '../lib/constants/subjects';
import { useTranslation } from 'react-i18next';
import type { SubjectId } from '../lib/types';

const SubjectIcon = {
  book: Book,
  calculator: Calculator,
  globe: Globe2,
  users: Users,
  beaker: Beaker,
  leaf: Leaf,
  flask: TestTubes,
  cpu: Cpu,
};

interface SubjectBadgeProps {
  subject: SubjectId;
  onEdit?: () => void;
}

export function SubjectBadge({ subject, onEdit }: SubjectBadgeProps) {
  const subjectInfo = SUBJECTS[subject];
  const { t } = useTranslation();
  
  if (!subjectInfo) return null;
  
  const Icon = SubjectIcon[subjectInfo.icon as keyof typeof SubjectIcon];

  return (
    <div className="flex items-center gap-2">
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-${subjectInfo.color}-200/30 text-white`}>
        <Icon className="w-4 h-4" />
        <span>{t(`subjects.${subject}`)}</span>
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className="p-1.5 hover:bg-gray-100/10 rounded-full transition-colors"
          title="Modifier la matière"
        >
          <Pencil className="w-4 h-4 text-white" />
        </button>
      )}
    </div>
  );
}