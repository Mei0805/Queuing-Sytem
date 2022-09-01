import './DangNhap.scss'
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { taikhoanCreator } from '../../redux';
import { bindActionCreators } from "redux";
import { State } from "../../redux/reducers";

import { Button, Form, Input,message } from 'antd';
import { Col, Row } from 'antd';

export const DangNhap = () => {
    let dispatch = useDispatch();
    const [taiKhoan, setListTaiKhoan] = useState();
    const { actionLoadTaiKhoan, DangNhap } = bindActionCreators(taikhoanCreator, dispatch);
    const { logedInStatus } = useSelector((state: State) => state.taikhoan);

    const onFinish = (e: any) => {
        // e.preventDefault();
        console.log('Success:',e.username, e.password);
        DangNhap(e.username, e.password)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        actionLoadTaiKhoan();
    }, [])
    useEffect(() => {
        if (logedInStatus === true) {
            window.location.replace('/dashboard');
        } else {
            
        }
    }, [logedInStatus])

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
                        <Button className='loginBtn' htmlType="submit" size={'large'}>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>

            </Col>

            <Col className='right-login' span={14}>
                <img src='img/login-img.png' className='confirmPassword__right-img' alt='banner-img' />
            </Col>
        </Row>

    )
}
