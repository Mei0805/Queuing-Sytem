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
            title: 'M?? thi???t b???',
            dataIndex: 'maThietBi',
            width: 120,
        },
        {
            title: 'T??n thi???t b???',
            dataIndex: 'tenThietBi',
            width: 119,
        },
        {
            title: '?????a ch??? IP',
            dataIndex: 'diaChiIP',
            width: 138,
        },
        {
            title: 'Tr???ng th??i ho???t ?????ng',
            dataIndex: 'trangThaiHD',
            width: 171,
            render: (dataIndex: boolean) => {

                if (dataIndex === true) {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px' }}>
                        <img src='/img/icon/active.png' alt='arrowImg' style={{ paddingRight: '14px' }} />
                        Ho???t ?????ng
                    </div>
                }
                else {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px' }}>
                        <img src='/img/icon/deactive.png' alt='arrowImg' style={{ paddingRight: '14px' }} />
                        Ng??ng ho???t ?????ng
                    </div>
                }

            }

        },
        {
            title: 'Tr???ng th??i k???t n???i',
            dataIndex: 'trangThaiKN',
            width: 145,
            render: (dataIndex: boolean) => {

                if (dataIndex === true) {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px' }}>
                        <img src='/img/icon/active.png' alt='arrowImg' style={{ paddingRight: '14px' }} />
                        K???t n???i
                    </div>
                }
                else {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px' }}>
                        <img src='/img/icon/deactive.png' alt='arrowImg' style={{ paddingRight: '14px' }} />
                        M???t k???t n???i
                    </div>
                }

            }

        },
        {
            title: 'D???ch v??? s??? d???ng',
            dataIndex: 'dichVu',
            width: 268,
            render: (dataIndex: any) => {
                return (
                    <div className="textDichvu">
                        <p className="contentDichVu">{dataIndex.map((item: any) => { return <span> {item} , </span> })} </p>
                        <a className="more" >Xem th??m</a>
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
                            Chi ti???t
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
                            C???p nh???t
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
            <h1>Danh s??ch thi???t b???</h1>
            <Row>
                <Col span='12'>
                    <Form layout="vertical" autoComplete="off">
                        <Form.Item style={{ width: '40%', fontWeight: 'bold', display: 'inline-block', marginInlineEnd: '1rem' }} label="Tr???ng th??i ho???t ?????ng" >
                            <Select defaultValue="all" onChange={handleChangeHoatdong} suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                <Option value="all"    >T???t c???</Option>
                                <Option value={1} >Ho???t ?????ng</Option>
                                <Option value={2}> Ng??ng ho???t ?????ng</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item style={{ width: '40%', fontWeight: 'bold', display: 'inline-block' }} label="Tr???ng th??i k???t n???i" >
                            <Select defaultValue="all" onChange={handleChangeConnect} suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                <Option value="all">T???t c???</Option>
                                <Option value={1}>K???t n???i</Option>
                                <Option value={2}>M???t k???t n???i</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span='11' style={{ textAlign: 'right' }}>
                    <Form layout="vertical" style={{}} autoComplete="off">
                        <Form.Item style={{ width: '40%', fontWeight: 'bold', display: 'inline-block' }} label="T??? kh??a" >
                            <Input
                                placeholder="Nh???p t??n thi???t b???..."
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
                Th??m <br /> thi???t b???
            </Button>
        </div>


    )

}