import React from 'react';
import { Book, CheckSquare, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TYPES = {
  lesson: {
    name: 'history.types.lesson',
    color: 'blue',
    icon: Book
  },
  correction: {
    name: 'history.types.correction',
    color: 'green',
    icon: CheckSquare
  },
  guided: {
    name: 'history.types.guided',
    color: 'purple',
    icon: HelpCircle
  }
} as const;

interface TypeFilterProps {
  selectedType: 'lesson' | 'correction' | 'guided' | undefined;
  onTypeChange: (type: 'lesson' | 'correction' | 'guided' | undefined) => void;
}

export function TypeFilter({ selectedType, onTypeChange }: TypeFilterProps) {
  const { t } = useTranslation();
  
  const handleClick = (e: React.MouseEvent, type: string, isSelected: boolean) => {
    e.stopPropagation();
    onTypeChange(isSelected ? undefined : type as any);
  };

  return (
    <div className="flex flex-wrap gap-2" onClick={e => e.stopPropagation()}>
      {Object.entries(TYPES).map(([type, info]) => {
        const Icon = info.icon;
        const isSelected = selectedType === type;
        
        return (
          <button
            key={type}
            onClick={(e) => handleClick(e, type, isSelected)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
              isSelected
                ? `bg-${info.color}-500 text-white`
                : `bg-${info.color}-500/20 text-white hover:bg-${info.color}-100 hover:text-${info.color}-500`
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{t(info.name)}</span>
          </button>
        );
      })}
    </div>
  );
}