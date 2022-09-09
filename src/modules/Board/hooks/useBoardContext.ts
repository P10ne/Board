import BoardMainContext, { TMainBoardContextValue } from '../contexts/BoardMainContext';
import { useContextSelector } from '../../../shared';

const useBoardContext: <S>(selector: (v: TMainBoardContextValue) => S) => S = (selector) => {
    return useContextSelector(BoardMainContext, selector);
}

export default useBoardContext;
