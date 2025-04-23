import React from 'react';

interface FallbackErrorProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

/**
 * A reusable error UI component that can be used as a fallback
 * component for ErrorBoundary
 */
export const FallbackError: React.FC<FallbackErrorProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="p-6 mx-auto max-w-md bg-white rounded-lg shadow-md border border-red-100">
      <div className="flex items-center justify-center mb-4">
        <div className="rounded-full bg-red-100 p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
      </div>
      <h2 className="text-xl font-bold text-center text-gray-800 mb-2">Something went wrong</h2>
      
      {error && (
        <div className="bg-red-50 p-3 rounded-md my-3 overflow-auto max-h-32">
          <p className="text-sm font-mono text-red-700">{error.message}</p>
        </div>
      )}
      
      <p className="text-gray-600 text-sm mb-4 text-center">
        We apologize for the inconvenience. The application has encountered an unexpected error.
      </p>
      
      {resetErrorBoundary && (
        <div className="flex justify-center">
          <button
            onClick={resetErrorBoundary}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};