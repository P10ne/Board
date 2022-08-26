import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import BoardPage from '../../pages/Board/BoardPage';
import { PathRouteProps } from 'react-router';
import { observer } from 'mobx-react-lite';
import MainLayout from './MainLayout/MainLayout';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Registration from '../../pages/Registration/Registration';

const privateRoutes: PathRouteProps[] = [
    { path: '/board/:id', element: <BoardPage /> }
];
const publicRoutes: PathRouteProps[] = [
    { path: '/registration', element: <Registration /> },
    { path: '/login', element: <Login /> }
];

const AppRouter: FC = () => {

    return (
        <MainLayout>
            <BrowserRouter>
                <Routes>
                    {
                        privateRoutes.map(routeProps => <Route {...routeProps} key={routeProps.path} element={<PrivateRoute>{routeProps.element}</PrivateRoute>} /> )
                    }
                    { publicRoutes.map(routeProps => <Route {...routeProps} key={routeProps.path} />) }

                </Routes>
            </BrowserRouter>
        </MainLayout>
    )
}

export default observer(AppRouter);
