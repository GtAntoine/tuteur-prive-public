import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ConfirmDialog } from './ConfirmDialog';
import { useTranslation } from 'react-i18next';

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
  showConfirm?: boolean;
  type?: 'lesson' | 'correction' | 'guided';
}

export function BackButton({ 
  to = '/app',
  label,
  className = '',
  showConfirm = false,
  type = 'lesson'
}: BackButtonProps) {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const { t } = useTranslation();

  const handleClick = () => {
    if (showConfirm) {
      setShowDialog(true);
    } else {
      navigate(to);
    }
  };

  return (
    <>
    <div className={className}>
      <button
        onClick={handleClick}
        className={`flex max-w-sm bg-gradient-to-tr from-indigo-500/10 to-pink-500/10 items-center gap-0.5 px-0.5 py-0.5 text-gray-900 rounded-full transition-all duration-300 group-hover:scale-105 `}>
        <div className="relative bg-white/10 rounded-full px-4 py-4 md:py-2 group-hover:bg-opacity-90 w-full h-full flex items-center gap-2">
          <ArrowLeft className="w-5 h-5 text-white" />
          <span className="text-white hidden md:block" >{label || t('common.back')}</span>
        </div>
      </button>
    </div>

      <ConfirmDialog
        isOpen={showDialog}
        onConfirm={() => navigate(to)}
        onCancel={() => setShowDialog(false)}
        type={type}
      />
    </>
  );
}