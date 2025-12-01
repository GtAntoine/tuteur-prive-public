import React from 'react';
import { SubjectIcon } from './SubjectIcon';
import type { SubjectIconType } from './SubjectIcon';

interface SubjectButtonProps {
  id: string;
  name: string;
  icon: SubjectIconType;
  color: string;
  isSelected: boolean;
  onClick: (id: string, isSelected: boolean) => void;
}

export function SubjectButton({ 
  id, 
  name, 
  icon, 
  color, 
  isSelected, 
  onClick 
}: SubjectButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick(id, isSelected);
      }}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
        isSelected
          ? `bg-${color}-500 text-white`
          : `bg-${color}-500/20 text-white hover:bg-${color}-100 hover:text-${color}-500`
      }`}
    >
      <SubjectIcon icon={icon} />
      <span>{name}</span>
    </button>
  );
}