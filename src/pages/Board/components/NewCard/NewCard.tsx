import { FC, useState } from 'react';
import { Button, Modal, Typography } from '../../../../UI';
import { PlusOutlined } from '../../../../icons';
import { CardForm } from '../index';
import classes from './NewCard.module.scss';
import { ICardToCreate, IColumn } from '../../../../../CommonTypes';
import { useFormik } from 'formik';
import useCardCreate from '../../hooks/useCardCreate';
import { TBoardColumnStore } from '../../../../store/';

type TNewCardProps = {
    column: TBoardColumnStore;
}

const getInitialCardData: (columnId: IColumn['id']) => ICardToCreate = (columnId) => ({
    name: '',
    body: '',
    columnId
});

const NewCard: FC<TNewCardProps> = ({ column }) => {
    const { create } = useCardCreate();

    const formik = useFormik<ICardToCreate>({
        initialValues: getInitialCardData(column.attributes.id),
        onSubmit: async values => {
            try {
                const createdCard = await create(values);
                column.addCard(createdCard);
                toggleModal(false);
            } catch (e) {
                console.error(e);
            }
        },
    });

    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = (show: boolean) => {
        setIsModalVisible(show);
    }

    const onCreateClick = () => {
        toggleModal(true);
    }

    const onConfirmClick = async () => {
        formik.handleSubmit();
    }

    const onCancelClick = () => {
        toggleModal(false);
    }

    return (
        <>
            <Button
                type='link'
                onClick={onCreateClick}
            >
                <PlusOutlined /> Click to add new card
            </Button>

            <Modal
                visible={isModalVisible}
                title='Create new card'
                wrapClassName={classes.modalWrap}
                width='auto'
                onOk={onConfirmClick}
                onCancel={onCancelClick}
            >
                <CardForm
                    formik={formik}
                />
            </Modal>
        </>
    )
}

export default NewCard;
