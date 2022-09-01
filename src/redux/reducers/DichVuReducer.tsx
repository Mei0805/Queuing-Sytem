import { ActionDichVu } from '../actionsType/actionDichVu'

let initialValues = {
    listDichVu: [],
    dichVuItem: [],
};

export const DichVuReducer = (state: any = initialValues, action: ActionDichVu) => {
    switch (action.type) {
        case 'LOAD_DICHVU':
            return {
                ...state,
                listDichVu: action.payload,
            };
        case 'GET_MOTDICHVU':
            return {
                ...state,
                dichVuItem: action.payload,
            }

        case 'THEM_DICHVU':
            return {
                ...state,
            }

        case 'SUA_DICHVU':
            return {
                ...state,
            }
        default: return {
            ...state
        };
    }
}