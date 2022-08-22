import { FC, useCallback, useEffect } from 'react';
import { Header, Content, Menu, Card, Col, Row } from '../../UI';
import { LoginForm, TLoginFormProps } from './components';
import { useStore } from '../../hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

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

    return (
        <>
            <Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                />
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Row justify='center' align='middle' style={{height: '100%'}}>
                    <Col>
                        <Card style={{width: 400}}>
                            <LoginForm onEmailAuth={onEmailAuth} />
                        </Card>
                    </Col>
                </Row>
            </Content>
        </>
    )
}

export default observer(Login);
