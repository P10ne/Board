import { IAuthStore } from '../store/AuthStore';
import { createContext } from 'react';
import 'reflect-metadata';
import { Container } from 'typedi';

export type TMainAuthContext = {
    diContainer: Container;
}

export const AuthMainContext = createContext<TMainAuthContext>({
    diContainer: {} as Container
})

export default AuthMainContext;
