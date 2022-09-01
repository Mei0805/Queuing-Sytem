import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nhatkyCreator, taikhoanCreator } from "../../redux";
import { bindActionCreators } from "redux";
import { State } from "../../redux/reducers";

import { Row, Col, Button } from "antd"
import { Select, Form, Input } from "antd"

export const ThemTaiKhoan = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Option } = Select;
    const vaiTroList = [
        { id: 1, value: 'Kế toán' },
        { id: 2, value: 'Bác sĩ' },
        { id: 3, value: 'Lễ tân' },
        { id: 4, value: 'Quản lý' },
        { id: 5, value: 'Admin' },
        { id: 6, value: 'SuperAdmin' }
    ]
    const { actionLoadTaiKhoan, actionAddTaiKhoan } = bindActionCreators(taikhoanCreator, dispatch);
    const { listTaiKhoan } = useSelector((state: State) => state.taikhoan);
    
    const { actionLoadNhatKy, actionAddNhatKy } = bindActionCreators(nhatkyCreator, dispatch);
    const { listNhatKy } = useSelector((state: State) => state.nhatky);
    const { userLogin } = useSelector((state: State) => state.taikhoan);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        actionLoadTaiKhoan();
        actionLoadNhatKy()
    }, [])

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
        const action = 'Thêm Tài khoản ' + actionValue;
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
        let STT = listTaiKhoan.length + 1;

        let vaiTroTarget = e.vaiTro
        const vaiTro = vaiTroList.filter((vaitroI) => vaitroI.id === vaiTroTarget)

        let hoTen = e.hoTen;
        let sdt = e.sdt;
        let email = e.email;
        let tenDangNhap = e.tenDangNhap;
        let matKhau = e.matKhau;
        let activeStatus = (Number(e.activeStatus) === 0) ? false : true;
        console.log('Info:', hoTen, sdt, email, vaiTro, tenDangNhap, matKhau, activeStatus);

        if (STT && hoTen && sdt && email && vaiTro && tenDangNhap && matKhau) {
            let item = {
                STT: STT,
                hoTen: hoTen,
                sdt: sdt,
                email: email,
                vaiTro: vaiTro[0],
                tenDangNhap: tenDangNhap,
                matKhau: matKhau,
                trangThaiHD: activeStatus,
            }
            actionAddTaiKhoan(item)
            handleAction(vaiTro[0].value);
            console.log('Success:', hoTen, sdt, email, vaiTro, tenDangNhap, matKhau, activeStatus);
        } else alert('Chưa nhập đủ thông tin')
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className="themTaikhoanContainer" style={{ width: '100%' }}>
            <h1>Quản lý tài khoản</h1>
            <Form
                style={{ width: '100%' }}
                layout="vertical"
                autoComplete="off"
                className='themTaiKhoan'
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row className="formThemContainer" >
                    <h5 style={{ width: '100%', fontSize: '20px', fontWeight: '700', color: '#FF7506' }}>Thông tin tài khoản</h5>

                    <Row style={{ width: '100%', justifyContent: 'space-between' }}>
                        <Col span='11'>
                            <Form.Item
                                label="Họ tên"
                                name="hoTen"
                                rules={[{ required: true, message: 'Không để trống họ tên' }]}
                                required>
                                <Input placeholder="Nhập họ tên" />
                            </Form.Item>
                            <Form.Item
                                label="Số điện thoại"
                                name="sdt"
                                rules={[{ required: true, message: 'Không để trống số điện thoại' }]}
                                required>
                                <Input placeholder="Nhập số điện thoại" />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Không để trống email' }]}
                                required>
                                <Input placeholder="Nhập email" />
                            </Form.Item>
                            <Form.Item name="vaiTro" style={{ width: '100%', fontWeight: 'bold', display: 'inline-block', marginInlineEnd: '1rem' }} label="Vai trò" >
                                <Select defaultValue="0" suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                    <Option value="0">Chọn vai trò</Option>
                                    {vaiTroList.map((vaitroI) => {
                                        return <Option key={vaitroI.id} value={vaitroI.id} >{vaitroI.value}</Option>
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span='11'>
                            <Form.Item label="Tên đăng nhập" name='tenDangNhap' required>
                                <Input placeholder="Nhập tên đăng nhập" />
                            </Form.Item>
                            <Form.Item label="Mật khẩu" name='matKhau' required>
                                <Input placeholder="Nhập mật khẩu" />
                            </Form.Item>
                            <Form.Item label="Nhập lại mật khẩu" required>
                                <Input placeholder="Nhập lại mật khẩu" />
                            </Form.Item>
                            <Form.Item name="activeStatus" style={{ width: '100%', fontWeight: 'bold', display: 'inline-block', marginInlineEnd: '1rem' }} label="Tình trạng" >
                                <Select defaultValue="1" suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                    <Option value="0">Ngưng hoạt động</Option>
                                    <Option value="1">Hoạt động</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{ marginTop: '1rem' }}><span style={{ color: 'red' }}>*</span> là trường thông tin bắt buộc</div>

                </Row>
                <Row className="btnGroup" style={{ justifyContent: 'center', margin: '1rem 0', gap: '1rem' }}>
                    <Button size='large' onClick={() => navigate('/taikhoan')} className="resetBtn" >Hủy bỏ</Button>
                    <Button size='large' type="primary" htmlType="submit" className="addBtn" >Thêm </Button>
                </Row>
            </Form>

        </div>


    )
}