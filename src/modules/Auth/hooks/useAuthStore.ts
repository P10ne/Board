import useAuthDiInstance from './useAuthDiInstance';
import DI_TOKENS from '../di/Tokens';
import { IAuthStore } from '../store/AuthStore';

const useAuthStore: () => IAuthStore = () => {
    return useAuthDiInstance<IAuthStore>(DI_TOKENS.Store);
}

export default useAuthStore;
