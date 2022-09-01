import * as types from '../actionsType/actionProps';

const initialValues = {
    listRole: [],
    RoleItem: [],
};

export const RoleReducer = (state: any = initialValues, action:any) => {
    switch (action.type) {
        // case types.LOAD_VAITRO:
        //     return{
        //         ...state,
        //         listTaiKhoan: action.payload,
        //     }

        // case types.THEM_VAITRO:
        //     return {
        //         ...state,
        //     };

        // case types.SUA_VAITRO:
        //     return{
        //         ...state,
        //     }

        // case types.XOA_VAITRO:
        //     return{
        //         ...state,
        //     }
        default: return state;
    }
}  
export default RoleReducer;