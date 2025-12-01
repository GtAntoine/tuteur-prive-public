// src/lib/utils/array.ts
export function shuffleArray<T>(array: T[], seed: string): T[] {
  // Vérifier que le tableau est valide
  if (!Array.isArray(array) || array.some(item => item === undefined)) {
    console.error('Invalid array provided to shuffleArray:', array);
    return array;
  }

  // Fonction de génération de nombres aléatoires basée sur une seed
  const seededRandom = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return () => {
      hash = Math.imul(hash, 16807) >>> 0;
      return (hash / 0x100000000);
    };
  };

  try {
    const random = seededRandom(seed);
    const shuffled = [...array];
    
    // Algorithme de Fisher-Yates
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      // Vérifier que les indices sont valides
      if (i >= 0 && i < shuffled.length && j >= 0 && j < shuffled.length) {
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
    }

    // Vérifier qu'aucune valeur n'est undefined
    if (shuffled.some(item => item === undefined)) {
      console.error('Shuffled array contains undefined values:', shuffled);
      return array;
    }

    return shuffled;
  } catch (error) {
    console.error('Error in shuffleArray:', error);
    return array;
  }
}
