import React from 'react';
import { Star } from 'lucide-react';

interface AppreciationProps {
  message: string;
}

export function Appreciation({ message }: AppreciationProps) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-4 text-white">
      <div className="flex items-center gap-3">
        <Star className="w-6 h-6 text-yellow-300" />
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
}