import React from 'react';
import { Quote } from 'lucide-react';
import { testimonials } from './testimonials';
import { useTranslation } from 'react-i18next';

export function TestimonialSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-br from-indigo-900 to-purple-900 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          {t('landing.testimonials.title')}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 transform hover:scale-105 transition-transform duration-300"
            >
              <Quote className="w-8 h-8 text-purple-400 mb-4" />
              <p className="text-lg md:text-xl text-white mb-6">
                {t(testimonial.text)}
              </p>
              <div>
                <p className="font-semibold text-white">{t(testimonial.author)}</p>
                <p className="text-purple-300">{t(testimonial.role)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}