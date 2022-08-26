import { useState } from 'react';

const useFetching: <T extends (...args: any[]) => any>
(fetchFn: T) => {
    isLoading: boolean,
    error: any,
    fetch: (...args: Parameters<T>) => Promise<ReturnType<T>>
} = (fetchFn) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const fetch = async (...args: any[]) => {
        let response: any;
        setIsLoading(true);
        try {
            response = await fetchFn(...args);
        } catch (e) {
            setError(e as any);
        } finally {
            setIsLoading(false);
        }
        return response;
    }

    const clearError = () => {
        setError(null);
    }

    return { isLoading, error, clearError, fetch }
}

export default useFetching;
