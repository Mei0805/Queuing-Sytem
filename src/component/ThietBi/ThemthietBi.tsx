
import { useState } from "react";
import { Row, Col, Button } from "antd"
import { Select, Form, Input } from "antd"
import { nhatkyCreator, thietbiCreator } from "../../redux";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taikhoanCreator } from "../../redux";
import { bindActionCreators } from "redux";
import { State } from "../../redux/reducers";

export const ThemThietBi = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [thietBiSelect, setThietBiSelect] = useState<any | undefined>([]);

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
            <Option key={index} value={optionI}>{optionI}</Option>
        )
    })

    const { actionLoadThietBi, actionAddThietBi } = bindActionCreators(thietbiCreator, dispatch);
    const { listThietBi } = useSelector((state: State) => state.thietbi)

    const { actionLoadNhatKy, actionAddNhatKy } = bindActionCreators(nhatkyCreator, dispatch);
    const { listNhatKy } = useSelector((state: State) => state.nhatky);
    const { userLogin } = useSelector((state: State) => state.taikhoan);

    const handleChange = (value: string | string[]) => {
        setThietBiSelect(value)
    };

    const handleAction = (actionValue: any) => {
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
        const action = 'Thêm Thiết bị ' + actionValue;
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
        let STT = listThietBi.length + 1;
        let diaChiIP = e.diaChiIP;
        let maThietBi = e.maThietBi;
        let tenThietBi = e.tenThietBi;

        if (STT && diaChiIP && maThietBi && tenThietBi) {
            let item = {
                STT: STT,
                diaChiIP: diaChiIP,
                maThietBi: maThietBi,
                tenThietBi: tenThietBi,
                trangThaiHD: true,
                trangThaiKN: true,
                dichVu: thietBiSelect,
            }
            actionAddThietBi(item)
            handleAction(maThietBi)
            console.log('Success:', item);

        } else alert('Chưa nhập đủ thông tin')
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        actionLoadThietBi();
        actionLoadNhatKy()
    }, [])
    return (
        <div className="themThietbiContainer" style={{ width: '100%' }}>
            <h1>Quản lý thiết bị</h1>
            <Form
                layout="vertical"
                autoComplete="off"
                className='themThietBi'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>

                <Row className="formThemContainer" style={{ justifyContent: 'space-between' }}>
                    <h5 style={{ width: '100%', fontSize: '20px', fontWeight: '700', color: '#FF7506' }}>Thông tin thiết bị</h5>
                    <Col span='11'>
                        <Form.Item
                            label="Mã thiết bị"
                            name='maThietBi'
                            rules={[{ required: true, message: 'Hãy nhập mã thiết bị' }]}>
                            <Input defaultValue="" placeholder="Nhập mã thiết bị" required />
                        </Form.Item>
                        <Form.Item
                            label="Tên thiết bị"
                            name='tenThietBi'
                            rules={[{ required: true, message: 'Hãy nhập tên thiết bị' }]}>
                            <Input defaultValue="" placeholder="Nhập tên thiết bị" />
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ IP"
                            name='diaChiIP'
                            rules={[{ required: true, message: 'Hãy nhập địa chỉ IP' }]} >
                            <Input placeholder="Nhập địa chỉ IP" />
                        </Form.Item>
                    </Col>
                    <Col span='11'>
                        <Form.Item style={{}} label="Loại thiết bị" name='loaithietbi' rules={[{ required: true, message: 'Hãy chọn loại thiết bị' }]} >
                            <Select defaultValue="0" suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                <Option value="0">Chọn loại thiết bị</Option>
                                <Option value="1">Kiosk</Option>
                                <Option value="2">Display counter</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Tên đăng nhập:" >
                            <Input defaultValue=" Linhkyo011" placeholder="Nhập tài khoản" />
                        </Form.Item>
                        <Form.Item label="Mật khẩu:" >
                            <Input type='password' placeholder="Nhập địa chỉ IP" defaultValue="123456" />
                        </Form.Item>
                    </Col>
                    <Col span='24'>
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
                    </Col>
                    <div><span style={{ color: 'red' }}>*</span> là trường thông tin bắt buộc</div>

                </Row>
                <Row className="btnGroup" style={{ justifyContent: 'center', margin: '1rem 0', gap: '1rem' }}>
                    <Button size='large' onClick={() => {
                        navigate('/thietbi');
                    }} className="resetBtn" >Hủy bỏ</Button>
                    <Button size='large' type="primary" htmlType="submit" className="addBtn" >Thêm thiết bị</Button>
                </Row>
            </Form>
        </div>


    )
}