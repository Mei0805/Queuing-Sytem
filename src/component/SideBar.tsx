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

      <Menu expandIcon={<img src='/img/icon/more-vertical.png' alt='calendar-icn' />}>
        <Menu.Item key="0" icon={<img src='/img/icon/dashboard.png' alt='navbar-img' />}><Link className="nav-link" to="/dashboard">Dashboard</Link></Menu.Item>
        <Menu.Item key="1" icon={<img src='/img/icon/thietbi.png' alt='navbar-img' />}><Link className="nav-link" to="thietbi">Thiết bị</Link></Menu.Item>
        <Menu.Item key="2" icon={<img src='/img/icon/dichvu.png' alt='navbar-img' />}><Link className="nav-link" to="dichvu">Dịch vụ</Link></Menu.Item>
        <Menu.Item key="3" icon={<img src='/img/icon/capso.png' alt='navbar-img' />}><Link className="nav-link" to="capso">Cấp số</Link></Menu.Item>
        <Menu.Item key="4" icon={<img src='/img/icon/baocao.png' alt='navbar-img' />}><Link className="nav-link" to="baocao">Báo cáo</Link></Menu.Item>
        <Menu.SubMenu 
          title={
            <>
            <img src='/img/icon/setting.png' style={{marginRight:'10px'}} alt='navbar-img' />
            Cài đặt hệ thống 
            
            </>
          }>
          <div className='submenuContainer'>
          <Menu.Item key="5"><Link className="nav-link" to="vaitro">Quản lý vai trò</Link></Menu.Item>
          <Menu.Item key="6"><Link className="nav-link" to="taikhoan">Quản lý tài khoản</Link></Menu.Item>
          <Menu.Item key="7"><Link className="nav-link" to="nguoidung">Nhật ký người dùng</Link></Menu.Item>
          </div>
        </Menu.SubMenu>
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