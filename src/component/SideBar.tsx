import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import { HomeOutlined, UnorderedListOutlined, DesktopOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';

const { Sider, Footer } = Layout;



function SideBar() {
  return (
    <div className='sider'>
      <div className="logo" style={{ textAlign: 'center' }}> <img src="/img/logo.png" alt="" /> </div>

      <Menu style={{ padding: '2rem 0' }} >
        <Menu.Item key="0"><Link className="nav-link" to="/"><img src='/img/icon/dashboard.png' alt='navbar-img'/> Dashboard</Link></Menu.Item>
        <Menu.Item key="1"><Link className="nav-link" to="thietbi"><img src='/img/icon/thietbi.png' alt='navbar-img'/> Thiết bị</Link></Menu.Item>
        <Menu.Item key="2"><Link className="nav-link" to="dichvu"><img src='/img/icon/dichvu.png' alt='navbar-img'/> Dịch vụ</Link></Menu.Item>
        <Menu.Item key="3"> <Link className="nav-link" to="capso"><img src='/img/icon/capso.png' alt='navbar-img'/> Cấp số</Link></Menu.Item>
        <Menu.Item key="4"> <Link className="nav-link" to="baocao"><img src='/img/icon/baocao.png' alt='navbar-img'/> Báo cáo</Link></Menu.Item>
        <Menu.Item key="5"> <Link className="nav-link" to="caidat"><img src='/img/icon/setting.png' alt='navbar-img'/> Cài đặt hệ thống</Link></Menu.Item>
      </Menu>
    </div>
  )
} export default SideBar;