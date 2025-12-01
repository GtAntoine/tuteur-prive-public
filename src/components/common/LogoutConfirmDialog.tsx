import React from 'react';
import { LogOut } from 'lucide-react';
import { Portal } from './Portal';

interface LogoutConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function LogoutConfirmDialog({ isOpen, onConfirm, onCancel }: LogoutConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50" onClick={onCancel}>
        <div 
          className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4" 
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0 p-2 bg-red-100 rounded-full">
              <LogOut className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-semibold text-gray-900">Se déconnecter ?</h3>
              <p className="mt-2 text-sm text-gray-600">
                Êtes-vous sûr de vouloir vous déconnecter ?
              </p>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
