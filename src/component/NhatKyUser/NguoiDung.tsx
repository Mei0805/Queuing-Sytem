import '../../style/baocao/BaoCao.scss'
import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { Col, Row, Table, DatePicker } from 'antd';

import { Profile } from '../../component/Profile';
import { NotifyBtn } from '../../component/DashBoard/NotifyBtn';
import { CardNotify } from '../../component/CardNotify';

import { bindActionCreators } from "redux";
import { nhatkyCreator } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/reducers';

export const NguoiDung = () => {
    const dispatch = useDispatch();
    const [startValue, setStartValue] = useState<any>(null);
    const [endValue, setEndValue] = useState<any>(null);
    const [endOpen, setEndOpen] = useState<boolean>(false);

    const [dayStart, setDayStart] = useState<string>('');
    const [dayEnd, setDayEnd] = useState<string>('');


    const [statusNotify, setStatusNotify] = useState<boolean>(false);
    const [nhatKyList, setListNhatKy] = useState<any | undefined>([]);
    

    const { actionLoadNhatKy } = bindActionCreators(nhatkyCreator, dispatch);
    const { listNhatKy } = useSelector((state: State) => state.nhatky);

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
            title: 'T??n ????ng nh???p',
            dataIndex: 'tenDangNhap',
            width: 250,
        },
        {
            title: 'Th???i gian t??c ?????ng',
            dataIndex: 'thoiGianTacDong',
            width: 300,
        },
        {
            title: 'IP th???c hi???n',
            dataIndex: 'diaChiIP',
            width: 300,
        },
        {
            title: 'Thao t??c th???c hi???n',
            dataIndex: 'thaoTac',
            width: 400,
        },
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
        actionLoadNhatKy();
    }, [])

    
    useEffect(() => {
        setListNhatKy(listNhatKy)
    }, [listNhatKy])
    
    return (
        <div className='baocaoContainer'>
            <Row>
                <Col span={16}>
                    <h1 style={{ fontSize: '20px', fontWeight: 700 }}>
                        <span style={{ color: '#7E7D88' }}>C??i ?????t h??? th???ng</span>
                        <img src='/img/icon/breadcrumb.png' alt='navbar-img' />
                        <span>Nh???t k?? ho???t ?????ng</span>
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
                    <h4>Ch???n th???i gian</h4>
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
                    dataSource={nhatKyList}
                    columns={columns}
                    size="large"
                    pagination={{ pageSize: 6, itemRender: itemRender }}
                    bordered
                />
            </Row>
        </div>
    )
}