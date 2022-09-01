import '../../style/taikhoan/TaiKhoanCaNhan.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reducers';

import { Col, Row } from 'antd';
import { Avatar } from 'antd';
import {  Form, Input} from 'antd';

import { NotifyBtn } from '../DashBoard/NotifyBtn';
import { CardNotify } from '../CardNotify';
import { Profile } from '../Profile';


export const TaiKhoanCaNhan = () => {
    const [statusNotify, setStatusNotify] = useState<boolean>(false);
    const [taiKhoan, setTaiKhoan] = useState<any | undefined>();
    const { userLogin } = useSelector((state: State) => state.taikhoan);

    useEffect(() => {
        setTaiKhoan(userLogin[0])
    }, [userLogin[0]])

    console.log('Tài khoản login:',taiKhoan)

    return (
        <div className='accountContainer'>
            <Row>
                <Col span={18}>
                    <h1 style={{ fontSize: '20px', fontWeight: 700 }}>
                        <span>Thông tin cá nhân</span>
                    </h1>
                </Col>
                <Col span={6} id='notifyContainer'>
                    <NotifyBtn trigger={statusNotify} setTrigger={setStatusNotify} />
                    <Profile />
                    {statusNotify ? <CardNotify /> : <></>}
                </Col>
            </Row>
            <Row className='cardContainer'>
                <Col span={8} style={{ textAlign: 'center', alignItems: 'center' }}>
                    <Avatar src="/img/avatar.png" style={{ width: '248px', height: '248px' }}  />
                    <h3 style={{ fontWeight: 700, fontSize: '20px', lineHeight: '40px' }}>{taiKhoan && taiKhoan.hoTen}</h3>
                </Col>
                <Col span={16}>
                    {(!taiKhoan)
                    ? 'load...'
                    :
                    <Row className='inputContainer'>
                        <Col span={12}>
                            <Form layout="vertical" autoComplete="off">
                                <Form.Item label="Tên người dùng" >
                                    <Input defaultValue={taiKhoan.hoTen} disabled />
                                </Form.Item>

                                <Form.Item label="Số điện thoại" >
                                    <Input defaultValue={taiKhoan.sdt} disabled />
                                </Form.Item>

                                <Form.Item label="Email" >
                                    <Input defaultValue={taiKhoan.email} disabled />
                                </Form.Item>
                            </Form>


                        </Col>
                        <Col span={12}>
                            <Form layout="vertical" autoComplete="off">
                                <Form.Item label="Tên đăng nhập" >
                                    <Input defaultValue={taiKhoan.tenDangNhap} disabled />
                                </Form.Item>

                                <Form.Item label="Mật khẩu" >
                                    <Input type='password' defaultValue={taiKhoan.matKhau} disabled />
                                </Form.Item>

                                <Form.Item label="Vai trò" >
                                    <Input defaultValue={taiKhoan.vaiTro.value} disabled />
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                    }
                </Col>
            </Row>
        </div>
    )
}