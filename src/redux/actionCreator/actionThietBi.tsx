import { query, collection, getDocs, setDoc, updateDoc, doc, orderBy, getDoc } from 'firebase/firestore'
import { Dispatch } from "redux";
import { database } from '../../firebase/fbConfig';
import { ActionThietBi } from '../actionsType/thietBiAction';
import { useNavigate } from 'react-router-dom';

import { message } from 'antd';

export const actionLoadThietBi = () => {
    return async function (dispatch: Dispatch<ActionThietBi>) {
        try {
            const snapshot = query(collection(database, "DSThietBi"), orderBy("STT"));
            const snapshotdata = await getDocs(snapshot);
            const data = snapshotdata.docs.map((item: any) => ({
                ...item.data(),
                id: item.id
            }))

            console.log('snap', snapshot);
            console.log('data', data);

            dispatch({
                type: 'LOAD_THIETBI',
                payload: data,
            });

        }
        catch (err) {
            message.error('Lỗi rồi !',3);
            console.log('Lỗi: ', err)
        }
    }
}

export const getThietBiItem = (id: any) => {
    return async function (dispatch: Dispatch<ActionThietBi>) {
        try {
            const docRef = doc(database, "DSThietBi", id);
            const docSnap = await getDoc(docRef);

            console.log('snap', docRef);
            console.log('data', docSnap);

            dispatch({
                type: 'GET_MOTTHIETBI',
                payload: docSnap.data(),
            });

        }
        catch (err) {
            message.error('Lỗi rồi !',3);
            console.log('Lỗi: ', err)
        }
    }
}

export const actionAddThietBi = (item: any) =>
    async (dispatch: Dispatch<ActionThietBi>) => {
        try {
            const snapshot = collection(database, "DSThietBi");
            await setDoc(doc(snapshot), item)
            message.success('Thêm thiết bị thành công !', 2);

            dispatch({
                type: 'THEM_THIETBI',
                payload: item,
            });
            window.location.replace('/thietbi');
            actionLoadThietBi();
        }
        catch (error) {
            message.error('Lỗi rồi !',3);
            console.log('Lỗi:', error);
        }
    }

export const actionUpdateThietBi = (item: any, id: any) =>
    async (dispatch: Dispatch<ActionThietBi>) => {
        try {
            const adoc = doc(database, "DSThietBi", id)
            await updateDoc(adoc, item);
           
            dispatch({
                type: 'SUA_THIETBI',
                payload: item,
            });
            alert('Sửa thiết bị thành công !');
            actionLoadThietBi();
            window.location.replace('/thietbi');
        }
        catch (error) {
            message.error('Lỗi rồi !',5);
            console.log('Lỗi:', error);
        }
    }
