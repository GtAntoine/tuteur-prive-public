import React, { useState } from 'react';
import { Send, Lightbulb } from 'lucide-react';
import { validateAnswer } from '../../lib/openai/answer-validation';

interface QuestionAnswerProps {
  question: string;
  topic: string;
  hint: string;
   mode?: 'lesson' | 'history' | 'shared';
}

export function QuestionAnswer({ question, topic, hint }: QuestionAnswerProps) {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    explanation: string;
    suggestions?: string[];
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim() || isSubmitting) return;
  
    setIsSubmitting(true);
    try {
      if (mode === 'shared') {
        // En mode partagé, valider directement sans sauvegarder
        const response = await validateAnswer(question, userAnswer, answer);
        const feedbackData = JSON.parse(response);
        setFeedback(feedbackData);
        onAnswered?.(userAnswer, feedbackData);
      } else {
        // Mode normal avec sauvegarde dans l'historique
        const response = await validateAnswer(question, userAnswer, answer);
        const feedbackData = JSON.parse(response);
        setFeedback(feedbackData);
        onAnswered?.(userAnswer, feedbackData);
      }
    } catch (error) {
      console.error('Error validating answer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-start gap-2 mb-3">
        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
          {topic}
        </span>
      </div>
      
      <p className="font-medium text-gray-800 mb-4">{question}</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Écrivez votre réponse ici..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={3}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
          >
            <Lightbulb className="w-4 h-4" />
            Voir l'indice
          </button>
          
          <button
            type="submit"
            disabled={!answer.trim() || isSubmitting}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? 'Validation...' : 'Valider'}
          </button>
        </div>
      </form>

      {/* Affichage de l'indice */}
      {feedback === null && (
        <div className="mt-4 bg-purple-50 p-3 rounded-lg">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
            <p className="text-purple-700">{hint}</p>
          </div>
        </div>
      )}

      {/* Affichage du feedback */}
      {feedback && (
        <div className={`mt-4 p-4 rounded-lg ${
          feedback.isCorrect ? 'bg-green-50' : 'bg-orange-50'
        }`}>
          <p className={`font-medium ${
            feedback.isCorrect ? 'text-green-700' : 'text-orange-700'
          }`}>
            {feedback.explanation}
          </p>
          
          {feedback.suggestions && feedback.suggestions.length > 0 && (
            <ul className="mt-2 space-y-1">
              {feedback.suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-2" />
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}