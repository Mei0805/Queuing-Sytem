import { ActionNhatKy } from '../actionsType/NhatKyAction';

let initialValues = {
    listNhatKy: [],
    nhatKyItem: [],
};

export const NhatKyReducer = (state: any = initialValues, action: ActionNhatKy) => {
    switch (action.type) {
        case 'LOAD_NHATKY':
            return {
                ...state,
                listNhatKy: action.payload,
            };


        case 'THEM_NHATKY':
            return {
                ...state,
            };

        default: return state;
    }
}
export default NhatKyReducer;