'use client';

import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Toaster } from 'react-hot-toast';
import { queryClient } from './react-query';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Global providers for the application
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              style: {
                background: '#22c55e',
                color: '#fff',
              }
            },
            error: {
              duration: 5000,
              style: {
                background: '#ef4444',
                color: '#fff',
              }
            }
          }}
        />
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}