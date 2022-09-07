import { IPublicUser } from '../../../CommonTypes';

type TLoginPayload = {
    email: string;
    password: string;
    fingerPrint: string;
}

type TRegistrationPayload = {
    email: string;
    password: string;
}

type TRefreshResponse = {
    accessToken: string;
    refreshToken: string;
}

type TLoginResponse = TRefreshResponse;

type TLoginGooglePayload = {
    code: string;
    fingerPrint: string;
}

type TRegistrationResponse = IPublicUser;

interface IAuthApi {
    loginGoogle(data: TLoginGooglePayload): Promise<TLoginResponse>;
    login(data: TLoginPayload): Promise<TLoginResponse>;
    refresh(refreshToken: string, fingerPrint: string): Promise<TRefreshResponse | null>;
    registration(data: TRegistrationPayload): Promise<TRegistrationResponse>;
    check(): Promise<boolean>;
}

export type {
    TLoginPayload,
    TRegistrationPayload,
    TRefreshResponse,
    TLoginResponse,
    TLoginGooglePayload,
    TRegistrationResponse,
    IAuthApi
}
