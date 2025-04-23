import React from 'react';

interface LoadingFallbackProps {
  message?: string;
  className?: string;
}

/**
 * Loading fallback component to display during lazy loading
 */
export const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  message = 'Loading...',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-6 ${className}`}>
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};