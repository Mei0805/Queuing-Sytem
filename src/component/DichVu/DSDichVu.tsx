import { useState,useEffect } from "react";
import { Row, Col, Button, Table } from "antd"
import { Select, Form, Input } from "antd"
import { SearchOutlined } from '@ant-design/icons';

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { dichvuCreator } from "../../redux";
import { bindActionCreators } from "redux";
import { State } from "../../redux/reducers";

// import { query, collection, getDocs, setDoc, updateDoc, doc, orderBy, getDoc } from 'firebase/firestore'
// import { Dispatch } from "redux";
// import { database } from "../../firebase/fbConfig";
import { LoadingSpinner } from "../Loading";

const { Option } = Select;

export const DSDichVu = () => {
    const navigate = useNavigate();
    let dispatch = useDispatch();
    const [dichVuList, setlistDichVu] = useState([]);
   
    const { actionLoadDichVu } = bindActionCreators(dichvuCreator, dispatch);
     
    const handleChangeHoatdong = (value: string |number) =>{
        console.log(value);
        let data:any = [];
        switch(value){
            case 'all':
                data= listDichVu;
                break;
            case 1:
                data = listDichVu.filter((item:any)=> item.trangThaiHD === true);
                break;
            case 2:
                data = listDichVu.filter((item:any)=> item.trangThaiHD === false);
                break;
        }
        setlistDichVu(data)
    }

    const handleSearch = (e: any) => {
        let keySearch = e.target.value;
        console.log(keySearch);
        console.log(keySearch.length);
        let data: any = [];
        if (keySearch.length >= 0) {
            data = listDichVu.filter((item: any) => {
                return item.tenDichVu.toLowerCase().match(keySearch) || item.tenDichVu.match(keySearch) 
            })
            setlistDichVu(data)
        }
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



    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        actionLoadDichVu();
    }, [])

    const { listDichVu } = useSelector((state: State) => state.dichvu);
    useEffect(() => {
        setlistDichVu(listDichVu)
    }, [listDichVu])

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
                            <Input 
                            placeholder="Nhập tên dịch vụ..." 
                            onChange={(e) => handleSearch(e)}
                            size="small" suffix={<Button type="text"><SearchOutlined size={14} style={{ color: '#FF9138' }} /></Button>} />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            {dichVuList.length === 0 ?
            <LoadingSpinner /> :
            <Row className="tableContainer">
                <Col span={23}>
                    <Table
                        className="dichVuTable"
                        dataSource={dichVuList}
                        columns={columns}
                        size="small"
                        pagination={{ pageSize: 6, itemRender: itemRender }}
                        bordered
                    >
                    </Table>
                </Col>
            </Row>

             }
            <Button className="add_dichvu" style={{ height: '90px', padding: '12px 5px' }} onClick={() => { navigate(`/dichvu/them`); }}>
                <img src='/img/icon/add_thietbi.png' alt='navbar-img' /> <br />
                Thêm <br /> dịch vụ
            </Button>
        </div>


    )

}