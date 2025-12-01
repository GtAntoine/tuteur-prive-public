export async function convertAudioToMp3(blob: Blob): Promise<Blob> {
  try {
    // Créer un contexte audio
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Convertir le Blob en ArrayBuffer
    const arrayBuffer = await blob.arrayBuffer();
    
    // Décoder l'audio
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    // Créer un nouveau contexte pour l'encodage
    const offlineContext = new OfflineAudioContext(
      audioBuffer.numberOfChannels,
      audioBuffer.length,
      audioBuffer.sampleRate
    );
    
    // Créer une source à partir du buffer décodé
    const source = offlineContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(offlineContext.destination);
    source.start();
    
    // Rendre l'audio
    const renderedBuffer = await offlineContext.startRendering();
    
    // Convertir en WAV puis en MP3
    const wavBlob = await audioBufferToWav(renderedBuffer);
    const mp3Blob = await wavToMp3(wavBlob);
    
    return mp3Blob;
  } catch (error) {
    console.error('Error converting audio:', error);
    throw new Error('Impossible de convertir l\'audio. Veuillez réessayer.');
  }
}

// Convertir AudioBuffer en WAV
function audioBufferToWav(buffer: AudioBuffer): Promise<Blob> {
  const numOfChan = buffer.numberOfChannels;
  const length = buffer.length * numOfChan * 2;
  const view = new DataView(new ArrayBuffer(44 + length));
  
  // En-tête WAV
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + length, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numOfChan, true);
  view.setUint32(24, buffer.sampleRate, true);
  view.setUint32(28, buffer.sampleRate * 2 * numOfChan, true);
  view.setUint16(32, numOfChan * 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, length, true);
  
  // Écriture des données audio
  const channels = [];
  for (let i = 0; i < numOfChan; i++) {
    channels.push(buffer.getChannelData(i));
  }
  
  let offset = 44;
  for (let i = 0; i < buffer.length; i++) {
    for (let j = 0; j < numOfChan; j++) {
      const sample = Math.max(-1, Math.min(1, channels[j][i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      offset += 2;
    }
  }
  
  return Promise.resolve(new Blob([view], { type: 'audio/wav' }));
}

// Convertir WAV en MP3
async function wavToMp3(wavBlob: Blob): Promise<Blob> {
  // Pour l'instant, on retourne directement le WAV car la conversion en MP3
  // nécessiterait une bibliothèque externe comme lamejs
  // L'API accepte aussi le format WAV
  return wavBlob;
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}