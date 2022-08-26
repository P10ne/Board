import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Card } from '../../../../UI';
import { IBoardCardStore } from '../../../../store/board/BoardCardStore';

type BoardCardProps = {
    card: IBoardCardStore;
};

const BoardCardShort: FC<BoardCardProps> = ({ card }) => {
    return (
        <Card
            size='small'
        >
            {card.attributes!.name}
        </Card>
    )
}

export default observer(BoardCardShort);
