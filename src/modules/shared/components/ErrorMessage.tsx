import React from 'react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  className?: string;
}

/**
 * A simple error message component to display inline errors
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Error',
  message,
  className = '',
}) => {
  return (
    <div className={`bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative ${className}`}>
      <strong className="font-medium">{title}: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};