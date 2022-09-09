import type { IBoardStore } from '../store/BoardStore';
import type { TMainBoardContextValue } from '../contexts/BoardMainContext';
import useBoardContext from './useBoardContext';
import { useDIInstance } from '../../../packages/react-module-di';
import BOARD_DI_TOKENS from '../BOARD_DI_TOKENS';

const useBoardStore: <V>(selector: (v: IBoardStore) => V) => V = (selector) => {
    const contextValue = useBoardContext(v => v);
    const store = useDIInstance<TMainBoardContextValue, IBoardStore>(contextValue, BOARD_DI_TOKENS.Store);
    return selector(store);
}

export default useBoardStore;
