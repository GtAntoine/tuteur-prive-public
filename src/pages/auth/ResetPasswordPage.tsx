import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Loader, ArrowLeft } from 'lucide-react';
import { resetPassword } from '../../lib/auth/auth-service';
import { useTranslation } from 'react-i18next';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await resetPassword(email);
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError(t('auth.errors.generic'));
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('auth.resetPassword.success.title')}</h2>
            <p className="text-gray-600 mb-6">
              {t('auth.resetPassword.success.message')}
            </p>
            <button
              onClick={() => navigate('/auth/login')}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {t('auth.resetPassword.success.action')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate('/auth/login')}
          className="text-white mb-8 flex items-center gap-2 hover:text-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('auth.resetPassword.backToLogin')}
        </button>

        <h1 className="text-3xl font-bold text-white mb-8">{t('auth.resetPassword.title')}</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-xl space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('auth.resetPassword.email')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
              disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                {t('auth.resetPassword.loading')}
              </>
            ) : (
              t('auth.resetPassword.submit')
            )}
          </button>
        </form>
      </div>
    </div>
  );
}