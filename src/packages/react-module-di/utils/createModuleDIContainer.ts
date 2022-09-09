import { container, DependencyContainer } from '../DIContainer';
import registerDependencies, { TDependenciesConfig, TRegisterOptions } from './registerDependencies';
import { IModuleDIProp } from '../types/IModuleProviderBaseProps';
import GLOBAL_DI_TOKENS from '../GLOBAL_DI_TOKENS';

type TArguments = {
    moduleDIConfig?: IModuleDIProp;
    defaultConfig?: TDependenciesConfig;
    options?: TRegisterOptions;
}

const createModuleDIContainer: (data: TArguments) => DependencyContainer = (data) => {
    const { moduleDIConfig, defaultConfig, options } = data;
    const moduleContainer = (moduleDIConfig?.parentContainer ?? container).createChildContainer();
    if (moduleDIConfig?.customConfig) {
        registerDependencies(moduleContainer, moduleDIConfig.customConfig, options);
    }
    if (defaultConfig) {
        registerDependencies(moduleContainer, defaultConfig, options);
    }
    moduleContainer.register(GLOBAL_DI_TOKENS.DIContainer, { useValue: moduleContainer });
    return moduleContainer;
}

export default createModuleDIContainer;
