import { query, collection, getDocs, setDoc, doc, orderBy, getDoc,limit } from 'firebase/firestore'
import { Dispatch } from "redux";
import { database } from '../../firebase/fbConfig';
import { ActionCapSo } from '../actionsType/actionCapSo';

import { message } from 'antd';

export const actionLoadCapSo = () => {
    return async function (dispatch: Dispatch<ActionCapSo>) {
        try {
            const snapshot = query(collection(database, "DSCapSo"), orderBy("STT","desc"));
            const snapshotdata = await getDocs(snapshot);
            const data = snapshotdata.docs.map((item: any) => ({
                ...item.data(),
                id: item.id
            }))

            console.log('snap', snapshot);
            console.log('data', data);

            dispatch({
                type: 'LOAD_CAPSO',
                payload: data,
            });

        }
        catch (err) {
            message.error('Lỗi rồi !',3);
            console.log('Lỗi: ', err)
        }
    }
}

export const actionLoadCapSoMoiNhat = () => {
    return async function (dispatch: Dispatch<ActionCapSo>) {
        try {
            const snapshot = query(collection(database, "DSCapSo"), orderBy("STT",'desc'),limit(6));
            const snapshotdata = await getDocs(snapshot);
            const data = snapshotdata.docs.map((item: any) => ({
                ...item.data(),
                id: item.id
            }))

            console.log('snap', snapshot);
            console.log('data', data);

            dispatch({
                type: 'LOAD_CAPSO',
                payload: data,
            });

        }
        catch (err) {
            message.error('Lỗi rồi !',3);
            console.log('Lỗi: ', err)
        }
    }
}

export const getCapSoItem = (id: any) => {
    return async function (dispatch: Dispatch<ActionCapSo>) {
        try {
            const docRef = doc(database, "DSCapSo", id);
            const docSnap = await getDoc(docRef);

            console.log('snap', docRef);
            console.log('data', docSnap);

            dispatch({
                type: 'GET_MOTCAPSO',
                payload: docSnap.data(),
            });

        }
        catch (err) {
            message.error('Lỗi rồi !',3);
            console.log('Lỗi: ', err)
        }
    }
}

export const actionAddCapSo = (item: any) =>
    async (dispatch: Dispatch<ActionCapSo>) => {
        try {
            const snapshot = collection(database, "DSCapSo");
            await setDoc(doc(snapshot), item)
            dispatch({
                type: 'THEM_CAPSO',
                payload: item,
            });
            actionLoadCapSo();
        }

        catch (error) {
            message.error('Lỗi rồi !',3);
            console.log('Lỗi:', error);
        }
}


