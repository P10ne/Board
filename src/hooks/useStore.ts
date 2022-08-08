import { useContext } from 'react';
import { StoreContext } from '../index';
import { TRootStore } from '../store';

const useStore: <TResult>(selector: (store: TRootStore) => TResult) => TResult = selector => {
    const store = useContext(StoreContext);
    return selector(store);
}

export default useStore;
