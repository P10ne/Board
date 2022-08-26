import { FC } from 'react';
import classes from './BoardCardModal.module.scss';
import { useFormik } from 'formik';
import BoardCardForm from '../BoardCardForm/BoardCardForm';
import { Modal } from '../../../../UI';
import { IDraftCard } from '../../../../CommonTypes';
import { IBoardCardStore } from '../../../../store/board/BoardCardStore';

type TNewCardProps = {
    card: IBoardCardStore;
    isModalVisible: boolean;
    cancelHandler: () => void;
    submitHandler: (card: IDraftCard) => void;
}

const BoardCardModal: FC<TNewCardProps> = ({ card, isModalVisible, cancelHandler, submitHandler }) => {
    const formik = useFormik<IDraftCard>({
        initialValues: card.attributes,
        onSubmit: async values => {
            submitHandler(values);
        },
    });

    if (!isModalVisible) return null;

    const onConfirmClick = async () => {
        formik.handleSubmit();
    }

    return (
        <Modal
            visible={true}
            title='Create new card'
            wrapClassName={classes.modalWrap}
            width='auto'
            onOk={onConfirmClick}
            onCancel={cancelHandler}
        >
            <BoardCardForm
                formik={formik}
            />
        </Modal>
    )
}

export default BoardCardModal;
