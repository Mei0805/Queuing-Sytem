import * as types from './actionProps'

export type loadThietBiList = {
    type: types.LOAD_THIETBI,
    payload: any,
}

export type getThietBiItem = {
    type: types.GET_MOTTHIETBI,
    payload: any,
}

export type themThietBi = {
    type: types.THEM_THIETBI,
    payload: any,
}

export type suaThietBi = {
    type: types.SUA_THIETBI,
    payload: any,
}


export type ActionThietBi = 
loadThietBiList |getThietBiItem | themThietBi | suaThietBi 