import { FC, ReactNode, useEffect } from 'react';
import { Spin } from '../../../../UI';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useContextSelector } from '../../../../shared';
import AuthMainContext from '../../contexts/AuthMainContext';
import useAuthStore from '../../hooks/useAuthStore';
import DI_TOKENS from '../../di/Tokens';
import { IAuthStore } from '../../store/AuthStore';
import { reaction, when } from 'mobx';
import { Container } from 'typedi';
import useAuthDiInstance from '../../hooks/useAuthDiInstance';

type TPrivateRouteProps = {
    children: ReactNode;
}

const PrivateRoute: FC<TPrivateRouteProps> = ({ children }) => {
    const auth = useAuthDiInstance<IAuthStore>(DI_TOKENS.Store)
    console.log(auth);
    useEffect(reaction(() => auth, () => { console.log('new: ', auth.isAuthorized) }), []);

    useEffect(() => {
        if (!auth.isAuthorized) {
            auth.refreshTokens();
        }
    }, []);

    return (
        <>
            {
                auth.isAuthorized === null
                    ? <Spin />
                    : auth.isAuthorized
                        ? children
                        : <Navigate to='/login' />
            }
        </>
    )
}

export default observer(PrivateRoute);
