import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { OnlineAccountCard } from '../components/settings/OnlineAccountCard';
import { SubscriptionCard } from '../components/subscription/SubscriptionCard';
import { TokensDisplay } from '../components/profile/TokensDisplay';
import { BillingPortal } from '../components/subscription/BillingPortal';
import { SubscriptionConfirmation } from '../components/subscription/SubscriptionConfirmation';
import { useSubscription } from '../hooks/useSubscription';
import { useSearchParams } from 'react-router-dom';
import { LanguageSelector } from '../components/settings/LanguageSelector';

export function SettingsPage() {
  const navigate = useNavigate();
  const { subscription, isLoading } = useSubscription();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50 bg-gradient-to-br from-indigo-900 to-purple-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link 
          to="/profiles" 
          className="mb-6 flex w-fit bg-gradient-to-tr from-indigo-500 to-pink-500 items-center gap-0.5 px-0.5 py-0.5 text-gray-900 rounded-full transition-all duration-300 group-hover:scale-105"
        >
          <div className="relative bg-white rounded-full px-4 py-2 group-hover:bg-opacity-90 w-full h-full flex items-center gap-2">
            <ArrowLeft className="w-6 h-6 text-gray-900 gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            <span className="text-lg text-gray-900">Retour</span>
          </div>
        </Link>
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">{t('settings.title')}</h1>
              {subscription && !isLoading && (
                <p className="text-white/80">
                  Plan {subscription.prices?.products?.name || 'actuel'}
                </p>
              )}
            </div>
          </div>

          {subscription && <BillingPortal />}
        </div>
        
        <div className="space-y-6">
          <TokensDisplay />
          <LanguageSelector />
          <SubscriptionCard />
          <OnlineAccountCard />
        </div>
      </div>
    </div>
  );
}