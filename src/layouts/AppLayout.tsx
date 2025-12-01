import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 bg-gradient-to-br from-indigo-900 to-purple-900">
      {children}
    </div>
  );
}