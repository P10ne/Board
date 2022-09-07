import { FC, ReactNode, useMemo } from 'react';
import AuthMainContext, { TMainAuthContext } from '../../contexts/AuthMainContext';
import 'reflect-metadata';
import DI_TOKENS from '../../di/Tokens';
import AuthStore from '../../store/AuthStore';
import { observer } from 'mobx-react-lite';
import { Container } from 'typedi';
import AuthApi from '../../../../api/api/AuthApi';

export type TAuthProviderProps = {
    // di: {
    //     parentContainer?: DependencyContainer;
    //     regFn: (container: DependencyContainer) => void;
    // }
    children: ReactNode;
}

// type TDependencies = {
//     token: typeof DI_TOKENS[keyof typeof DI_TOKENS];
//     fn: (container: DependencyContainer) => void;
// }[]
//
// const defaultDependencies: TDependencies = [
//     { token: DI_TOKENS.Store, fn: c => c.register(DI_TOKENS.Store, AuthStore) }
// ]

const AuthProvider: FC<TAuthProviderProps> = ({ children }) => {
    const moduleDiContainer = useMemo(() => {
        // di.regFn(moduleContainer);
        // defaultDependencies.forEach(item => {
        //     if (!container.isRegistered(item.token)) {
        //         item.fn(moduleContainer);
        //     }
        // })
        Container.import([AuthStore, AuthApi]);
        Container.bind(DI_TOKENS.Store, AuthStore);
        Container.bind(DI_TOKENS.Api, AuthApi);
        return Container;
    }, []);

    const contextValue: TMainAuthContext = useMemo(() => {
        return {
            diContainer: moduleDiContainer
        }
    }, [moduleDiContainer]);

    return (
        <AuthMainContext.Provider value={contextValue}>
            { children }
        </AuthMainContext.Provider>
    )
}

export default observer(AuthProvider);
