import { InjectionToken } from 'tsyringe';
import 'reflect-metadata';
import useDIInstance from '../../../shared/hooks/useDIInstance';
import AuthMainContext, { TMainAuthContext } from '../contexts/AuthMainContext';

const useAuthDiInstance: <T>(token: InjectionToken) => T = token => {
    return useDIInstance<any, TMainAuthContext>(token, AuthMainContext);
}

export default useAuthDiInstance;
