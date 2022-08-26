import { IAuthStore } from '../../../store/auth/AuthStore';
import { createContext } from 'react';

export type TMainAuthContext = {
    auth: IAuthStore;
}

export const AuthMainContext = createContext<TMainAuthContext>({
    auth: {} as IAuthStore
})

export default AuthMainContext;
