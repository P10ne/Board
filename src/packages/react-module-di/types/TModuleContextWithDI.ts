import { DependencyContainer } from '../DIContainer';
import { Context } from 'react';

export interface IModuleContextWithDIValue {
    diContainer: DependencyContainer;
}

type TModuleContextWithDI = Context<IModuleContextWithDIValue>;

export type {
    TModuleContextWithDI
}
