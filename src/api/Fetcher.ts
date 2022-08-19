import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { TAuthStore } from '../store/Auth';

type TRequestConfig<T> = AxiosRequestConfig<T>;
type TResponse<T> = AxiosResponse<T>;

type TFetcherOptions = {
    basePath: string;
}

type TRequestOptions = {
    useAuth?: boolean;
}

const defaultRequestOptions: TRequestOptions = {
    useAuth: true
}

class Fetcher {
    private readonly basePath?: string;
    static AuthState?: TAuthStore;

    constructor({ basePath }: TFetcherOptions) {
        this.basePath = basePath;
    }

    async get<R, D = any>(url: string, config?: TRequestConfig<D>, options?: TRequestOptions): Promise<TResponse<R>> {
        return this.request<R, D>(`${this.basePath + url}`, 'get', undefined, config, options);
    }

    async post<R, D = any>(url: string, data?: D, config?: TRequestConfig<D>, options?: TRequestOptions): Promise<TResponse<R>> {
        return this.request<R, D>(`${this.basePath + url}`, 'post', data, config, options);
    }

    async put<R, D = any>(url: string, data?: D, config?: TRequestConfig<D>, options?: TRequestOptions): Promise<TResponse<R>> {
        return this.request<R, D>(`${this.basePath + url}`, 'put', data, config, options);
    }

    async request<R, D = any>(url: string, method: string, data?: D, axiosConfig?: TRequestConfig<D>, requestOptions?: TRequestOptions) {
        const options = requestOptions ? { ...defaultRequestOptions, ...requestOptions } : defaultRequestOptions;
        const { useAuth } = options;
        if (useAuth) {
            const accessToken = await Fetcher.AuthState?.getAccessToken();
            if (!accessToken) throw new Error('AccessToken was not found');
            axiosConfig = {
                ...axiosConfig,
                headers: {
                    ...axiosConfig?.headers,
                    Authorization: `Bearer ${accessToken}`
                }
            }
        }

        return axios.request<R>({ url, method, data, ...axiosConfig });
    }
}

export default Fetcher;
