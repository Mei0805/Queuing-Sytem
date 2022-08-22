import { useState } from "react";
import { Row, Col, Button, Table } from "antd"
import { Select, Form, Input } from "antd"
import { SearchOutlined } from '@ant-design/icons';

import { useNavigate } from "react-router-dom";

const { Option } = Select;

export const DSTaiKhoan = () => {
    const navigate = useNavigate();
    const taikhoan = [
        {
            "id": 1,
            "tenDangNhap": "tuyetnguyen@12",
            "hoTen": "Nguyen Văn A",
            "sdt":"0919256712",
            "email": "tuyetnguyen123@gmail.com",
            "vaiTro": "Kế toán",
            "trangThaiHD": 1,
        },
        {
            "id": 2,
            "tenDangNhap": "tuyetnguyen@10",
            "hoTen": "Nguyen Văn B",
            "sdt":"0919256712",
            "email": "tuyetnguyen222@gmail.com",
            "vaiTro": "Kế toán",
            "trangThaiHD": 0,
        },{
            "id": 3,
            "tenDangNhap": "tuyetnguyen@23",
            "hoTen": "Nguyen Văn C",
            "sdt":"0919256712",
            "email": "tuyetnguyen123@gmail.com",
            "vaiTro": "Kế toán",
            "trangThaiHD": 1,
        },
        {
            "id": 4,
            "tenDangNhap": "tuyetnguyen@18",
            "hoTen": "Nguyen Văn D",
            "sdt":"0919256712",
            "email": "tuyetnguyen852@gmail.com",
            "vaiTro": "Kế toán",
            "trangThaiHD": 0,
        },
        {
            "id": 5,
            "tenDangNhap": "tuyetnguyen@19",
            "hoTen": "Nguyen Văn F",
            "sdt":"0919256712",
            "email": "tuyetnguyen123@gmail.com",
            "vaiTro": "Kế toán",
            "trangThaiHD": 1,
        },
        {
            "id": 6,
            "tenDangNhap": "tuyetnguyen@20",
            "hoTen": "Nguyen Văn N",
            "sdt":"0919256712",
            "email": "tuyetnguyen222@gmail.com",
            "vaiTro": "Kế toán",
            "trangThaiHD": 0,
        },
    ]
    const columns = [

        {
            title: 'Tên đăng nhập',
            dataIndex: 'tenDangNhap',
            width: 180,
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            width: 300,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'sdt',
            width: 250,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: 300,
        },
        {
            title: 'Vai trò',
            dataIndex: 'vaiTro',
            width: 300,
        },
        {
            title: 'Trạng thái hoạt động',
            dataIndex: 'trangThaiHD',
            width: 300,
            render: (dataIndex: number) => {
                //0: ngưng hd, 1: hd
                if (dataIndex == 0) {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px' }}>
                        <img src='/img/icon/deactive.png' alt='arrowImg' style={{ paddingRight: '14px' }} />
                        Ngưng hoạt động
                    </div>
                }
                else if (dataIndex == 1) {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px' }}>
                        <img src='/img/icon/active.png' alt='arrowImg' style={{ paddingRight: '14px' }} />
                        Hoạt động
                    </div>
                }

            }

        },
        {
            title: ' ',
            dataIndex: 'id',
            render: (dataIndex: any) => {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <Button type="link" onClick={() => { navigate(`/taikhoan/capnhat/${dataIndex}`); }}>
                            Cập nhật
                        </Button>
                    </div>
                )
            }
        }

    ];
    const [listTaiKhoan, setListTaiKhoan] = useState(taikhoan);

    const handleChangeVaiTro = (value: string | number) => {
        console.log(value);
        let data: any = [];
        switch (value) {
            case 'all':
                data = taikhoan;
                break;
            case 1:
                data = taikhoan.filter((item) => item.trangThaiHD == 1);
                break;
            case 2:
                data = taikhoan.filter((item) => item.trangThaiHD == 0);
                break;
        }
        setListTaiKhoan(data)
    }
    

    function itemRender(current: any, type: any, originalElement: any) {
        if (type === 'prev') {
            return <a><img src='/img/icon/left_pagination.png' alt='arrowImg' /></a>;
        } else if (type === 'next') {
            return <a><img src='/img/icon/right_pagination.png' alt='arrowImg' /></a>;
        }
        return originalElement;
    }

    const vaiTroList = [
        { id: 1, tenDV: 'Kế toán' },
        { id: 2, tenDV: 'Bác sĩ' },
        { id: 3, tenDV: 'Lễ tân' },
        { id: 4, tenDV: 'Quản lý' },
        { id: 5, tenDV: 'Admin' },
        { id: 6, tenDV: 'SuperAdmin' }
    ]


    return (
        <div className="taiKhoanListContainer" style={{ width: '100%' }}>
            <h1>Danh sách tài khoản</h1>
            <Row>
                <Col span='12'>
                    <Form layout="vertical" autoComplete="off">
                        <Form.Item style={{ width: '40%', fontWeight: 'bold', display: 'inline-block', marginInlineEnd: '1rem' }} label="Tên vai trò" >
                            <Select defaultValue="all" onChange={handleChangeVaiTro} suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                <Option value="all"    >Tất cả</Option>
                                {vaiTroList.map((vaitroI) => {
                                    return <Option value={vaitroI.id} >{vaitroI.tenDV}</Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span='11' style={{ textAlign: 'right' }}>
                    <Form layout="vertical" style={{}} autoComplete="off">
                        <Form.Item style={{ width: '40%', fontWeight: 'bold', display: 'inline-block' }} label="Từ khóa" >
                            <Input placeholder="Nhập từ khóa..." size="small" suffix={<Button type="text"><SearchOutlined size={14} style={{ color: '#FF9138' }} /></Button>} />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Row className="tableContainer">
                <Col span={23}>
                    <Table
                        className="taiKhoanTable"
                        dataSource={listTaiKhoan}
                        columns={columns}
                        size="small"
                        pagination={{ pageSize: 6, itemRender: itemRender }}
                        bordered
                    >
                    </Table>
                </Col>
            </Row>
            <Button className="add_dichvu" style={{ height: '90px', padding: '12px 5px' }} onClick={() => { navigate(`/taikhoan/them`); }}>
                <img src='/img/icon/add_thietbi.png' alt='navbar-img' /> <br />
                Thêm <br /> tài khoản
            </Button>
        </div>


    )

}