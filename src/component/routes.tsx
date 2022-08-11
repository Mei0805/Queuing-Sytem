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


const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}>
                <Route index element={<Dashboard />} />
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='thietbi' element={<ThietBi />} />
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

export default Main;