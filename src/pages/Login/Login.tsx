import { FC, useCallback, useEffect } from 'react';
import classes from './Login.module.scss';
import { Header, Content, Menu, Card, Col, Row, Button, Space } from '../../UI';
import { LoginForm, SocialAuth, Socials, TLoginFormProps } from './components';
import { useStore } from '../../hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { TSocialAuthProps } from './components/Socials/Socials';

const Login: FC = () => {
    const { authByEmail, isAuthorized } = useStore(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthorized) {
            navigate('/board/1');
        }
    }, [isAuthorized]);

    const onEmailAuth = useCallback<TLoginFormProps['onEmailAuth']>(({ email, password }) => {
        authByEmail({ email, password });
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
