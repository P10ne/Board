import { createContext } from 'react';
import { IBoardStore } from '../../../store/board/BoardStore';
import { IBoard } from '../../../CommonTypes';

export type TMainBoardContext = {
    board: IBoardStore;
    boardId: IBoard['id'];
}

const BoardMainContext = createContext<TMainBoardContext>({
    board: {} as IBoardStore,
    boardId: 0
});

export default BoardMainContext;
