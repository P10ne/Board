import { FC, useCallback, useEffect } from 'react';
import classes from './Login.module.scss';
import { Header, Content, Menu, Card, Col, Row, Button, Space } from '../../UI';
import { LoginForm, SocialAuth, TLoginFormProps } from '../../modules/Auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useContextSelector } from '../../shared';
import AuthMainContext from '../../modules/Auth/contexts/AuthMainContext';
import useAuthDiInstance from '../../modules/Auth/hooks/useAuthDiInstance';
import DI_TOKENS from '../../modules/Auth/di/Tokens';
import { IAuthStore } from '../../modules/Auth/store/AuthStore';
import useAuthStore from '../../modules/Auth/hooks/useAuthStore';

const Login: FC = () => {
    const auth = useAuthStore();
    const navigate = useNavigate();
    console.log(auth.isAuthorized, auth);

    useEffect(() => {
        if (auth.isAuthorized) {
            navigate('/board/1');
        }
    }, [auth.isAuthorized]);

    const onEmailAuth = useCallback<TLoginFormProps['onEmailAuth']>(({ email, password }) => {
        auth.authByEmail({ email, password });
    }, []);

    const goToSignIn = () => {
        navigate('/registration');
    }

    return (
        <>
            <Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                />
            </Header>
            <Content>
                <Row justify='center' align='middle' style={{height: '100%'}}>
                    <Col>
                        <GoogleOAuthProvider clientId='699402229806-b7t96b0nouvoslom4h09ic9or2pruruc.apps.googleusercontent.com'>
                            <Card className={classes.card}>
                                <div>
                                    <Space direction='vertical'>
                                        <LoginForm
                                            onEmailAuth={onEmailAuth}
                                        />
                                        <Button
                                            onClick={goToSignIn}
                                            type='link'>Go to Sign In</Button>
                                    </Space>
                                </div>
                                <SocialAuth />
                            </Card>
                        </GoogleOAuthProvider>
                    </Col>
                </Row>
            </Content>
        </>
    )
}

export default observer(Login);
