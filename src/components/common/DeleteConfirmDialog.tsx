import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmDialog({ onConfirm, onCancel }: DeleteConfirmDialogProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50" onClick={onCancel}>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0 p-2 bg-red-100 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold text-gray-900">Confirmer la suppression</h3>
            <p className="mt-2 text-sm text-gray-600">
              Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
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
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}