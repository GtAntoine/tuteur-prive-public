import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Loader } from 'lucide-react';
import { stripe } from '../../lib/stripe/client';

export function SubscriptionConfirmation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) return;

    const timer = setTimeout(() => {
      navigate('/settings/billing', { replace: true });
    }, 5000);

    return () => clearTimeout(timer);
  }, [sessionId, navigate]);

  if (!sessionId) return null;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-8 animate-pop">
      <div className="flex items-center gap-4">
        {status === 'loading' ? (
          <Loader className="w-8 h-8 text-purple-500 animate-spin" />
        ) : (
          <CheckCircle className="w-8 h-8 text-green-500" />
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {status === 'loading' ? 'Confirmation de votre abonnement...' : 'Abonnement confirmé !'}
          </h3>
          <p className="text-gray-600">
            {status === 'loading' 
              ? 'Veuillez patienter pendant que nous confirmons votre paiement...'
              : 'Merci pour votre abonnement. Vous allez être redirigé dans quelques secondes...'}
          </p>
        </div>
      </div>
    </div>
  );
}