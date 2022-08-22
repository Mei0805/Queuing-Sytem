
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "antd"
import { Select, Form, Input, Checkbox } from "antd"

const { Option } = Select;
const { TextArea } = Input;

export const UpdateVaiTro = () => {
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
    return (
        <div className="updateVaiTroContainer" style={{ width: '100%' }}>
            <h1>Danh sách vai trò</h1>
            <Row className="formUpdateContainer" style={{ justifyContent: 'space-between' }}>
                <h5 style={{ width: '100%', fontSize: '20px', fontWeight: '700', color: '#FF7506' }}>Thông tin vai trò</h5>
                <Col span='11'>
                    <Form form={form} layout="vertical" autoComplete="off">
                        <Form.Item label="Tên vai trò" name='tenvaitro' rules={[{ required: true, message: 'Hãy nhập mã thiết bị' }]}>
                            <Input defaultValue="Kế toán" placeholder="Nhập tên vai trò" required />
                        </Form.Item>
                        <Form.Item label="Mô tả:" >
                            <TextArea placeholder="Nhập mô tả" rows={5}  defaultValue="Chịu trách nhiệm thống kê số liệu và kiểm toán"/>
                        </Form.Item>
                        <div style={{ marginTop: '1rem' }}><span style={{ color: 'red' }}>*</span> là trường thông tin bắt buộc</div>
                    </Form>
                </Col>
                <Col span='11'>
                    <label>Phân quyền chức năng:</label>
                    <div className="phanquyenChucNang">
                        <h5 style={{ width: '100%', fontSize: '20px', fontWeight: '700', color: '#FF7506' }}>Nhóm chức năng A</h5>
                        <Checkbox.Group style={{ width: '100%' }} className='checkboxPhanQuyen' >
                            <Checkbox value="all"><span className="content">Tất cả </span></Checkbox>
                            <Checkbox value="x"><span className="content">Chức năng x </span> </Checkbox>
                            <Checkbox value="y"><span className="content">Chức năng y </span></Checkbox>
                            <Checkbox value="z"><span className="content">Chức năng z </span></Checkbox>
                        </Checkbox.Group>

                        <h5 style={{ width: '100%', fontSize: '20px', fontWeight: '700', color: '#FF7506' }}>Nhóm chức năng B</h5>
                        <Checkbox.Group style={{ width: '100%' }} className='checkboxPhanQuyen' >
                            <Checkbox value="all"><span className="content">Tất cả </span></Checkbox>
                            <Checkbox value="x"><span className="content">Chức năng x </span> </Checkbox>
                            <Checkbox value="y"><span className="content">Chức năng y </span></Checkbox>
                            <Checkbox value="z"><span className="content">Chức năng z </span></Checkbox>
                        </Checkbox.Group>
                    </div>

                </Col>



            </Row>
            <Row className="btnGroup" style={{ justifyContent: 'center', margin: '1rem 0', gap: '1rem' }}>
                <Button size='large' onClick={() => navigate('/vaitro')} className="resetBtn" >Hủy bỏ</Button>
                <Button size='large' type="primary" className="updateBtn" >Cập nhật </Button>
            </Row>

        </div>


    )
}