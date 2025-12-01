import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Book, Calculator, Globe2, Users, Beaker, Pencil, Trash2 } from 'lucide-react';
import { SUBJECTS } from '../../lib/constants/subjects';
import { deleteHistoryEntry, updateHistoryEntry } from '../../lib/utils/history';
import { getSubjectFromData } from '../../lib/utils/subject';
import { SubjectSelector } from './SubjectSelector';
import { DeleteConfirmDialog } from '../common/DeleteConfirmDialog';
import { useTranslation } from 'react-i18next';
import type { HistoryEntry, SubjectId } from '../../lib/types';
import { generateSlug } from '../../lib/utils/url';

const SubjectIcon = {
  book: Book,
  calculator: Calculator,
  globe: Globe2,
  users: Users,
  beaker: Beaker
} as const;

const TypeColors = {
  lesson: 'blue',
  correction: 'green',
  guided: 'purple'
} as const;

const TypeIcons = {
  lesson: Book,
  correction: Calculator,
  guided: Users
} as const;

interface HistoryCardProps {
  entry: HistoryEntry;
  onDelete: () => void;
  onChange: () => void;
}

export function HistoryCard({ entry, onDelete, onChange }: HistoryCardProps) {
  const title = entry.data.lesson_analysis?.title || 
              entry.data.exercise_analysis?.title || 
              'Correction d\'exercices';
  const slug = generateSlug(title);
  
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { t } = useTranslation();

  const subject = getSubjectFromData(entry.data);
  const subjectInfo = subject ? SUBJECTS[subject] : undefined;
  const Icon = subjectInfo ? SubjectIcon[subjectInfo.icon as keyof typeof SubjectIcon] : undefined;
  const TypeIcon = TypeIcons[entry.type];
  const typeColor = TypeColors[entry.type];

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteHistoryEntry(entry.id);
      onDelete();
    } catch (error) {
      console.error('Error deleting entry:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleSubjectChange = async (newSubject: SubjectId) => {
    try {
      const updatedData = { ...entry.data, subject: newSubject };
      await updateHistoryEntry(entry.id, updatedData);
      setIsEditing(false);
      onChange();
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };

  return (
    <>
        <Link 
          to={`/history/${entry.id}/${slug}`} 
          className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
        {entry.images[0] && (
          <div className="aspect-video">
            <img
              crossOrigin="anonymous"
              src={entry.images[0]}
              alt="Aperçu"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full bg-${typeColor}-50 text-${typeColor}-700`}>
              <TypeIcon className="w-4 h-4" />
              <span className="text-sm">
                {t(`history.types.${entry.type}`)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowDeleteConfirm(true);
                }}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                disabled={isDeleting}
              >
                <Trash2 className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {subjectInfo && (
            <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full bg-${subjectInfo.color}-50 text-${subjectInfo.color}-700 mb-2`}>
              {Icon && <Icon className="w-4 h-4" />}
              <span className="text-sm">{t(`subjects.${subject}`)}</span>
            </div>
          )}
          
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
            {('lesson_analysis' in entry.data && entry.data.lesson_analysis.title) ||
             ('exercise_analysis' in entry.data && entry.data.exercise_analysis.title) ||
             'Correction d\'exercices'}
          </h3>
          
          <div className="text-sm text-gray-500">
            {format(entry.timestamp, "d MMMM yyyy 'à' HH:mm", { locale: fr })}
          </div>
        </div>
      </Link>

      {isEditing && (
        <SubjectSelector
          currentSubject={subject}
          onSelect={handleSubjectChange}
          onCancel={() => setIsEditing(false)}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmDialog
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </>
  );
}