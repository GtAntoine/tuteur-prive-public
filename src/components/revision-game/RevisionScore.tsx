import React from 'react';
import { Trophy, Target } from 'lucide-react';

interface RevisionScoreProps {
  score: number;
  highScore: number;
}

export function RevisionScore({ score, highScore }: RevisionScoreProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Target className="w-5 h-5 text-purple-500" />
        <span className="font-medium">Score: {score}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <span className="font-medium">Record: {highScore}</span>
      </div>
    </div>
  );
}