import * as types from './actionProps'

export type loadCapSoList = {
    type: types.LOAD_CAPSO,
    payload: any,
}
export type getCapSoItem = {
    type: types.GET_MOTCAPSO,
    payload: any,
}

export type themCapSo = {
    type: types.THEM_CAPSO,
    payload: any,
}


export type ActionCapSo = loadCapSoList |getCapSoItem | themCapSo 