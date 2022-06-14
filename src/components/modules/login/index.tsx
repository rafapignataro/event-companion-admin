import Image from 'next/image';

import { authenticate } from '../../../services/authentication/authenticate';
import { useUser } from '../../../contexts/user';
import { Page } from '../../common/Page';
import { Button, Col, Form, Input, Row, notification, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Link from 'next/link';

type FormFields = {
	email: string;
	password: string;
}

export const Login = () => {
	const [loginForm] = useForm();

	const { saveUser } = useUser();

	const openNotification = (type: string, message: string, err?: string) => {
		if (type == 'success' || type == 'error')
			notification[type]({ message: message, description: err });
		return;
	};

	const onFinishLogin = async ({ email, password }: FormFields) => {
		try {
			const { token, user } = await authenticate({ email, password });

			saveUser(token, user);
			openNotification('success', 'Welcome back!');
		} catch (err) {
			console.log(err)
			openNotification('error', err.message || 'There was an error, try again later!');
		}
	}

	return (
		<Page title="Login">
			<div style={{
				height: '100vh',
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
				<Row>
					<Col span={24} style={{ marginBottom: '2rem' }}>
						<Row align="middle" justify="center">
							<Image src="/svg/logo.svg" width="150" height="150" />
						</Row>
					</Col>
					<Col span={24}>
						<Form
							name="loginForm"
							layout="vertical"
							onFinish={onFinishLogin}
							form={loginForm}
						>
							<Form.Item
								name="email"
								label="E-mail"
								required
								rules={[{ required: true, type: 'email', message: 'Please, provide your email!' }]}
							>
								<Input placeholder="Email" size="large" />
							</Form.Item>
							<Form.Item
								name="password"
								label="Password"
								required
								rules={[{ required: true, message: 'Please, provide your password!' }]}
							>
								<Input.Password placeholder="Senha" size="large" />
							</Form.Item>
							<Form.Item>
								<Button
									size="large"
									type="primary"
									block
									htmlType="submit"
									disabled={!loginForm.isFieldsTouched || !!loginForm.getFieldsError().filter(({ errors }) => errors.length).length}
								>ENTER</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</div>
		</Page >
	);
};

