import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function ProfileButton() {
  const { currentProfile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
    );
  }

  if (!currentProfile) return null;

  return (
    <Link
      to="/profile/edit"
      className="flex items-center gap-2 px-2 py-2 rounded-full transition-all duration-300 
        bg-white/10 hover:bg-white/20 relative"
    >
      <div className="relative">
        <div className={`w-10 h-10 rounded-full bg-${currentProfile.avatar_color}-300 
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
      </div>
      <span className="hidden md:block pr-2">{currentProfile.name}</span>
    </Link>
  );
}