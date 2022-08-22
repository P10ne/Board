import BaseApi from '../BaseApi';
import { API_PATH } from '../constants';
import { IPublicUser } from '../../../server/src/models/IUser';

type TRefreshResponse = {
    accessToken: string;
    refreshToken: string;
}

type TLoginResponse = TRefreshResponse;

type TLoginPayload = {
    email: string;
    password: string;
    fingerPrint: string;
}

type TLoginGooglePayload = {
    code: string;
    fingerPrint: string;
}

type TRegistrationPayload = {
    email: string;
    password: string;
}

type TRegistrationResponse = IPublicUser;

class AuthApi extends BaseApi {
    constructor() {
        super({ basePath: `${API_PATH}/auth` });
    }

    async loginGoogle(data: TLoginGooglePayload): Promise<TLoginResponse> {
        try {
            const response = await this.fetcher.post<TLoginResponse>('/google-login', data, {},  { useAuth: false });
            return response.data;
        } catch (e) {
            throw e;
        }
    }

    async login(data: TLoginPayload): Promise<TLoginResponse> {
        try {
            const response = await this.fetcher.post<TLoginResponse>('/login', data, {}, { useAuth: false });
            return response.data;
        } catch (e) {
            throw e;
        }
    }

    async refresh(refreshToken: string, fingerPrint: string): Promise<TRefreshResponse | null> {
        try {
            const response = await this.fetcher.post<TRefreshResponse>('/refresh', { refreshToken, fingerPrint }, {}, { useAuth: false });
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async registration(data: TRegistrationPayload): Promise<TRegistrationResponse> {
        try {
            const response = await this.fetcher.post<TRegistrationResponse>('/registration', data, {}, { useAuth: false } );
            return response.data;
        } catch (e) {
            throw e;
        }
    }

    async check(): Promise<boolean> {
        try {
            await this.fetcher.get('/check');
            return true;
        } catch {
            return false;
        }
    }
}

export default new AuthApi();
