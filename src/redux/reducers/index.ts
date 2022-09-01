import { combineReducers } from "redux";
import { CapSoReducer } from "./CapSoReducer";
import { DichVuReducer } from "./DichVuReducer";
import NhatKyReducer from "./NhatKyReducer";
import RoleReducer from "./RoleReducer";
import TaiKhoanReducer from "./TaiKhoanReducer";
import { ThietBiReducer } from "./ThietBiReducer";

const rootReducer =  combineReducers({
    thietbi: ThietBiReducer,
    dichvu: DichVuReducer,
    capso: CapSoReducer,
    taikhoan:TaiKhoanReducer,
    vaitro:RoleReducer,
    nhatky: NhatKyReducer,
}) 
export default rootReducer;

export type State = ReturnType<typeof rootReducer>;