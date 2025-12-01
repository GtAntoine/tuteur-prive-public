import React, { useState } from 'react';
import { CheckCircle, XCircle, BookOpen } from 'lucide-react';
import type { GameQuestion } from '../../lib/types';

interface RevisionQuestionProps {
  question: GameQuestion;
  onAnswer: (isCorrect: boolean) => void;
}

export function RevisionQuestion({ question, onAnswer }: RevisionQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    setTimeout(() => {
      onAnswer(answer === question.correctAnswer);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <BookOpen className="w-4 h-4" />
        <span>{question.lessonTitle}</span>
      </div>
      
      <p className="font-medium text-gray-800">{question.question}</p>
      
      <div className="grid grid-cols-2 gap-2">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === question.correctAnswer;
          
          let buttonStyle = 'hover:bg-gray-50 border-gray-200';
          if (showFeedback) {
            if (isCorrect) {
              buttonStyle = 'bg-green-50 border-green-200';
            } else if (isSelected) {
              buttonStyle = 'bg-red-50 border-red-200';
            }
          }

          return (
            <button
              key={option}
              onClick={() => !showFeedback && handleAnswer(option)}
              disabled={showFeedback}
              className={`text-left p-3 rounded-lg border transition-all duration-300 ${buttonStyle}`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showFeedback && isSelected && (
                  <div className="answer-feedback">
                    {isCorrect 
                      ? <CheckCircle className="w-5 h-5 text-green-500 animate-pop-spin" />
                      : <XCircle className="w-5 h-5 text-red-500 animate-pop-spin" />
                    }
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
