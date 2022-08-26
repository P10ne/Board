import { FC } from 'react';
import { Layout, LayoutProps } from '../../../UI';

const MainLayout: FC<LayoutProps> = props => {
    return <Layout style={{height: '100%'}} { ...props } />
}

export default MainLayout;
