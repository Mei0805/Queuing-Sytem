import { Col, Row } from "antd"


export const ChiTietCapSo = () => {
    return (
        <div className="detailCapSoContainer" style={{ width: '100%' }}>
            <h1>Quản lý cấp số</h1>
            <div className="thongtinContainer">
                <Row >
                    <h5 style={{ width: '100%', marginBottom:'15px', fontSize: '20px', fontWeight: '700', color: '#FF7506' }}>Thông tin cấp số</h5>
                    <Col span={11} >
                        <div className="infoField">
                            <span className="tittleInfo">Họ tên: </span>  Nguyễn Thị Dung
                        </div>
                        <div className="infoField">
                            <span className="tittleInfo">Tên dịch vụ:: </span> Khám tim mạch
                        </div>
                        <div className="infoField">
                            <span className="tittleInfo">Số thứ tự: </span> 2001201
                        </div>
                        <div className="infoField">
                            <span className="tittleInfo">Thời gian cấp: </span> 14:35 - 07/11/2021
                        </div>
                        <div className="infoField">
                            <span className="tittleInfo">Hạn sử dụng: </span> 18:00 - 07/11/2021
                        </div>
                    </Col>

                    <Col span={11}>
                        <div className="infoField">
                            <span className="tittleInfo">Nguồn cấp: </span> Kiosk
                        </div>
                        <div className="infoField">
                            <span className="tittleInfo">Trạng thái: </span> Đang chờ
                        </div>
                        <div className="infoField">
                            <span className="tittleInfo">Số điện thoại: </span> 0948523623
                        </div>
                        <div className="infoField">
                            <span className="tittleInfo">Địa chỉ Email: </span> nguyendung@gmail.com
                        </div>
                    </Col>
                </Row>
            </div>

        </div>
    )

}