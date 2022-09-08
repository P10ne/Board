import {
    container as tsyContainer,
    DependencyContainer as TsyDependencyContainer,
    inject as tsyInject,
    injectable as tsyInjectable,
    singleton as tsySinglton,
    InjectionToken as tsyInjectionToken
} from 'tsyringe';

interface DependencyContainer extends TsyDependencyContainer {}
type InjectionToken = tsyInjectionToken;

const container = tsyContainer;
const inject = tsyInject;
const injectable = tsyInjectable;
const singleton = tsySinglton;

export type {
    DependencyContainer,
    InjectionToken
}

export {
    inject,
    injectable,
    singleton,
    container
}
