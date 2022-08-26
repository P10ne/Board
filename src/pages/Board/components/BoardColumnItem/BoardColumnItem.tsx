import classes from './BoardColumnItem.module.scss';
import { FC } from 'react';
import { Button, Card, Dropdown, Menu, TMenuProps, Typography } from '../../../../UI';
import { observer } from 'mobx-react-lite';
import { TBoardColumnsStore, TBoardColumnStore } from '../../../../store';
import DragDropCard from '../DragDropCard/DragDropCard';
import { MoreOutlined } from '../../../../icons';
import { useColumnDelete } from '../../hooks';
import { NewCard } from '../index';

const { Paragraph } = Typography;

type BoardColumnItemProps = {
    columnData: TBoardColumnStore;
    removeFn: TBoardColumnsStore['remove'];
}

enum EMenuItems {
    Delete
}

const BoardColumnItem: FC<BoardColumnItemProps> = ({ columnData, removeFn }) => {
    const { isLoading, error, deleteFn: removeColumnRequest } = useColumnDelete();

    const onTitleChange = (title: string) => {
        console.log(title);
    }

    const onDeleteClick = async () => {
        const columnId = columnData.attributes.id;
        try {
            await removeColumnRequest(columnId);
            removeFn(columnId);
        } catch (e) {
            console.error(e);
        }
    }

    const menu = (
        <Menu
            items={[
                { label: 'Delete', key: EMenuItems.Delete, onClick: onDeleteClick }
            ]}
        />
    )

    const dropdown = (
        <Dropdown overlay={menu}>
            <Button type='link'>
                <MoreOutlined />
            </Button>
        </Dropdown>
    )

    const title = (
        <Paragraph
            editable={{
                triggerType: ['text'],
                onChange: onTitleChange
            }}
        >
            { columnData.attributes.name }
        </Paragraph>
    )

    return (
        <Card
            title={title}
            className={`${classes.container}`}
            extra={dropdown}
        >
            <NewCard column={columnData} />
            {
                columnData.cards.data?.map((card, index) =>
                    <DragDropCard
                        id={card.attributes.id}
                        card={card}
                        columnId={columnData.attributes.id}
                        index={index}
                        key={card.attributes.id}
                    />)
            }
        </Card>
    )
}

export default observer(BoardColumnItem);
