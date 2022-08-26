import { FC, useCallback } from 'react';
import Socials, { TSocialAuthProps } from '../Socials/Socials';
import { useContextSelector } from '../../../../shared';
import AuthMainContext from '../../contexts/AuthMainContext';

const SocialAuth: FC = () => {
    const authByGoogle = useContextSelector(AuthMainContext, v => v.auth.authByGoogle);

    const onGoogleAuth = useCallback<TSocialAuthProps['onGoogleAuth']>(({ code }) => {
        authByGoogle({ code })
    }, []);

    return (
        <Socials onGoogleAuth={onGoogleAuth} />
    )
}

export default SocialAuth;
