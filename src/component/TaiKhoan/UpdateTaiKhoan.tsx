
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Button } from "antd"
import { Select, Form, Input } from "antd"

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getTaiKhoanItem } from "../../redux/actionCreator/actionTaiKhoan";
import { State } from "../../redux/reducers";
import { nhatkyCreator, taikhoanCreator } from "../../redux";

const { Option } = Select;

export const UpdateTaiKhoan = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [taiKhoanUpdate, settaiKhoanUpdate] = useState<any | undefined>()
    const [taiKhoan, setTaiKhoanItem] = useState<any>([]);
    const { taiKhoanItem } = useSelector((state: State) => state.taikhoan)
    const { actionUpdateTaiKhoan } = bindActionCreators(taikhoanCreator, dispatch);
   
    const { actionLoadNhatKy, actionAddNhatKy } = bindActionCreators(nhatkyCreator, dispatch);
    const { listNhatKy } = useSelector((state: State) => state.nhatky);
    const { userLogin } = useSelector((state: State) => state.taikhoan);

    const vaiTroList = [
        { id: 1, value: 'Kế toán' },
        { id: 2, value: 'Bác sĩ' },
        { id: 3, value: 'Lễ tân' },
        { id: 4, value: 'Quản lý' },
        { id: 5, value: 'Admin' },
        { id: 6, value: 'SuperAdmin' }
    ]

    useEffect(() => {
        if (id && id !== "") dispatch<any>(getTaiKhoanItem(id))
    }, [id]);

    useEffect(() => {
        setTaiKhoanItem(taiKhoanItem)
    }, [taiKhoanItem]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        settaiKhoanUpdate((prev: any) => ({
            ...prev,
            [name]: value
        }));
        console.log('Thông tin update:', taiKhoanUpdate)
    }
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
        const action = 'Cập nhật Tài khoản ' + actionValue;
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
        if (taiKhoanUpdate && taiKhoanUpdate !== "null" && taiKhoanUpdate !== "undefined") {
            actionUpdateTaiKhoan(taiKhoanUpdate, id)
            handleAction(taiKhoanUpdate.tenDangNhap && taiKhoanUpdate.tenDangNhap )
            console.log('Thông tin update:', taiKhoanUpdate);
        } else {
            alert('Không cập nhật gì');
            window.location.replace('/taikhoan');
        }

        return;
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className="updateTaiKhoanContainer" style={{ width: '100%' }}>
            <h1>Quản lý tài khoản</h1>
            {taiKhoan.length === 0 ?
                'Load...'
                :
                <Form
                    layout="vertical"
                    className="formUpdateContainer"
                    autoComplete="off"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row className="infoField" style={{ justifyContent: 'space-between' }}>
                        <h5 style={{ width: '100%', fontSize: '20px', fontWeight: '700', color: '#FF7506' }}>Thông tin tài khoản</h5>
                        <Col span='11'>
                            <Form.Item
                                label="Họ tên"
                                name="hoTen" required>
                                <Input
                                    placeholder="Nhập họ tên"
                                    defaultValue={taiKhoan.hoTen}
                                    name="hoTen" onChange={handleChange}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Số điện thoại"
                                name="sdt" required>
                                <Input placeholder="Nhập số điện thoại"
                                    defaultValue={taiKhoan.sdt}
                                    name="sdt" onChange={handleChange} />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email" required>
                                <Input placeholder="Nhập email"
                                    defaultValue={taiKhoan.email}
                                    name="email" onChange={handleChange} />
                            </Form.Item>

                            <Form.Item name="vaiTro" style={{ width: '100%', fontWeight: 'bold', display: 'inline-block', marginInlineEnd: '1rem' }} label="Vai trò" >
                                <Select defaultValue={taiKhoan.vaiTro.id}
                                    suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                    <Option value="0">Chọn vai trò</Option>
                                    {vaiTroList.map((vaitroI) => {
                                        return <Option value={vaitroI.id}  >{vaitroI.value}</Option>
                                    })}
                                </Select>
                            </Form.Item>

                        </Col>
                        <Col span='11'>
                            <Form.Item label="Tên đăng nhập" name='tenDangNhap' required>
                                <Input placeholder="Nhập tên đăng nhập"
                                    defaultValue={taiKhoan.tenDangNhap}
                                    name="tenDangNhap" onChange={handleChange} />
                            </Form.Item>

                            <Form.Item label="Mật khẩu" name='matKhau' required>
                                <Input placeholder="Nhập mật khẩu"
                                    type='password' defaultValue={taiKhoan.matKhau}
                                    name="matKhau" onChange={handleChange}
                                />
                            </Form.Item>

                            <Form.Item label="Nhập lại mật khẩu" required>
                                <Input placeholder="Nhập lại mật khẩu" />
                            </Form.Item>

                            <Form.Item name="activeStatus" style={{ width: '100%', fontWeight: 'bold', display: 'inline-block', marginInlineEnd: '1rem' }} label="Tình trạng" >
                                <Select defaultValue={(taiKhoan.trangThaiHD === true ? '1' : '0')} suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                    <Option value="0">Ngưng hoạt động</Option>
                                    <Option value="1">Hoạt động</Option>
                                </Select>
                            </Form.Item>

                        </Col>

                        <div style={{ marginTop: '1rem' }}><span style={{ color: 'red' }}>*</span> là trường thông tin bắt buộc</div>

                    </Row>
                    <Row className="btnGroup" style={{ justifyContent: 'center', margin: '1rem 0', gap: '1rem' }}>
                        <Button size='large' onClick={() => navigate('/taikhoan')} className="resetBtn" >Hủy bỏ</Button>
                        <Button size='large' type="primary" htmlType="submit" className="addBtn" >Cập nhật </Button>
                    </Row>
                </Form>}
        </div>


    )
}