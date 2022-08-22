import { FC, useEffect, useState } from 'react';
import { Button, Card, Col, Content, Header, Menu, Row, Space } from '../../UI';
import { RegForm, TRegFormProps } from './components';
import { authApi } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const Registration: FC = () => {
    const [regSuccess, setRegSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (regSuccess) {
            navigate('/login');
        }
    }, [regSuccess]);

    const onReg: TRegFormProps['onReg'] = async ({ values }) => {
        try {
            await authApi.registration(values);
            setRegSuccess(true);
        } catch (e) {
            console.error(e);
        }
    }

    const goToLogin = () => {
        navigate('/login');
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
                        <Card>
                            <Space direction='vertical'>
                                <RegForm onReg={onReg} />
                                <Button
                                    type='link'
                                    onClick={goToLogin}
                                    >Go to Log In</Button>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </>
    )
}

export default Registration;
