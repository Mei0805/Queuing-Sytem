import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import { Col, Row } from 'antd';
import '../../style/dichvu/DichVu.scss'

import { NotifyBtn } from '../DashBoard/NotifyBtn';
import { CardNotify } from '../CardNotify';
import { Profile } from '../Profile';


export const DichVu = () => {
    const [statusNotify, setStatusNotify] = useState<boolean>(false);
    return (
        <div className='dichvuContainer'>
            <Row>
                <Col span={16}>
                    <h1 style={{ fontSize: '20px', fontWeight:700 }}>
                        <span style={{color:'#7E7D88'}}>Dịch vụ</span>
                        <img src='/img/icon/breadcrumb.png' alt='navbar-img' />
                        <span>Danh sách dịch vụ</span>
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