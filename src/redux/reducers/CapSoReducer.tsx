import { ActionCapSo } from '../actionsType/actionCapSo'

let initialValues = {
    listCapSo: [],
    capSoItem: [],
};

export const CapSoReducer = (state = initialValues, action: ActionCapSo) => {
    switch (action.type) {
        case 'LOAD_CAPSO':
            return {
                ...state,
                listCapSo: action.payload,
            };
        case 'GET_MOTCAPSO':
            return {
                ...state,
                capSoItem: action.payload,
            }

        case 'THEM_CAPSO':
            return {
                ...state,
            }
        default: return {
            ...state
        };
    }
}