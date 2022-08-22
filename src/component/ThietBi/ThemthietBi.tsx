
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "antd"
import { Select, Form, Input } from "antd"

const { Option } = Select;

export const ThemThietBi = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [size, setSize] = useState();
    const { Option } = Select;
    const children: any = [
        'Khám tim mạch',
        'Khám sản phụ khoa',
        'Khám răng hàm mặt',
        'Khám tai mũi họng',
        'Khám hô hấp',
        'Khám tổng quát'];
    const optionSelect: any = []

    children.map((optionI: string, index: number) => {
        return optionSelect.push(
            <Option key={index}>{optionI}</Option>
        )
    })

    const handleChange = (value: string | string[]) => {
        console.log(`Selected: ${value}`);
    };
    return (
        <div className="themThietbiContainer" style={{ width: '100%' }}>
            <h1>Quản lý thiết bị</h1>
            <Row className="formThemContainer" style={{ justifyContent: 'space-between' }}>
                <h5 style={{ width: '100%', fontSize: '20px', fontWeight: '700', color: '#FF7506' }}>Thông tin thiết bị</h5>
                <Col span='11'>
                    <Form form={form} layout="vertical" autoComplete="off">
                        <Form.Item label="Mã thiết bị" name='mathietbi' rules={[{ required: true, message: 'Hãy nhập mã thiết bị' }]}>
                            <Input defaultValue="" placeholder="Nhập mã thiết bị" required />
                        </Form.Item>
                        <Form.Item label="Tên thiết bị" name='tenthietbi' rules={[{ required: true, message: 'Hãy nhập tên thiết bị' }]}>
                            <Input defaultValue="" placeholder="Nhập tên thiết bị" />
                        </Form.Item>
                        <Form.Item label="Địa chỉ IP" name='diachiIP' rules={[{ required: true, message: 'Hãy nhập địa chỉ IP' }]} >
                            <Input placeholder="Nhập địa chỉ IP" />
                        </Form.Item>
                    </Form>
                </Col>
                <Col span='11'>
                    <Form layout="vertical" autoComplete="off">
                        <Form.Item style={{}} label="Loại thiết bị" name='loaithietbi' rules={[{ required: true, message: 'Hãy chọn loại thiết bị' }]} >
                            <Select defaultValue="all" suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                <Option value="all">Tất cả</Option>
                                <Option value="connect">Kết nối</Option>
                                <Option value="disconnect">Mất kết nối</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Tên đăng nhập:" >
                            <Input defaultValue="" placeholder="Nhập tài khoản" />
                        </Form.Item>
                        <Form.Item label="Mật khẩu:" >
                            <Input placeholder="Nhập địa chỉ IP" />
                        </Form.Item>
                    </Form>

                </Col>
                <Col span='24'>
                    <Form form={form} layout="vertical" autoComplete="off">
                        <Form.Item label="Dịch vụ sử dụng:" >
                            <Select
                                mode="multiple"
                                size={size}
                                placeholder="Chọn dịch vụ ..."
                                onChange={handleChange}
                                style={{ width: '100%' }}
                                className='dichvuSelect'
                            >
                                {optionSelect}
                            </Select>
                        </Form.Item>
                    </Form>
                </Col>
                <div><span style={{ color: 'red' }}>*</span> là trường thông tin bắt buộc</div>

            </Row>
            <Row className="btnGroup" style={{ justifyContent: 'center', margin: '1rem 0', gap: '1rem' }}>
                <Button size='large' onClick={() => {
                    navigate('/thietbi');
                }} className="resetBtn" >Hủy bỏ</Button>
                <Button size='large' type="primary" className="addBtn" >Thêm thiết bị</Button>
            </Row>

        </div>


    )
}