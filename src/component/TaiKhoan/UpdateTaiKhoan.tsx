
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "antd"
import { Select, Form, Input, Checkbox } from "antd"

const { Option } = Select;
const { TextArea } = Input;

export const UpdateTaiKhoan = () => {
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

    const vaiTroList = [
        { id: 1, tenDV: 'Kế toán' },
        { id: 2, tenDV: 'Bác sĩ' },
        { id: 3, tenDV: 'Lễ tân' },
        { id: 4, tenDV: 'Quản lý' },
        { id: 5, tenDV: 'Admin' },
        { id: 6, tenDV: 'SuperAdmin' }
    ]

    return (
        <div className="themThietbiContainer" style={{ width: '100%' }}>
            <h1>Quản lý tài khoản</h1>
            <Row className="formThemContainer" style={{ justifyContent: 'space-between' }}>
                <h5 style={{ width: '100%', fontSize: '20px', fontWeight: '700', color: '#FF7506' }}>Thông tin tài khoản</h5>
                <Col span='11'>
                    <Form layout="vertical" autoComplete="off">
                        <Form.Item label="Họ tên" required>
                            <Input placeholder="Nhập họ tên" />
                        </Form.Item>
                        <Form.Item label="Số điện thoại" required>
                            <Input placeholder="Nhập số điện thoại" />
                        </Form.Item>
                        <Form.Item label="Email" required>
                            <Input placeholder="Nhập email" />
                        </Form.Item>
                        <Form.Item style={{ width: '100%', fontWeight: 'bold', display: 'inline-block', marginInlineEnd: '1rem' }} label="Vai trò" >
                            <Select defaultValue="0" suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                <Option value="0">Chọn vai trò</Option>
                                {vaiTroList.map((vaitroI) => {
                                    return <Option value={vaitroI.id} >{vaitroI.tenDV}</Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span='11'>
                    <Form layout="vertical" autoComplete="off">
                        <Form.Item label="Tên đăng nhập" required>
                            <Input placeholder="Nhập tên đăng nhập" />
                        </Form.Item>
                        <Form.Item label="Mật khẩu" required>
                            <Input placeholder="Nhập mật khẩu" />
                        </Form.Item>
                        <Form.Item label="Nhập lại mật khẩu" required>
                            <Input placeholder="Nhập lại mật khẩu" />
                        </Form.Item>
                        <Form.Item style={{ width: '100%', fontWeight: 'bold', display: 'inline-block', marginInlineEnd: '1rem' }} label="Tình trạng" >
                            <Select defaultValue="1" suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                <Option value="0">Ngưng hoạt động</Option>
                                <Option value="1">Hoạt động</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Col>

                <div style={{ marginTop: '1rem' }}><span style={{ color: 'red' }}>*</span> là trường thông tin bắt buộc</div>

            </Row>
            <Row className="btnGroup" style={{ justifyContent: 'center', margin: '1rem 0', gap: '1rem' }}>
                <Button size='large' onClick={() => navigate('/taikhoan')} className="resetBtn" >Hủy bỏ</Button>
                <Button size='large' type="primary" className="addBtn" >Thêm </Button>
            </Row>

        </div>


    )
}