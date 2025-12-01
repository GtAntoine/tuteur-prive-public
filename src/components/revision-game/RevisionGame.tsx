import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { getHistory } from '../../lib/utils/history';
import { RevisionQuestion } from './RevisionQuestion';
import { RevisionScore } from './RevisionScore';
import { getQuestionsFromHistory } from '../../lib/utils/revision-game';
import type { GameQuestion } from '../../lib/types';

const STORAGE_KEY = 'revision_game_highscore';

export function RevisionGame() {
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const history = await getHistory();
        if (Array.isArray(history)) {
          const gameQuestions = getQuestionsFromHistory(history);
          setQuestions(gameQuestions);
        }
      } catch (error) {
        console.error('Error loading questions:', error);
        setQuestions([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadQuestions();
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem(STORAGE_KEY, newScore.toString());
      }
    }
    
    setCurrentQuestionIndex(prev => (prev + 1) % questions.length);
  };

  if (isLoading) {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 rounded-full bg-white/10 animate-pulse mx-auto mb-4" />
        <p className="text-white">Chargement du jeu...</p>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="text-center py-6">
        <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-white">Réponds à quelques questions pour débloquer le jeu de révision !</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
      <RevisionScore score={score} highScore={highScore} />
      
      <RevisionQuestion
        question={currentQuestion}
        onAnswer={handleAnswer}
      />
    </div>
  );
}
