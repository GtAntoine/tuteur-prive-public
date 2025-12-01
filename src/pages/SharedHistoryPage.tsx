import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase/client';
import { BackButton } from '../components/common/BackButton';
import { HistoryImages } from '../components/history/HistoryImages';
import { SignupCTA } from '../components/common/SignupCTA';
import { ReportIssueButton } from '../components/history/ReportIssueButton';
import { MetaTags } from '../components/common/MetaTags';
import { SharedContentDisplay } from '../components/shared/SharedContentDisplay';
import { copySharedEntryToHistory } from '../lib/utils/history/copy-shared';
import { useAuth } from '../hooks/useAuth';
import type { HistoryEntry } from '../lib/types';

export function SharedHistoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [entry, setEntry] = useState<HistoryEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Determine if we came from the community page
  const fromCommunity = location.state?.from === 'community';

  useEffect(() => {
    async function loadEntry() {
      if (!id) {
        setError('ID invalide');
        setIsLoading(false);
        return;
      }
      
      try {
        const { data, error: fetchError } = await supabase
          .from('user_history')
          .select('*')
          .eq('id', id)
          .eq('is_public', true)
          .single();

        if (fetchError) {
          throw new Error('Cette page n\'existe pas ou n\'est plus disponible');
        }

        if (!data) {
          throw new Error('Entrée non trouvée');
        }

        setEntry(data);
      } catch (err) {
        console.error('Error loading shared entry:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setIsLoading(false);
      }
    }

    loadEntry();
  }, [id]);

  const handleSaveToHistory = async () => {
    if (!entry || isSaving) return;
    
    setIsSaving(true);
    try {
      const newId = await copySharedEntryToHistory(entry);
      navigate(`/history/${newId}`);
    } catch (error) {
      console.error('Error saving to history:', error);
      alert('Une erreur est survenue lors de la sauvegarde');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-t-white border-opacity-50 rounded-full animate-spin mx-auto mb-4" />
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (error || !entry) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-2xl font-bold mb-4">Oups !</h1>
          <p>{error || 'Cette page n\'existe pas'}</p>
        </div>
      </div>
    );
  }

  const title = entry.data.lesson_analysis?.title || 
                entry.data.exercise_analysis?.title || 
                'Correction d\'exercices';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900">
      <MetaTags 
        title={`${title} | Tuteur Privé`}
        description={entry.data.summary?.brief || 'Révision de cours avec Tuteur Privé'}
        image={entry.images[0]}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <BackButton 
            to={fromCommunity ? '/community' : (isAuthenticated ? '/history' : '/')}
            label={fromCommunity ? 'Retour à la communauté' : (isAuthenticated ? 'Retour à l\'historique' : 'Retour à l\'accueil')}
          />
          
          <div className="flex items-center gap-3">
            <ReportIssueButton historyId={entry.id} />
            {isAuthenticated && (
              <button
                onClick={handleSaveToHistory}
                disabled={isSaving}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg
                  hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 
                  disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <span className="text-lg">+</span>
                    Ajouter
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <HistoryImages images={entry.images} />
        
        <SharedContentDisplay entry={entry} />

        {!isAuthenticated && <SignupCTA />}
      </div>
    </div>
  );
}