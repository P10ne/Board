import { Layout as AntdLayout, LayoutProps as AntdLayoutProps } from 'antd';
import { FC } from 'react';

export type LayoutProps = AntdLayoutProps;
const Layout: FC<LayoutProps> = props => <AntdLayout {...props} />

export default Layout;
