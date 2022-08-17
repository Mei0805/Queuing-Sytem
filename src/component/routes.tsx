import React from 'react';
import { Routes, Route } from 'react-router-dom';

import 'antd/dist/antd.css';

import { Dashboard } from './DashBoard/Dashboard';
import { ThietBi } from './ThietBi/ThietBi';
import { DichVu } from './DichVu/DichVu';
import { CapSo } from './CapSo/CapSo';
import { BaoCao } from './BaoCao/BaoCao';

//login
import { DangNhap } from './DangNhap/DangNhap';
import { ForgotPass } from './DangNhap/ForgotPass';
import { ResetPassword } from './DangNhap/ResetPassword';
import { Home } from './Home';

import { DashboardDay } from './DashBoard/DashboardDay';
import { DashboardWeek } from './DashBoard/DashboardWeek';
import { DashboardMonth } from './DashBoard/DashboardMonth';

//thietbi
import { DSThietBi } from './ThietBi/DSThietBi';
import { ThemThietBi } from './ThietBi/ThemthietBi';
import { UpdateThietBi } from './ThietBi/UpdateThietBi';
import { ChiTietThietBi } from './ThietBi/ChiTietThietBi';
import { TaiKhoan } from './TaiKhoan/TaiKhoan';


const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}>
                <Route path='profile' element={<TaiKhoan />} />
                <Route index element={<Dashboard />} />
                <Route path='dashboard' element={<Dashboard />}>
                    <Route index element={<DashboardDay />} />
                    <Route path='dashboardWeek' element={<DashboardWeek />} />
                    <Route path='dashboardMonth' element={<DashboardMonth />} />
                </Route>
                <Route path='thietbi' element={<ThietBi />} >
                    <Route index element={<DSThietBi />} />
                    <Route path='them' element={<ThemThietBi />} />
                    <Route path=':id' element={<ChiTietThietBi />} />
                    <Route path='capnhat/:id' element={<UpdateThietBi />} />
                </Route>
                <Route path='dichvu' element={<DichVu />} />
                <Route path='capso' element={<CapSo />} />
                <Route path='baocao' element={<BaoCao />} />
            </Route>

            <Route path='/dangnhap' element={<DangNhap />} />
            <Route path='/quenmatkhau' element={<ForgotPass />} />
            <Route path='/doimatkhau' element={<ResetPassword />} />
        </Routes >
    )
}

export default Router;