import React from 'react';
import { BackButton } from '../components/common/BackButton';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Comment fonctionne Tuteur Privé ?",
    answer: "Tuteur Privé utilise l'intelligence artificielle pour analyser vos leçons et créer des exercices personnalisés adaptés à votre niveau."
  },
  {
    question: "Comment sont utilisés les jetons ?",
    answer: "Les jetons sont consommés à chaque fois que vous utilisez l'une des fonctionnalités principales : création de leçon, aide guidée ou correction d'exercices."
  },
  {
    question: "Comment obtenir plus de jetons ?",
    answer: "Vous recevez automatiquement 3 jetons gratuits chaque jour. Vous pouvez également souscrire à un abonnement pour obtenir plus de jetons."
  },
  {
    question: "Puis-je utiliser Tuteur Privé sur mobile ?",
    answer: "Oui, Tuteur Privé est entièrement responsive et fonctionne sur tous les appareils : ordinateurs, tablettes et smartphones."
  }
];

function FAQItem({ question, answer }: FAQItem) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        {isOpen ? (
          <Minus className="w-5 h-5 text-purple-500" />
        ) : (
          <Plus className="w-5 h-5 text-purple-500" />
        )}
      </button>
      
      {isOpen && (
        <p className="mt-4 text-gray-600">
          {answer}
        </p>
      )}
    </div>
  );
}

export function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackButton to="/" />
        
        <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Questions Fréquentes
          </h1>
          
          <div className="space-y-2">
            {faqItems.map((item, index) => (
              <FAQItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}