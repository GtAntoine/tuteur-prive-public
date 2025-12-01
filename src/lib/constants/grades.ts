export const GRADES = [
  'CP',
  'CE1', 
  'CE2',
  'CM1',
  'CM2',
  '6ème',
  '5ème',
  '4ème',
  '3ème'
] as const;

// Équivalents internationaux des niveaux scolaires
export const GRADE_EQUIVALENTS = {
  // Français
  fr: {
    'CP': 'CP',
    'CE1': 'CE1',
    'CE2': 'CE2',
    'CM1': 'CM1',
    'CM2': 'CM2',
    '6ème': '6ème',
    '5ème': '5ème',
    '4ème': '4ème',
    '3ème': '3ème'
  },
  // Anglais
  en: {
    'CP': '1st Grade',
    'CE1': '2nd Grade',
    'CE2': '3rd Grade',
    'CM1': '4th Grade',
    'CM2': '5th Grade',
    '6ème': '6th Grade',
    '5ème': '7th Grade',
    '4ème': '8th Grade',
    '3ème': '9th Grade'
  },
  // Indonésien
  id: {
    'CP': 'Kelas 1 SD',
    'CE1': 'Kelas 2 SD',
    'CE2': 'Kelas 3 SD',
    'CM1': 'Kelas 4 SD',
    'CM2': 'Kelas 5 SD',
    '6ème': 'Kelas 6 SD',
    '5ème': 'Kelas 7 SMP',
    '4ème': 'Kelas 8 SMP',
    '3ème': 'Kelas 9 SMP'
  }
};

export type Grade = typeof GRADES[number];