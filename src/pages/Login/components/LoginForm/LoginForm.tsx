import { memo, FC, useCallback } from 'react';
import { Button, Form, Input } from '../../../../UI';

export type TLoginFormProps = {
    onEmailAuth: ({ email, password }: { email: string, password: string }) => void
}

const LoginForm: FC<TLoginFormProps> = ({ onEmailAuth }) => {
    const onFinishForm: TLoginFormProps['onEmailAuth'] = formValues => {
        onEmailAuth(formValues);
    }

    return (
        <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
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

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm;
