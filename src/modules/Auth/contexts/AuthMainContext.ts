import { createContext } from 'react';
import { DependencyContainer } from '../../../packages/react-module-di';
import { IModuleContextWithDIValue } from '../../../packages/react-module-di/types/TModuleContextWithDI';

export type TMainAuthContextValue = IModuleContextWithDIValue & {}

export const AuthMainContext = createContext<TMainAuthContextValue>({
    diContainer: {} as DependencyContainer
})

export default AuthMainContext;
