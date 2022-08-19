import BaseApi from '../BaseApi';
import { API_PATH } from '../constants';

type TRefreshResponse = {
    accessToken: string;
    refreshToken: string;
}

class AuthApi extends BaseApi {
    constructor() {
        super({ basePath: `${API_PATH}/auth` });
    }

    login() {}
    async refresh(refreshToken: string, fingerPrint: string): Promise<TRefreshResponse | null> {
        try {
            const response = await this.fetcher.post<TRefreshResponse>('/refresh', { refreshToken, fingerPrint }, {}, { useAuth: false });
            return response.data;
        } catch (e) {
            return null;
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
