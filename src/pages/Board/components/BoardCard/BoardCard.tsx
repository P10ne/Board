import classes from './BoardCard.module.scss';
import { FC, useContext, useRef } from 'react';
import { Card } from '../../../../UI';
import { observer } from 'mobx-react-lite';
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import { EDraggableItems } from '../../types';
import { TBoardCardModel, TBoardCardStore, TBoardColumnModel, TBoardColumnsStore } from '../../../../store';
import MoveCardContext, { TMoveCardContext } from '../../Contexts/MoveCardContext';
import { number } from 'mobx-state-tree/dist/types/primitives';

type BoardCardProps = {
    card: TBoardCardStore;
    className?: string;
};

const BoardCard: FC<BoardCardProps> = ({ card, className }) => {
    return (
        <Card
            size='small'
        >
            {card.attributes.name}
        </Card>
    )
}

export default observer(BoardCard);
