import React from 'react';
import { BookOpen, Star, Lightbulb, CheckSquare, Target } from 'lucide-react';
import type { GuidedExerciseResponse } from '../../lib/types';

interface GuidedExerciseDisplayProps {
  data: GuidedExerciseResponse;
}

export function GuidedExerciseDisplay({ data }: GuidedExerciseDisplayProps) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* En-tête de l'exercice */}
      <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{data.exercise_analysis.title}</h2>
        <div className="flex items-center gap-4 text-sm">
          <span className={`px-3 py-1 rounded-full ${
            data.exercise_analysis.difficulty_level === 'facile' ? 'bg-green-100 text-green-700' :
            data.exercise_analysis.difficulty_level === 'moyen' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {data.exercise_analysis.difficulty_level}
          </span>
          <div className="flex flex-wrap gap-2">
            {data.exercise_analysis.main_concepts.map((concept, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {concept}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Étapes guidées */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4">
          <BookOpen className="w-5 h-5 text-blue-500" />
          Étapes à suivre
        </h3>
        <div className="space-y-4">
          {data.guided_steps.map((step) => (
            <div key={step.step_number} className="pl-4 border-l-2 border-blue-200">
              <h4 className="font-medium text-lg text-gray-700">
                Étape {step.step_number}
              </h4>
              <p className="text-gray-600 mb-2">{step.description}</p>
              <div className="bg-blue-50 p-3 rounded-md flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                <p className="text-blue-700">{step.hint}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Points clés et objectifs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-purple-800 mb-4">
            <Star className="w-5 h-5" />
            Points clés
          </h3>
          <ul className="space-y-2">
            {data.key_points.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckSquare className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                <span className="text-purple-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-green-800 mb-4">
            <Target className="w-5 h-5" />
            Objectifs d'apprentissage
          </h3>
          <ul className="space-y-2">
            {data.learning_objectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 mt-2" />
                <span className="text-green-700">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Message d'encouragement */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-4 text-white">
        <p className="text-center font-medium">{data.encouragement_message}</p>
      </div>
    </div>
  );
}