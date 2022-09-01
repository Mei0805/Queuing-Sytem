
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Button } from "antd"
import { Select, Form, Input, Checkbox } from "antd"

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getDichVuItem } from "../../redux/actionCreator/actionDichVu";
import { State } from "../../redux/reducers";
import { dichvuCreator, nhatkyCreator } from "../../redux";
import { LoadingSpinner } from "../Loading";

const { TextArea } = Input;
const { Option } = Select;

export const UpdateDichVu = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const [dichVuUpdate, setDichVuUpdate] = useState<any | undefined>()
    const [dichVu, setDichVuItem] = useState<any>([]);
    const { dichVuItem } = useSelector((state: State) => state.dichvu)
    const { actionUpdateDichVu } = bindActionCreators(dichvuCreator, dispatch);

    const { actionLoadNhatKy, actionAddNhatKy } = bindActionCreators(nhatkyCreator, dispatch);
    const { listNhatKy } = useSelector((state: State) => state.nhatky);
    const { userLogin } = useSelector((state: State) => state.taikhoan);

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

    // const handleChange = (value: string | string[]) => {
    //     console.log(`Selected: ${value}`);
    // };

    useEffect(() => {
        if (id && id !== "") dispatch<any>(getDichVuItem(id))
    }, [id]);

    useEffect(() => {
        setDichVuItem(dichVuItem)
        actionLoadNhatKy()
    }, [dichVuItem]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setDichVuUpdate((prev: any) => ({
            ...prev,
            [name]: value
        }));
        console.log('Thông tin update:', dichVuUpdate)
    }

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
        const action = 'Cập nhật Dịch vụ ' + actionValue;
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
        if (dichVuUpdate && dichVuUpdate !== "null" && dichVuUpdate !== "undefined") {
            actionUpdateDichVu(dichVuUpdate, id)
            handleAction(dichVu.maDichVu && dichVu.maDichVu)
            console.log('Thông tin update:', dichVuUpdate);
        } else {
            alert('Không cập nhật gì');
            window.location.replace('/dichvu');
        }

        return;
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="themThietbiContainer" style={{ width: '100%' }}>
            <h1>Quản lý dịch vụ</h1>
            {dichVu.length === 0 ?
                <LoadingSpinner />
                :
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row className="formThemContainer" style={{ justifyContent: 'space-between' }}>
                        <h5 style={{ width: '100%', fontSize: '20px', fontWeight: '700', color: '#FF7506' }}>Thông tin dịch vụ</h5>
                        <Col span='11'>
                            <Form.Item
                                label="Mã dịch vụ"
                            >
                                <Input
                                    defaultValue={dichVu.maDichVu}
                                    name='maDichVu'
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            <Form.Item label="Tên dịch vụ:" >
                                <Input
                                    defaultValue={dichVu.tenDichVu}
                                    name='tenDichVu'
                                    onChange={handleChange}
                                />
                            </Form.Item>

                        </Col>
                        <Col span='11'>
                            <Form.Item
                                label="Mô tả:" >
                                <TextArea
                                    rows={5}
                                    name='moTa'
                                    onChange={handleChange}
                                    defaultValue={dichVu.moTa} />
                            </Form.Item>

                        </Col>
                        <Col span='24'>
                            <h5 style={{ width: '100%', fontSize: '20px', fontWeight: '700', color: '#FF7506' }}>Quy tắc cấp số</h5>
                            <Checkbox.Group style={{ width: '100%' }} className='checkboxCapSo' >
                                <Checkbox value="autoplus"><span className="content">Tăng tự động từ:</span>
                                    <Input defaultValue="0001" style={{ width: '61px' }} placeholder="0001" />
                                    &nbsp; đến &nbsp;
                                    <Input defaultValue="9999" style={{ width: '61px' }} placeholder="0001" />
                                </Checkbox>

                                <Checkbox value="minus"><span className="content">Prefix:</span> <Input defaultValue="0001" style={{ width: '61px' }} placeholder="0001" /></Checkbox>
                                <Checkbox value="plus"><span className="content">Surfix:</span> <Input defaultValue="0001" style={{ width: '61px' }} placeholder="0001" /></Checkbox>
                                <Checkbox value="0"><span className="content">Reset mỗi ngày</span></Checkbox>
                            </Checkbox.Group>
                        </Col>
                        <div style={{ marginTop: '1rem' }}><span style={{ color: 'red' }}>*</span> là trường thông tin bắt buộc</div>

                    </Row>
                    <Row className="btnGroup" style={{ justifyContent: 'center', margin: '1rem 0', gap: '1rem' }}>
                        <Button size='large' onClick={() => navigate('/dichvu')} className="resetBtn" >Hủy bỏ</Button>
                        <Button size='large' type="primary" htmlType="submit" className="addBtn" >Cập nhật</Button>
                    </Row>
                </Form>
            }
        </div>


    )
}