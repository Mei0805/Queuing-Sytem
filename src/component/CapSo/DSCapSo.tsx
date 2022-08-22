import { useState } from "react";
import { Row, Col, Button, Table } from "antd"
import { Select, Form, Input } from "antd"
import { SearchOutlined } from '@ant-design/icons';

import { useNavigate } from "react-router-dom";

const { Option } = Select;

export const DSCapSo = () => {
    const navigate = useNavigate();
    const capso = [
        {
            "id": 2010001,
            "tenKH": "Lê Huỳnh Ái Vân",
            "tenDV": "Khám tim mạch",
            "thoiGianCap": "14:35 - 07/11/2021",
            "HSD": "14:35 - 12/11/2021",
            "trangThai": 1,
            "nguonCap": "Kiosk"
        },
        {
            "id": 2010002,
            "tenKH": "Huỳnh Ái Vân",
            "tenDV": "Khám sản-Phụ khoa",
            "thoiGianCap": "14:35 - 07/11/2021",
            "HSD": "14:35 - 12/11/2021",
            "trangThai": 0,
            "nguonCap": "Kiosk"
        },
        {
            "id": 2010003,
            "tenKH": "Lê Ái Vân",
            "tenDV": "Khám răng hàm mặt",
            "thoiGianCap": "14:35 - 07/11/2021",
            "HSD": "14:35 - 12/11/2021",
            "trangThai": 1,
            "nguonCap": "Hệ thống"
        },
        {
            "id": 2010004,
            "tenKH": "Nguyễn Ái Vân",
            "tenDV": "Khám tai mũi họng",
            "thoiGianCap": "14:35 - 07/11/2021",
            "HSD": "14:35 - 12/11/2021",
            "trangThai": 1,
            "nguonCap": "Hệ thống"
        },
        {
            "id": 2010005,
            "tenKH": "Trần Thị Ái Vân",
            "tenDV": "Khám hô hấp",
            "thoiGianCap": "14:35 - 07/11/2021",
            "HSD": "14:35 - 12/11/2021",
            "trangThai": 2,
            "nguonCap": "Kiosk"
        },
        {
            "id": 2010006,
            "tenKH": "Lê Huỳnh Nghĩa",
            "tenDV": "Khám tổng quát",
            "thoiGianCap": "14:35 - 07/11/2021",
            "HSD": "14:35 - 12/11/2021",
            "trangThai": 0,
            "nguonCap": "Hệ thống"
        },
        {
            "id": 2010007,
            "tenKH": "Lê Huỳnh Đức",
            "tenDV": "Khám tai mũi họng",
            "thoiGianCap": "14:35 - 07/11/2021",
            "HSD": "14:35 - 12/11/2021",
            "trangThai": 1,
            "nguonCap": "Hệ thống"
        }
    ]
    const [listCapSo, setListCapSo] = useState(capso);

    const handleChangeHoatdong = (value: string | number) => {
        console.log(value);
        let data: any = [];
        switch (value) {
            case 'all':
                data = capso;
                break;
            case 0:
                data = capso.filter((item) => item.trangThai == 0);
                break;
            case 1:
                data = capso.filter((item) => item.trangThai == 1);
                break;
            case 2:
                data = capso.filter((item) => item.trangThai == 2);
                break;
        }
        setListCapSo(data)
    }
    const handleChangeDichVu = (value: string | number) => {
        console.log(value);
        let data: any = [];
        switch (value) {
            case 'all':
                data = capso;
                break;
            case 1:
                data = capso.filter((item) => item.tenDV == "Khám tim mạch");
                break;
            case 2:
                data = capso.filter((item) => item.tenDV == "Khám sản-Phụ khoa");
                break;
            case 3:
                data = capso.filter((item) => item.tenDV == 'Khám răng hàm mặt');
                break;
            case 4:
                data = capso.filter((item) => item.tenDV == 'Khám tai mũi họng');
                break;
            case 5:
                data = capso.filter((item) => item.tenDV == 'Khám hô hấp');
                break;
            case 6:
                data = capso.filter((item) => item.tenDV == 'Khám tổng quát');
                break;
        }
        setListCapSo(data)
    }
    const handleChangeNguonCap = (value: string | number) => {
        console.log(value);
        let data: any = [];
        switch (value) {
            case 'all':
                data = capso;
                break;
            case 1:
                data = capso.filter((item) => item.nguonCap == "Kiosk");
                break;
            case 2:
                data = capso.filter((item) => item.nguonCap == "Hệ thống");
                break;
        }
        setListCapSo(data)
    }


    const columns = [

        {
            title: 'STT',
            dataIndex: 'id',
            width: 120,
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'tenKH',
            width: 200,
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: 'tenDV',
            width: 200,
        },
        {
            title:' Thời gian cấp',
            dataIndex:'thoiGianCap',
        },
        {
            title:'Hạn sử dụng',
            dataIndex:'HSD',
        },
        {
            title: 'Trạng thái hoạt động',
            dataIndex: 'trangThai',
            width: 171,
            render: (dataIndex: number) => {
                 //0: used , 1:pending , 2: pass
                 if (dataIndex == 1) {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px' }}>
                        <img src='/img/icon/pending.png' alt='arrowImg' style={{ paddingRight: '14px' }} />
                        Đang chờ
                    </div>
                }
                else if (dataIndex == 0) {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px' }}>
                        <img src='/img/icon/disable.png' alt='arrowImg' style={{ paddingRight: '14px' }} />
                        Đã sử dụng
                    </div>
                }
                else if (dataIndex == 2) {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px' }}>
                        <img src='/img/icon/deactive.png' alt='arrowImg' style={{ paddingRight: '14px' }} />
                        Bỏ qua
                    </div>
                }

            }
        },
        {
            title:'Nguồn cấp',
            dataIndex:'nguonCap',
        },
        {
            title: ' ',
            dataIndex: 'id',
            render: (dataIndex: any) => {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <Button type="link" onClick={() => { navigate(`/capso/chitiet/${dataIndex}`); }}>
                            Chi tiết
                        </Button>
                    </div>
                )
            }
        }

    ];
    const dichVuList = [
        { id: 1, tenDV: 'Khám tim mạch'},
        { id: 2, tenDV: 'Khám sản - Phụ khoa'},
        { id: 3, tenDV: 'Khám răng hàm mặt'},
        { id: 4, tenDV: 'Khám tai mũi họng'},
        { id: 5, tenDV: 'Khám hô hấp'},
        { id: 6, tenDV: 'Khám tổng quát'} 
    ]


    function itemRender(current: any, type: any, originalElement: any) {
        if (type === 'prev') {
            return <a><img src='/img/icon/left_pagination.png' alt='arrowImg' /></a>;
        } else if (type === 'next') {
            return <a><img src='/img/icon/right_pagination.png' alt='arrowImg' /></a>;
        }
        return originalElement;
    }

    
    return (
        <div className="capSoListContainer" style={{ width: '100%' }}>
            <h1>Quản lý cấp số</h1>
            <Row>
                <Col span={10}>
                    <Form layout="vertical" autoComplete="off">
                        <Form.Item style={{ width: '154px', fontWeight: 'bold', display: 'inline-block', marginInlineEnd: '1rem' }} label="Tên dịch vụ" >
                            <Select defaultValue="all" onChange={handleChangeDichVu} suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                <Option value="all"    >Tất cả</Option>
                                {dichVuList.map((dvI)=>(
                                    <Option value={dvI.id} >{dvI.tenDV}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item style={{ width: '154px', fontWeight: 'bold', display: 'inline-block', marginInlineEnd: '1rem' }} label="Tình trạng" >
                            <Select defaultValue="all" onChange={handleChangeHoatdong} suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                <Option value="all">Tất cả</Option>
                                <Option value={0}>Đã sử dụng</Option>
                                <Option value={1}>Đang chờ</Option>
                                <Option value={2}>Bỏ qua</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item style={{ width: '154px', fontWeight: 'bold', display: 'inline-block' }} label="Nguồn cấp" >
                            <Select defaultValue="all" onChange={handleChangeNguonCap} suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                <Option value="all">Tất cả</Option>
                                <Option value={1}>Kiosk</Option>
                                <Option value={2}>Hệ thống</Option>
                            </Select>
                        </Form.Item>

                    </Form>
                </Col>
                <Col span='8'>
                    <h5>Time range</h5>
                </Col>
                <Col span='5' style={{ textAlign: 'right' }}>
                    <Form layout="vertical" style={{ width:'100%'}} autoComplete="off">
                        <Form.Item style={{ width: '240px', fontWeight: 'bold', display: 'inline-block' }} label="Từ khóa" >
                            <Input placeholder="Nhập từ khóa..." size="small" suffix={<Button type="text"><SearchOutlined size={14} style={{ color: '#FF9138' }} /></Button>} />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Row className="tableContainer">
                <Col span={23}>
                    <Table
                        className="capsoTable"
                        dataSource={listCapSo}
                        columns={columns}
                        size="small"
                        pagination={{ pageSize: 6, itemRender: itemRender }}
                        bordered
                    >
                    </Table>
                </Col>
            </Row>
            <Button className="add_capSo" style={{ height: '90px', padding: '12px 5px' }} onClick={() => { navigate(`/capso/them`); }}>
                <img src='/img/icon/add_thietbi.png' alt='navbar-img' /> <br />
                Cấp <br /> số mới
            </Button>
        </div>


    )

}