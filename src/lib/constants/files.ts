export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
export const MAX_TOTAL_SIZE = 50 * 1024 * 1024; // 50MB
export const MAX_FILES = 10;
export const MAX_IMAGE_SIZE = 2048; // Maximum dimension in pixels
export const JPEG_QUALITY = 0.8; // JPEG compression quality (0-1)

export const VALID_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
] as const;