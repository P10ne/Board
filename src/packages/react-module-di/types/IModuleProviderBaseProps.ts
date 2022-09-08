import { DependencyContainer } from '../DIContainer';
import { ReactNode } from 'react';
import { TDependenciesConfig } from '../utils/registerDependencies';

interface IModuleDIProp {
    parentContainer?: DependencyContainer;
    customConfig: TDependenciesConfig;
}

interface IModuleProviderBaseProps {
    di?: IModuleDIProp;
    children: ReactNode;
}

export type {
    IModuleProviderBaseProps,
    IModuleDIProp
}
