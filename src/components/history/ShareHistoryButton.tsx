import React, { useState } from 'react';
import { Share2, Globe, Loader } from 'lucide-react';
import { useHistorySharing } from '../../hooks/useHistorySharing';
import { generateSlug } from '../../lib/utils/url';
import { supabase } from '../../lib/supabase/client';
import { useTranslation } from 'react-i18next';

interface ShareHistoryButtonProps {
  entryId: string;
  isPublic: boolean;
  title: string;
}

export function ShareHistoryButton({ entryId, isPublic, title }: ShareHistoryButtonProps) {
  const { shareEntry, isSharing } = useHistorySharing();
  const [showCopied, setShowCopied] = useState(false);
  const [isPublicLocal, setIsPublicLocal] = useState(isPublic);
  const [isUpdating, setIsUpdating] = useState(false);
  const { t } = useTranslation();

  const handleShare = async () => {
    try {
      if (!isPublicLocal) {
        await shareEntry(entryId);
      }

      const slug = generateSlug(title);
      const shareUrl = `${window.location.origin}/shared/${entryId}/${slug}`;
      const shareData = {
        title: `${title} | Tuteur Privé`,
        text: 'Regarde ce que j\'ai appris avec Tuteur Privé !',
        url: shareUrl
      };

      if (navigator.canShare && navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData);
        } catch (error) {
          await copyToClipboard(shareUrl);
           setIsPublicLocal(true);
        }
      } else {
        await copyToClipboard(shareUrl);
         setIsPublicLocal(true);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const togglePublic = async () => {
    try {
      setIsUpdating(true);
      const { error } = await supabase
        .from('user_history')
        .update({ 
          is_public: !isPublicLocal,
          shared_at: !isPublicLocal ? new Date().toISOString() : null
        })
        .eq('id', entryId);

      if (error) throw error;
      setIsPublicLocal(!isPublicLocal);
    } catch (error) {
      console.error('Error updating public status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={togglePublic}
        disabled={isUpdating}
        className={`relative flex items-center gap-2 px-4 py-2 ${
          isPublicLocal ? 'bg-green-500' : 'bg-white/10'
        } text-white rounded-lg hover:bg-opacity-90 transition-colors`}
      >
        {isUpdating ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <Globe className="w-5 h-5" />
        )}
        <span>{isPublicLocal ? 'Public' : 'Privé'}</span>
      </button>

      <button
        onClick={handleShare}
        disabled={isSharing}
        className="relative flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg 
          hover:bg-white/20 transition-colors disabled:opacity-50"
      >
        {isSharing ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <Share2 className="w-5 h-5" />
        )}
        <span>{t('history.detail.share')}</span>
        
        {showCopied && (
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-green-500 text-white 
            px-3 py-1 rounded-lg text-sm whitespace-nowrap animate-pop"
          >
            Lien copié !
          </div>
        )}
      </button>
    </div>
  );
}