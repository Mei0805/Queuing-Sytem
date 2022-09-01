import { useEffect, useState  } from "react";
import { Row, Col, Button, Table } from "antd"
import { Select, Form, Input } from "antd"
import { SearchOutlined } from '@ant-design/icons';

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { taikhoanCreator } from "../../redux";
import { bindActionCreators } from "redux";
import { State } from "../../redux/reducers";

const { Option } = Select;

export const DSTaiKhoan = () => {
    const navigate = useNavigate();
    let dispatch = useDispatch();
    const [taiKhoan, setListTaiKhoan] = useState();
   
    const { actionLoadTaiKhoan } = bindActionCreators(taikhoanCreator, dispatch);
    
    const vaiTroList = [
        { id: 1, tenDV: 'Kế toán' },
        { id: 2, tenDV: 'Bác sĩ' },
        { id: 3, tenDV: 'Lễ tân' },
        { id: 4, tenDV: 'Quản lý' },
        { id: 5, tenDV: 'Admin' },
        { id: 6, tenDV: 'SuperAdmin' }
    ]
    const columns = [

        {
            title: 'Tên đăng nhập',
            dataIndex: 'tenDangNhap',
            width: 200,
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
            render: (dataIndex: any) => { return dataIndex.value }
        },
        {
            title: 'Trạng thái hoạt động',
            dataIndex: 'trangThaiHD',
            width: 300,
            render: (dataIndex: boolean) => {
                //0: ngưng hd, 1: hd
                if (dataIndex === false) {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px', textAlign: 'left' }}>
                        <img src='/img/icon/deactive.png' alt='arrowImg' style={{ paddingRight: '14px' }} />
                        Ngưng hoạt động
                    </div>
                }
                else if (dataIndex === true) {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px', textAlign: 'left' }}>
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

    const itemRender = (current: any, type: any, originalElement: any) => {
        if (type === 'prev') {
            return <button style={{ border: 'none', background: 'none' }}><img src='/img/icon/left_pagination.png' alt='arrowImg' /></button>;
        } else if (type === 'next') {
            return <button style={{ border: 'none', background: 'none' }}><img src='/img/icon/right_pagination.png' alt='arrowImg' /></button>;
        }
        return originalElement;
    }

    const handleChangeVaiTro = (value: string | number) => {
        console.log(value);
        let data: any = [];
        switch (value) {
            case 'all':
                data = listTaiKhoan;
                break;
            case 1:
                data = listTaiKhoan.filter((item: any) => item.vaiTro.id === 1);
                break;
            case 2:
                data = listTaiKhoan.filter((item: any) => item.vaiTro.id === 2);
                break;
            case 3:
                data = listTaiKhoan.filter((item: any) => item.vaiTro.id === 3);
                break;
            case 4:
                data = listTaiKhoan.filter((item: any) => item.vaiTro.id === 4);
                break;
            case 5:
                data = listTaiKhoan.filter((item: any) => item.vaiTro.id === 5);
                break;
            case 6:
                data = listTaiKhoan.filter((item: any) => item.vaiTro.id === 6);
                break;

        }
        setListTaiKhoan(data)
    }
    const handleSearch = (e: any) => {
        let keySearch = e.target.value;
        console.log(keySearch);
        console.log(keySearch.length);
        let data: any = [];
        if (keySearch.length >= 0) {
            data = listTaiKhoan.filter((item: any) => {
                return item.hoTen.toLowerCase().match(keySearch) || item.hoTen.match(keySearch) || item.tenDangNhap.match(keySearch) ||item.tenDangNhap.toLowerCase().match(keySearch)
            })
            setListTaiKhoan(data)
        }
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        actionLoadTaiKhoan();
    }, [])

    const { listTaiKhoan } = useSelector((state: State) => state.taikhoan);
    useEffect(() => {
        setListTaiKhoan(listTaiKhoan)
    }, [listTaiKhoan])
    

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
                                    return <Option key={vaitroI.id} value={vaitroI.id} >{vaitroI.tenDV}</Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span='11' style={{ textAlign: 'right' }}>
                    <Form layout="vertical" style={{}} autoComplete="off">
                        <Form.Item style={{ width: '40%', fontWeight: 'bold', display: 'inline-block' }} label="Từ khóa" >
                            <Input placeholder="Nhập từ khóa..." 
                            onChange={(e) => handleSearch(e) }
                            size="small" suffix={<Button type="text"><SearchOutlined size={14} style={{ color: '#FF9138' }} /></Button>} />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Row className="tableContainer">
                <Col span={23}>
                    {taiKhoan &&
                        <Table
                            className="taiKhoanTable"
                            dataSource={taiKhoan}
                            columns={columns}
                            size="small"
                            pagination={{ pageSize: 6, itemRender: itemRender }}
                            bordered
                        >
                        </Table>
                    }

                </Col>
            </Row>
            <Button className="add_dichvu" style={{ height: '90px', padding: '12px 5px' }} onClick={() => { navigate(`/taikhoan/them`); }}>
                <img src='/img/icon/add_thietbi.png' alt='navbar-img' /> <br />
                Thêm <br /> tài khoản
            </Button>
        </div>


    )

}