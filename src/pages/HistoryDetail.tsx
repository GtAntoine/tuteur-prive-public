import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Book, CheckSquare, HelpCircle } from 'lucide-react';
import { getHistoryEntry, updateHistoryEntry } from '../lib/utils/history';
import { FeedbackDisplay } from '../components/FeedbackDisplay';
import { BackButton } from '../components/common/BackButton';
import { HistoryImages } from '../components/history/HistoryImages';
import { ShareHistoryButton } from '../components/history/ShareHistoryButton';
import { ReportIssueButton } from '../components/history/ReportIssueButton';
import { NotFound } from '../components/common/NotFound';
import { MetaTags } from '../components/common/MetaTags';
import { EditableTitle } from '../components/history/EditableTitle';
import { SubjectBadge } from '../components/SubjectBadge';
import { useHistoryActions } from '../hooks/useHistoryActions';
import { useTranslation } from 'react-i18next';
import type { HistoryEntry } from '../lib/types';

export function HistoryDetail() {
  const { id } = useParams<{ id: string }>();
  const [entry, setEntry] = useState<HistoryEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const { t } = useTranslation();
  
  const { 
    handleTitleSave, 
    handleSubjectChange,
    handleQCMAnswer,
    handleReset 
  } = useHistoryActions(entry, id, setEntry, setIsUpdating);

  useEffect(() => {
    async function loadEntry() {
      if (!id) return;
      try {
        const historyEntry = await getHistoryEntry(id);
        setEntry(historyEntry);
      } catch (error) {
        console.error('Error loading history entry:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadEntry();
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return <HistoryDetailSkeleton />;
  }

  if (!entry) {
    return <NotFound backTo="/history" message="Entrée non trouvée" />;
  }

  const title = entry.data.lesson_analysis?.title || 
                entry.data.exercise_analysis?.title || 
                'Correction d\'exercices';

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <MetaTags 
        title={`${title} | Tuteur Privé`}
        description={entry.data.summary?.brief || 'Révision de cours avec Tuteur Privé'}
        image={entry.images[0]}
      />

      <HistoryDetailHeader 
        entry={entry}
        title={title}
        isUpdating={isUpdating}
        onTitleSave={handleTitleSave}
        onSubjectChange={handleSubjectChange}
      />
      
      <HistoryImages images={entry.images} />

      <FeedbackDisplay 
        data={entry.data} 
        type={entry.type}
        historyId={entry.id} 
        mode="history"
        onQCMAnswer={handleQCMAnswer}
        onReset={handleReset}
      />
    </div>
  );
}

function HistoryDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <BackButton to="/history" className="mb-6" />
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-white/10 rounded-lg w-1/3" />
        <div className="h-64 bg-white/10 rounded-lg" />
        <div className="h-96 bg-white/10 rounded-lg" />
      </div>
    </div>
  );
}

function HistoryDetailHeader({ 
  entry, 
  title,
  isUpdating,
  onTitleSave,
  onSubjectChange
}: {
  entry: HistoryEntry;
  title: string;
  isUpdating: boolean;
  onTitleSave: (title: string) => void;
  onSubjectChange: (subject: string) => void;
}) {
  const { t } = useTranslation();
  
  const getTypeIcon = () => {
    switch (entry.type) {
      case 'lesson': return <Book className="w-6 h-6 text-white" />;
      case 'correction': return <CheckSquare className="w-6 h-6 text-white" />;
      case 'guided': return <HelpCircle className="w-6 h-6 text-white" />;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <BackButton to="/history" label={t('history.detail.back')} />
        <div className="flex items-center gap-3">
          <ReportIssueButton historyId={entry.id} />
          <ShareHistoryButton 
            entryId={entry.id} 
            isPublic={entry.is_public || false}
            title={title}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
          {getTypeIcon()}
        </div>
        <div className="flex-1">
          <EditableTitle 
            title={title} 
            onSave={onTitleSave}
            disabled={isUpdating}
          />
        </div>
      </div>
    </>
  );
}