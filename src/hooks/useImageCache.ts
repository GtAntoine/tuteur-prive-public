// src/hooks/useImageCache.ts
import { useState, useEffect } from 'react';

const imageCache = new Map<string, string>();

export function useImageCache(url: string) {
  const [cachedUrl, setCachedUrl] = useState(imageCache.get(url));

  useEffect(() => {
    if (!url || imageCache.has(url)) return;

    const cacheImage = async () => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        imageCache.set(url, objectUrl);
        setCachedUrl(objectUrl);
      } catch (error) {
        console.error('Error caching image:', error);
      }
    };

    cacheImage();

    return () => {
      if (cachedUrl) {
        URL.revokeObjectURL(cachedUrl);
      }
    };
  }, [url]);

  return cachedUrl || url;
}
