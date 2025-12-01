import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { signOut } from '../../lib/auth/auth-service';
import { LogoutConfirmDialog } from '../common/LogoutConfirmDialog';

export function OnlineAccountCard() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleSignOut = async () => {
    await signOut();
     setShowLogoutConfirm(false);
    navigate('/auth/login');
  };

  if (isAuthenticated && user) {
    return (
       <>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-purple-500" />
          Compte en ligne
        </h2>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-600">
            <Mail className="w-5 h-5 text-gray-400" />
            <span>{user.email}</span>
          </div>

          <div className="flex justify-end">
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Se déconnecter
              </button>
            </div>
        </div>
      </div>
           <LogoutConfirmDialog
          isOpen={showLogoutConfirm}
          onConfirm={handleSignOut}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      </>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <User className="w-5 h-5 text-purple-500" />
        Compte en ligne
      </h2>
      
      <div>
        <p className="text-gray-600 mb-6">
          Créez un compte en ligne pour sauvegarder votre progression et accéder à vos leçons sur tous vos appareils.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate('/auth/register')}
            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Créer un compte
          </button>
          
          <button
            onClick={() => navigate('/auth/login')}
            className="flex-1 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}