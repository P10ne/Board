import { FC, useCallback } from 'react';
import Socials, { TSocialAuthProps } from '../Socials/Socials';
import { useContextSelector } from '../../../../shared';
import AuthMainContext from '../../contexts/AuthMainContext';
import useAuthDiInstance from '../../hooks/useAuthDiInstance';
import useAuthStore from '../../hooks/useAuthStore';

const SocialAuth: FC = () => {
    const auth = useAuthStore();

    const onGoogleAuth = useCallback<TSocialAuthProps['onGoogleAuth']>(({ code }) => {
        auth.authByGoogle({ code })
    }, []);

    return (
        <Socials onGoogleAuth={onGoogleAuth} />
    )
}

export default SocialAuth;
