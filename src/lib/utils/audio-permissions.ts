export async function checkMicrophonePermission(): Promise<boolean> {
  try {
    const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
    return result.state === 'granted';
  } catch (error) {
    return false;
  }
}

export async function requestMicrophonePermission(): Promise<boolean> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach(track => track.stop());
    return true;
  } catch (error) {
    console.error('Error requesting microphone permission:', error);
    return false;
  }
}