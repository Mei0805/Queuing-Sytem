import { useState } from "react";
import { Row, Col, Button, Table } from "antd"
import { Select, Form, Input } from "antd"
import { SearchOutlined } from '@ant-design/icons';

import { useNavigate } from "react-router-dom";

const { Option } = Select;

export const DSDichVu = () => {
    const navigate = useNavigate();
    const dichvu = [
        {
            "id": 1,
            "maDichVu": "KIO_01",
            "tenDichVu": "Khám tim mạch",
            "trangThaiHD": 1,
            "moTa": "Mô tả dịch vụ"
        },
        {
            "id": 2,
            "maDichVu": "KIO_01",
            "tenDichVu": " Khám sản - Phụ khoa",
            "trangThaiHD": 1,
            "moTa": "Mô tả dịch vụ"
        },
        {
            "id": 3,
            "maDichVu": "KIO_01",
            "tenDichVu": "Khám răng hàm mặt",
            "trangThaiHD": 0,
            "moTa": "Mô tả dịch vụ"
        },
        {
            "id": 4,
            "maDichVu": "KIO_01",
            "tenDichVu": "Khám tai mũi họng",
            "trangThaiHD": 0,
            "moTa": "Mô tả dịch vụ"
        },
        {
            "id": 5,
            "maDichVu": "KIO_01",
            "tenDichVu": "Khám hô hấp",
            "trangThaiHD": 1,
            "moTa": "Mô tả dịch vụ"
        },
        {
            "id": 6,
            "maDichVu": "KIO_01",
            "tenDichVu": "Khám tổng quát.",
            "trangThaiHD": 0,
            "moTa": "Mô tả dịch vụ"
        },
        {
            "id": 7,
            "maDichVu": "KIO_01",
            "tenDichVu": "Kiosk",
            "trangThaiHD": 0,
            "moTa": "Mô tả dịch vụ"
        },
        {
            "id": 8,
            "maDichVu": "KIO_01",
            "tenDichVu": "Kiosk",
            "trangThaiHD": 1,
            "moTa": "Mô tả dịch vụ"
        },
        {
            "id": 9,
            "maDichVu": "KIO_01",
            "tenDichVu": "Kiosk",
            "trangThaiHD": 1,
            "moTa": "Mô tả dịch vụ"
        },
        {
            "id": 10,
            "maDichVu": "KIO_01",
            "tenDichVu": "Kiosk",
            "trangThaiHD": 0,
            "moTa": "Mô tả dịch vụ"
        }
    ]
    const [listDichVu, setlistDichVu] = useState(dichvu);
    
    const handleChangeHoatdong = (value: string |number) =>{
        console.log(value);
        let data:any = [];
        switch(value){
            case 'all':
                data= dichvu;
                break;
            case 1:
                data = dichvu.filter((item)=> item.trangThaiHD == 1);
                break;
            case 2:
                data = dichvu.filter((item)=> item.trangThaiHD == 0);
                break;
        }
        setlistDichVu(data)
    }
    const columns = [

        {
            title: 'Mã dịch vụ',
            dataIndex: 'maDichVu',
            width: 120,
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: 'tenDichVu',
            width: 200,
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            width: 300,
        },
        {
            title: 'Trạng thái hoạt động',
            dataIndex: 'trangThaiHD',
            width: 300,
            render: (dataIndex: number) => {

                if (dataIndex == 1) {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px' }}>
                        <img src='/img/icon/active.png' alt='arrowImg' style={{ paddingRight: '14px' }} />
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
            title: ' ',
            dataIndex: 'id',
            render: (dataIndex: any) => {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <Button type="link" onClick={() => { navigate(`/dichvu/chitiet/${dataIndex}`); }}>
                            Chi tiết
                        </Button>
                    </div>
                )
            }
        },
        {
            title: ' ',
            dataIndex: 'id',
            render: (dataIndex: any) => {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <Button type="link" onClick={() => { navigate(`/dichvu/capnhat/${dataIndex}`); }}>
                            Cập nhật
                        </Button>
                    </div>
                )
            }
        }

    ];

    function itemRender(current: any, type: any, originalElement: any) {
        if (type === 'prev') {
            return <a><img src='/img/icon/left_pagination.png' alt='arrowImg' /></a>;
        } else if (type === 'next') {
            return <a><img src='/img/icon/right_pagination.png' alt='arrowImg' /></a>;
        }
        return originalElement;
    }


    return (
        <div className="dichVuListContainer" style={{ width: '100%' }}>
            <h1>Danh sách dịch vụ</h1>
            <Row>
                <Col span='12'>
                    <Form layout="vertical" autoComplete="off">
                        <Form.Item style={{ width: '40%',fontWeight:'bold', display: 'inline-block', marginInlineEnd: '1rem' }} label="Trạng thái hoạt động" >
                            <Select defaultValue="all" onChange={handleChangeHoatdong} suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                <Option value="all"    >Tất cả</Option>
                                <Option value={1} >Hoạt động</Option>
                                <Option value={2}> Ngưng hoạt động</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span='11' style={{textAlign:'right'}}>
                    <Form layout="vertical" style={{}} autoComplete="off">
                        <Form.Item style={{ width: '40%',fontWeight:'bold', display: 'inline-block' }} label="Từ khóa" >
                            <Input placeholder="Nhập từ khóa..." size="small" suffix={<Button type="text"><SearchOutlined size={14} style={{ color: '#FF9138' }} /></Button>} />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Row className="tableContainer">
                <Col span={23}>
                    <Table
                        className="dichVuTable"
                        dataSource={listDichVu}
                        columns={columns}
                        size="small"
                        pagination={{ pageSize: 6, itemRender: itemRender }}
                        bordered
                    >
                    </Table>
                </Col>
            </Row>
            <Button className="add_dichvu" style={{ height: '90px', padding: '12px 5px' }} onClick={() => { navigate(`/dichvu/them`); }}>
                <img src='/img/icon/add_thietbi.png' alt='navbar-img' /> <br />
                Thêm <br /> dịch vụ
            </Button>
        </div>


    )

}