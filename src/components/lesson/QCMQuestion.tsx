import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { QCMQuestion as QCMQuestionType } from '../../lib/types';
import { shuffleArray } from '../../lib/utils/array';

interface QCMQuestionProps extends QCMQuestionType {
  number: number;
  historyId?: string;
  savedAnswer?: string;
  onAnswerChange?: (answer: string) => void;
  type?: 'quiz' | 'vocabulary';
  mode?: 'lesson' | 'history' | 'shared';
}

// Helper to check if options is in new format (object with keys)
function isNewFormat(options: string[] | Record<string, string>): options is Record<string, string> {
  return !Array.isArray(options);
}

// Convert options to array format for rendering, preserving keys for new format
function normalizeOptions(options: string[] | Record<string, string>): Array<{key: string, value: string}> {
  if (isNewFormat(options)) {
    // New format: {A: "answer1", B: "answer2", ...}
    return Object.entries(options).map(([key, value]) => ({ key, value }));
  } else {
    // Old format: ["answer1", "answer2", ...]
    // Use the value as both key and value for backward compatibility
    return options.map(value => ({ key: value, value }));
  }
}

export function QCMQuestion({
  number,
  question,
  options,
  correctAnswer,
  explanation,
  savedAnswer,
  onAnswerChange,
  type = 'quiz',
  mode = 'lesson'
}: QCMQuestionProps) {
  const { t } = useTranslation();

  // Normalize options to unified format
  const normalizedOptions = React.useMemo(() => normalizeOptions(options), [options]);

  // Determine the correct answer value
  // In new format: correctAnswer is a key (A, B, C, D), need to get the value
  // In old format: correctAnswer is already the value
  const correctAnswerValue = React.useMemo(() => {
    if (isNewFormat(options)) {
      return options[correctAnswer] || correctAnswer; // Fallback to correctAnswer if key not found
    }
    return correctAnswer;
  }, [options, correctAnswer]);

  // Mélanger les options de manière consistante avec useMemo
  const shuffledOptions = React.useMemo(() => {
    // Créer un identifiant unique pour la question pour maintenir le même ordre
    const questionId = `${question}-${correctAnswerValue}`;
    return shuffleArray(normalizedOptions, questionId);
  }, [normalizedOptions, question, correctAnswerValue]);

  const showExplanation = !!savedAnswer;

  // For new format: savedAnswer is a key (A, B, C, D), need to compare with correctAnswer key
  // For old format: both are values, direct comparison
  const isCorrect = React.useMemo(() => {
    if (isNewFormat(options)) {
      // New format: compare keys
      return savedAnswer === correctAnswer;
    } else {
      // Old format: compare values
      return savedAnswer === correctAnswer;
    }
  }, [savedAnswer, correctAnswer, options]);

  const handleAnswer = (key: string) => {
    // Allow answering in shared mode even if there's a saved answer
    if (mode === 'shared' || !showExplanation) {
      onAnswerChange?.(key);
    }
  };

  return (
    <div className="bg-white rounded-lg p-3 md:p-6 shadow-sm">
      <h4 className="font-semibold text-lg text-gray-800 mb-4">
        {t('lesson.quiz.question')} { number }. {question}
        {/* {t('lesson.quiz.question', { number })} {question} */}

      </h4>

      <div className="grid grid-cols-2 gap-2">
        {shuffledOptions.map((option, index) => {
          // In new format: compare keys, in old format: compare values
          const isSelected = isNewFormat(options)
            ? savedAnswer === option.key
            : savedAnswer === option.value;

          const isCorrectOption = isNewFormat(options)
            ? option.key === correctAnswer
            : option.value === correctAnswer;

          let buttonStyle = 'hover:bg-gray-50 border-gray-200';
          if (showExplanation) {
            if (isCorrectOption) {
              buttonStyle = 'bg-green-50 border-green-200';
            } else if (isSelected) {
              buttonStyle = 'bg-red-50 border-red-200';
            } else {
              buttonStyle = 'bg-gray-50 border-gray-200';
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(option.key)}
              disabled={showExplanation && mode !== 'shared'}
              className={`text-left p-3 rounded-lg border transition-all duration-300 ${buttonStyle} ${
                (!showExplanation || mode === 'shared') && 'hover:scale-102 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  {isNewFormat(options) && (
                    <span className="font-bold text-gray-600">{option.key}.</span>
                  )}
                  <span>{option.value}</span>
                </span>
                {showExplanation && isSelected && (
                  <div className="answer-feedback">
                    {isCorrect
                      ? <CheckCircle className="w-5 h-5 text-green-500" />
                      : <XCircle className="w-5 h-5 text-red-500" />
                    }
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {showExplanation && explanation && (
        <div className={`p-4 rounded-lg mt-4 animate-pop ${
          isCorrect ? 'bg-green-50' : 'bg-red-50'
        }`}>
          <p className={`font-medium ${
            isCorrect ? 'text-green-700' : 'text-red-700'
          }`}>
            {explanation}
          </p>
        </div>
      )}
    </div>
  );
}