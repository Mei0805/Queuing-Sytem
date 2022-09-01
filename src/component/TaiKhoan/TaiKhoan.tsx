import { useState,useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { Col, Row } from 'antd';
import '../../style/taikhoan/TaiKhoan.scss'

import { NotifyBtn } from '../DashBoard/NotifyBtn';
import { CardNotify } from '../CardNotify';
import { Profile } from '../Profile';

export const TaiKhoan = () => {
    const [statusNotify, setStatusNotify] = useState<boolean>(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [])
    return (
        <div className='taikhoanContainer'>
            <Row>
                <Col span={16}>
                    <h1 style={{ fontSize: '20px', fontWeight:700 }}>
                        <span style={{color:'#7E7D88'}}>Cài đặt hệ thống</span>
                        <img src='/img/icon/breadcrumb.png' alt='navbar-img' />
                        <span>Quản lý tài khoản</span>
                    </h1>
                </Col>
                <Col span={7} id='notifyContainer'>
                <NotifyBtn trigger={statusNotify} setTrigger={setStatusNotify} />
                    <Profile />
                    {statusNotify ? <CardNotify /> : <></>}
                </Col>
            </Row>
            <Row className=''>
                <Outlet />
            </Row>
        </div>
    )
}