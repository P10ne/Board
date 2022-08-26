import { FC, useEffect, useRef } from 'react';
import { Button, Form, Input } from '../../../../UI';
import classes from './CardForm.module.scss';
import { ICard } from '../../../../../CommonTypes';
import { useFormik } from 'formik';

const { TextArea } = Input;

export type TCardData = Partial<ICard>;
type TCardFormProps = {
    formik: ReturnType<typeof useFormik<TCardData>>;
}

const CardForm: FC<TCardFormProps> = ({ formik }) => {
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

export default CardForm;
