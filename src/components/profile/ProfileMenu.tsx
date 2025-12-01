import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { signOut } from '../../lib/auth/auth-service';
import { Portal } from '../common/Portal';

export function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentProfile } = useAuth();

  if (!currentProfile) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 
          hover:bg-white/10 ${isOpen ? 'bg-white/10' : ''}`}
      >
        <div className={`w-10 h-10 rounded-full bg-${currentProfile.avatar_color}-200 
          flex items-center justify-center`}>
          {currentProfile.avatar_id ? (
            <img
              src={`/images/avatar/avatar${currentProfile.avatar_id}.svg`}
              alt="Avatar"
              className="w-full h-full object-contain rounded-full"
            />
          ) : (
            <span className={`text-${currentProfile.avatar_color}-600 font-bold`}>
              {currentProfile.name[0].toUpperCase()}
            </span>
          )}
        </div>
        <span className="hidden md:block">{currentProfile.name}</span>
      </button>

      {isOpen && (
        <Portal>
          <div 
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50">
            <div className="p-4 border-b">
              <p className="font-medium text-gray-900">{currentProfile.name}</p>
              <p className="text-sm text-gray-500">{currentProfile.grade}</p>
            </div>
            
            <div className="p-2">
              <Link
                to="/profile/edit"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="w-5 h-5" />
                Modifier mon profil
              </Link>
              
              <Link
                to="/profiles"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <User className="w-5 h-5" />
                Changer de profil
              </Link>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}