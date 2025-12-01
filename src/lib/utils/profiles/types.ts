import type { Grade } from '../../types';

export interface ProfileData {
  name: string;
  grade: Grade;
  avatar_color: string;
  avatar_id?: string;
}

export interface SaveProfileOptions {
  updateExisting?: boolean;
}