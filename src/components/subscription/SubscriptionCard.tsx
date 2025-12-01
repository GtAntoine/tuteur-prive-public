// src/components/subscription/SubscriptionCard.tsx
import React from 'react';
import { Check, Loader } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';
import { useSubscriptionFlow } from '../../hooks/useSubscriptionFlow';

const SUBSCRIPTION_TIERS = [
{
    name: 'Essentiel',
    price: '0€',
    period: '/mois',
    features: [
      '100 jetons par mois',
    ],
    priceId: 'price_1QejmbAQyr7sKUBedyPi381L',
   popular: true
  },
  /*
  {
    name: '100 jetons test',
    price: '5.99€',
    features: [
      '30 leçons par jour',
      '30 aides aux exercices par jour',
      '30 validations des devoirs par jour',
      '3 profils',
      'Historique des 100 derniers éléments'
    ],
    priceId: 'price_1Qej38AQyr7sKUBeqDFTC5X8',
    popular: true
  },
  {
    name: 'Gratuit',
    price: '0€',
    period: '/mois',
    features: [
      '3 leçons par jour',
      '3 aides aux exercices',
      '3 contrôle des réponses',
      'Historique des 10 derniers éléments',
      '1 profil'
    ],
    priceId: null,
    popular: false
  },
  {
    name: 'Essentiel',
    price: '6.99€',
    period: '/mois',
    features: [
      '30 leçons par jour',
      '30 aides aux exercices par jour',
      '30 validations des devoirs par jour',
      '3 profils',
      'Historique des 100 derniers éléments'
    ],
    priceId: 'price_1QZqF5AQyr7sKUBeRa4lIz7v',
    popular: true
  },*/
  {
    name: 'Premium',
    price: '16.99€',
    period: '/mois',
    features: [
       '1000 jetons par mois',
    ],
 /*   features: [
      'Leçons illimitées',
      'Aides aux exercices illimités',
      'Contrôle des réponses illimités',
      'Historique illimité',
      '9 profils'
    ],*/
    priceId: 'price_1QZqGjAQyr7sKUBe0FbKoMfN',
    popular: false
  }
];

export function SubscriptionCard() {
  const { subscription, isLoading: isLoadingSubscription } = useSubscription();
  const { isProcessing, error, handleSubscribe } = useSubscriptionFlow();

   const getCurrentPlan = (priceId: string | null) => {
    if (!subscription || !priceId) return false;
    return subscription.price_id === priceId && subscription.status === 'active';
  };

  if (isLoadingSubscription) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="grid grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {error && (
        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {SUBSCRIPTION_TIERS.map((tier) => {
          const isCurrentPlan = getCurrentPlan(tier.priceId);
          
          return (
            <div 
              key={tier.name}
              className={`border rounded-lg p-4 relative ${
                tier.popular ? 'border-2 border-purple-500' : ''
              } ${isCurrentPlan ? 'bg-purple-50' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-3 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                  Populaire
                </div>
              )}

              <h3 className="text-lg font-medium text-gray-800 mb-2">{tier.name}</h3>
              <p className="text-3xl font-bold text-purple-600 mb-4">
                {tier.price}
                <span className="text-sm text-gray-500 font-normal">{tier.period}</span>
              </p>

              <ul className="space-y-2 mb-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500 min-w-4" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {tier.priceId ? (
                <button
                  onClick={() => handleSubscribe(tier.priceId!)}
                  disabled={isProcessing || isCurrentPlan}
                  className={`w-full px-4 py-2 rounded-lg transition-all duration-300 ${
                    isCurrentPlan
                      ? 'bg-green-500 text-white cursor-default'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                >
                  {isProcessing ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Traitement...
                    </>
                  ) : isCurrentPlan ? (
                    'Abonnement actuel'
                  ) : subscription?.status === 'active' ? (
                    'Changer de plan'
                  ) : (
                    'S\'abonner'
                  )}
                </button>
              ) : (
                <button
                  disabled
                  className="w-full px-4 py-2 bg-gray-100 text-gray-500 rounded-lg cursor-default"
                >
                  {subscription?.status === 'active' ? 'Plan non disponible' : 'Plan gratuit'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
