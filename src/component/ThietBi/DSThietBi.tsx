import { useState, useEffect } from "react";
import { Row, Col, Button, Table } from "antd"
import { Select, Form, Input } from "antd"
import { SearchOutlined } from '@ant-design/icons';

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { thietbiCreator } from "../../redux";
import { bindActionCreators } from "redux";
import { State } from "../../redux/reducers";
import { LoadingSpinner } from "../Loading";


const { Option } = Select;

export const DSThietBi = () => {
    const navigate = useNavigate();
    let dispatch = useDispatch();
    const [thietBiList, setListThietbi] = useState([]);
    const { actionLoadThietBi } = bindActionCreators(thietbiCreator, dispatch);

    const handleChangeHoatdong = (value: string | number) => {
        console.log(value);
        let data: any = [];
        switch (value) {
            case 'all':
                data = listThietBi;
                break;
            case 1:
                data = listThietBi.filter((item: any) => item.trangThaiHD === true);
                break;
            case 2:
                data = listThietBi.filter((item: any) => item.trangThaiHD === false);
                break;
        }
        setListThietbi(data)
    }
    const handleChangeConnect = (value: string | number) => {
        console.log(value);
        let data: any = [];
        switch (value) {
            case 'all':
                data = listThietBi;
                break;
            case 1:
                data = listThietBi.filter((item: any) => item.trangThaiKN === true);
                break;
            case 2:
                data = listThietBi.filter((item: any) => item.trangThaiKN === false);
                break;
        }
        setListThietbi(data)
    }

    const handleSearch = (e: any) => {
        let keySearch = e.target.value;
        console.log(keySearch);
        console.log(keySearch.length);
        let data: any = [];
        if (keySearch.length >= 0) {
            data = listThietBi.filter((item: any) => {
                return item.tenThietBi.toLowerCase().match(keySearch) || item.tenThietBi.match(keySearch) || item.maThietBi.toLowerCase().match(keySearch) || item.maThietBi.match(keySearch)
            })
            setListThietbi(data)
        }
    }


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
            dataIndex: 'diaChiIP',
            width: 138,
        },
        {
            title: 'Trạng thái hoạt động',
            dataIndex: 'trangThaiHD',
            width: 171,
            render: (dataIndex: boolean) => {

                if (dataIndex === true) {
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
            title: 'Trạng thái kết nối',
            dataIndex: 'trangThaiKN',
            width: 145,
            render: (dataIndex: boolean) => {

                if (dataIndex === true) {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px' }}>
                        <img src='/img/icon/active.png' alt='arrowImg' style={{ paddingRight: '14px' }} />
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
            render: (dataIndex: any) => {
                return (
                    <div className="textDichvu">
                        <p className="contentDichVu">{dataIndex.map((item: any) => { return <span> {item} , </span> })} </p>
                        <a className="more" >Xem thêm</a>
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
                        <Button type="link" onClick={() => { navigate(`/thietbi/chitiet/${dataIndex}`); }}>
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
                        <Button type="link" onClick={() => { navigate(`/thietbi/capnhat/${dataIndex}`); }}>
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

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        actionLoadThietBi();
    }, [])

    const { listThietBi } = useSelector((state: State) => state.thietbi);
    useEffect(() => {
        setListThietbi(listThietBi)
    }, [listThietBi])

    return (
        <div className="thietBiListContainer" style={{ width: '100%' }}>
            <h1>Danh sách thiết bị</h1>
            <Row>
                <Col span='12'>
                    <Form layout="vertical" autoComplete="off">
                        <Form.Item style={{ width: '40%', fontWeight: 'bold', display: 'inline-block', marginInlineEnd: '1rem' }} label="Trạng thái hoạt động" >
                            <Select defaultValue="all" onChange={handleChangeHoatdong} suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                <Option value="all"    >Tất cả</Option>
                                <Option value={1} >Hoạt động</Option>
                                <Option value={2}> Ngưng hoạt động</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item style={{ width: '40%', fontWeight: 'bold', display: 'inline-block' }} label="Trạng thái kết nối" >
                            <Select defaultValue="all" onChange={handleChangeConnect} suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                <Option value="all">Tất cả</Option>
                                <Option value={1}>Kết nối</Option>
                                <Option value={2}>Mất kết nối</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span='11' style={{ textAlign: 'right' }}>
                    <Form layout="vertical" style={{}} autoComplete="off">
                        <Form.Item style={{ width: '40%', fontWeight: 'bold', display: 'inline-block' }} label="Từ khóa" >
                            <Input
                                placeholder="Nhập tên thiết bị..."
                                size="small"
                                onChange={(e) => handleSearch(e)}
                                suffix={<Button type="text"><SearchOutlined size={14} style={{ color: '#FF9138' }} /></Button>} />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Row className="tableContainer">
                <Col span={23}>
                    {thietBiList.length === 0 ?
                        <LoadingSpinner /> :
                        <Table
                            className="thietbiTable"
                            dataSource={thietBiList}
                            columns={columns}
                            size="small"
                            pagination={{ pageSize: 6, itemRender: itemRender }}
                            bordered
                        >
                        </Table>
                    }
                </Col>
            </Row>
            <Button className="add_thietbi" style={{ height: '90px', padding: '12px 5px' }} onClick={() => { navigate(`/thietbi/them`); }}>
                <img src='/img/icon/add_thietbi.png' alt='navbar-img' /> <br />
                Thêm <br /> thiết bị
            </Button>
        </div>


    )

}