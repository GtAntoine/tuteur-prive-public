import { useState, useCallback, useEffect, useRef } from 'react';
import { transcribeAudio } from '../lib/openai/answer-validation';
import { checkMicrophonePermission, requestMicrophonePermission } from '../lib/utils/audio-permissions';

// Helper function to get supported MIME type for the current browser
function getSupportedMimeType(): string {
  // iOS Safari primarily supports audio/mp4
  if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    return 'audio/mp4';
  }

  const types = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/ogg;codecs=opus',
    'audio/mp4',
    'audio/mpeg',
    'audio/wav'
  ];
  
  for (const type of types) {
    if (MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }
  
  throw new Error('Aucun format audio supporté n\'a été trouvé sur votre navigateur');
}

export function useAudioRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [isCancelled, setIsCancelled] = useState(false);
  const recordingStartTime = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

 const cancelRecording = useCallback(async () => {
  if (mediaRecorder && isRecording) {
    mediaRecorder.stream.getTracks().forEach(track => track.stop());
    setIsRecording(false);
    setMediaRecorder(null);
    setAudioChunks([]);
    setAudioLevel(0);
    recordingStartTime.current = null;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }
}, [mediaRecorder, isRecording]);


  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isRecording) {
        setError('Enregistrement interrompu : écran éteint ou application en arrière-plan');
        cancelRecording();
      }
    };

    const handlePause = () => {
      if (isRecording) {
        setError('Enregistrement interrompu : écran éteint ou application en arrière-plan');
        cancelRecording();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('pause', handlePause);
    document.addEventListener('freeze', handlePause);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('pause', handlePause);
      document.removeEventListener('freeze', handlePause);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRecording, cancelRecording]);

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      setIsCancelled(false);
      
      let hasPermission = await checkMicrophonePermission();
      if (!hasPermission) {
        try {
          hasPermission = await requestMicrophonePermission();
        } catch (error) {
          if (error instanceof Error) {
            if (error.name === 'NotFoundError') {
              throw new Error('Aucun microphone n\'a été détecté sur votre appareil');
            } else if (error.name === 'NotAllowedError') {
              throw new Error('Vous devez autoriser l\'accès au microphone pour utiliser cette fonctionnalité');
            }
          }
          throw new Error('Impossible d\'accéder au microphone');
        }
      }

      if (!hasPermission) {
        throw new Error('Permission d\'accès au microphone refusée');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });

      const mimeType = getSupportedMimeType();
      
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audioSource = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      audioSource.connect(analyser);
      
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateAudioLevel = () => {
        if (isRecording) {
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setAudioLevel(average);
          animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
        }
      };

      const recorder = new MediaRecorder(stream, {
        mimeType,
        audioBitsPerSecond: 128000
      });
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioChunks(chunks => [...chunks, e.data]);
        }
      };

      recorder.start(100);
      setMediaRecorder(recorder);
      setIsRecording(true);
      recordingStartTime.current = Date.now();
      animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
    } catch (error) {
      console.error('Error starting recording:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Une erreur est survenue lors de l\'accès au microphone';
      setError(errorMessage);
      throw error;
    }
  }, [isRecording]);
  
  const stopRecording = useCallback(async (): Promise<string | null> => {
    if (!mediaRecorder || !isRecording) return null;

    return new Promise((resolve) => {
      mediaRecorder.onstop = async () => {
        try {
          if (isCancelled) {
            resolve(null);
            return;
          }

          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }

          mediaRecorder.stream.getTracks().forEach(track => track.stop());
          console.log("create audioBlob")
          const audioBlob = new Blob(audioChunks, { 
            type: /iPhone|iPad|iPod/.test(navigator.userAgent) ? 'audio/mp4' : 'audio/webm'
          });
          console.log(" audioBlob done")
          try {
            console.log("try transcription")
            const transcription = await transcribeAudio(audioBlob);
            resolve(transcription);

            console.log("resolve transcription")
          } catch (error) {
            console.error('Error transcribing audio:', error);
            setError('Erreur lors de la transcription audio');
            resolve(null);
          }
        } catch (error) {
          console.error('Error processing audio:', error);
          setError('Erreur lors du traitement de l\'audio');
          resolve(null);
        } finally {
          setIsRecording(false);
          setMediaRecorder(null);
          setAudioChunks([]);
          setAudioLevel(0);
          recordingStartTime.current = null;
        }
      };

      try {
        mediaRecorder.stop();
      } catch (error) {
        console.error('Error stopping recorder:', error);
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
        setMediaRecorder(null);
        setAudioChunks([]);
        setAudioLevel(0);
        recordingStartTime.current = null;
        resolve(null);
      }
    });
  }, [mediaRecorder, isRecording, audioChunks, isCancelled]);

  return {
    isRecording,
    startRecording,
    stopRecording,
    cancelRecording,
    error,
    audioLevel,
    recordingStartTime: recordingStartTime.current
  };
}