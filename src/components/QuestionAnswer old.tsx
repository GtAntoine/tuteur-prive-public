import React, { useState } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface QuestionAnswerProps {
  question: string;
  onAnswer: (answer: string) => Promise<void>;
}

export function QuestionAnswer({ question, onAnswer }: QuestionAnswerProps) {
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isListening, transcript, startListening, stopListening } = useSpeechRecognition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    setIsSubmitting(true);
    await onAnswer(answer);
    setAnswer('');
    setIsSubmitting(false);
  };

  React.useEffect(() => {
    if (transcript) {
      setAnswer(transcript);
    }
  }, [transcript]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <p className="font-medium mb-3">{question}</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Votre réponse..."
          className="flex-1 p-2 border rounded-lg"
          disabled={isSubmitting || isListening}
        />
        <button
          type="button"
          onClick={isListening ? stopListening : startListening}
          className={`p-2 rounded-lg ${
            isListening ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
          disabled={isSubmitting}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
        <button
          type="submit"
          disabled={!answer.trim() || isSubmitting || isListening}
          className="p-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}