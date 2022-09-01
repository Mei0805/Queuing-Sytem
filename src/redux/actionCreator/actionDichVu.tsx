import { query, collection, getDocs, setDoc, updateDoc, doc, orderBy, getDoc } from 'firebase/firestore'
import { Dispatch } from "redux";
import { database } from '../../firebase/fbConfig';
import { ActionDichVu } from '../actionsType/actionDichVu';

import { message } from 'antd';

export const actionLoadDichVu = () => {
    return async function (dispatch: Dispatch<ActionDichVu>) {
        try {
            const snapshot = query(collection(database, "DSDichVu"), orderBy("STT"));
            const snapshotdata = await getDocs(snapshot);
            const data = snapshotdata.docs.map((item: any) => ({
                ...item.data(),
                id: item.id
            }))

            console.log('snap', snapshot);
            console.log('data', data);

            dispatch({
                type: 'LOAD_DICHVU',
                payload: data,
            });

        }
        catch (err) {
            message.error('Lỗi rồi !',3);
            console.log('Lỗi: ', err)
        }
    }
}

export const getDichVuItem = (id: any) => {
    return async function (dispatch: Dispatch<ActionDichVu>) {
        try {
            const docRef = doc(database, "DSDichVu", id);
            const docSnap = await getDoc(docRef);

            console.log('snap', docRef);
            console.log('data', docSnap);

            dispatch({
                type: 'GET_MOTDICHVU',
                payload: docSnap.data(),
            });

        }
        catch (err) {
            message.error('Lỗi rồi !',3);
            console.log('Lỗi: ', err)
        }
    }
}

export const actionAddDichVu = (item: any) =>
    async (dispatch: Dispatch<ActionDichVu>) => {
        try {
            const snapshot = collection(database, "DSDichVu");
            await setDoc(doc(snapshot), item)

            dispatch({
                type: 'THEM_DICHVU',
                payload: item,
            });
            
            alert('Thêm dịch vụ thành công!')
            window.location.replace('/dichvu');
            actionLoadDichVu();
        }
        catch (error) {
            message.error('Lỗi rồi !',3);
            console.log('Lỗi:', error);
        }
    }

export const actionUpdateDichVu = (item: any, id: any) =>
    async (dispatch: Dispatch<ActionDichVu>) => {
        try {
            const adoc = doc(database, "DSDichVu", id)
            await updateDoc(adoc, item);
            message.success('Sửa dịch vụ thành công !', 2);

            dispatch({
                type: 'SUA_DICHVU',
                payload: item,
            });
            window.location.replace('/dichvu');
            actionLoadDichVu();
        }
        catch (error) {
            message.error('Lỗi rồi !',3);
            console.log('Lỗi:', error);
        }
    }
