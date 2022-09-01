import * as types from './actionProps'

export type loadTaiKhoanList = {
    type: types.LOAD_TAIKHOAN,
    payload: any,
}

export type getTaiKhoanList = {
    type: types.GET_TAIKHOAN,
    payload: any,
}

export type getTaiKhoanItem = {
    type: types.GET_MOTTAIKHOAN,
    payload: any,
}

export type themTaiKhoan = {
    type: types.THEM_TAIKHOAN,
    payload: any,
}

export type suaTaiKhoan = {
    type: types.SUA_TAIKHOAN,
    payload: any,
}

export type xoaTaiKhoan = {
    type: types.XOA_TAIKHOAN,
    payload: any,
}

export type dangNhap = {
    type: types.DANG_NHAP,
    payload: any,
}
export type checkEmail = {
    type: types.CHECK_EMAIL,
    payload: any,
}
export type doiMatKhau = {
    type: types.DOI_MATKHAU,
    payload: any,
}

export type ActionTaiKhoan = 
loadTaiKhoanList |getTaiKhoanList | getTaiKhoanItem | themTaiKhoan | suaTaiKhoan| xoaTaiKhoan 
|dangNhap | checkEmail | doiMatKhau