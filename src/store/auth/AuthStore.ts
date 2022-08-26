import { action, flow, flowResult, makeObservable, observable } from 'mobx';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import AuthApi from '../../api/api/AuthApi';
import Fetcher from '../../api/Fetcher';

type TAuthByGooglePayload = {
    code: string;
}

type TAuthByEmailPayload = {
    email: string;
    password: string;
}

export interface IAuthStore {
    isAuthorized: boolean | null;
    isRefreshing: boolean;

    authByGoogle(data: TAuthByGooglePayload): void;
    authByEmail(data: TAuthByEmailPayload): void;
    refreshTokens(): void;
    getAccessToken: () => string;
}

const authApi = new AuthApi();

class AuthStore implements IAuthStore {
    @observable isAuthorized: boolean | null = null;
    @observable isRefreshing = false;

    constructor() {
        makeObservable(this);
        Fetcher.AuthState = this;
    }

    private async getFingerPrint(): Promise<string> {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        return result.visitorId;
    }

    private getRefreshToken(): string {
        return localStorage.getItem('refreshToken') as string;
    }

    private setAccessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    private setRefreshToken(token: string) {
        localStorage.setItem('refreshToken', token);
    }

    getAccessToken(): string {
        return localStorage.getItem('accessToken') as string;
    }

    @flow
    * refreshTokens() {
        this.isRefreshing = true;
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            this.isAuthorized = false;
            this.isRefreshing = false;
            return;
        }
        const fingerPrint: Awaited<ReturnType<InstanceType<typeof AuthStore>['getFingerPrint']>> = yield this.getFingerPrint();
        const refreshResponse: Awaited<ReturnType<typeof authApi.refresh>> = yield authApi.refresh(refreshToken, fingerPrint);
        if (!refreshResponse) {
            this.isAuthorized = false;
            this.isRefreshing = false;
            return;
        }
        this.setAccessToken(refreshResponse.accessToken);
        this.setRefreshToken(refreshResponse.refreshToken);
        this.isRefreshing = false;
        this.isAuthorized = true;
        return refreshResponse.accessToken;
    }

    @flow
    * authByGoogle(data: TAuthByGooglePayload) {
        const fingerPrint:  Awaited<ReturnType<InstanceType<typeof AuthStore>['getFingerPrint']>> = yield this.getFingerPrint();
        const { accessToken, refreshToken }: Awaited<ReturnType<typeof authApi.loginGoogle>> = yield authApi.loginGoogle({ ...data, fingerPrint });
        this.setAccessToken(accessToken);
        this.setRefreshToken(refreshToken);
        this.isAuthorized = true;
    }

    @flow
    * authByEmail(data: TAuthByEmailPayload) {
        const fingerPrint: Awaited<ReturnType<InstanceType<typeof AuthStore>['getFingerPrint']>> = yield this.getFingerPrint();

        const { accessToken, refreshToken }: Awaited<ReturnType<typeof authApi.login>> = yield authApi.login({
            ...data,
            fingerPrint
        });
        this.setAccessToken(accessToken);
        this.setRefreshToken(refreshToken);
        this.isAuthorized = true;
    }
}

export default AuthStore;