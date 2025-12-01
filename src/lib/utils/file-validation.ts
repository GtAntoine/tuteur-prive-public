import { MAX_FILE_SIZE, MAX_TOTAL_SIZE, MAX_FILES, VALID_FILE_TYPES } from '../constants/files';

export function validateFile(file: File): boolean {
  console.log("validateFile 0")
  if (!file || !(file instanceof File)) {
    return false;
  }
     console.log("validateFile 1")

  if (!VALID_FILE_TYPES.includes(file.type)) {
    return false;
  }
  console.log("validateFile 2")

  if (file.size > MAX_FILE_SIZE) {
    return false;
  }

  return true;
}

export function validateFiles(files: File[]): File[] {
  if (!Array.isArray(files)) {
    throw new Error('No files provided');
  }

  if (files.length > MAX_FILES) {
    throw new Error(`Maximum ${MAX_FILES} files allowed`);
  }

  console.log("validateFiles")

    // Vérifier que chaque élément est bien un File
  const validFiles = files.filter(validateFile);
    console.log("validateFile dones")
  if (validFiles.length === 0) {
    throw new Error('No valid files found');
  }
   console.log("validateFiles done 2")

   // Vérifier le nombre de fichiers
  if (validFiles.length > MAX_FILES) {
    throw new Error(`Maximum ${MAX_FILES} files allowed`);
  }
  console.log("validateFiles done 3")

  // Vérifier les types de fichiers
  const invalidFiles = validFiles.filter(file => !VALID_FILE_TYPES.includes(file.type));
  if (invalidFiles.length > 0) {
    throw new Error(`Invalid file types: ${invalidFiles.map(f => f.name).join(', ')}`);
  }

   console.log("validateFiles done 4")
  
  const totalSize = validFiles.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > MAX_TOTAL_SIZE) {
    throw new Error(`Total size exceeds ${MAX_TOTAL_SIZE / (1024 * 1024)}MB limit`);
  }

  

  return validFiles;
}