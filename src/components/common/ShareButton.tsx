// src/components/common/ShareButton.tsx
import React, { useState } from 'react';
import { Share2, Check, X } from 'lucide-react';

interface ShareButtonProps {
  url: string;
}

export function ShareButton({ url }: ShareButtonProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          url,
          title: 'Tuteur Privé',
          text: 'Regarde ce que j\'ai appris avec Tuteur Privé !'
        });
      } else {
        await navigator.clipboard.writeText(url);
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="relative flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
    >
      <Share2 className="w-5 h-5" />
      <span>Partager</span>
      
      {showConfirmation && (
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap animate-pop">
          Lien copié !
        </div>
      )}
    </button>
  );
}
