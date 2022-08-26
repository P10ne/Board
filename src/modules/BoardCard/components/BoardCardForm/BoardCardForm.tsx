import { FC } from 'react';
import { useFormik } from 'formik';
import classes from './BoardCardForm.module.scss';
import { Form, Input } from '../../../../UI';
import { ICard } from '../../../../CommonTypes';

const { TextArea } = Input;

export type TCardData = Partial<ICard>;
type TCardFormProps = {
    formik: ReturnType<typeof useFormik<TCardData>>;
}

const BoardCardForm: FC<TCardFormProps> = ({ formik }) => {
    const { values, errors, touched, handleBlur, handleChange } = formik;
    return (
        <Form
            name="basic"
            layout='vertical'
            className={classes.form}
        >
            <Form.Item
                label='Name'
            >
                <Input
                    name='name'
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Form.Item>

            <Form.Item
                label='Body'
            >
                <TextArea
                    name='body'
                    value={values.body}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                />
            </Form.Item>
        </Form>
    )
}

export default BoardCardForm;
