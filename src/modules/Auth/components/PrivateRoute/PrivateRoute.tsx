import { FC, ReactNode, useEffect, useMemo } from 'react';
import { Spin } from '../../../../UI';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AUTH_DI_TOKENS from '../../AUTH_DI_TOKENS';
import { IAuthStore } from '../../store/AuthStore';
import { reaction, when } from 'mobx';
import { useContextSelector } from '../../../../shared';
import AuthMainContext from '../../contexts/AuthMainContext';
import useAuthStore from '../../hooks/useAuthStore';

type TPrivateRouteProps = {
    children: ReactNode;
}

const PrivateRoute: FC<TPrivateRouteProps> = ({ children }) => {
    const auth = useAuthStore();

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
