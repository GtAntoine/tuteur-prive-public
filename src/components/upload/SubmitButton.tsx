import React from 'react';
import { Send } from 'lucide-react';

interface SubmitButtonProps {
  disabled: boolean;
  onClick: () => void;
  filesCount: number;
}

export function SubmitButton({ disabled, onClick, filesCount }: SubmitButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mx-auto flex items-center justify-center gap-3 px-8 py-4 
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600
        text-white text-lg font-medium rounded-full 
        disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 
        hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl 
        w-auto max-w-sm relative overflow-hidden
        before:absolute before:inset-0 before:bg-white/20 before:transform before:-skew-x-12
        before:translate-x-[-150%] hover:before:translate-x-[150%] before:transition-transform
        before:duration-700`}
    >
      <Send className="w-6 h-6 animate-bounce-slow" />
      <span className="relative">Créer la leçon</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
        animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
    </button>
  );
}