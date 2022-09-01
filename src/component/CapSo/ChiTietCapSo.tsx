import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "antd"

import { useDispatch, useSelector } from "react-redux";
import { getCapSoItem } from "../../redux/actionCreator/actionCapSo";
import { State } from "../../redux/reducers";
import { LoadingSpinner } from "../Loading";

export const ChiTietCapSo = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [capSoI, setCapSoItem] = useState<any>([]);
    const { capSoItem } = useSelector((state: State) => state.capso)

    useEffect(() => {
        if (id && id !== "") dispatch<any>(getCapSoItem(id))
    }, [id]);

    useEffect(() => {
        setCapSoItem(capSoItem)
    }, [capSoItem]);

    return (
        <div className="detailCapSoContainer" style={{ width: '100%' }}>
            <h1>Quản lý cấp số</h1>
            <div className="thongtinContainer">
                {capSoI.length === 0 ?
                    <LoadingSpinner /> :
                    <Row >
                        <h5 style={{ width: '100%', marginBottom: '15px', fontSize: '20px', fontWeight: '700', color: '#FF7506' }}>Thông tin cấp số</h5>
                        <Col span={11} >
                            <div className="infoField">
                                <span className="tittleInfo">Họ tên: </span>  {capSoI.tenKH}
                            </div>
                            <div className="infoField">
                                <span className="tittleInfo">Tên dịch vụ: </span> {capSoI.tenDV}
                            </div>
                            <div className="infoField">
                                <span className="tittleInfo">Số thứ tự: </span> {capSoI.STT}
                            </div>
                            <div className="infoField">
                                <span className="tittleInfo">Thời gian cấp: </span> {capSoI.thoiGianCap}
                            </div>
                            <div className="infoField">
                                <span className="tittleInfo">Hạn sử dụng: </span> {capSoI.HSD}
                            </div>
                        </Col>

                        <Col span={11}>
                            <div className="infoField">
                                <span className="tittleInfo">Nguồn cấp: </span> {capSoI.nguonCap}
                            </div>
                            <div className="infoField">
                                <span className="tittleInfo">Trạng thái: </span>
                                {
                                    capSoI.trangThai && capSoI.trangThai.id && capSoI.trangThai.value
                                }
                            </div>
                            <div className="infoField">
                                <span className="tittleInfo">Số điện thoại: </span> 0948523623
                            </div>
                            <div className="infoField">
                                <span className="tittleInfo">Địa chỉ Email: </span> nguyendung@gmail.com
                            </div>
                        </Col>
                    </Row>
                }
            </div>

        </div>
    )

}