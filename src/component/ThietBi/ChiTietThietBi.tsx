import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { Col, Row } from "antd"

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getThietBiItem } from "../../redux/actionCreator/actionThietBi";
import { State } from "../../redux/reducers";
import { thietbiCreator } from "../../redux";

export const ChiTietThietBi = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [thietBiI, setThietBiItem] = useState<any>([]);
    const { thietBiItem } = useSelector((state: State) => state.thietbi)
    // const { getThietBiItem } = bindActionCreators(thietbiCreator, dispatch);

    useEffect(() => {
        if (id && id !== "") dispatch<any>(getThietBiItem(id))
    }, [id]);

    useEffect(() => {
        setThietBiItem(thietBiItem)
    }, [thietBiItem]);


    return (
        <div className="detailThietbiContainer" style={{ width: '100%' }}>
            <h1>Quản lý thiết bị</h1>
            <div className="thongtinContainer">
                {thietBiI ?
                    <Row >
                        <h5 style={{ width: '100%', marginBottom: '15px', fontSize: '20px', fontWeight: '700', color: '#FF7506' }}>Thông tin thiết bị</h5>
                        <Col span={11} >
                            <div className="infoField">
                                <span className="tittleInfo">Mã thiết bị: </span>  {thietBiI.maThietBi}
                            </div>
                            <div className="infoField">
                                <span className="tittleInfo">Tên thiết bị: </span> {thietBiI.tenThietBi}
                            </div>
                            <div className="infoField">
                                <span className="tittleInfo">Địa chỉ IP: </span> {thietBiI.diaChiIP}
                            </div>
                        </Col>

                        <Col span={11}>
                            <div className="infoField">
                                <span className="tittleInfo">Loại thiết bị: </span> Kiosk
                            </div>
                            <div className="infoField">
                                <span className="tittleInfo">Tên đăng nhập: </span> Linhkyo011
                            </div>
                            <div className="infoField">
                                <span className="tittleInfo">Mật khẩu: </span> CMS
                            </div>
                        </Col>
                        <div>
                            <b>Dịch vụ sử dụng</b>
                            <p>
                                {thietBiI.dichVu}
                            </p>
                        </div>
                    </Row>
                    : 'loading ...'
                }
            </div>

        </div>
    )

}