import { IAuthStore } from '../store/AuthStore';
import { useDIInstance } from '../../../packages/react-module-di';
import { TMainAuthContextValue } from '../contexts/AuthMainContext';
import AUTH_DI_TOKENS from '../AUTH_DI_TOKENS';
import useAuthContext from './useAuthContext';

const useAuthStore: () => IAuthStore = () => {
    const contextValue = useAuthContext(v => v);
    return useDIInstance<TMainAuthContextValue, IAuthStore>(contextValue, AUTH_DI_TOKENS.Store);
}

export default useAuthStore;
