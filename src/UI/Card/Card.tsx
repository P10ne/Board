import { Card as AntdCard, CardProps as AntdCardProps } from 'antd';
import { FC } from 'react';

export type CardProps = AntdCardProps;

const Card: FC<CardProps> = props => <AntdCard { ...props } />

export default Card;
