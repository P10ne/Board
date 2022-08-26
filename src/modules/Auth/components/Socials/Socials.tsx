import { FC } from 'react';
import { Button } from '../../../../UI';
import { useGoogleLogin } from '@react-oauth/google';

export type TSocialAuthProps = {
    onGoogleAuth: ({ code }: { code: string }) => void
}

const Socials: FC<TSocialAuthProps> = ({ onGoogleAuth }) => {
    const login = useGoogleLogin({
        onSuccess: codeResponse => {
            onGoogleAuth({ code: codeResponse.code })
        },
        flow: 'auth-code',
    });

    return (
        <Button onClick={() => login()}>Google Login</Button>
    )
}

export default Socials;
