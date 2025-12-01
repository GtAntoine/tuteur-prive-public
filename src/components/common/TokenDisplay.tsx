import React from 'react';
import { Coins } from 'lucide-react';
import { useTokens } from '../../hooks/useTokens';
import { useTranslation } from 'react-i18next';

export function TokenDisplay() {
  const { tokens, isLoading } = useTokens();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="bg-white/10 rounded-lg px-4 py-2 flex items-center gap-2">
        <div className="animate-pulse w-5 h-5 bg-white/20 rounded-full" />
        <div className="animate-pulse w-6 h-4 bg-white/20 rounded" />
      </div>
    );
  }

  if (!tokens) return null;

  // Format the token text based on count
  const getTokenText = (count: number) => {
    return count === 1 
      ? t('analysis.tokens.remaining', { count: '1' }) 
      : t('analysis.tokens.remaining', { count: count.toString() });
  };

  return (
    <div className="bg-white/10 rounded-lg px-4 py-2 flex items-center gap-2 group relative">
      <Coins className="w-5 h-5 text-yellow-400" />
      <div>
        <span className="text-white font-medium">
          {tokens.tokens_remaining}
        </span>
        {tokens.tokens_remaining <= 2 && (
          <p className="text-sm text-white/70">
            {t('analysis.tokens.daily')}
          </p>
        )}
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/90 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {getTokenText(tokens.tokens_remaining)}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/90" />
      </div>
    </div>
  );
}