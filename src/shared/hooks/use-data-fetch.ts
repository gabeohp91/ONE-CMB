import { useState, useEffect, useCallback, DependencyList } from 'react';

export interface UseDataFetchProps<T> {
  fetchFn: () => Promise<T>;
  initialData?: T;
  dependencies?: DependencyList;
  autoFetch?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

/**
 * A generic data fetching hook
 * 
 * Note: This is a transitional hook that will eventually be replaced with React Query.
 * Use this hook for backward compatibility while migrating to the new data management approach.
 */
export function useDataFetch<T>({
  fetchFn,
  initialData,
  dependencies = [],
  autoFetch = true,
  onSuccess,
  onError,
}: UseDataFetchProps<T>) {
  const [data, setData] = useState<T  < /dev/null |  undefined>(initialData);
  const [isLoading, setIsLoading] = useState(autoFetch);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fetchFn();
      setData(result);
      onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      onError?.(error);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, onSuccess, onError]);

  useEffect(() => {
    if (autoFetch) {
      fetch();
    }
  }, [...dependencies, fetch]);

  return {
    data,
    isLoading,
    error,
    refetch: fetch,
  };
}

export default useDataFetch;
