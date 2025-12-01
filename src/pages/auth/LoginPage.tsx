import React, { useState } from 'react';
import { Mail, Lock, Loader } from 'lucide-react';
import { signIn } from '../../lib/auth/auth-service';
import { useAuthNavigation } from '../../hooks/useAuthNavigation';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function LoginPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { handleAuthSuccess } = useAuthNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !email || !password) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const { user, error: signInError } = await signIn(email, password);
      
      if (signInError) {
        throw signInError;
      }

      if (user) {
        await handleAuthSuccess();
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : t('auth.errors.generic'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">{t('auth.login.title')}</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-xl space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('auth.login.email')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('auth.login.password')}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
              disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                {t('auth.login.loading')}
              </>
            ) : (
              t('auth.login.submit')
            )}
          </button>

          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={() => navigate('/auth/register')}
              className="text-sm text-purple-600 hover:text-purple-700"
              disabled={isLoading}
            >
              {t('auth.login.noAccount')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/auth/reset-password')}
              className="block w-full text-sm text-purple-600 hover:text-purple-700"
              disabled={isLoading}
            >
              {t('auth.login.forgotPassword')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}