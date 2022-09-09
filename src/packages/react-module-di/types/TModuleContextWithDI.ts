import { DependencyContainer } from '../DIContainer';
import { Context } from 'react';

interface IModuleContextWithDIValue {
    diContainer: DependencyContainer;
}

type TModuleContextWithDI = Context<IModuleContextWithDIValue>;

export type {
    TModuleContextWithDI,
    IModuleContextWithDIValue
}
