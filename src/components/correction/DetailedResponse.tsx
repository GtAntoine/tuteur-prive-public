import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface DetailedResponseProps {
  question: string;
  response: string;
  status: 'correct' | 'partly' | 'incorrect';
  evaluation: string;
}

export function DetailedResponse({ question, response, status, evaluation }: DetailedResponseProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'correct':
        return <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />;
      case 'partly':
        return <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />;
      case 'incorrect':
        return <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'correct':
        return 'border-l-green-500 bg-green-50';
      case 'partly':
        return 'border-l-orange-500 bg-orange-50';
      case 'incorrect':
        return 'border-l-red-500 bg-red-50';
    }
  };

  return (
    <div className={`rounded-lg p-4 shadow-sm border-l-4 ${getStatusColor()}`}>
      <h4 className="font-semibold text-lg text-gray-800 mb-2">{question}</h4>
      <div className="pl-4 border-l-2 border-gray-200 mb-2">
        <p className="text-gray-600 italic">"{response}"</p>
      </div>
      <div className="flex items-start gap-2">
        {getStatusIcon()}
        <p className="text-gray-700">{evaluation}</p>
      </div>
    </div>
  );
}