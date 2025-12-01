import React from 'react';
import { BackButton } from './BackButton';

interface NotFoundProps {
  backTo: string;
  message: string;
}

export function NotFound({ backTo, message }: NotFoundProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BackButton to={backTo} className="mb-6" />
      <div className="text-center py-12">
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}