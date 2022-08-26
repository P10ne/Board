import { Context, useContext } from 'react';

function useContextSelector<V, S>(context: Context<V>, selector: (v: V) => S): S {
    const contextValue = useContext(context);
    return selector(contextValue);
}

export default useContextSelector;
