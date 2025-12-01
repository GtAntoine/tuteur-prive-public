// src/components/common/RecordingModal.tsx
import React, { useEffect } from 'react';
import { Mic, X, Check, RotateCcw, Loader } from 'lucide-react';
import { AudioLevelIndicator } from './AudioLevelIndicator';
import { AnimatedDots } from './AnimatedDots';
import { Portal } from './Portal';

interface RecordingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onRestart: () => void;
  isRecording: boolean;
  isProcessing: boolean;
  audioLevel: number;
  progress: number;
}

export function RecordingModal({
  isOpen,
  onClose,
  onConfirm,
  onRestart,
  isRecording,
  isProcessing,
  audioLevel,
  progress
}: RecordingModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isProcessing) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, isProcessing]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={isProcessing ? undefined : onClose}
        />

        <div className="relative bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4 transform transition-all z-10">
          {!isProcessing && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          )}

          {isProcessing ? (
            <div className="text-center py-8">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-purple-300 border-b-purple-200 border-l-purple-400 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <p className="text-lg text-gray-700 font-medium">
                Analyse en cours
                <AnimatedDots />
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Veuillez patienter pendant le traitement de votre réponse
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-24 h-24 mx-auto relative">
                  <div className={`w-full h-full rounded-full ${
                    isRecording ? 'bg-red-500 animate-pulse' : 'bg-purple-500'
                  } flex items-center justify-center shadow-lg`}>
                    <Mic className="w-12 h-12 text-white" />
                  </div>
                  {isRecording && <AudioLevelIndicator level={audioLevel} />}
                </div>
                <h3 className="text-xl font-semibold mt-6 text-gray-800">
                  {isRecording ? 'Enregistrement en cours' : 'Prêt à enregistrer'}
                </h3>
                {isRecording && (
                  <p className="text-sm text-gray-600 mt-2">
                    Parlez clairement dans votre microphone
                  </p>
                )}

                {isRecording && (
                  <div className="mt-4">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {Math.round((30 - (progress / 100 * 30)))}s d'enregistrement restantes
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                {isRecording ? (
                  <>
                    <button
                      onClick={onConfirm}
                      className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
                    >
                      <Check className="w-5 h-5" />
                      Terminer l'enregistrement
                    </button>
                    <button
                      onClick={onRestart}
                      className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 font-medium"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Recommencer
                    </button>
                  </>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </Portal>
  );
}
