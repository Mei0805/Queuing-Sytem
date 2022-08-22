
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "antd"
import { Select, Form, Input, Checkbox } from "antd"

const { Option } = Select;
const { TextArea } = Input;

export const ThemDichVu = () => {
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
            <h1>Quản lý dịch vụ</h1>
            <Row className="formThemContainer" style={{ justifyContent: 'space-between' }}>
                <h5 style={{ width: '100%', fontSize: '20px', fontWeight: '700', color: '#FF7506' }}>Thông tin dịch vụ</h5>
                <Col span='11'>
                    <Form form={form} layout="vertical" autoComplete="off">
                        <Form.Item label="Mã dịch vụ" name='mathietbi' rules={[{ required: true, message: 'Hãy nhập mã thiết bị' }]}>
                            <Input defaultValue="" placeholder="Nhập mã dịch vụ" required />
                        </Form.Item>
                        <Form.Item label="Tên dịch vụ:" >
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
                <Col span='11'>
                    <Form layout="vertical" autoComplete="off">
                        <Form.Item label="Mô tả:" >
                            <TextArea placeholder="Mô tả dịch vụ" rows={5} />
                        </Form.Item>
                    </Form>

                </Col>
                <Col span='24'>
                    <h5 style={{ width: '100%', fontSize: '20px', fontWeight: '700', color: '#FF7506' }}>Quy tắc cấp số</h5>
                    <Checkbox.Group style={{ width: '100%' }} className='checkboxCapSo' >
                        <Checkbox value="autoplus"><span className="content">Tăng tự động từ:</span> <Input defaultValue="" style={{width:'61px'}} placeholder="0001" /> đến <Input defaultValue="" style={{width:'61px'}} placeholder="0001" /></Checkbox>
                        <Checkbox value="minus"><span className="content">Prefix:</span> <Input defaultValue="" style={{width:'61px'}} placeholder="0001" /></Checkbox>
                        <Checkbox value="plus"><span className="content">Surfix:</span> <Input defaultValue="" style={{width:'61px'}} placeholder="0001" /></Checkbox>
                        <Checkbox value="0"><span className="content">Reset mỗi ngày</span></Checkbox>
                    </Checkbox.Group>
                </Col>
                <div style={{marginTop:'1rem'}}><span style={{ color: 'red' }}>*</span> là trường thông tin bắt buộc</div>

            </Row>
            <Row className="btnGroup" style={{ justifyContent: 'center', margin: '1rem 0', gap: '1rem' }}>
                <Button size='large' onClick={() => navigate('/dichvu')} className="resetBtn" >Hủy bỏ</Button>
                <Button size='large' type="primary" className="addBtn" >Thêm dịch vụ</Button>
            </Row>

        </div>


    )
}