import classes from './BoardColumnItem.module.scss';
import { FC } from 'react';
import { Card } from '../../../../UI';
import { observer } from 'mobx-react-lite';
import { TBoardColumnStore } from '../../../../store';
import DragDropCard from '../DragDropCard/DragDropCard';

type BoardColumnItemProps = {
    columnData: TBoardColumnStore;
}

const BoardColumnItem: FC<BoardColumnItemProps> = ({ columnData }) => {
    return (
        <Card
            title={columnData.attributes.name}
            className={`${classes.container}`}
        >
            {
                columnData.cards.data?.map((card, index) => <DragDropCard id={card.attributes.id} card={card} index={index} columnId={columnData.attributes.id} key={card.attributes.id} />)
            }
        </Card>
    )
}

export default observer(BoardColumnItem);
