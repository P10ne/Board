import { createContext } from 'react';
import { DependencyContainer } from '../../../packages/react-module-di';

export type TMainAuthContextValue = {
    diContainer: DependencyContainer;
}

export const AuthMainContext = createContext<TMainAuthContextValue>({
    diContainer: {} as DependencyContainer
})

export default AuthMainContext;
