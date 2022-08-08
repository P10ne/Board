import { FC } from "react";
import { Header, Content, Menu } from '../../UI';

const Login: FC = () => {
    return (
        <>
            <Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                />
            </Header>
            <Content style={{ padding: '0 50px' }}>
                
            </Content>
        </>
    )
}

export default Login;
