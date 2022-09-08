import { IModuleContextWithDIValue } from '../types/TModuleContextWithDI';
import { InjectionToken } from '../DIContainer';

const useDIInstance: <TContextValue extends IModuleContextWithDIValue, TInstance>(contextValue: TContextValue, token: InjectionToken) => TInstance = (contextValue, token) => {
    return contextValue.diContainer.resolve(token);
}

export default useDIInstance;
