import React from 'react';
import { BookOpen, Star, Lightbulb, CheckSquare, Target } from 'lucide-react';
import type { GuidedExerciseResponse } from '../../lib/types';

interface GuidedDisplayProps {
  data: GuidedExerciseResponse;
  historyId?: string;
}

export function GuidedDisplay({ data }: GuidedDisplayProps) {
  return (
    <div className="space-y-6">
      {/* En-tête de l'exercice */}
      <div className="bg-white/10 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-2">{data.exercise_analysis.title}</h2>
        <div className="flex items-center gap-4 text-sm">
          <span className={`px-3 py-1 rounded-full ${
            data.exercise_analysis.difficulty_level === 'facile' ? 'bg-green-500/20 text-green-200' :
            data.exercise_analysis.difficulty_level === 'moyen' ? 'bg-yellow-500/20 text-yellow-200' :
            'bg-red-500/20 text-red-200'
          }`}>
            {data.exercise_analysis.difficulty_level}
          </span>
          <div className="flex flex-wrap gap-2">
            {data.exercise_analysis.main_concepts.map((concept, index) => (
              <span key={index} className="bg-white/10 text-white/90 px-2 py-1 rounded">
                {concept}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Étapes guidées */}
      <div className="bg-white/10 rounded-lg p-6">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-white mb-4">
          <BookOpen className="w-5 h-5 text-blue-300" />
          Étapes à suivre
        </h3>
        <div className="space-y-4">
          {data.guided_steps.map((step) => (
            <div key={step.step_number} className="pl-4 border-l-2 border-blue-500/30">
              <h4 className="font-medium text-lg text-white">
                Étape {step.step_number}
              </h4>
              <p className="text-white/80 mb-2">{step.description}</p>
              <div className="bg-blue-500/10 p-3 rounded-md flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-blue-300 flex-shrink-0 mt-1" />
                <p className="text-blue-100">{step.hint}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Points clés et objectifs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-purple-500/10 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-white mb-4">
            <Star className="w-5 h-5 text-purple-300" />
            Points clés
          </h3>
          <ul className="space-y-2">
            {data.key_points.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckSquare className="w-5 h-5 text-purple-300 flex-shrink-0 mt-1" />
                <span className="text-white/90">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-green-500/10 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-white mb-4">
            <Target className="w-5 h-5 text-green-300" />
            Objectifs d'apprentissage
          </h3>
          <ul className="space-y-2">
            {data.learning_objectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0 mt-2" />
                <span className="text-white/90">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}