import '../App.scss'
import { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import { Menu } from 'antd';

import SideBar from './SideBar';

import { Link, Outlet, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { taikhoanCreator } from "../redux";
import { bindActionCreators } from "redux";
import { State } from '../redux/reducers';
import { DangNhap } from './DangNhap/DangNhap';

export const Home = () => {
  const { userLogin, loginStatus } = useSelector((state: State) => state.taikhoan);

  if (userLogin === null) {
    window.location.replace('/dangnhap');
  }
  console.log('trạng thái: ', loginStatus)
  console.log('Thông tin login: ', userLogin)

  let dispatch = useDispatch();
  const [taiKhoan, setListTaiKhoan] = useState();
  const { actionLoadTaiKhoan } = bindActionCreators(taikhoanCreator, dispatch);
  const { listTaiKhoan } = useSelector((state: State) => state.taikhoan);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    actionLoadTaiKhoan();
    setListTaiKhoan(listTaiKhoan);
  }, [])

  return (
     (loginStatus == true) ?
      < Row className='mainLayout' >
        < Col className='nav-col-sidebar' span={3} >
          <SideBar />
        </Col >

        <Col className='main-col' id='main' span={21}>
          <Outlet />
        </Col>
      </Row >
      : <DangNhap />
    
  )

}