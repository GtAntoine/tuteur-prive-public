import React from 'react';
import { AlertTriangle, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ErrorHandlingProps {
  error: string;
  onRetry: () => void;
  onRestart: () => void;
}

export function ErrorHandling({ error, onRetry, onRestart }: ErrorHandlingProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isNoTokens = error.includes('plus de jetons');

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 animate-pop">
      <div className="flex items-start gap-3 mb-6">
        <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold text-red-700 mb-1">{t('analysis.error.title')}</h3>
          <p className="text-red-600">{error}</p>
          {!isNoTokens && (
            <p className="text-sm text-red-500 mt-2">Aucun jeton n'a été consommé.</p>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {isNoTokens ? (
          <button
            onClick={() => navigate('/settings/billing')}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors w-full sm:w-auto"
          >
            <ShoppingCart className="w-5 h-5" />
            {t('analysis.error.noTokens')}
          </button>
        ) : (
          <>
            <button
              onClick={onRetry}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              {t('analysis.error.retry')}
            </button>

            <button
              onClick={onRestart}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              {t('analysis.error.restart')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}