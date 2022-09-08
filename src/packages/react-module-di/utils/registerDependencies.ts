import { DependencyContainer, InjectionToken } from '../DIContainer';

type TDependenciesConfig = {
    token: InjectionToken;
    regFn: (container: DependencyContainer, token: InjectionToken) => void;
    skipIfExists?: boolean
}[];

type TRegisterOptions = {
    skipIfExists?: boolean;
}

const registerDependencies: (container: DependencyContainer, config: TDependenciesConfig, options?: TRegisterOptions) => void = (container, config, options?: TRegisterOptions) => {
    const { skipIfExists } = options ?? { skipIfExists: true };
    config.forEach(item => {
        if (typeof item.skipIfExists !== 'undefined') {
            if (item.skipIfExists && container.isRegistered(item.token, true)) return;
        } else {
            if (skipIfExists && container.isRegistered(item.token, true)) return;
        }
        item.regFn(container, item.token);
    })
}

export type {
    TDependenciesConfig,
    TRegisterOptions
}

export default registerDependencies;
