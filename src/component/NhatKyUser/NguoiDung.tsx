import '../../style/baocao/BaoCao.scss'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { Col, Row, Table, Button, DatePicker } from 'antd';

import { Profile } from '../../component/Profile';
import { NotifyBtn } from '../../component/DashBoard/NotifyBtn';
import { CardNotify } from '../../component/CardNotify';

export const NguoiDung = () => {
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
            title: 'Tên đăng nhập',
            dataIndex: 'tenDangNhap',
            width: 250,
        },
        {
            title: 'Thời gian tác động',
            dataIndex: 'thoiGianTacDong',
            width: 300,
        },
        {
            title: 'IP thực hiện',
            dataIndex: 'IP',
            width: 300,
        },
        {
            title: 'Thao tác thực hiện',
            dataIndex: 'thaoTac',
            width: 400,
        },
    ];

    const nhatky = [
        {
            "id": "2010001",
            "tenDangNhap": "tuyetnguyen@12",
            "thoiGianTacDong": "01/12/2021 15:12:17",
            "IP": "192.168.3.1",
            "thaoTac": 'Cập nhật thông tin dịch vụ DV_01',
        },
        {
            "id": "2010001",
            "tenDangNhap": "tuyetnguyen@12",
            "thoiGianTacDong": "01/12/2021 15:12:17",
            "IP": "192.168.3.1",
            "thaoTac": 'Cập nhật thông tin dịch vụ DV_01',
        },
        {
            "id": "2010001",
            "tenDangNhap": "tuyetnguyen@12",
            "thoiGianTacDong": "01/12/2021 15:12:17",
            "IP": "192.168.3.1",
            "thaoTac": 'Cập nhật thông tin dịch vụ DV_01',
        },
        {
            "id": "2010001",
            "tenDangNhap": "tuyetnguyen@12",
            "thoiGianTacDong": "01/12/2021 15:12:17",
            "IP": "192.168.3.1",
            "thaoTac": 'Cập nhật thông tin dịch vụ DV_01',
        },
        {
            "id": "2010001",
            "tenDangNhap": "tuyetnguyen@12",
            "thoiGianTacDong": "01/12/2021 15:12:17",
            "IP": "192.168.3.1",
            "thaoTac": 'Cập nhật thông tin dịch vụ DV_01',
        },
        {
            "id": "2010001",
            "tenDangNhap": "tuyetnguyen@12",
            "thoiGianTacDong": "01/12/2021 15:12:17",
            "IP": "192.168.3.1",
            "thaoTac": 'Cập nhật thông tin dịch vụ DV_01',
        },
        {
            "id": "2010001",
            "tenDangNhap": "tuyetnguyen@12",
            "thoiGianTacDong": "01/12/2021 15:12:17",
            "IP": "192.168.3.1",
            "thaoTac": 'Cập nhật thông tin dịch vụ DV_01',
        },
        {
            "id": "2010001",
            "tenDangNhap": "tuyetnguyen@12",
            "thoiGianTacDong": "01/12/2021 15:12:17",
            "IP": "192.168.3.1",
            "thaoTac": 'Cập nhật thông tin dịch vụ DV_01',
        },
        {
            "id": "2010001",
            "tenDangNhap": "tuyetnguyen@12",
            "thoiGianTacDong": "01/12/2021 15:12:17",
            "IP": "192.168.3.1",
            "thaoTac": 'Cập nhật thông tin dịch vụ DV_01',
        },
        {
            "id": "2010001",
            "tenDangNhap": "tuyetnguyen@12",
            "thoiGianTacDong": "01/12/2021 15:12:17",
            "IP": "192.168.3.1",
            "thaoTac": 'Cập nhật thông tin dịch vụ DV_01',
        },
        {
            "id": "2010001",
            "tenDangNhap": "tuyetnguyen@12",
            "thoiGianTacDong": "01/12/2021 15:12:17",
            "IP": "192.168.3.1",
            "thaoTac": 'Cập nhật thông tin dịch vụ DV_01',
        },
        {
            "id": "2010001",
            "tenDangNhap": "tuyetnguyen@12",
            "thoiGianTacDong": "01/12/2021 15:12:17",
            "IP": "192.168.3.1",
            "thaoTac": 'Cập nhật thông tin dịch vụ DV_01',
        },
    ]

    const [listNhatKy, setListNhatKy] = useState(nhatky);

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
                        <span style={{ color: '#7E7D88' }}>Cài đặt hệ thống</span>
                        <img src='/img/icon/breadcrumb.png' alt='navbar-img' />
                        <span>Nhật ký hoạt động</span>
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
                    dataSource={listNhatKy}
                    columns={columns}
                    size="large"
                    pagination={{ pageSize: 6, itemRender: itemRender }}
                    bordered
                />
            </Row>
        </div>
    )
}