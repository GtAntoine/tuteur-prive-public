import React, { useRef, useEffect } from 'react';
import { BookOpen, BookText, CheckSquare, HelpCircle, Pencil } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LessonTabsProps {
  activeTab: 'summary' | 'vocabulary' | 'vocabulary-qcm' | 'quiz' | 'questions';
  onTabChange: (tab: 'summary' | 'vocabulary' | 'vocabulary-qcm' | 'quiz' | 'questions') => void;
}

export function LessonTabs({ activeTab, onTabChange }: LessonTabsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // Scroll to active tab when it changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeElement = container.querySelector('[data-active="true"]');
      
      if (activeElement) {
        const containerWidth = container.offsetWidth;
        const elementOffset = (activeElement as HTMLElement).offsetLeft;
        const elementWidth = (activeElement as HTMLElement).offsetWidth;
        
        // Center the active element
        container.scrollLeft = elementOffset - (containerWidth - elementWidth) / 2;
      }
    }
  }, [activeTab]);

  const tabs = [
    {
      id: 'summary',
      label: t('lesson.tabs.summary'),
      icon: BookOpen,
      colors: {
        active: 'bg-blue-600 text-white',
        inactive: 'bg-blue-50 text-blue-600 hover:bg-blue-100'
      }
    },
    {
      id: 'vocabulary',
      label: t('lesson.tabs.vocabulary'),
      icon: BookText,
      colors: {
        active: 'bg-green-600 text-white',
        inactive: 'bg-green-50 text-green-600 hover:bg-green-100'
      }
    },
    {
      id: 'vocabulary-qcm',
      label: t('lesson.tabs.vocabularyQuiz'),
      icon: Pencil,
      colors: {
        active: 'bg-teal-600 text-white',
        inactive: 'bg-teal-50 text-teal-600 hover:bg-teal-100'
      }
    },
    {
      id: 'quiz',
      label: t('lesson.tabs.quiz'),
      icon: CheckSquare,
      colors: {
        active: 'bg-purple-600 text-white',
        inactive: 'bg-purple-50 text-purple-600 hover:bg-purple-100'
      }
    },
    {
      id: 'questions',
      label: t('lesson.tabs.questions'),
      icon: HelpCircle,
      colors: {
        active: 'bg-orange-600 text-white',
        inactive: 'bg-orange-50 text-orange-600 hover:bg-orange-100'
      }
    }
  ] as const;

  return (
    <div 
      ref={scrollContainerRef}
      className="flex overflow-x-auto scrollbar-hide rounded-lg snap-x snap-mandatory gap-2 pb-2 px-1"
    >
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            data-active={isActive}
            className={`flex-none flex items-center justify-center gap-2 px-2 md:px-4 py-3 rounded-lg 
              font-medium transition-all duration-300 transform snap-center min-w-[100px] md:min-w-[140px]
              ${isActive 
                ? `${tab.colors.active} scale-105 shadow-lg` 
                : `${tab.colors.inactive} hover:scale-102 hover:shadow-md`
              }`}
          >
            <Icon className={`w-5 h-5 transition-transform duration-300 ${
              isActive ? 'animate-bounce-slow' : 'group-hover:scale-110'
            }`} />
            <span className="transition-all duration-300 whitespace-nowrap">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}