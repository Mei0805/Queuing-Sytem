import { Link } from 'react-router-dom';
import { Menu, Button } from 'antd';
import '../style/SideBar.scss'


function SideBar() {
  return (
    <div className='sider' >
      <div className="logo" style={{ textAlign: 'center' }}>
        <Link to="/">
          <img src="/img/logo.png" alt="" />
        </Link>
      </div>

      <Menu>
        <Menu.Item key="0" icon={<img src='/img/icon/dashboard.png' alt='navbar-img' />}><Link className="nav-link" to="/dashboard">Dashboard</Link></Menu.Item>
        <Menu.Item key="1" icon={<img src='/img/icon/thietbi.png' alt='navbar-img' />}><Link className="nav-link" to="thietbi">Thiết bị</Link></Menu.Item>
        <Menu.Item key="2" icon={<img src='/img/icon/dichvu.png' alt='navbar-img' />}><Link className="nav-link" to="dichvu">Dịch vụ</Link></Menu.Item>
        <Menu.Item key="3" icon={<img src='/img/icon/capso.png' alt='navbar-img' />}><Link className="nav-link" to="capso">Cấp số</Link></Menu.Item>
        <Menu.Item key="4" icon={<img src='/img/icon/baocao.png' alt='navbar-img' />}><Link className="nav-link" to="baocao">Báo cáo</Link></Menu.Item>
      </Menu>

      <div className='logOut'>
      <Link to="/dangnhap">
        <Button icon={<img src='/img/icon/logout.png' />} size={'large'}>
          Đăng xuất
        </Button>
      </Link>
      </div>
    </div>
  )
} export default SideBar;