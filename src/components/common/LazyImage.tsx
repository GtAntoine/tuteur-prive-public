import React, { useState, useEffect, useRef } from 'react';
import { useImageCache } from '../../hooks/useImageCache';
import { ImagePlaceholder } from './ImagePlaceholder';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function LazyImage({ src, alt, className = '' }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const cachedSrc = useImageCache(src);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  return (
    <div 
      ref={imgRef}
      className={`relative ${className}`}
    >
      {hasError ? (
        <ImagePlaceholder className={className} />
      ) : (
        <>
          {isInView && (
            <img
              src={cachedSrc}
              alt={alt}
              className={`transition-opacity duration-300 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              } ${className}`}
              onLoad={() => setIsLoaded(true)}
              onError={handleError}
              loading="lazy"
            />
          )}
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
          )}
        </>
      )}
    </div>
  );
}