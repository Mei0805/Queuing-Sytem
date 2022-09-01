import { Row, Col, Button } from "antd"
import { Select, Form, Input } from "antd"
import { LoadingSpinner } from "../Loading";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getThietBiItem } from "../../redux/actionCreator/actionThietBi";
import { State } from "../../redux/reducers";
import { nhatkyCreator, thietbiCreator } from "../../redux";



const { Option } = Select;

export const UpdateThietBi = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [size, setSize] = useState();

    const [thietbiI, setThietBiItem] = useState<any>([]);
    const [thietbiUpdate, setThietBiUpdate] = useState<any | undefined>()
    const [dichVuSelect, setdichVuSelect] = useState<any | undefined>()
    const { thietBiItem } = useSelector((state: State) => state.thietbi)
    const { actionUpdateThietBi } = bindActionCreators(thietbiCreator, dispatch);

    const { actionLoadNhatKy, actionAddNhatKy } = bindActionCreators(nhatkyCreator, dispatch);
    const { listNhatKy } = useSelector((state: State) => state.nhatky);
    const { userLogin } = useSelector((state: State) => state.taikhoan);
    console.log(thietBiItem);

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
            <Option key={index} >{optionI}</Option>
        )
    })

    useEffect(() => {
        if (id && id !== "") dispatch<any>(getThietBiItem(id))
    }, [id]);

    useEffect(() => {
        setThietBiItem(thietBiItem)
        actionLoadNhatKy()
        console.log('Thiết bị update:', thietbiI)
    }, [thietBiItem]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setThietBiUpdate((prev: any) => ({
            ...prev,
            [name]: value
        }));
        console.log('Thông tin update:', thietbiUpdate)
    }
    const handleChangeSl = (e: any) => {
        setdichVuSelect(e)
        console.log('Thông tin update select:', dichVuSelect)
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
        const action = 'Cập nhật Thiết bị ' + actionValue;
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
        if (thietbiUpdate && thietbiUpdate !== "null" && thietbiUpdate !== "undefined") {
            actionUpdateThietBi(thietbiUpdate, id)
            handleAction(thietbiI.maThietBi && thietbiI.maThietBi)
            console.log('Thông tin update:', thietbiUpdate);
        } else {
            alert('Không cập nhật gì !');
            navigate('/thietbi');
        }
        return;
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="updateThietbiContainer" style={{ width: '100%' }}>
            <h1>Quản lý thiết bị</h1>
            {thietbiI.length === 0 ?
                <LoadingSpinner />
                :
                <Form
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row className="formUpdateContainer" style={{ justifyContent: 'space-between' }}>
                        <h5 style={{ width: '100%', fontSize: '20px', fontWeight: '700', color: '#FF7506' }}>Thông tin thiết bị</h5>
                        <Col span='11'>

                            <Form.Item
                                label="Mã thiết bị"
                                name='maThietBi'
                            >
                                <Input
                                    defaultValue={thietbiI.maThietBi}
                                    placeholder="Nhập mã thiết bị"
                                    name="maThietBi" onChange={handleChange} />
                            </Form.Item>

                            <Form.Item
                                label="Tên thiết bị"
                                name='tenThietBi'
                            >
                                <Input
                                    defaultValue={thietbiI.tenThietBi}
                                    placeholder="Nhập tên thiết bị"
                                    name="tenThietBi" onChange={handleChange}
                                />
                            </Form.Item>
                            <Form.Item label="Địa chỉ IP" name='diaChiIP'  >
                                <Input
                                    defaultValue={thietbiI.diaChiIP}
                                    placeholder="Nhập địa chỉ IP"
                                    name="diaChiIP" onChange={handleChange}
                                />
                            </Form.Item>

                        </Col>
                        <Col span='11'>
                            <Form.Item
                                label="Loại thiết bị"
                                name='loaithietbi'  >
                                <Select
                                    defaultValue="1"
                                    suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                    <Option value="1">Kiosk</Option>
                                    <Option value="2">Display counter</Option></Select>
                            </Form.Item>
                            <Form.Item label="Tên đăng nhập:" >
                                <Input defaultValue="Linhkyo011" placeholder="Nhập tài khoản" />
                            </Form.Item>
                            <Form.Item label="Mật khẩu:" >
                                <Input defaultValue='CMS' placeholder="Nhập địa chỉ IP" />
                            </Form.Item>

                        </Col>
                        <Col span='24'>

                            <Form.Item name='dichVu' label="Dịch vụ sử dụng:" >
                                <Select
                                    mode="multiple"
                                    size={size}
                                    placeholder="Please select"
                                    defaultValue={thietbiI.dichVu}
                                    style={{ width: '100%' }}
                                    className='dichvuSelect'
                                    onChange={handleChangeSl}
                                >
                                    {optionSelect}
                                </Select>
                            </Form.Item>
                        </Col>
                        <div><span style={{ color: 'red' }}>*</span> là trường thông tin bắt buộc</div>

                    </Row>
                    <Row className="btnGroup" style={{ justifyContent: 'center', margin: '1rem 0', gap: '1rem' }}>
                        <Button size='large' onClick={() => navigate('/thietbi')} className="resetBtn" >Hủy bỏ</Button>
                        <Button size='large' type="primary" htmlType="submit" className="addBtn" >Cập nhật</Button>
                    </Row>
                </Form>
            }

        </div >
    )

}