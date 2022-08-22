import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import { Col, Row } from 'antd';
import '../../style/capso/CapSo.scss'

import { NotifyBtn } from '../DashBoard/NotifyBtn';
import { CardNotify } from '../CardNotify';
import { Profile } from '../Profile';


export const CapSo = () => {
    const [statusNotify, setStatusNotify] = useState<boolean>(false);
    return (
        <div className='capsoContainer'>
            <Row>
                <Col span={16}>
                    <h1 style={{ fontSize: '20px', fontWeight:700 }}>
                        <span style={{color:'#7E7D88'}}>Cấp số</span>
                        <img src='/img/icon/breadcrumb.png' alt='navbar-img' />
                        <span>Danh sách cấp số</span>
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