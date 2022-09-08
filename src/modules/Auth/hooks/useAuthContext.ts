import { AuthMainContext, TMainAuthContextValue } from '../contexts/AuthMainContext';
import { useContextSelector } from '../../../shared';

const useAuthContext: <S>(selector: (v: TMainAuthContextValue) => S) => S = (selector) => {
     return useContextSelector(AuthMainContext, selector);
}

export default useAuthContext;
