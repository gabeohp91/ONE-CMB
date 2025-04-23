import { useState, useCallback } from 'react';
import { useToast } from '@/shared/hooks/useToast';

export type ErrorState = {
  hasError: boolean;
  message: string | null;
  code?: string | number;
  details?: any;
};

type ErrorWithMessage = {
  message: string;
  code?: string | number;
  details?: any;
};

/**
 * Custom hook for handling errors with toast notifications
 */
export function useErrorHandler() {
  const [error, setError] = useState<ErrorState>({
    hasError: false,
    message: null,
  });
  const toast = useToast();

  const handleError = useCallback((err: unknown, showToast = true) => {
    console.error('Error handled:', err);
    
    let errorMessage = 'An unknown error occurred';
    let errorCode: string | number | undefined;
    let errorDetails: any;
    
    // Handle different error types
    if (err instanceof Error) {
      errorMessage = err.message;
      // TypeScript does not know about the code property on Error
      errorCode = (err as any).code;
      errorDetails = (err as any).details;
    } else if (typeof err === 'string') {
      errorMessage = err;
    } else if (err && typeof err === 'object' && 'message' in err) {
      const errorWithMessage = err as ErrorWithMessage;
      errorMessage = errorWithMessage.message;
      errorCode = errorWithMessage.code;
      errorDetails = errorWithMessage.details;
    }
    
    // Update error state
    setError({
      hasError: true,
      message: errorMessage,
      code: errorCode,
      details: errorDetails,
    });
    
    // Show toast notification if enabled
    if (showToast) {
      toast.error(errorMessage);
    }
    
    return { errorMessage, errorCode, errorDetails };
  }, [toast]);

  const clearError = useCallback(() => {
    setError({
      hasError: false,
      message: null,
    });
  }, []);

  return {
    error,
    handleError,
    clearError,
    isError: error.hasError,
    errorMessage: error.message,
  };
}