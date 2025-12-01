import React from 'react';
import { 
  Book, Calculator, Globe2, Users, Beaker, 
  Leaf, TestTubes, Cpu, Palette, Music, Dumbbell 
} from 'lucide-react';

const SUBJECT_ICONS = {
  book: Book,
  calculator: Calculator,
  globe: Globe2,
  users: Users,
  beaker: Beaker,
  leaf: Leaf,
  flask: TestTubes,
  cpu: Cpu,
  palette: Palette,
  music: Music,
  dumbbell: Dumbbell
} as const;

interface SubjectIconProps {
  icon: keyof typeof SUBJECT_ICONS;
  className?: string;
}

export function SubjectIcon({ icon, className = "w-4 h-4" }: SubjectIconProps) {
  const Icon = SUBJECT_ICONS[icon];
  return <Icon className={className} />;
}

export type SubjectIconType = keyof typeof SUBJECT_ICONS;