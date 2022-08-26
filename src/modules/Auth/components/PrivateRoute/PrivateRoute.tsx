import { FC, ReactNode, useEffect } from 'react';
import { Spin } from '../../../../UI';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useContextSelector } from '../../../../shared';
import AuthMainContext from '../../contexts/AuthMainContext';

type TPrivateRouteProps = {
    children: ReactNode;
}

const PrivateRoute: FC<TPrivateRouteProps> = ({ children }) => {
    const auth = useContextSelector(AuthMainContext, v => v.auth);

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
