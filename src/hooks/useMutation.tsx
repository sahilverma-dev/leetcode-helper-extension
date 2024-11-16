import { useState } from "react";

interface MutationOptions<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
}

interface MutationResult<TData, TVariables> {
  data: TData | undefined;
  isLoading: boolean;
  error: Error | null;
  mutate: (variables: TVariables) => Promise<void>;
  reset: () => void;
}

export function useMutation<TData, TVariables>({
  mutationFn,
  onSuccess,
  onError,
}: MutationOptions<TData, TVariables>): MutationResult<TData, TVariables> {
  const [data, setData] = useState<TData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const reset = () => {
    setData(undefined);
    setError(null);
    setIsLoading(false);
  };

  const mutate = async (variables: TVariables) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await mutationFn(variables);
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

  return {
    data,
    isLoading,
    error,
    mutate,
    reset,
  };
}
