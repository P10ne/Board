import { FC, useMemo, useState } from 'react';
import AuthMainContext, { TMainAuthContextValue } from '../../contexts/AuthMainContext';
import AUTH_DI_TOKENS from '../../AUTH_DI_TOKENS';
import AuthStore, { IAuthStore } from '../../store/AuthStore';
import { observer } from 'mobx-react-lite';
import AuthApi from '../../../../api/api/AuthApi';
import type { IModuleProviderBaseProps } from '../../../../packages/react-module-di';
import type { TDependenciesConfig } from '../../../../packages/react-module-di/utils/registerDependencies';
import createModuleDIContainer from '../../../../packages/react-module-di/utils/createModuleDIContainer';

export type TAuthProviderProps = IModuleProviderBaseProps & {}

const AuthProvider: FC<TAuthProviderProps> = ({ di, children }) => {
    const [defaultDependencies] = useState<TDependenciesConfig>(() => ([
        { token: AUTH_DI_TOKENS.Store, regFn: c => c.registerSingleton(AUTH_DI_TOKENS.Store, AuthStore) },
        { token: AUTH_DI_TOKENS.Api, regFn: c => c.registerSingleton(AUTH_DI_TOKENS.Api, AuthApi) }
    ]));

    const diContainer = useMemo(() => createModuleDIContainer({
        moduleDIConfig: di,
        defaultConfig: defaultDependencies
    }), [di, defaultDependencies]);

    const contextValue: TMainAuthContextValue = useMemo(() => ({ diContainer: diContainer }), [diContainer]);

    return (
        <AuthMainContext.Provider value={contextValue}>
            { children }
        </AuthMainContext.Provider>
    )
}

export default observer(AuthProvider);
