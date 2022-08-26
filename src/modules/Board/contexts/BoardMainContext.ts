import { createContext } from 'react';
import { IBoardStore } from '../../../store/board/BoardStore';

export type TMainBoardContext = {
    board: IBoardStore | null;
}

export const BoardMainContextDefaultValue = {}

const BoardMainContext = createContext<TMainBoardContext>({
    ...BoardMainContextDefaultValue,
    board: null
});

export default BoardMainContext;
