import React, { useState } from 'react';
import { Flag, X, Loader } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';
import { Portal } from '../common/Portal';
import { useTranslation } from 'react-i18next';

interface ReportIssueButtonProps {
  historyId: string;
}

export function ReportIssueButton({ historyId }: ReportIssueButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Vérifier que l'utilisateur est connecté
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Vous devez être connecté pour signaler un problème');
      }

      const { error: submitError } = await supabase
        .from('history_reports')
        .insert([{
          history_id: historyId,
          message: message.trim() || null,
          status: 'pending'
        }]);

      if (submitError) throw submitError;
      
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
        setMessage('');
      }, 2000);
    } catch (err) {
      console.error('Error submitting report:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'envoi du signalement');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg 
          hover:bg-white/20 transition-colors"
      >
        <Flag className="w-5 h-5" />
      </button>

      {isOpen && (
        <Portal>
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => !isSubmitting && setIsOpen(false)}
          >
            <div 
              className="bg-white rounded-lg shadow-xl w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <Flag className="w-6 h-6 text-orange-500" />
                  <h3 className="text-lg font-semibold">Signaler un problème sur cette page</h3>
                </div>
                {!isSubmitting && (
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                {error && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {success ? (
                  <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg">
                    Merci pour votre signalement ! Nous allons l'examiner rapidement.
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description du problème (optionnel)
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        rows={4}
                        placeholder="Décrivez le problème que vous avez rencontré..."
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        disabled={isSubmitting}
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 
                          disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader className="w-4 h-4 animate-spin" />
                            Envoi...
                          </>
                        ) : (
                          t('history.detail.report')
                        )}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}