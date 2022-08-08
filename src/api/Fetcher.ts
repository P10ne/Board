import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type TRequestConfig<T> = AxiosRequestConfig<T>;
type TResponse<T> = AxiosResponse<T>;

class Fetcher {
    async get<R, D = any>(url: string, config?: TRequestConfig<D>): Promise<TResponse<R>> {
        return axios.get<R>(url, config);
    }

    async put<R, D = any>(url: string, data?: D, config?: TRequestConfig<D>): Promise<TResponse<R>> {
        return axios.put<R>(url, data, config);
    }
}

export default new Fetcher();
