import { flow, Instance, types } from 'mobx-state-tree';
import { authApi } from '../api/api';
import Fetcher from '../api/Fetcher';
import { when } from 'mobx';
import jwtDecode from 'jwt-decode';
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const Auth = types.model({
    isAuthorized: types.maybeNull(types.boolean),
    isRefreshing: types.optional(types.boolean, false)
}).actions(self => {
    const getFingerPrint = async () => {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        return result.visitorId;
    }
    const refreshTokens = flow(function* () {
        self.isRefreshing = true;
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            self.isAuthorized = false;
            return;
        }
        const fingerPrint = yield getFingerPrint();
        const refreshResponse = yield authApi.refresh(refreshToken, fingerPrint);
        if (!refreshResponse) {
            self.isAuthorized = false;
            return;
        }
        setAccessToken(refreshResponse.accessToken);
        setRefreshToken(refreshResponse.refreshToken);
        self.isRefreshing = false;
        self.isAuthorized = true;
        return refreshResponse.accessToken;
    });
    const verifyToken = (token: string): boolean => {
        const { exp } = jwtDecode<{exp: number}>(token);
        return exp > Date.now() / 1000 + 5;
    }
    const getAccessToken = flow(function* () {
        yield when(() => !self.isRefreshing && !!self.isAuthorized);
        const token = localStorage.getItem('accessToken');
        if (!token || !verifyToken(token)) {
            return yield refreshTokens();
        }
        return token;
    })
    const getRefreshToken = () => {
        return localStorage.getItem('refreshToken');
    }
    const setAccessToken = (token: string) => {
        localStorage.setItem('accessToken', token);
    }
    const setRefreshToken = (token: string) => {
        localStorage.setItem('refreshToken', token);
    }
    const afterCreate = async () => {
        setTimeout(() => Fetcher.AuthState = createdAuth);
        await refreshTokens();
    }

    return {
        getAccessToken,
        afterCreate,
        refreshTokens
    }
});

export const createdAuth = Auth.create();

export type TAuthStore = Instance<typeof Auth>;
export default Auth;