import '../../style/baocao/BaoCao.scss'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { CSVLink } from 'react-csv'

import { useDispatch, useSelector } from "react-redux";
import { capsoCreator, nhatkyCreator } from "../../redux";
import { bindActionCreators } from "redux";
import { State } from "../../redux/reducers";

import { Col, Row, Table, Button, DatePicker } from 'antd';

import { Profile } from '../../component/Profile';
import { NotifyBtn } from '../../component/DashBoard/NotifyBtn';
import { CardNotify } from '../../component/CardNotify';
import { LoadingSpinner } from '../Loading';

export const BaoCao = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function zeroPad(num: any, places: any) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }

    const [capSoList, setCapSoList] = useState();
    const [listBaocao, setListBaocao] = useState([]);

    const { actionLoadCapSo } = bindActionCreators(capsoCreator, dispatch);

    const [startValue, setStartValue] = useState<any>(null);
    const [endValue, setEndValue] = useState<any>(null);
    const [endOpen, setEndOpen] = useState<boolean>(false);

    const [dayStart, setDayStart] = useState<string>('');
    const [dayEnd, setDayEnd] = useState<string>('');

    const [statusNotify, setStatusNotify] = useState<boolean>(false);

    const { actionLoadNhatKy, actionAddNhatKy } = bindActionCreators(nhatkyCreator, dispatch);
    const { listNhatKy } = useSelector((state: State) => state.nhatky);
    const { userLogin } = useSelector((state: State) => state.taikhoan);

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

    const handleAction = () => {
        let len = listNhatKy.length;
        let STT = len++;
        var d = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        var time = date.getHours() + ":" + date.getMinutes();
        var dateTime = time + ' - ' + d;
        let item = {
            STT: zeroPad(STT, 6),
            tenDangNhap: userLogin[0].hoTen,
            thoiGianTacDong: dateTime,
            diaChiIP: "192.168.3.1",
            thaoTac: 'Tải xuống báo Cáo'
        }
        actionAddNhatKy(item)
    }

    useEffect(() => {
        console.log('dayStart', dayStart);
    }, [dayStart]);

    useEffect(() => {
        console.log('dayEnd', dayEnd);
    }, [dayEnd]);

    const columns = [
        {
            title: 'Số thứ tự',
            dataIndex: 'STT',
            width: '200',
            sorter: (a: any, b: any) => a.STT - b.STT,
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: 'tenDV',
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
                    text: 'Khám sản-Phụ khoa',
                    value: 'Khám sản-Phụ khoa',
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
            onFilter: (value: any, record: any) => record.tenDV.indexOf(value) === 0,
        },
        {
            title: 'Thời gian cấp',
            dataIndex: 'thoiGianCap',
            width: 300,
        },
        {
            title: 'Tình trạng',
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
            onFilter: (value: any, record: any) => record.nguonCap.indexOf(value) === 0,
        }

    ];
    const header = [
        {
            label: 'STT',
            key: 'STT',
        },
        {
            label: 'Tên dịch vụ',
            key: 'tenDV',
        },
        {
            label: 'Thời gian cấp',
            key: 'thoiGianCap',
        },
        {
            label: 'Tình trạng',
            key: 'trangThai.value',
        },
        {
            label: 'Nguồn cấp',
            key: 'nguonCap',
        },
    ]

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
        actionLoadNhatKy();
        setListBaocao(listCapSo)
    }, [listCapSo])

    //  const addTB = () =>{
    //         async function add(){
    //             const data1 = query(collection(database, "DSNhatKy"));
    //             const snapdt1 = await getDocs(data1);
    //             const dt1 = snapdt1.docs.map((item: any) => ({
    //                 ...item.data(),
    //                 id: item.id
    //             }))

    //             let len = dt1.length;
    //             let stt = len+1;

    //             let item ={
    //                 STT: zeroPad(stt,6),
    //                 tenDangNhap: 'tuyetnguyen@12',
    //                 thoiGianTacDong: '15:12 - 01/12/2021',
    //                 diaChiIP: "192.168.3.1",
    //                 thaoTac: 'Cập nhật thông tin dịch vụ DV_01'
    //             }

    //             const snapshot = collection(database, "DSNhatKy");
    //             await setDoc(doc(snapshot), item)
    //         }
    //         add()
    //    }; 
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
            {
                listBaocao.length === 0 ?
                    <LoadingSpinner />
                    : <>
                        <Row className='baoCaoTContainer'>

                            <Table
                                className="baocaoTable"
                                dataSource={listBaocao}
                                columns={columns}
                                size="large"
                                pagination={{ pageSize: 6, itemRender: itemRender }}
                                bordered
                            />


                        </Row>

                        <CSVLink data={listBaocao} headers={header} onClick={handleAction} >
                            <Button className="download" style={{ height: '90px', padding: '12px 5px' }} >
                                <img src='/img/icon/document-download.png' alt='navbar-img' /> <br />
                                Tải về
                            </Button>
                        </CSVLink>;
                    </>
            }


        </div>

    )
}