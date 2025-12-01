export function extractAndParseJSON<T>(content: string): T | null {
  try {
    // D'abord, essayer de parser directement comme JSON
    try {
      return JSON.parse(content) as T;
    } catch {
      // Si ce n'est pas du JSON direct, chercher dans le markdown
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        return JSON.parse(jsonMatch[1]) as T;
      }
      return null;
    }
  } catch (error) {
    console.error('Erreur lors du parsing JSON:', error);
    return null;
  }
}