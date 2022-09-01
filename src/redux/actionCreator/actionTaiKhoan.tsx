import { query, collection, getDocs, setDoc, updateDoc, doc, orderBy, getDoc } from 'firebase/firestore'
import { Dispatch } from "redux";
import { database } from '../../firebase/fbConfig';
import { ActionTaiKhoan } from '../actionsType/taiKhoanAction';

import { message } from 'antd';

export const actionLoadTaiKhoan = () => {
    return async function (dispatch: Dispatch<ActionTaiKhoan>) {
        try {
            const snapshot = query(collection(database, "users"), orderBy("STT"));
            const snapshotdata = await getDocs(snapshot);
            const data = snapshotdata.docs.map((item: any) => ({
                ...item.data(),
                id: item.id
            }))

            console.log('snap', snapshot);
            console.log('data', data);

            dispatch({
                type: 'LOAD_TAIKHOAN',
                payload: data,
            });

        }
        catch (err) {
            console.log('Lỗi: ', err)
        }
    }
}

export const getTaiKhoanItem = (id: any) => {
    return async function (dispatch: Dispatch<ActionTaiKhoan>) {
        try {
            const docRef = doc(database, "users", id);
            const docSnap = await getDoc(docRef);

            console.log('snap', docRef);
            console.log('data', docSnap);

            dispatch({
                type: 'GET_MOTTAIKHOAN',
                payload: docSnap.data(),
            });

        }
        catch (err) {
            console.log('Lỗi: ', err)
        }
    }
}

export const actionAddTaiKhoan = (item: any) =>
    async (dispatch: Dispatch<ActionTaiKhoan>) => {
        try {
            const snapshot = collection(database, "users");
            await setDoc(doc(snapshot), item)
            message.success('Thêm tài khoản thành công !', 2);

            dispatch({
                type: 'THEM_TAIKHOAN',
                payload: item,
            });
            window.location.replace('/taikhoan');
            actionLoadTaiKhoan();
        }
        catch (error) {
            console.log('Lỗi:', error);
        }
    }

export const actionUpdateTaiKhoan = (item: any, id: any) =>
    async (dispatch: Dispatch<ActionTaiKhoan>) => {
        try {
            const adoc = doc(database, "users", id)
            await updateDoc(adoc, item);
            message.success('Sửa tài khoản thành công !', 2);

            dispatch({
                type: 'SUA_TAIKHOAN',
                payload: item,
            });
            window.location.replace('/taikhoan');
            actionLoadTaiKhoan();
        }
        catch (error) {
            console.log('Lỗi:', error);
        }
    }

//Đăng nhập
export const DangNhap = (username: string, password: string) =>
    async (dispatch: Dispatch<ActionTaiKhoan>) => {
        try {
            const snapshot = query(collection(database, "users"), orderBy("STT"));
            const snapshotdata = await getDocs(snapshot);
            const data = snapshotdata.docs.map((item: any) => ({
                ...item.data(),
                id: item.id
            }))

            const result = data.filter((item: any) =>
            (item.tenDangNhap == username &&
                item.matKhau == password))

            if (result[0].tenDangNhap !== undefined) {
                dispatch({
                    type: 'DANG_NHAP',
                    payload: {
                        status: true
                    },
                })
                localStorage.setItem('accessToken', result[0].id);
                localStorage.setItem('userLogin', JSON.stringify(result));
                message.success('Đăng nhập thành công !', 3);
                window.location.replace('/dashboard');
                

            } else {
                message.error('Sai mật khẩu rồi !',3);
            }



        }
        catch (err) {
            message.error('Sai mật khẩu rồi !');
            console.log('Lỗi:', err);
        }
    }

// Kiểm tra email 
export const checkEmail = (email: string) =>
    async (dispatch: Dispatch<ActionTaiKhoan>) => {

        try {
            dispatch({
                type: 'CHECK_EMAIL',
                payload: email
            })
        }
        catch (err) {
            console.log('Lỗi: ', err);
            message.error('Email không chính xác!',3);
        }
    }

export const doiMatKhau = (password: string, id: any) =>
    async () => {
        try {
            const getUser = doc(database, "users", `${id}`);
            console.log('User:', getUser);
            await updateDoc(getUser, { matKhau: password });
            message.success('Đổi mật khẩu thành công !', 2);
            window.location.replace('/dangnhap');
        }
        catch (error) {
            console.log('Lỗi:', error);
        }
    }
