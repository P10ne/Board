import { FC, ReactNode, useEffect } from 'react';
import { useStore } from '../../hooks';
import { Spin } from '../../UI';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

type TPrivateRouteProps = {
    children: ReactNode;
}

// @ts-ignore
const PrivateRoute: FC<TPrivateRouteProps> = ({ children }) => {
    const { isAuthorized, refreshTokens } = useStore(state => state.auth);

    useEffect(() => {
        if (!isAuthorized) {
            refreshTokens();
        }
    }, []);

    return (
        isAuthorized === null
            ? <Spin />
            : isAuthorized
                ? children
                : <Navigate to={'/login'} />
    )
}

export default observer(PrivateRoute);
