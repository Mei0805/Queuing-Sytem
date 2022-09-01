import { query, collection, getDocs, setDoc, doc, orderBy } from 'firebase/firestore'
import { Dispatch } from "redux";
import { database } from '../../firebase/fbConfig';
import { ActionNhatKy } from '../actionsType/NhatKyAction';

export const actionLoadNhatKy = () => {
    return async function (dispatch: Dispatch<ActionNhatKy>) {
        try {
            const snapshot = query(collection(database, "DSNhatKy"), orderBy("STT",'desc'));
            const snapshotdata = await getDocs(snapshot);
            const data = snapshotdata.docs.map((item: any) => ({
                ...item.data(),
                id: item.id
            }))

            console.log('snap', snapshot);
            console.log('data', data);

            dispatch({
                type: 'LOAD_NHATKY',
                payload: data,
            });

        }
        catch (err) {
            console.log('Lỗi: ', err)
        }
    }
}

export const actionAddNhatKy = (item: any) =>
    async (dispatch: Dispatch<ActionNhatKy>) => {
        try {
            const snapshot = collection(database, "DSNhatKy");
            await setDoc(doc(snapshot), item)

            dispatch({
                type: 'THEM_NHATKY',
                payload: item,
            });
            actionLoadNhatKy();
        }
        catch (error) {
            console.log('Lỗi:', error);
        }
    }
