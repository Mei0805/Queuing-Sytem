import '../App.scss'
import { Col, Row } from 'antd';
import { Menu } from 'antd';

import SideBar from './SideBar';

import { Link, Outlet,useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Row className='mainLayout'>
      <Col className='nav-col' span={4}>
        <SideBar />
      </Col>

      <Col className='main-col' id='main' span={14}>
        <Outlet/>

      </Col>

      <Col className='right-col' span={6}>
        Info col
      </Col>
    </Row>
  )
}