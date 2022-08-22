import { FC } from 'react';
import { Button, Form, Input } from '../../../../UI';

type TRegFormValues = {
    email: string;
    password: string;
}

export type TRegFormProps = {
    onReg: (data: { values: TRegFormValues}) => void
}

const RegForm: FC<TRegFormProps> = ({ onReg }) => {
    const onFinishForm = (data: TRegFormValues) => {
        onReg({ values: data });
    }

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinishForm}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>


            <Button type="primary" htmlType="submit">
                Sign in
            </Button>
        </Form>
    )
}

export default RegForm;
