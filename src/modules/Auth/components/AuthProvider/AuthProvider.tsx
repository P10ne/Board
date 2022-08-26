import { FC, ReactNode } from 'react';
import AuthMainContext, { TMainAuthContext } from '../../contexts/AuthMainContext';

type TAuthProviderProps = {
    contextValue: TMainAuthContext;
    children: ReactNode;
}

const AuthProvider: FC<TAuthProviderProps> = ({ contextValue, children }) => {
    return (
        <AuthMainContext.Provider value={contextValue}>
            { children }
        </AuthMainContext.Provider>
    )
}

export default AuthProvider;
