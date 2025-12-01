export const SUBJECTS = {
  // Français - All grades
  FRENCH: {
    id: 'FRENCH',
    name: 'Français',
    color: 'blue',
    icon: 'book',
    grades: ['CP', 'CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème', '3ème']
  },

  // Mathématiques - All grades
  MATH: {
    id: 'MATH',
    name: 'Mathématiques',
    color: 'purple',
    icon: 'calculator',
    grades: ['CP', 'CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème', '3ème']
  },

  // Histoire-Géographie - From CE2
  HISTORY_GEO: {
    id: 'HISTORY_GEO',
    name: 'Histoire - Géographie',
    color: 'orange',
    icon: 'globe',
    grades: ['CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème', '3ème']
  },

  // Anglais - From CE1
  ENGLISH: {
    id: 'ENGLISH',
    name: 'Anglais',
    color: 'indigo',
    icon: 'book',
    grades: ['CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème', '3ème']
  },

  // EMC - All grades
  EMC: {
    id: 'EMC',
    name: 'Enseignement Moral et Civique',
    color: 'green',
    icon: 'users',
    grades: ['CP', 'CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème', '3ème']
  },

  // Sciences - Primary school version
  SCIENCE: {
    id: 'SCIENCE',
    name: 'Sciences et Technologie',
    color: 'teal',
    icon: 'beaker',
    grades: ['CP', 'CE1', 'CE2', 'CM1', 'CM2']
  },

  // SVT - Middle school only
  SVT: {
    id: 'SVT',
    name: 'Sciences de la Vie et de la Terre',
    color: 'green',
    icon: 'leaf',
    grades: ['6ème', '5ème', '4ème', '3ème']
  },

  // Physique-Chimie - Middle school only
  PHYSIQUE_CHIMIE: {
    id: 'PHYSIQUE_CHIMIE',
    name: 'Physique-Chimie',
    color: 'pink',
    icon: 'flask',
    grades: ['6ème', '5ème', '4ème', '3ème']
  },

  // Technologie - Middle school only
  TECHNOLOGIE: {
    id: 'TECHNOLOGIE',
    name: 'Technologie',
    color: 'gray',
    icon: 'cpu',
    grades: ['6ème', '5ème', '4ème', '3ème']
  },

} as const;

export type SubjectId = keyof typeof SUBJECTS;
