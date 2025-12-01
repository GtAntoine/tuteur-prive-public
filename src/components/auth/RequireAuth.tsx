// src/components/auth/RequireAuth.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, selectedProfileId } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Ne rediriger vers la sélection de profil que si :
  // 1. Aucun profil n'est sélectionné
  // 2. L'utilisateur n'est pas déjà sur /profiles
  // 3. L'utilisateur n'est pas sur /settings
  if (!selectedProfileId && 
      location.pathname !== '/profiles' && 
      !location.pathname.startsWith('/settings')) {
    return <Navigate to="/profiles" replace />;
  }

  return <>{children}</>;
}
