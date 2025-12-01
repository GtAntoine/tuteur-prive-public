import type { ProfileData } from './types';
import { GRADES } from '../../constants/grades';

export function validateProfileData(data: ProfileData): void {
  if (!data.name?.trim()) {
    throw new Error('Le nom est requis');
  }

  if (!GRADES.includes(data.grade)) {
    throw new Error('Niveau scolaire invalide');
  }

  if (!data.avatar_color?.trim()) {
    throw new Error('La couleur est requise');
  }
}