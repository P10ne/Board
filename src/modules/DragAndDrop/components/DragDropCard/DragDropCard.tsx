import { FC, useContext, useRef } from 'react';
import MoveCardContext from '../../contexts/MoveCardContext';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { EDraggableItems, TDragCardItem, TDropCardResult } from '../../types';
import BoardCard from '../../../BoardCard/components/BoardCardShort/BoardCardShort';
import classes from './DragDropCard.module.scss';
import { observer } from 'mobx-react-lite';
import { ICard, IColumn } from '../../../../CommonTypes';
import { IBoardCardStore } from '../../../../store/board/BoardCardStore';

type TDragCollectedProps = {
    isDragging: boolean;
}
type TDropCollectedProps = {}

type TDragDropCardProps = {
    id: ICard['id'];
    card: IBoardCardStore;
    index: number;
    columnId: IColumn['id'];
}

const DragDropCard: FC<TDragDropCardProps> = ({ id, card, index, columnId }) => {
    // const { onCardHover, onCardDrop } = useContext(MoveCardContext);
    // const dragRef = useRef<HTMLDivElement>(null);
    // const dropRef = useRef<HTMLDivElement>(null);
    //
    // const [{ isDragging }, drag] = useDrag<TDragCardItem, TDropCardResult, TDragCollectedProps>({
    //     type: EDraggableItems.Card,
    //     collect: monitor => ({
    //         isDragging: monitor.isDragging()
    //     }),
    //     // @ts-ignore
    //     item: () => ({ id: card.attributes.id, card: card, index, sourceColumnId: columnId }),
    //     end: (item, monitor) => {
    //         const { targetColumnId } = monitor.getDropResult() || {};
    //         if (!targetColumnId) throw new Error('Target column or position was not found');
    //         // @ts-ignore
    //         onCardDrop(card, targetColumnId);
    //     }
    // });
    //
    // const getPositionIncrement = (monitor: DropTargetMonitor<TDragCardItem, TDropCardResult>) => {
    //     const { top, bottom } = dropRef.current!.getBoundingClientRect();
    //     const hoverMiddleY = (bottom - top) / 2;
    //     const clientOffset = monitor.getClientOffset()!;
    //     return clientOffset.y > top + hoverMiddleY ? 1 : 0;
    // }
    //
    // const [, drop] = useDrop<TDragCardItem, TDropCardResult, TDropCollectedProps>({
    //     accept: EDraggableItems.Card,
    //     hover: (item, monitor) => {
    //         const dragIndex = item.index;
    //         const hoverIndex = index;
    //         const hoverBoundingRect = dropRef.current?.getBoundingClientRect();
    //         if (!hoverBoundingRect) throw new Error('hoverBoundingRect was not found');
    //         const hoverMiddleY =
    //             (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    //         const clientOffset = monitor.getClientOffset();
    //         if (!clientOffset) throw new Error('client Offset');
    //         const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    //         if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    //             return;
    //         }
    //         if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    //             return;
    //         }
    //         const targetPosition: number = index + getPositionIncrement(monitor);
    //
    //         onCardHover(item.card, columnId, targetPosition);
    //         item.index = hoverIndex;
    //     },
    //     collect: monitor => {
    //         const isOver = monitor.isOver();
    //         return {
    //             isOver: monitor.isOver(),
    //             increment: isOver ? getPositionIncrement(monitor) : null
    //         }
    //     },
    //     drop: (item, monitor) => {
    //         const targetPosition: number = getPositionIncrement(monitor);
    //         return {
    //             position: index + targetPosition,
    //             targetColumnId: columnId
    //         }
    //     },
    //     canDrop: (item) => {
    //         return item.card.attributes!.id !== card.attributes!.id;
    //     }
    // });
    //
    // drop(dropRef);
    // drag(dragRef);
    //
    // return (
    //     <div
    //         className={classes.dropContainer}
    //         ref={dropRef}
    //         style={{opacity: isDragging ? 0.5 : 1}}
    //     >
    //         <div
    //             className={classes.dragContainer}
    //             ref={dragRef}
    //         >
    //             <BoardCard card={card} />
    //         </div>
    //     </div>
    // )
    return null;
}
export default observer(DragDropCard);
