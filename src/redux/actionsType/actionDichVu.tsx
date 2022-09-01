import * as types from './actionProps'

export type loadDichVuList = {
    type: types.LOAD_DICHVU,
    payload: any,
}
export type getDichVuItem = {
    type: types.GET_MOTDICHVU,
    payload: any,
}

export type themDichVu = {
    type: types.THEM_DICHVU,
    payload: any,
}

export type suaDichVu = {
    type: types.SUA_DICHVU,
    payload: any,
}


export type ActionDichVu = 
loadDichVuList |getDichVuItem | themDichVu | suaDichVu 