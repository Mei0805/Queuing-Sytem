
import React, { useEffect, useState } from 'react';
import './DangNhap.scss'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { nhatkyCreator, taikhoanCreator } from '../../redux';

import { Button, Form, Input, message } from 'antd';
import { Col, Row } from 'antd';
import { zeroPad } from '../ZeroPadGenerate';
import { State } from '../../redux/reducers';
import { database } from '../../firebase/fbConfig';
import { doc, getDoc } from 'firebase/firestore';

export const ResetPassword = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [passwordMatch, setPasswordMatch] = useState<boolean>()
    const [userItem, setUserI] = useState();
    const [confirmInfo, setConfirmInfo] = useState({
        password: "",
        confirmpassword: "",
    })

    const { doiMatKhau } = bindActionCreators(taikhoanCreator, dispatch);
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setConfirmInfo((prev) => ({
            ...prev,
            [name]: value
        }));
    }
    useEffect(() => {
        validatePassword()
    }, [confirmInfo])

    const validatePassword = () => {
        (confirmInfo.password === confirmInfo.confirmpassword)
            ? setPasswordMatch(true)
            : setPasswordMatch(false);
    }

    const onFinish = (values: any) => {
        console.log('Success:', values);
        if (passwordMatch === true) {
            doiMatKhau(values.password, id)
            message.success('Đổi mật khẩu thành công!')
        } else message.error('Mật khẩu chưa khớp!')

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Row className='resetPass' id='resetPass'>
            <Col className='left-rs' span={10}>
                <div className='logo'>
                    <img src="/img/logo.png" className='login__left-img' alt='logo-img' />
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
                        required
                        rules={[{ required: true, message: 'Chưa nhập mật khẩu' }]}
                    >
                        <Input.Password size="large" name="password" onChange={handleChange} allowClear />
                    </Form.Item>
                    <Form.Item
                        label="Nhập lại mật khẩu"
                        name="password-confirm"
                        required
                        rules={[{ required: true, message: 'Chưa nhập mật khẩu' }]}
                    >
                        <Input.Password size="large" name="confirmpassword" onChange={handleChange} allowClear />

                    </Form.Item>
                    {(confirmInfo.confirmpassword && passwordMatch == false) ? <span style={{ color: 'red' }}>Mật khẩu chưa khớp</span> : ""}

                    <Form.Item style={{ textAlign: 'center', marginTop: '10px' }}>
                        <Button className='confirmBtn' htmlType='submit' size={'large'}>
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>

            </Col>

            <Col className='right-rs' span={14}>
                <img src='/img/login-img.png' className='confirmPassword__right-img' alt='banner-img' />
            </Col>
        </Row>

    )
}
