import { FC, useContext, useRef, useState } from 'react';
import classes from './BoardColumn.module.scss';
import { observer } from 'mobx-react-lite';
import { Button, Card, Dropdown, Menu, Typography } from '../../../../UI';
import { MoreOutlined } from '../../../../icons';
import { BoardCardModal } from '../../../BoardCard';
import { isCard, TPartialCard } from '../../../../CommonTypes';
import { IBoardColumnStore } from '../../store/BoardColumnStore';
import BoardCard from '../BoardCardShort/BoardCardShort';
import { IBoardCardStore } from '../../store/BoardCardStore';

const { Paragraph } = Typography;

type BoardColumnItemProps = {
    columnData: IBoardColumnStore;
}

enum EMenuItems {
    Delete
}

const BoardColumn: FC<BoardColumnItemProps> = ({ columnData }) => {
    const [isCardModalVisible, setIsCardModalVisible] = useState(false);
    const newCardRef = useRef<IBoardCardStore  | null>(null);

    const onTitleChange = (title: string) => {
        columnData.update({ ...columnData.attributes, name: title })
    }

    const onDeleteClick = async () => {
        try {
            columnData.delete();
        } catch (e) {
            console.error(e);
        }
    }

    const onAddCardClick = () => {
        const cardForCreate = columnData.cards.createDraftCard({}, false);
        if (!cardForCreate) return;
        newCardRef.current = cardForCreate;
        setIsCardModalVisible(true);
    }

    const cancelAddCardHandler = () => {
        setIsCardModalVisible(false);
    }

    const submitAddCardHandler = (data: TPartialCard) => {
        setIsCardModalVisible(false);
        const card = newCardRef.current!;
        card.updateDraftAttributes(data);
        columnData.cards.addDraftCardToList(card);
        card.createFromDraft();
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
            { columnData.attributes!.name }
        </Paragraph>
    )

    return (
        <Card
            title={title}
            className={`${classes.container}`}
            extra={dropdown}
        >
            <Button
                type='link'
                onClick={onAddCardClick}
            >Add card</Button>
            {
                isCardModalVisible
                    ? <BoardCardModal
                        card={newCardRef.current!}
                        isModalVisible={isCardModalVisible}
                        cancelHandler={cancelAddCardHandler}
                        submitHandler={submitAddCardHandler}
                    />
                    : null
            }
            {
                columnData.cards?.data.map((card, index) =>
                    // <DragDropCard
                    //     id={card.attributes.id!}
                    //     card={card}
                    //     columnId={columnData.attributes!.id}
                    //     index={index}
                    //     key={card.attributes.id}
                    // />)
                    <BoardCard
                        card={card}
                        key={isCard(card.attributes) ? card.attributes.id : `draft-${index}`}
                    />
                )
            }
        </Card>
    )
}

export default observer(BoardColumn);
