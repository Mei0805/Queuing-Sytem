import { Card, Col, Row } from 'antd';
export const CardNotify = () => {
    return (
        <Col className='cardNotify'>
            <Card title="Thông báo" bordered={false}>
                <div className="cardContent">
                    <span className='user'>Người dùng: Nguyễn Thị Thùy Dung</span>
                    <p className='time'>Thời gian nhận số: 12h20 ngày 30/11/2021 </p>
                </div>

                <div className="cardContent">
                    <span className='user'>Người dùng: Nguyễn Thị Thùy Dung</span>
                    <p className='time'>Thời gian nhận số: 12h20 ngày 30/11/2021 </p>
                </div>

                <div className="cardContent">
                    <span className='user'>Người dùng: Nguyễn Thị Thùy Dung</span>
                    <p className='time'>Thời gian nhận số: 12h20 ngày 30/11/2021 </p>
                </div>
            </Card>
        </Col>
    )
}