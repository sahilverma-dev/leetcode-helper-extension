import { useState, useEffect } from "react";

interface QueryOptions<T> {
  queryFn: () => Promise<T>;
  enabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface QueryResult<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useQuery<T>({
  queryFn,
  enabled = true,
  onSuccess,
  onError,
}: QueryOptions<T>): QueryResult<T> {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await queryFn();
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("An error occurred");
      setError(error);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
}
