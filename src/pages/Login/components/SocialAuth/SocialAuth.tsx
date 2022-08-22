import { FC, useCallback } from 'react';
import { Socials } from '../index';
import { TSocialAuthProps } from '../Socials/Socials';
import { useStore } from '../../../../hooks';
import { GoogleOAuthProvider } from '@react-oauth/google';

const SocialAuth: FC = () => {
    const { authByGoogle } = useStore(state => state.auth);

    const onGoogleAuth = useCallback<TSocialAuthProps['onGoogleAuth']>(({ code }) => {
        authByGoogle({ code })
    }, []);

    return (

            <Socials onGoogleAuth={onGoogleAuth} />
    )
}

export default SocialAuth;
