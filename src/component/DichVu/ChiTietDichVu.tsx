import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from 'moment';
import { Col, Row, Input, DatePicker, Table } from "antd";
import { Select, Form, Button } from "antd"

import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

export const ChiTietDichVu = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const [startValue, setStartValue] = useState<any>(null);
    const [endValue, setEndValue] = useState<any>(null);
    const [endOpen, setEndOpen] = useState<boolean>(false);

    const [dayStart, setDayStart] = useState<string>('');
    const [dayEnd, setDayEnd] = useState<string>('');

    const date = new Date();

    const dateFormat = 'DD/MM/YYYY';

    const disabledEndDate = (endValue: any) => {
        if (!endValue || !(startValue - 1)) {
            return false;
        } else if (!startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };

    const onStartChange = (value: any) => {
        setStartValue(value);
        const test = value._d;
        console.log(test);
        const day = test.getDate();
        const month = test.getMonth() + 1;
        const year = test.getFullYear();
        let dayString = '';
        let monthString = '';
        if (day < 10) {
            dayString = `0${day}`;
        } else {
            dayString = `${day}`
        }
        if (month < 10) {
            monthString = `0${month}`;
        } else {
            monthString = `${month}`
        }
        const date = `${dayString}/${monthString}/${year}`;
        setDayStart(date);
        console.log(date);
    };

    const onEndChange = (value: any) => {
        setEndValue(value);
        const test = value._d;
        console.log(test);
        const day = test.getDate();
        const month = test.getMonth() + 1;
        const year = test.getFullYear();
        let dayString = '';
        let monthString = '';
        if (day < 10) {
            dayString = `0${day}`;
        } else {
            dayString = `${day}`
        }
        if (month < 10) {
            monthString = `0${month}`;
        } else {
            monthString = `${month}`
        }
        const date = `${dayString}/${monthString}/${year}`;
        setDayEnd(date);
        console.log(date);
    };

    const handleStartOpenChange = (open: any) => {
        if (!open) {
            setEndOpen(true);
        }
    };

    const handleEndOpenChange = (open: any) => {
        setEndOpen(open);
    };

    const [statusNotify, setStatusNotify] = useState<boolean>(false);
    useEffect(() => {
        console.log('dayStart', dayStart);
    }, [dayStart]);

    useEffect(() => {
        console.log('dayEnd', dayEnd);
    }, [dayEnd]);

    const columns = [
        {
            title: 'Số thứ tự',
            dataIndex: 'id',
            width: 334,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            width: 334,
            render: (dataIndex: number) => {
                //0: vắng , 1:đã hoàn thành , 2: đang thực hiện
                if (dataIndex == 1) {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px' }}>
                        <img src='/img/icon/active.png' alt='arrowImg' style={{ paddingRight: '14px' }} />
                        Đã hoàn thành
                    </div>
                }
                else if (dataIndex == 0) {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px' }}>
                        <img src='/img/icon/disable.png' alt='arrowImg' style={{ paddingRight: '14px' }} />
                        Vắng
                    </div>
                }
                else if (dataIndex == 2) {
                    return <div className='d-flex align-items-center' style={{ fontSize: '14px' }}>
                        <img src='/img/icon/pending.png' alt='arrowImg' style={{ paddingRight: '14px' }} />
                        Đang thực hiện
                    </div>
                }

            }
        },

    ];

    const dichVu = [
        {
            id: 2010001,
            trangThai: 1,
        },
        {
            id: 2010002,
            trangThai: 1,
        },
        {
            id: 2010003,
            trangThai: 0,
        },
        {
            id: 2010004,
            trangThai: 2,
        },

        {
            id: 2010003,
            trangThai: 0,
        },
        {
            id: 2010004,
            trangThai: 2,
        },

        {
            id: 2010003,
            trangThai: 0,
        },
        {
            id: 2010004,
            trangThai: 2,
        }
    ]

    const [listDichVu, setListDichVu] = useState(dichVu);

    function itemRender(current: any, type: any, originalElement: any) {
        if (type === 'prev') {
            return <a><img src='/img/icon/left_pagination.png' alt='arrowImg' /></a>;
        } else if (type === 'next') {
            return <a><img src='/img/icon/right_pagination.png' alt='arrowImg' /></a>;
        }
        return originalElement;
    }

    const handleChangeTrangThai = (value: string | number) => {
        console.log(value);
        let data: any = [];
        switch (value) {
            case 'all':
                data = dichVu;
                break;
            case 0:
                data = dichVu.filter((item) => item.trangThai == 0);
                break;
            case 1:
                data = dichVu.filter((item) => item.trangThai == 1);
                break;
            case 2:
                data = dichVu.filter((item) => item.trangThai == 2);
                break;
        }
        setListDichVu(data)
    }

    return (
        <div className="detailDichVuContainer" style={{ width: '100%' }}>
            <h1>Quản lý dịch vụ</h1>
            <div className="thongtinContainer">
                <Row >
                    <Col span={6} className='thongtin' >
                        <h5 style={{ width: '100%', marginBottom: '15px', fontSize: '20px', fontWeight: '700', color: '#FF7506' }}>Thông tin dịch vụ</h5>
                        <div className="infoField">
                            <span className="tittleInfo">Mã dịch vụ: </span>  201
                        </div>
                        <div className="infoField">
                            <span className="tittleInfo">Tên dịch vụ: </span> Khám tim mạch
                        </div>
                        <div className="infoField">
                            <span className="tittleInfo">Mô tả: </span> Chuyên các bệnh lý về tim
                        </div>
                        <h5 style={{ width: '100%', marginBottom: '15px', fontSize: '20px', fontWeight: '700', color: '#FF7506' }}>Quy tắc cấp số</h5>
                        <div className="infoField">
                            <span className="tittleInfo">Tăng tự động: </span>
                            <Input defaultValue="0001" style={{ width: '61px' }} />
                            &nbsp; đến &nbsp;
                            <Input defaultValue="9999" style={{ width: '61px' }} />
                        </div>
                        <div className="infoField">
                            <span className="tittleInfo">Prefix: </span>
                            <Input defaultValue="0001" style={{ width: '61px' }} />
                        </div>
                        <div className="infoField">
                            <span className="tittleInfo">Reset mỗi ngày </span>
                        </div>
                    </Col>

                    <Col span={16} className='bangThongTin'>
                        <Row style={{ justifyContent: 'space-between' }}>
                            <Col>
                                <Form.Item style={{ width: '154px', fontWeight: 'bold', display: 'inline-block' }} label="Nguồn cấp" >
                                    <Select defaultValue="all" onChange={handleChangeTrangThai} suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                        <Option value="all">Tất cả</Option>
                                        <Option value={0}>Vắng</Option>
                                        <Option value={1}>Đã hoàn thành</Option>
                                        <Option value={2}>Đang thực hiện</Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col>
                                <div style={{ width: '100%' }}>
                                    <h4><b>Chọn thời gian</b></h4>
                                </div>
                                <div className='timeRange'>
                                    <DatePicker
                                        disabledDate={(current) => current.isBefore(moment().subtract(1, "day"))}
                                        value={startValue}
                                        placeholder={`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
                                        onChange={onStartChange}
                                        format={dateFormat}
                                        onOpenChange={handleStartOpenChange}
                                        suffixIcon={<img src='/img/icon/calendar.png' alt='calendar-icn' />}

                                    />
                                    <img src='/img/icon/arrow-rightcalendar.png' className="ant-picker-img" alt='calendar-icn' />
                                    <DatePicker
                                        disabledDate={disabledEndDate}
                                        value={endValue}
                                        placeholder={`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
                                        format={dateFormat}
                                        suffixIcon={<img src='/img/icon/calendar.png' alt='calendar-icn' />}
                                        onChange={onEndChange}
                                        open={endOpen}
                                        onOpenChange={handleEndOpenChange}
                                    />
                                </div>
                            </Col>

                            <Col>
                                <Form layout="vertical" style={{ width: '100%' }} autoComplete="off">
                                    <Form.Item style={{ width: '240px', fontWeight: 'bold', display: 'inline-block' }} label="Từ khóa" >
                                        <Input placeholder="Nhập từ khóa..." size="small" suffix={<Button type="text"><SearchOutlined size={14} style={{ color: '#FF9138' }} /></Button>} />
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                        <Row >
                            <Table
                                style={{ width: '100%' }}
                                className="thietbiTable"
                                dataSource={listDichVu}
                                columns={columns}
                                size="large"
                                pagination={{ pageSize: 6, itemRender: itemRender }}
                                bordered
                            />
                        </Row>
                    </Col>

                </Row>
            </div>
            <div className="btn-group">
                <Button className="update_dichvu" style={{ height: '90px', padding: '12px 5px', borderBottom:'1px solid #FFE3CD' }} onClick={() => { navigate(`/dichvu/capnhat/${id}`); }}>
                    <img src='/img/icon/edit Square.png' alt='navbar-img' /> <br />
                    Cập nhật <br /> danh sách
                </Button>
                <Button className="back_dichvu" style={{ height: '90px', padding: '12px 5px' }} onClick={() => { navigate(`/dichvu`); }}>
                    <img src='/img/icon/back-square.png' alt='navbar-img' /> <br />
                    Quay lại
                </Button>
            </div>
        </div>
    )

}