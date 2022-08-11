
import React from 'react';
import { NavLink } from 'react-router-dom';
import './DangNhap.scss'

import { Button, Form, Input } from 'antd';
import { Col, Row } from 'antd';

export const ForgotPass = () => {
    return (
        <Row className='login' id='forgotPass'>
            <Col className='left-fpass' span={10}>
                <div className='logo'>
                    <img src="./img/logo.png" className='login__left-img' alt='logo-img' />
                </div>
                <Form
                    className='fpassForm'
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Đặt lại mật khẩu"
                        name="username"
                    >
                        <p>Vui lòng nhập email để đặt lại mật khẩu của bạn *</p>
                        <Input size="large" allowClear />
                    </Form.Item >

                    <Form.Item style={{ textAlign: 'center' }} >
                        <NavLink to='/dangnhap' >
                            <Button className='cancelBtn' size={'large'}>
                                Hủy
                            </Button>
                        </NavLink>
                        <NavLink to='/doimatkhau' >
                            <Button className='fpassBtn' size={'large'}>
                                Tiếp tục
                            </Button>
                        </NavLink>
                    </Form.Item>
                </Form>

            </Col>

            <Col className='right-fpass' span={14}>
                <img src='img/resetPass.png' alt='banner-img' />
            </Col>
        </Row>

    )
}
