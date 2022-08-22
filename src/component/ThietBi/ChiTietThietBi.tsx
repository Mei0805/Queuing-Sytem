import { Col, Row } from "antd"


export const ChiTietThietBi = () => {
    return (
        <div className="detailThietbiContainer" style={{ width: '100%' }}>
            <h1>Quản lý thiết bị</h1>
            <div className="thongtinContainer">
                <Row >
                    <h5 style={{ width: '100%', marginBottom:'15px', fontSize: '20px', fontWeight: '700', color: '#FF7506' }}>Thông tin thiết bị</h5>
                    <Col span={11} >
                        <div className="infoField">
                            <span className="tittleInfo">Mã thiết bị: </span>  KIO_01
                        </div>
                        <div className="infoField">
                            <span className="tittleInfo">Tên thiết bị: </span> Kiosk
                        </div>
                        <div className="infoField">
                            <span className="tittleInfo">Địa chỉ IP: </span> 128.172.308
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
                        <p>Khám tim mạch, Khám sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát.</p>
                    </div>
                </Row>
            </div>

        </div>
    )

}