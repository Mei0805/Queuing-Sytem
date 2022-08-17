import '../../style/taikhoan/TaiKhoan.scss';
import { useState } from 'react';
import { Col, Row } from 'antd';
import { Avatar } from 'antd';
import { Button, Form, Input, Radio } from 'antd';

import { NotifyBtn } from '../DashBoard/NotifyBtn';
import { CardNotify } from '../CardNotify';
import { Profile } from '../Profile';

export const TaiKhoan = () => {
    const [statusNotify, setStatusNotify] = useState<boolean>(false);

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
                    <Avatar src="https://joeschmoe.io/api/v1/random" style={{ width: '248px', height: '248px' }}  />
                    <h3 style={{ fontWeight: 700, fontSize: '20px', lineHeight: '40px' }}>Lê Quỳnh Ái Vân</h3>
                </Col>
                <Col span={16}>
                    <Row className='inputContainer'>
                        <Col span={12}>
                            <Form layout="vertical" autoComplete="off">
                                <Form.Item label="Tên người dùng" >
                                    <Input defaultValue="Lê Quỳnh Ái Vân" disabled />
                                </Form.Item>

                                <Form.Item label="Số điện thoại" >
                                    <Input defaultValue="0767375921" disabled />
                                </Form.Item>

                                <Form.Item label="Email" >
                                    <Input defaultValue="adminSSO1@domain.com" disabled />
                                </Form.Item>
                            </Form>


                        </Col>
                        <Col span={12}>
                            <Form layout="vertical" autoComplete="off">
                                <Form.Item label="Tên đăng nhập" >
                                    <Input defaultValue="lequynhaivan01" disabled />
                                </Form.Item>

                                <Form.Item label="Mật khẩu" >
                                    <Input defaultValue="0767375921" disabled />
                                </Form.Item>

                                <Form.Item label="Vai trò" >
                                    <Input defaultValue="Kế toán" disabled />
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}