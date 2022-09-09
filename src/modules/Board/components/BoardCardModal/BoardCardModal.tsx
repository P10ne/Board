import { FC } from 'react';
import classes from './BoardCardModal.module.scss';
import { useFormik } from 'formik';
import BoardCardForm from '../BoardCardForm/BoardCardForm';
import { Modal } from '../../../../UI';
import { IBoardCardStore } from '../../store/BoardCardStore';
import { TPartialCard } from '../../../../CommonTypes';

type TNewCardProps = {
    card: IBoardCardStore;
    isModalVisible: boolean;
    cancelHandler: () => void;
    submitHandler: (card: TPartialCard) => void;
}

const BoardCardModal: FC<TNewCardProps> = ({ card, isModalVisible, cancelHandler, submitHandler }) => {
    const formik = useFormik<TPartialCard>({
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
