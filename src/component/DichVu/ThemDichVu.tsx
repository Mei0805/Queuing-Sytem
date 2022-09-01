
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "antd"
import { Select, Form, Input, Checkbox } from "antd"
import { dichvuCreator, nhatkyCreator } from "../../redux";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../redux/reducers";

const { TextArea } = Input;

export const ThemDichVu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [thietBiSelect, setThietBiSelect] = useState<any | undefined>([]);

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

    const { actionLoadDichVu, actionAddDichVu } = bindActionCreators(dichvuCreator, dispatch);
    const { listDichVu } = useSelector((state: State) => state.dichvu)
    const { actionLoadNhatKy, actionAddNhatKy } = bindActionCreators(nhatkyCreator, dispatch);
    const { listNhatKy } = useSelector((state: State) => state.nhatky);
    const { userLogin } = useSelector((state: State) => state.taikhoan);

    const handleChange = (value: string | string[]) => {
        setThietBiSelect(value);
    };

    const handleAction = (actionValue:any) => {
        function zeroPad(num: any, places: any) {
            var zero = places - num.toString().length + 1;
            return Array(+(zero > 0 && zero)).join("0") + num;
        }
        let len = listNhatKy.length;
        let STT = len++;
        var date = new Date();
        var d = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        var time = date.getHours() + ":" + date.getMinutes();
        var dateTime = time + ' - ' + d;
        const action = 'Thêm Dịch vụ ' + actionValue;
        let item = {
            STT: zeroPad(STT, 6),
            tenDangNhap: userLogin[0].hoTen,
            thoiGianTacDong: dateTime,
            diaChiIP: "192.168.3.1",
            thaoTac: action
        }
        actionAddNhatKy(item)
    }
    
    const onFinish = (e: any) => {
        let STT = listDichVu.length + 1;
        let maDichVu = e.maDichVu;
        let tenDichVu = e.tenDichVu;
        let moTa = e.moTa;

        if (STT && maDichVu && tenDichVu && moTa) {
            let item = {
                STT: STT,
                maDichVu: maDichVu,
                tenDichVu: tenDichVu,
                trangThaiHD: true,
                moTa:moTa
            }
            actionAddDichVu(item)
            handleAction(maDichVu)
            console.log('Success:', item);

        } else alert('Chưa nhập đủ thông tin')
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        actionLoadDichVu();
        actionLoadNhatKy();
    }, [])

    return (
        <div className="themThietbiContainer" style={{ width: '100%' }}>
            <h1>Quản lý dịch vụ</h1>
            <Form
                layout="vertical"
                autoComplete="off"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row className="formThemContainer" style={{ justifyContent: 'space-between' }}>
                    <h5 style={{ width: '100%', fontSize: '20px', fontWeight: '700', color: '#FF7506' }}>Thông tin dịch vụ</h5>
                    <Col span='11'>

                        <Form.Item
                            label="Mã dịch vụ"
                            name='maDichVu'
                            rules={[{ required: true, message: 'Hãy nhập mã thiết bị' }]}>
                            <Input defaultValue="" placeholder="Nhập mã dịch vụ" required />
                        </Form.Item>
                        <Form.Item name='tenDichVu' label="Tên dịch vụ:" >
                            <Input defaultValue="" placeholder="Nhập tên dịch vụ" required />
                        </Form.Item>

                    </Col>
                    <Col span='11'>
                        <Form.Item name='moTa' label="Mô tả:" >
                            <TextArea name='moTa' placeholder="Mô tả dịch vụ" rows={5} />
                        </Form.Item>

                    </Col>
                    <Col span='24'>
                        <h5 style={{ width: '100%', fontSize: '20px', fontWeight: '700', color: '#FF7506' }}>Quy tắc cấp số</h5>
                        <Checkbox.Group style={{ width: '100%' }} className='checkboxCapSo' >
                            <Checkbox value="autoplus"><span className="content">Tăng tự động từ:</span> <Input defaultValue="" style={{ width: '61px' }} placeholder="0001" /> đến <Input defaultValue="" style={{ width: '61px' }} placeholder="0001" /></Checkbox>
                            <Checkbox value="minus"><span className="content">Prefix:</span> <Input defaultValue="" style={{ width: '61px' }} placeholder="0001" /></Checkbox>
                            <Checkbox value="plus"><span className="content">Surfix:</span> <Input defaultValue="" style={{ width: '61px' }} placeholder="0001" /></Checkbox>
                            <Checkbox value="0"><span className="content">Reset mỗi ngày</span></Checkbox>
                        </Checkbox.Group>
                    </Col>
                    <div style={{ marginTop: '1rem' }}><span style={{ color: 'red' }}>*</span> là trường thông tin bắt buộc</div>

                </Row>
                <Row className="btnGroup" style={{ justifyContent: 'center', margin: '1rem 0', gap: '1rem' }}>
                    <Button size='large' onClick={() => navigate('/dichvu')} className="resetBtn" >Hủy bỏ</Button>
                    <Button size='large' type="primary" htmlType="submit" className="addBtn" >Thêm dịch vụ</Button>
                </Row>
            </Form>

        </div >


    )
}