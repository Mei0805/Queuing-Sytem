import '../../style/baocao/BaoCao.scss'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { Col, Row, Table, Button, DatePicker } from 'antd';

import { Profile } from '../../component/Profile';
import { NotifyBtn } from '../../component/DashBoard/NotifyBtn';
import { CardNotify } from '../../component/CardNotify';

export const BaoCao = () => {
    const [startValue, setStartValue] = useState<any>(null);
    const [endValue, setEndValue] = useState<any>(null);
    const [endOpen, setEndOpen] = useState<boolean>(false);

    const [dayStart, setDayStart] = useState<string>('');
    const [dayEnd, setDayEnd] = useState<string>('');


    const [statusNotify, setStatusNotify] = useState<boolean>(false);
    const navigate = useNavigate();

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
            width:'200',
            filters: [
                {
                    text: 'Tất cả',
                    value: '2010001',
                },
                {
                    text: '2010001',
                    value: '2010001',
                },
                {
                    text: '2010002',
                    value: '2010002',
                },
              ],
              onFilter: (value:any, record:any) => record.id.indexOf(value) === 0,
              
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: 'tenDichVu',
            width: 300,
            filters: [
                {
                    text: 'Tất cả',
                    value: 'all',
                },
                {
                    text: 'Khám tim mạch',
                    value: 'Khám tim mạch',
                },
                {
                    text: 'Khám mắt',
                    value: 'Khám mắt',
                },
                {
                    text: 'Khám tổng quát',
                    value: 'Khám tổng quát',
                },
                {
                    text: 'Khám tai mũi họng',
                    value: 'Khám tai mũi họng',
                },
                {
                    text: 'Khám hô hấp',
                    value: 'Khám hô hấp',
                },
              ],
              onFilter: (value:any, record:any) => record.tenDichvu.indexOf(value) === 0,
        },
        {
            title: 'Thời gian cấp',
            dataIndex: 'thoiGianCap',
            width: 300,
            filters: [
                {
                    text: 'Tất cả',
                    value: 'all',
                },
                {
                    text: '14:35 07/11/2021',
                    value: '14:35 - 07/11/2021',
                },
                {
                    text: '14:35 08/11/2021',
                    value: '14:35 - 08/11/2021',
                },
                {
                    text: '14:35 09/11/2021',
                    value: '14:35 - 09/11/2021',
                },
                {
                    text: '14:35 10/11/2021',
                    value: '14:35 - 10/11/2021',
                },
              ],
              onFilter: (value:any, record:any) => record.thoiGianCap.indexOf(value) === 0,
        },
        {
            title: 'Tình trạng',
            dataIndex: 'tinhTrang',
            width: 300,
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

            },
            filters: [
                {
                    text: 'Tất cả',
                    value: 'all',
                },
                {
                    text: 'Đang chờ',
                    value: 1,
                },
                {
                    text: 'Đã sử dụng',
                    value: 0,
                },
                {
                    text: 'Bỏ qua',
                    value: 2,
                },
              ],
              onFilter: (value:any, record:any) => record.tinhTrang.indexOf(value) === 0,

        },
        {
            title: 'Nguồn cấp',
            dataIndex: 'nguonCap',
            width: 200,
            filters: [
                {
                    text: 'Tất cả',
                    value: 'all',
                },
                {
                    text: 'Kiosk',
                    value: 'Kiosk',
                },
                {
                    text: 'Hệ thống',
                    value: 'Hệ thống',
                }
              ],
              onFilter: (value:any, record:any) => record.nguonCap.indexOf(value) === 0,
        }

    ];

    const baocao = [
        {
            "id": "2010001",
            "tenKhachHang": "Lê Huỳnh Ái Vân",
            "tenDichVu": "Khám tim mạch",
            "thoiGianCap": "14:35 - 07/11/2021",
            "hanSuDung": "14:35 - 12/11/2021",
            "tinhTrang": 0,
            "nguonCap": "Kiosk"
        },
        {
            "id": "2010002",
            "tenKhachHang": "Huỳnh Ái Vân",
            "tenDichVu": "Khám sản - Phụ khoa",
            "thoiGianCap": "14:35 - 08/11/2021",
            "hanSuDung": "14:35 - 12/11/2021",
            "tinhTrang": 1,
            "nguonCap": "Kiosk"
        },
        {
            "id": "2010003",
            "tenKhachHang": "Lê Ái Vân",
            "tenDichVu": "Khám răng hàm mặt",
            "thoiGianCap": "14:35 - 09/11/2021",
            "hanSuDung": "14:35 - 12/11/2021",
            "tinhTrang": 2,
            "nguonCap": "Hệ thống"
        },
        {
            "id": "2010004",
            "tenKhachHang": "Trần Thị Ái Vân",
            "tenDichVu": "Khám tai mũi họng",
            "thoiGianCap": "14:35 - 10/11/2021",
            "hanSuDung": "14:35 - 12/11/2021",
            "tinhTrang": 2,
            "nguonCap": "Hệ thống"
        },
        {
            "id": "2010005",
            "tenKhachHang": "Lê Huỳnh Nghĩa",
            "tenDichVu": "Khám tổng quát",
            "thoiGianCap": "14:35 - 07/11/2021",
            "hanSuDung": "14:35 - 12/11/2021",
            "tinhTrang": 0,
            "nguonCap": "Kiosk"
        },
    ]

    const [listBaocao, setListBaocao] = useState(baocao);

    function itemRender(current: any, type: any, originalElement: any) {
        if (type === 'prev') {
            return <a><img src='/img/icon/left_pagination.png' alt='arrowImg' /></a>;
        } else if (type === 'next') {
            return <a><img src='/img/icon/right_pagination.png' alt='arrowImg' /></a>;
        }
        return originalElement;
    }



    return (
        <div className='baocaoContainer'>
            <Row>
                <Col span={16}>
                    <h1 style={{ fontSize: '20px', fontWeight: 700 }}>
                        <span style={{ color: '#7E7D88' }}>Báo cáo</span>
                        <img src='/img/icon/breadcrumb.png' alt='navbar-img' />
                        <span>Lập báo cáo</span>
                    </h1>
                </Col>
                <Col span={7} id='notifyContainer'>
                    <NotifyBtn trigger={statusNotify} setTrigger={setStatusNotify} />
                    <Profile />
                    {statusNotify ? <CardNotify /> : <></>}
                </Col>
            </Row>
            <Row>
                <div style={{ width: '100%' }}>
                    <h4>Chọn thời gian</h4>
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

            </Row>
            <Row >
                <Table
                    className="thietbiTable"
                    dataSource={listBaocao}
                    columns={columns}
                    size="large"
                    pagination={{ pageSize: 6, itemRender: itemRender }}
                    bordered
                />
            </Row>
            <Button className="download" style={{ height: '90px', padding: '12px 5px' }} onClick={() => { navigate(`/thietbi/them`); }}>
                <img src='/img/icon/document-download.png' alt='navbar-img' /> <br />
                Tải về
            </Button>
        </div>
    )
}