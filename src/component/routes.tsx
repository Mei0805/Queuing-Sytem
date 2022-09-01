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
import { TaiKhoanCaNhan } from './TaiKhoan/TaiKhoanCaNhan';
import { DSDichVu } from './DichVu/DSDichVu';
import { ThemDichVu } from './DichVu/ThemDichVu';
import { ChiTietDichVu } from './DichVu/ChiTietDichVu';
import { UpdateDichVu } from './DichVu/UpdateDichVu';
import { DSCapSo } from './CapSo/DSCapSo';
import { ThemCapSo } from './CapSo/ThemCapSo';
import { ChiTietCapSo } from './CapSo/ChiTietCapSo';
import { VaiTro } from './VaiTro/VaiTro';
import { DSVaiTro } from './VaiTro/DSVaiTro';
import { ThemVaiTro } from './VaiTro/ThemVaiTro';
import { UpdateVaiTro } from './VaiTro/UpdateVaiTro';
import { TaiKhoan } from './TaiKhoan/TaiKhoan';
import { DSTaiKhoan } from './TaiKhoan/DSTaiKhoan';
import { ThemTaiKhoan } from './TaiKhoan/ThemTaiKhoan';
import { UpdateTaiKhoan } from './TaiKhoan/UpdateTaiKhoan';
import { NguoiDung } from './NhatKyUser/NguoiDung';


const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}>
                <Route path='/' element={<Dashboard />} >
                    <Route index element={<DashboardDay />} />
                </Route>

                <Route path='profile' element={<TaiKhoanCaNhan />} />
                <Route path='dashboard' element={<Dashboard />}>
                    <Route index element={<DashboardDay />} />
                    <Route path='dashboardWeek' element={<DashboardWeek />} />
                    <Route path='dashboardMonth' element={<DashboardMonth />} />
                </Route>
                <Route path='thietbi' element={<ThietBi />} >
                    <Route index element={<DSThietBi />} />
                    <Route path='them' element={<ThemThietBi />} />
                    <Route path='chitiet/:id' element={<ChiTietThietBi />} />
                    <Route path='capnhat/:id' element={<UpdateThietBi />} />
                </Route>
                <Route path='dichvu' element={<DichVu />} >
                    <Route index element={<DSDichVu />} />
                    <Route path='them' element={<ThemDichVu />} />
                    <Route path='chitiet/:id' element={<ChiTietDichVu />} />
                    <Route path='capnhat/:id' element={<UpdateDichVu />} />
                </Route>
                <Route path='capso' element={<CapSo />} >
                    <Route index element={<DSCapSo />} />
                    <Route path='chitiet/:id' element={<ChiTietCapSo />} />
                    <Route path='them' element={<ThemCapSo />} />
                </Route>
                <Route path='baocao' element={<BaoCao />} />
                <Route path='vaitro' element={<VaiTro />} >
                    <Route index element={<DSVaiTro />} />
                    <Route path='them' element={<ThemVaiTro />} />
                    <Route path='capnhat/:id' element={<UpdateVaiTro />} />
                </Route>
                <Route path='taikhoan' element={<TaiKhoan />} >
                    <Route index element={<DSTaiKhoan />} />
                    <Route path='them' element={<ThemTaiKhoan />} />
                    <Route path='capnhat/:id' element={<UpdateTaiKhoan />} />
                </Route>
                <Route path='nguoidung' element={<NguoiDung />} />
            </Route>

            <Route path='/dangnhap' element={<DangNhap />} />
            <Route path='/quenmatkhau' element={<ForgotPass />} />
            <Route path='/doimatkhau/:id' element={<ResetPassword />} />
        </Routes >
    )
}

export default Router;