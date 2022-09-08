import useDIInstance from './hooks/useDIInstance';
import { IModuleProviderBaseProps } from './types/IModuleProviderBaseProps';
import { TModuleContextWithDI } from './types/TModuleContextWithDI';
import { container, injectable, inject, singleton } from './DIContainer';
import type { InjectionToken, DependencyContainer } from './DIContainer';

export {
    useDIInstance,
    container,
    inject,
    injectable,
    singleton
}

export type {
    IModuleProviderBaseProps,
    TModuleContextWithDI,
    InjectionToken,
    DependencyContainer
}
