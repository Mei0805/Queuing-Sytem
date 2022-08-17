import { Row, Col, Button, Table } from "antd"
import { Select, Form, Input } from "antd"
import { SearchOutlined } from '@ant-design/icons';

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { Search } = Input;
const onSearch = (value: string) => console.log(value);

export const DSThietBi = () => {
    const navigate = useNavigate();
    const columns = [

        {
            title: 'Mã thiết bị',
            dataIndex: 'maThietBi',
            width: 120,
        },
        {
            title: 'Tên thiết bị',
            dataIndex: 'tenThietBi',
            width: 119,
        },
        {
            title: 'Địa chỉ IP',
            dataIndex: 'diaChi',
            width: 138,
        },
        {
            title: 'Trạng thái hoạt động',
            dataIndex: 'trangThaiHD',
            width: 171,
            render: (dataIndex:number) => {

                if (dataIndex == 1) {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px' }}>
                        <img src='/img/icon/active.png' alt='arrowImg'style={{ paddingRight: '14px' }} />
                        Hoạt động
                    </div>
                }
                else {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px' }}>
                        <img src='/img/icon/deactive.png' alt='arrowImg' style={{ paddingRight: '14px' }} />
                        Ngưng hoạt động
                    </div>
                }

            }

        },
        {
            title: 'Trạng thái kết nối',
            dataIndex: 'trangThaiKN',
            width: 145,
            render: (dataIndex:number) => {

                if (dataIndex == 1) {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px' }}>
                        <img src='/img/icon/active.png' alt='arrowImg'style={{ paddingRight: '14px' }} />
                        Kết nối
                    </div>
                }
                else {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px' }}>
                        <img src='/img/icon/deactive.png' alt='arrowImg' style={{ paddingRight: '14px' }} />
                        Mất kết nối
                    </div>
                }

            }

        },
        {
            title: 'Dịch vụ sử dụng',
            dataIndex: 'dichVu',
            width: 268,

        },
        {
            title: ' ',
            dataIndex: 'id',
            render: (dataIndex: any) => {
                return (
                    <button onClick={() => {
                        navigate(`/thietbi/chiTietThietBi/${dataIndex}`);
                    }}>
                        Chi tiết
                    </button>
                )
            }
        },
        {
            title: ' ',
            dataIndex: 'id',
            render: (dataIndex: any) => {
                return (
                    <button onClick={() => {
                        navigate(`/thietbi/capNhatThietBi/${dataIndex}`);
                    }}>
                        Cập nhật
                    </button>
                )
            }
        }

    ];

    const thietbi = [
        {
            "maThietBi": "KIO_01",
            "tenThietBi": "Kiosk",
            "diaChi": "192.168.1.10",
            "trangThaiHD": 1,
            "trangThaiKN": 0,
            "dichVu": "Khám tim mạch, khám mắt, khám tai mũi họng"
        },
        {
            "maThietBi": "KIO_01",
            "tenThietBi": "Kiosk",
            "diaChi": "192.168.1.10",
            "trangThaiHD": 1,
            "trangThaiKN": 1,
            "dichVu": "Khám tim mạch, khám mắt, khám tai mũi họng"
        },
        {
            "maThietBi": "KIO_01",
            "tenThietBi": "Kiosk",
            "diaChi": "192.168.1.10",
            "trangThaiHD": 0,
            "trangThaiKN": 1,
            "dichVu": "Khám tim mạch, khám mắt, khám tai mũi họng"
        },
        {
            "maThietBi": "KIO_01",
            "tenThietBi": "Kiosk",
            "diaChi": "192.168.1.10",
            "trangThaiHD": 0,
            "trangThaiKN": 0,
            "dichVu": "Khám tim mạch, khám mắt, khám tai mũi họng"
        },
        {
            "maThietBi": "KIO_01",
            "tenThietBi": "Kiosk",
            "diaChi": "192.168.1.10",
            "trangThaiHD": 1,
            "trangThaiKN": 0,
            "dichVu": "Khám tim mạch, khám mắt, khám tai mũi họng"
        },
        {
            "maThietBi": "KIO_01",
            "tenThietBi": "Kiosk",
            "diaChi": "192.168.1.10",
            "trangThaiHD": 0,
            "trangThaiKN": 1,
            "dichVu": "Khám tim mạch, khám mắt, khám tai mũi họng"
        },
        {
            "maThietBi": "KIO_01",
            "tenThietBi": "Kiosk",
            "diaChi": "192.168.1.10",
            "trangThaiHD": 0,
            "trangThaiKN": 1,
            "dichVu": "Khám tim mạch, khám mắt, khám tai mũi họng"
        },
        {
            "maThietBi": "KIO_01",
            "tenThietBi": "Kiosk",
            "diaChi": "192.168.1.10",
            "trangThaiHD": 1,
            "trangThaiKN": 1,
            "dichVu": "Khám tim mạch, khám mắt, khám tai mũi họng"
        },
        {
            "maThietBi": "KIO_01",
            "tenThietBi": "Kiosk",
            "diaChi": "192.168.1.10",
            "trangThaiHD": 1,
            "trangThaiKN": 0,
            "dichVu": "Khám tim mạch, khám mắt, khám tai mũi họng"
        },
        {
            "maThietBi": "KIO_01",
            "tenThietBi": "Kiosk",
            "diaChi": "192.168.1.10",
            "trangThaiHD": 0,
            "trangThaiKN": 0,
            "dichVu": "Khám tim mạch, khám mắt, khám tai mũi họng"
        }
    ]

    function itemRender(current: any, type: any, originalElement: any) {
        if (type === 'prev') {
            return <a><img src='/img/icon/arrow.png' alt='arrowImg' /></a>;
        } else if (type === 'next') {
            return <a><img src='/img/icon/arrow.png' alt='arrowImg' /></a>;
        }
        return originalElement;
    }
    return (
        <div className="thietBiListContainer" style={{ width: '100%' }}>
            <h1>Danh sách thiết bị</h1>
            <Row>
                <Col span='12'>
                    <Form layout="vertical" autoComplete="off">
                        <Form.Item style={{ width: '40%', display: 'inline-block', marginInlineEnd: '1rem' }} label="Trạng thái hoạt động" >
                            <Select defaultValue="all" suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                <Option value="all">Tất cả</Option>
                                <Option value="active">Hoạt động</Option>
                                <Option value="deactive">Ngưng hoạt động</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item style={{ width: '40%', display: 'inline-block' }} label="Trạng thái kết nối" >
                            <Select defaultValue="all" suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                <Option value="all">Tất cả</Option>
                                <Option value="connect">Kết nối</Option>
                                <Option value="disconnect">Mất kết nối</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span='12'>
                    <Form layout="vertical" style={{}} autoComplete="off">

                        <Form.Item style={{ width: '40%', display: 'inline-block' }} label="Từ khóa" >
                            <Input placeholder="Nhập từ khóa..." size="small" suffix={<Button type="text"><SearchOutlined size={14} style={{ color: '#FF9138' }} /></Button>} />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Row className="tableContainer">
                <Col span={23}>
                    <Table
                        className="thietbiTable"
                        dataSource={thietbi}
                        columns={columns}
                        size="small"
                        pagination={{ pageSize: 7, itemRender: itemRender }}
                        bordered
                    >
                    </Table>
                </Col>
            </Row>
            <Button className="add_thietbi" style={{ height: '90px', padding: '12px 5px' }} onClick={() => { navigate(`/thietbi/them`); }}>
                <img src='/img/icon/add_thietbi.png' alt='navbar-img' /> <br />
                Thêm <br /> thiết bị
            </Button>
        </div>


    )

}