import 'reflect-metadata';
import useDIInstance from '../../../shared/hooks/useDIInstance';
import AuthMainContext, { TMainAuthContext } from '../contexts/AuthMainContext';
import { Token } from 'typedi';

const useAuthDiInstance: <T>(token: Token<any>) => T = token => {
    return useDIInstance<any, TMainAuthContext>(token, AuthMainContext);
}

export default useAuthDiInstance;
