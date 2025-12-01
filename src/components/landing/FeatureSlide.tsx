import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Feature } from './features';

interface FeatureSlideProps {
  feature: Feature;
  isTransitioning: boolean;
}

export function FeatureSlide({ feature, isTransitioning }: FeatureSlideProps) {
  const Icon = feature.icon;
  const { t } = useTranslation();
  
  return (
    <div className={`max-w-4xl w-full text-center transition-opacity duration-500 ${
      isTransitioning ? 'opacity-50' : 'opacity-100'
    }`}>
      <div className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6 rounded-full bg-gradient-to-r ${feature.color}`}>
        <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
      </div>
      
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight">
        {t(feature.title)}
      </h2>
      
      <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
        {t(feature.description)}
      </p>
    </div>
  );
}