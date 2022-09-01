
import React from 'react';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './DangNhap.scss'

import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { State } from '../../redux/reducers';
import { taikhoanCreator } from '../../redux';
import { useSelector } from 'react-redux';

import { Button, Form, Input } from 'antd';
import { Col, Row } from 'antd';
import { message } from 'antd';

export const ForgotPass = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userID, setUserID] = useState();
    const [email,setEmail] = useState<any>();
    const { checkEmail, actionLoadTaiKhoan } = bindActionCreators(taikhoanCreator, dispatch);
    const { confirmEmail, TaiKhoanItem } = useSelector((state: State) => state.taikhoan);

    // const onFinish = (event: any) => {
    //     // console.log('Success:', values);
    //     console.log(event);
    //     // const email = event.email;
    //     // checkEmail(email);
    // };
    const onFinish = () => {
        console.log('Success:',email);
        if(email){
            checkEmail(email);
        } else message.error('Hãy nhập email !',3);
        
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        actionLoadTaiKhoan();
    }, []);

    useEffect(() => {
        if (confirmEmail === true) {
            setUserID(TaiKhoanItem.id);
        }
    }, [confirmEmail])

    useEffect(() => {
        if (userID != null) {
            navigate(`/doimatkhau/${userID}`);
        }
    }, [userID])


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
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                     <Form.Item
                        label="Đặt lại mật khẩu"
                    >
                        <p>Vui lòng nhập email để đặt lại mật khẩu của bạn *</p>
                        <Input
                        size="large"  
                        type='email'
                        onChange={event => setEmail(event.target.value)} />
                    </Form.Item >

                    <Form.Item style={{ textAlign: 'center' }} >
                        <NavLink to='/dangnhap' >
                            <Button className='cancelBtn' size={'large'}>
                                Hủy
                            </Button>
                        </NavLink>
                        <Button className='fpassBtn' htmlType="submit" size={'large'}>
                            Tiếp tục
                        </Button>
                    </Form.Item>
                </Form>

            </Col>

            <Col className='right-fpass' span={14}>
                <img src='img/resetPass.png' alt='banner-img' />
            </Col>
        </Row>

    )
}
