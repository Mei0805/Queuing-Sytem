import * as types from './actionProps'

export type loadNhatKyList = {
    type: types.LOAD_NHATKY,
    payload: any,
}

export type themNhatKy = {
    type: types.THEM_NHATKY,
    payload: any,
}


export type ActionNhatKy =  loadNhatKyList | themNhatKy