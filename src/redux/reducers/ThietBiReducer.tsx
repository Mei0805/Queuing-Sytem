import { ActionThietBi } from '../actionsType/thietBiAction'

let initialValues = {
    listThietBi: [],
    thietBiItem: [],
};

export const ThietBiReducer = (state: any = initialValues, action: ActionThietBi) => {
    switch (action.type) {
        case 'LOAD_THIETBI':
            return {
                ...state,
                listThietBi: action.payload,
            };
        case 'GET_MOTTHIETBI':
            return {
                ...state,
                thietBiItem: action.payload,
            }

        case 'THEM_THIETBI':
            return {
                ...state,
            }

        case 'SUA_THIETBI':
            return {
                ...state,
            }
        default: return {
            ...state
        };
    }
}