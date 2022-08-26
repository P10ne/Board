import { useContext } from 'react';
import { StoreContext } from '../../index';
import { IRootStore } from '../../store';

const useStore: <TResult>(selector: (store: IRootStore) => TResult) => TResult = selector => {
    const store = useContext(StoreContext);
    return selector(store);
}

export default useStore;
