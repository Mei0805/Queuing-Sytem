import { useState } from "react";
import { Row, Col, Button, Table } from "antd"
import { Select, Form, Input } from "antd"
import { SearchOutlined } from '@ant-design/icons';

import { useNavigate } from "react-router-dom";

const { Option } = Select;

export const DSVaiTro = () => {
    const navigate = useNavigate();
    const vaitro = [
        {
            "id": 1,
            "tenVaiTro": "Kế toán",
            "soNguoiDung": 6,
            "trangThaiHD": 1,
            "moTa": "Mô tả dịch vụ"
        },
        {
            "id": 2,
            "tenVaiTro": "Bác sĩ ",
            "soNguoiDung": 6,
            "trangThaiHD": 1,
            "moTa": "Mô tả dịch vụ"
        },
        {
            "id": 3,
            "tenVaiTro": "Lễ tân",
            "soNguoiDung": 6,
            "trangThaiHD": 1,
            "moTa": "Mô tả dịch vụ"
        },
        {
            "id": 4,
            "tenVaiTro": "Quản lý",
            "soNguoiDung": 6,
            "trangThaiHD": 1,
            "moTa": "Mô tả dịch vụ"
        },
        {
            "id": 5,
            "tenVaiTro": "Admin",
            "soNguoiDung": 6,
            "trangThaiHD": 1,
            "moTa": "Mô tả dịch vụ"
        },
        {
            "id": 6,
            "tenVaiTro": "Superadmin",
            "soNguoiDung": 6,
            "trangThaiHD": 1,
            "moTa": "Mô tả dịch vụ"
        },
    ]
    const [listVaiTro, setListVaiTro] = useState(vaitro);

    const columns = [

        {
            title: 'Tên vai trò',
            dataIndex: 'tenVaiTro',
            width: 300,
        },
        {
            title: 'Số người dùng',
            dataIndex: 'soNguoiDung',
            width: 200,
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            width: 500,
        },
        {
            title: ' ',
            dataIndex: 'id',
            render: (dataIndex: any) => {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <Button type="link" onClick={() => { navigate(`/vaitro/capnhat/${dataIndex}`); }}>
                            Cập nhật
                        </Button>
                    </div>
                )
            }
        }

    ];
    const handleSearch = (e: any) => {
        let keySearch = e.target.value;
        console.log(keySearch);
        console.log(keySearch.length);
        let data: any = [];
        if (keySearch.length >= 0) {
            data = vaitro.filter((item: any) => {
                return item.tenVaiTro.toLowerCase().match(keySearch) || item.tenVaiTro.match(keySearch)
            })
            setListVaiTro(data)
        }
    }

    function itemRender(current: any, type: any, originalElement: any) {
        if (type === 'prev') {
            return <a><img src='/img/icon/left_pagination.png' alt='arrowImg' /></a>;
        } else if (type === 'next') {
            return <a><img src='/img/icon/right_pagination.png' alt='arrowImg' /></a>;
        }
        return originalElement;
    }


    return (
        <div className="vaiTroListContainer" style={{ width: '100%' }}>
            <h1>Danh sách vai trò</h1>
            <Row style={{ justifyContent: 'flex-end' }}>
                <Col span={23} style={{ display:'flex',justifyContent: 'flex-end' }}>
                    <Form layout="vertical" style={{ width: '240px' }} autoComplete="off">
                        <Form.Item style={{ fontWeight: 'bold', display: 'inline-block' }} label="Từ khóa" >
                            <Input placeholder="Nhập từ khóa..." 
                            onChange={(e) => handleSearch(e) }
                            size="small" suffix={<Button type="text"><SearchOutlined size={14} style={{ color: '#FF9138' }} /></Button>} />
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={1}></Col>

            </Row>
            <Row className="tableContainer">
                <Col span={23}>
                    <Table
                        className="vaitroTable"
                        dataSource={listVaiTro}
                        columns={columns}
                        size="small"
                        pagination={{ pageSize: 6, itemRender: itemRender }}
                        bordered
                    >
                    </Table>
                </Col>
            </Row>
            <Button className="add_vaitro" style={{ height: '90px', padding: '12px 5px' }} onClick={() => { navigate(`/vaitro/them`); }}>
                <img src='/img/icon/add_thietbi.png' alt='navbar-img' /> <br />
                Thêm <br /> vai trò
            </Button>
        </div>


    )

}