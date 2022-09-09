import { FC, ReactNode, useContext, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { EDraggableItems, TDragCardItem, TDropCardResult } from '../../types';
import BoardColumnItem from '../../../Board/components/BoardColumn/BoardColumn';
import { observer } from 'mobx-react-lite';
import MoveCardContext from '../../contexts/MoveCardContext';
import { IBoardColumnStore } from '../../../Board/store/BoardColumnStore';

type TDragDropColumnProps = {
    columnData: IBoardColumnStore;
}

const DragDropColumn: FC<TDragDropColumnProps> = ({ columnData }) => {
    // const { onCardHover } = useContext(MoveCardContext);
    // const ref = useRef<HTMLDivElement>(null);
    // const [, drop] = useDrop<TDragCardItem, TDropCardResult>({
    //     accept: EDraggableItems.Card,
    //     hover: (item, monitor) => {
    //         onCardHover(item.card, columnData.attributes!.id, 0);
    //     },
    //     collect: () => {},
    //     drop: (item, monitor) => {
    //         return {
    //             position: 0,
    //             targetColumnId: columnData.attributes!.id
    //         }
    //     }
    // });
    //
    // drop(ref);
    // return (
    //     <div ref={ref}>
    //         <BoardColumnItem columnData={columnData} />
    //     </div>
    // )
    return null;
}

export default observer(DragDropColumn);
