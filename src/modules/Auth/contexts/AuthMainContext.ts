import { IAuthStore } from '../store/AuthStore';
import { createContext } from 'react';
import 'reflect-metadata';
import { DependencyContainer } from 'tsyringe';

export type TMainAuthContext = {
    diContainer: DependencyContainer;
}

export const AuthMainContext = createContext<TMainAuthContext>({
    diContainer: {} as DependencyContainer
})

export default AuthMainContext;
