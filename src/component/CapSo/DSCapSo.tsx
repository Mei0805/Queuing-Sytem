import { useState, useEffect } from "react";
import { Row, Col, Button, Table } from "antd"
import { Select, Form, Input } from "antd"
import { SearchOutlined } from '@ant-design/icons';

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { capsoCreator } from "../../redux";
import { bindActionCreators } from "redux";
import { State } from "../../redux/reducers";
import { LoadingSpinner } from "../Loading";

const { Option } = Select;

export const DSCapSo = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function zeroPad(num: any, places: any) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }

    const [capSoList, setCapSoList] = useState<any | undefined>([]);

    const { actionLoadCapSo } = bindActionCreators(capsoCreator, dispatch);
    const columns = [
        {
            title: 'STT',
            dataIndex: 'STT',
            width: 120,
            render: (dataIndex: any) => zeroPad(dataIndex, 5),
            sorter: (a: any, b: any) => a.STT - b.STT,
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
            title: ' Thời gian cấp',
            dataIndex: 'thoiGianCap',
        },
        {
            title: 'Hạn sử dụng',
            dataIndex: 'HSD',
        },
        {
            title: 'Trạng thái hoạt động',
            dataIndex: 'trangThai',
            width: 171,
            render: (dataIndex: any) => {
                //0: used , 1:pending , 2: pass
                if (dataIndex.id === 1) {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px' }}>
                        <img src='/img/icon/pending.png' alt='arrowImg' style={{ paddingRight: '14px' }} />
                        {dataIndex.value}
                    </div>
                }
                else if (dataIndex.id === 0) {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px' }}>
                        <img src='/img/icon/disable.png' alt='arrowImg' style={{ paddingRight: '14px' }} />
                        {dataIndex.value}
                    </div>
                }
                else if (dataIndex.id === 2) {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px' }}>
                        <img src='/img/icon/deactive.png' alt='arrowImg' style={{ paddingRight: '14px' }} />
                        {dataIndex.value}
                    </div>
                }
            }
        },
        {
            title: 'Nguồn cấp',
            dataIndex: 'nguonCap',
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
        { id: 1, tenDV: 'Khám tim mạch' },
        { id: 2, tenDV: 'Khám sản-Phụ khoa' },
        { id: 3, tenDV: 'Khám răng hàm mặt' },
        { id: 4, tenDV: 'Khám tai mũi họng' },
        { id: 5, tenDV: 'Khám hô hấp' },
        { id: 6, tenDV: 'Khám tổng quát' }
    ]
    const handleSearch = (e: any) => {
        let keySearch = e.target.value;
        console.log(keySearch);
        console.log(keySearch.length);
        let data: any = [];
        if (keySearch.length >= 0) {
            data = listCapSo.filter((item: any) => {
                return item.STT.toLowerCase().match(keySearch) || item.STT.match(keySearch) || item.tenKH.match(keySearch) || item.tenKH.toLowerCase().match(keySearch) 
            })
            setCapSoList(data)
        }
    }
    const handleChangeHoatdong = (value: string | number) => {
        console.log(value);
        let data: any = [];
        switch (value) {
            case 'all':
                data = listCapSo;
                break;
            case 0:
                data = listCapSo.filter((item: any) => item.trangThai.id === 0);
                break;
            case 1:
                data = listCapSo.filter((item: any) => item.trangThai.id === 1);
                break;
            case 2:
                data = listCapSo.filter((item: any) => item.trangThai.id === 2);
                break;
        }
        setCapSoList(data)
    }
    const handleChangeDichVu = (value: string | number) => {
        console.log(value);
        let data: any = [];
        switch (value) {
            case 'all':
                data = listCapSo;
                break;
            case 1:
                data = listCapSo.filter((item: any) => item.tenDV === "Khám tim mạch");
                break;
            case 2:
                data = listCapSo.filter((item: any) => item.tenDV === "Khám sản-Phụ khoa");
                break;
            case 3:
                data = listCapSo.filter((item: any) => item.tenDV === 'Khám răng hàm mặt');
                break;
            case 4:
                data = listCapSo.filter((item: any) => item.tenDV === 'Khám tai mũi họng');
                break;
            case 5:
                data = listCapSo.filter((item: any) => item.tenDV === 'Khám hô hấp');
                break;
            case 6:
                data = listCapSo.filter((item: any) => item.tenDV === 'Khám tổng quát');
                break;
        }
        setCapSoList(data)
    }
    const handleChangeNguonCap = (value: string | number) => {
        console.log(value);
        let data: any = [];
        switch (value) {
            case 'all':
                data = listCapSo;
                break;
            case 1:
                data = listCapSo.filter((item: any) => item.nguonCap === "Kiosk");
                break;
            case 2:
                data = listCapSo.filter((item: any) => item.nguonCap === "Hệ thống");
                break;
        }
        setCapSoList(data)
    }

    function itemRender(current: any, type: any, originalElement: any) {
        if (type === 'prev') {
            return <a><img src='/img/icon/left_pagination.png' alt='arrowImg' /></a>;
        } else if (type === 'next') {
            return <a><img src='/img/icon/right_pagination.png' alt='arrowImg' /></a>;
        }
        return originalElement;
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        actionLoadCapSo();
    }, [])

    const { listCapSo } = useSelector((state: State) => state.capso);
    useEffect(() => {
        setCapSoList(listCapSo)
    }, [listCapSo])

    return (
        <div className="capSoListContainer" style={{ width: '100%' }}>
            <h1>Quản lý cấp số</h1>
            <Row>
                <Col span={10}>
                    <Form layout="vertical" autoComplete="off">
                        <Form.Item style={{ width: '154px', fontWeight: 'bold', display: 'inline-block', marginInlineEnd: '1rem' }} label="Tên dịch vụ" >
                            <Select defaultValue="all" onChange={handleChangeDichVu} suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                <Option value="all"    >Tất cả</Option>
                                {dichVuList.map((dvI) => (
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
                    {/* <h5>Time range</h5> */}
                </Col>
                <Col span='5' style={{ textAlign: 'right' }}>
                    <Form layout="vertical" style={{ width: '100%' }} autoComplete="off">
                        <Form.Item style={{ width: '240px', fontWeight: 'bold', display: 'inline-block' }} label="Từ khóa" >
                            <Input placeholder="Nhập từ khóa..." onChange={(e) => handleSearch(e)} size="small" suffix={<Button type="text"><SearchOutlined size={14} style={{ color: '#FF9138' }} /></Button>} />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>


            <Row className="tableContainer">
                {(capSoList !== undefined || capSoList.length !== 0) ?
                    <Col span={23}>
                        <Table
                            className="capsoTable"
                            dataSource={capSoList}
                            columns={columns}
                            size="small"
                            pagination={{ pageSize: 6, itemRender: itemRender }}
                            bordered
                        >
                        </Table>
                    </Col>
                    
                    : <LoadingSpinner />
                }
            </Row>




            <Button className="add_capSo" style={{ height: '90px', padding: '12px 5px' }} onClick={() => { navigate(`/capso/them`); }}>
                <img src='/img/icon/add_thietbi.png' alt='navbar-img' /> <br />
                Cấp <br /> số mới
            </Button>
        </div>


    )

}