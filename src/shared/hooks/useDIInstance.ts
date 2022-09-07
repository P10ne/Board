import { DependencyContainer, InjectionToken } from 'tsyringe';
import 'reflect-metadata';
import { Context, useContext } from 'react';

const useDIInstance: <TInstance, TContext extends { diContainer: DependencyContainer }>(token: InjectionToken, context: Context<TContext>) => TInstance = (token, context) => {
    const foundContext = useContext(context);
    const instance = foundContext.diContainer.resolve(token);
    return instance;
};

export default useDIInstance;
