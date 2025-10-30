import { useState, useEffect } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useApi = <T>(apiCall: () => Promise<T>) => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = async () => {
    setState({ data: null, loading: true, error: null });

    try {
      const data = await apiCall();
      setState({ data, loading: false, error: null });
      return data;
    } catch (error: any) {
      const errorMessage = error.message || 'An error occurred';
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  };

  useEffect(() => {
    execute();
  }, []);

  return {
    ...state,
    refetch: execute,
  };
};
