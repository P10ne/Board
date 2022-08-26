import AuthProvider from './components/AuthProvider/AuthProvider';
import LoginForm, { TLoginFormProps } from './components/LoginForm/LoginForm';
import { TMainAuthContext } from './contexts/AuthMainContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import SocialAuth from './components/SocialAuth/SocialAuth';

export {
    AuthProvider,
    LoginForm,
    PrivateRoute,SocialAuth
}

export type {
    TMainAuthContext,
    TLoginFormProps
}
