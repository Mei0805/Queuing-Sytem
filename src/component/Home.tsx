import '../App.scss'
import { Col, Row } from 'antd';
import { Menu } from 'antd';

import SideBar from './SideBar';

import { Link, Outlet,useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Row className='mainLayout'>
      <Col className='nav-col-sidebar' span={3}>
        <SideBar  />
      </Col>

      <Col className='main-col' id='main' span={21}>
        <Outlet/>
      </Col>
    </Row>
  )
}