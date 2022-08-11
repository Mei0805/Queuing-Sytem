
import React from 'react';
import { NavLink } from 'react-router-dom';
import './DangNhap.scss'

import { Button, Form, Input } from 'antd';
import { Col, Row } from 'antd';

export const DangNhap = () => {

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Row className='login' id='loginPage'>
            <Col className='left-login' span={10}>
                <div className='logo'>
                    <img src="./img/logo.png" className='login__left-img' alt='logo-img' />
                </div>
                <Form
                    className='loginForm'
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên đăng nhập"
                        name="username"
                        rules={[{ required: true, message: 'Chưa nhập tên đăng nhập' }]}
                    >
                        <Input size="large" allowClear={true} />
                    </Form.Item >

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Chưa nhập mật khẩu' }]}
                    >
                        <Input.Password size="large" allowClear />
                    </Form.Item>

                    <NavLink to='/quenmatkhau' style={{ fontSize: '14px', color: '#E73F3F' }}>
                        Quên mật khẩu ?
                    </NavLink>

                    <Form.Item style={{ textAlign: 'center', marginTop: '10px' }}>
                    <NavLink to='/dashboard' >
                    <Button className='loginBtn' size={'large'}>
                            Đăng nhập
                        </Button>
                    </NavLink>
                       
                    </Form.Item>
                </Form>

            </Col>

            <Col className='right-login' span={14}>
                <img src='img/login-img.png' className='confirmPassword__right-img' alt='banner-img' />
            </Col>
        </Row>

    )
}
