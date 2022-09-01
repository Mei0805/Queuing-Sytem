import * as types from '../actionsType/actionProps';
import { ActionTaiKhoan } from '../actionsType/taiKhoanAction';
import { message } from 'antd';

let userLogin = null;
let loginStatus = false;

if (localStorage.getItem('userLogin')) {
    userLogin = JSON.parse(localStorage.getItem('userLogin') || "");
    loginStatus = true;
}

let initialValues = {
    listTaiKhoan: [],
    taiKhoanItem: [],
    userLogin: userLogin,
    loginStatus: loginStatus,
    confirmEmail: false,
    loading: false,
};

export const TaiKhoanReducer = (state: any = initialValues, action: ActionTaiKhoan) => {
    switch (action.type) {
        case 'LOAD_TAIKHOAN':
            return {
                ...state,
                listTaiKhoan: action.payload,
                loading: false,
            };
            break;

        case 'DANG_NHAP':
            console.log('Đăng nhập payload:', action.payload)
            return {
                ...state,
                loginStatus: action.payload,
            };
            break;

        case 'CHECK_EMAIL':
            const result = state.listTaiKhoan.filter((item: any) => (item.email === action.payload));
            console.log(result);
            if (result[0].tenDangNhap !== undefined) {
                message.success('Email đúng! Xin mời nhập mật khẩu mới!');
                state.TaiKhoanItem = result[0];
                console.log(state.TaiKhoanItem)
                state.confirmEmail = true;
            }
            return {
                ...state
            };
            break;

        case 'GET_MOTTAIKHOAN':
            return {
                ...state,
                taiKhoanItem: action.payload
            };
            break;

        case 'THEM_TAIKHOAN':
            return {
                ...state,
            };
            break;
        case 'SUA_TAIKHOAN':
            return {
                ...state,
            };
            break;
        case 'XOA_TAIKHOAN':
            return {
                ...state,
            };
            break;
        default: return state;
    }
}
export default TaiKhoanReducer;