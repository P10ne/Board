import { createContext } from 'react';
import { TBoardCardModel, TBoardCardStore, TBoardColumnModel } from '../../../store';

export type TMoveCardContext = {
    onCardHover: (card: TBoardCardStore, targetColumnId: TBoardColumnModel['id'], position: number) => void,
    onCardDrop: (card: TBoardCardStore, targetColumnId: TBoardColumnModel['id']) => void
}

const MoveCardContext = createContext<TMoveCardContext>({
    onCardHover: () => {},
    onCardDrop: () => {}
});

export default MoveCardContext;
