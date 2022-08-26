import { FC, ReactNode, useContext, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { EDraggableItems, TDragCardItem, TDropCardResult } from '../../types';
import { number } from 'mobx-state-tree/dist/types/primitives';
import { TBoardColumnModel, TBoardColumnsStore, TBoardColumnStore } from '../../../../store';
import BoardColumnItem from '../BoardColumnItem/BoardColumnItem';
import { observer } from 'mobx-react-lite';
import MoveCardContext from '../../Contexts/MoveCardContext';

type TDragDropColumnProps = {
    columnData: TBoardColumnStore;
    removeColumnFn: TBoardColumnsStore['remove'];
}

const DragDropColumn: FC<TDragDropColumnProps> = ({ columnData, removeColumnFn }) => {
    const { onCardHover } = useContext(MoveCardContext);
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop<TDragCardItem, TDropCardResult>({
        accept: EDraggableItems.Card,
        hover: (item, monitor) => {
            onCardHover(item.card, columnData.attributes.id, 0);
        },
        collect: () => {},
        drop: (item, monitor) => {
            return {
                position: 0,
                targetColumnId: columnData.attributes.id
            }
        }
    });

    drop(ref);
    return (
        <div ref={ref}>
            <BoardColumnItem columnData={columnData} removeFn={removeColumnFn} />
        </div>
    )
}

export default observer(DragDropColumn);
