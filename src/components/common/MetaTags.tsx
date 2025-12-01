// src/components/common/MetaTags.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title: string;
  description?: string;
  image?: string;
}

export function MetaTags({ title, description, image }: MetaTagsProps) {
  const defaultDescription = "Tuteur Privé - Ton assistant d'apprentissage intelligent";
  const defaultImage = '/images/logo.png';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description || defaultDescription} />

      {/* OpenGraph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
}
