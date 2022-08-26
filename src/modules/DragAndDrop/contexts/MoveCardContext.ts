import { createContext } from 'react';
import { IBoardCardStore } from '../../../store/board/BoardCardStore';
import { IColumn } from '../../../CommonTypes';

export type TMoveCardContext = {
    onCardHover: (card: IBoardCardStore, targetColumnId: IColumn['id'], position: number) => void,
    onCardDrop: (card: IBoardCardStore, targetColumnId: IColumn['id']) => void
}

const MoveCardContext = createContext<TMoveCardContext>({
    onCardHover: () => {},
    onCardDrop: () => {}
});

export default MoveCardContext;
