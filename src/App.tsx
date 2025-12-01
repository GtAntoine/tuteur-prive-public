import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './lib/auth/auth-provider';
import { AuthInitializer } from './lib/auth/AuthInitializer';
import { AppLayout } from './layouts/AppLayout';
import { AppRoutes } from './routes';
import { migrateFromLocalStorage } from './lib/utils/db';
import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <AuthInitializer />
          <AppLayout>
            <AppRoutes />
          </AppLayout>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}
