import { FC, useState } from 'react';
import classes from './NewColumn.module.scss';
import { PlusOutlined } from '../../../../icons';
import { Button, Typography } from '../../../../UI';
import { useColumnCreate } from '../../hooks';
import { IBoard } from '../../../../../CommonTypes';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../hooks';

const { Paragraph, Link } = Typography;

type TNewColumnProps = {
    boardId: IBoard['id'];
}

const NewColumn: FC<TNewColumnProps> = ({ boardId }) => {
    const columns = useStore(state => state.board.data?.columns);
    const [isEditing, setIsEditing] = useState(false);
    const { isLoading, error, create } = useColumnCreate();

    const createColumn = async (name: string) => {
        setIsEditing(false);
        if (!name) return;
        const res = await create({ name, boardId });
        columns?.add(res);
    }

    const onCreateClick = () => {
        setIsEditing(true);
    }

    return (
        <div className={classes.container}>
            {
                isEditing
                    ?
                    <Paragraph
                        editable={{
                            onChange: createColumn,
                            editing: isEditing
                        }}
                    >
                        <PlusOutlined /> Click to add new column
                    </Paragraph>
                    :
                    <Button
                        onClick={onCreateClick}
                        type='link'
                        className={classes.container}
                    >
                        <PlusOutlined /> Click to add new column
                    </Button>
            }
        </div>
    )
}

export default observer(NewColumn);
