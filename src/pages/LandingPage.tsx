import React from 'react';
import { Header } from '../components/landing/Header';
import { FeatureSlider } from '../components/landing/FeatureSlider';
import { TestimonialSection } from '../components/landing/TestimonialSection';
import { Footer } from '../components/landing/Footer';
import { CookieConsent } from '../components/common/CookieConsent';

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <FeatureSlider />
        <TestimonialSection />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}