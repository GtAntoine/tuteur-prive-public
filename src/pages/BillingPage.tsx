import React from 'react';
import { CreditCard } from 'lucide-react';
import { BackButton } from '../components/common/BackButton';
import { SubscriptionCard } from '../components/subscription/SubscriptionCard';
import { BillingPortal } from '../components/subscription/BillingPortal';
import { SubscriptionConfirmation } from '../components/subscription/SubscriptionConfirmation';
import { TokensDisplay } from '../components/profile/TokensDisplay';
import { useSubscription } from '../hooks/useSubscription';
import { useSearchParams } from 'react-router-dom';

export function BillingPage() {
  const { subscription, isLoading } = useSubscription();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BackButton to="/profiles" className="mb-6" />

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Abonnement</h1>
            {subscription && !isLoading && (
              <p className="text-white/80">
                Plan {subscription.prices?.products?.name || 'actuel'}
              </p>
            )}
          </div>
        </div>

        {subscription && <BillingPortal />}
      </div>

      {sessionId && <SubscriptionConfirmation />}
      
      <div className="space-y-6">
        <TokensDisplay />
        <SubscriptionCard />
      </div>
    </div>
  );
}