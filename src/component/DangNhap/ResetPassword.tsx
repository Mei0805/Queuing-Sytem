
import React from 'react';
import './DangNhap.scss'

import { Button, Form, Input } from 'antd';
import { Col, Row } from 'antd';

export const ResetPassword = () => {

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Row className='resetPass' id='resetPass'>
            <Col className='left-rs' span={10}>
                <div className='logo'>
                    <img src="./img/logo.png" className='login__left-img' alt='logo-img' />
                </div>
                <h1 style={{ textAlign: 'center', fontSize: '22px', fontWeight: '700' }}>Đặt lại mật khẩu mới</h1>
                <Form
                    className='rsForm'
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ message: 'Chưa nhập mật khẩu' }]}
                    >
                        <Input.Password size="large" allowClear />
                    </Form.Item>
                    <Form.Item
                        label="Nhập lại mật khẩu"
                        name="confirmpassword"
                        rules={[{  message: 'Chưa nhập mật khẩu' }]}
                    >
                        <Input.Password size="large" allowClear />
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center', marginTop: '10px' }}>
                        <Button className='confirmBtn' size={'large'}>
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>

            </Col>

            <Col className='right-rs' span={14}>
                <img src='img/login-img.png' className='confirmPassword__right-img' alt='banner-img' />
            </Col>
        </Row>

    )
}
