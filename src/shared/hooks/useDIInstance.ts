import 'reflect-metadata';
import { Context, useContext } from 'react';
import { Container, Token } from 'typedi';

const useDIInstance: <TInstance, TContext extends { diContainer: Container }>(token: Token<any>, context: Context<TContext>) => TInstance = (token, context) => {
    const foundContext = useContext(context);
    // @ts-ignore
    const instance = foundContext.diContainer.get(token);
    return instance;
};

export default useDIInstance;
