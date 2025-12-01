// src/components/common/ConfirmDialog.tsx
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Portal } from './Portal';

interface ConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  type: 'lesson' | 'correction' | 'guided';
}

export function ConfirmDialog({ isOpen, onConfirm, onCancel, type }: ConfirmDialogProps) {
  if (!isOpen) return null;

  const messages = {
    lesson: "la leçon",
    correction: "la correction",
    guided: "l'aide guidée"
  };

  return (
    <Portal>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50" onClick={onCancel}>
        <div 
          className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4" 
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0 p-2 bg-orange-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-semibold text-gray-900">Quitter la page ?</h3>
              <p className="mt-2 text-sm text-gray-600">
                Vous pourrez retrouver {messages[type]} dans votre historique.
              </p>
            </div>

          <button
              onClick={onCancel}
              className="p-1 ml-4 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            
          </div>
          
          <div className="flex justify-end gap-3 mt-6">

               <button
        onClick={onCancel}
        className={`flex max-w-sm bg-gradient-to-tr from-indigo-500 to-pink-500 items-center gap-0.5 px-0.5 py-0.5 text-gray-900 rounded-full
          transition-all duration-300 group-hover:scale-105 `}
      >
        <div className="relative bg-white rounded-full px-4 py-2 
          group-hover:bg-opacity-90 w-full h-full flex items-center gap-2"
        >
                       Annuler
        </div>
      </button>

            
            <button
              onClick={onConfirm}
              className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-tr from-indigo-500 to-pink-500  hover:bg-orange-700 rounded-full transition-colors"
            >
              Quitter
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
