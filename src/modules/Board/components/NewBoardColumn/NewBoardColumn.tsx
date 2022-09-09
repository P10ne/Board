import { FC, useState } from 'react';
import classes from './NewBoardColumn.module.scss';
import { observer } from 'mobx-react-lite';
import BoardMainContext from '../../contexts/BoardMainContext';
import { Button, Typography } from '../../../../UI';
import { PlusOutlined } from '../../../../icons';
import { IBoard } from '../../../../CommonTypes';
import { useContextSelector } from '../../../../shared';
import useBoardStore from '../../hooks/useBoardStore';

const { Paragraph } = Typography;

type TNewColumnProps = {}

const NewBoardColumn: FC<TNewColumnProps> = () => {
    const columnsList = useBoardStore(v => v.columnsList);
    const [isEditing, setIsEditing] = useState(false);

    const createColumn = async (name: string) => {
        setIsEditing(false);
        if (!name) return;
        const draftColumn = columnsList.addDraftColumn({ name });
        draftColumn?.createFromDraft();
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

export default observer(NewBoardColumn);
