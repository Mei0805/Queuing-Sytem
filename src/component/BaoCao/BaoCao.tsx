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
            thaoTac: 'T???i xu???ng b??o C??o'
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
            title: 'S??? th??? t???',
            dataIndex: 'STT',
            width: '200',
            sorter: (a: any, b: any) => a.STT - b.STT,
        },
        {
            title: 'T??n d???ch v???',
            dataIndex: 'tenDV',
            width: 300,
            filters: [
                {
                    text: 'T???t c???',
                    value: 'all',
                },
                {
                    text: 'Kh??m tim m???ch',
                    value: 'Kh??m tim m???ch',
                },
                {
                    text: 'Kh??m s???n-Ph??? khoa',
                    value: 'Kh??m s???n-Ph??? khoa',
                },
                {
                    text: 'Kh??m m???t',
                    value: 'Kh??m m???t',
                },
                {
                    text: 'Kh??m t???ng qu??t',
                    value: 'Kh??m t???ng qu??t',
                },
                {
                    text: 'Kh??m tai m??i h???ng',
                    value: 'Kh??m tai m??i h???ng',
                },
                {
                    text: 'Kh??m h?? h???p',
                    value: 'Kh??m h?? h???p',
                },
            ],
            onFilter: (value: any, record: any) => record.tenDV.indexOf(value) === 0,
        },
        {
            title: 'Th???i gian c???p',
            dataIndex: 'thoiGianCap',
            width: 300,
        },
        {
            title: 'T??nh tr???ng',
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
            title: 'Ngu???n c???p',
            dataIndex: 'nguonCap',
            width: 200,
            filters: [
                {
                    text: 'T???t c???',
                    value: 'all',
                },
                {
                    text: 'Kiosk',
                    value: 'Kiosk',
                },
                {
                    text: 'H??? th???ng',
                    value: 'H??? th???ng',
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
            label: 'T??n d???ch v???',
            key: 'tenDV',
        },
        {
            label: 'Th???i gian c???p',
            key: 'thoiGianCap',
        },
        {
            label: 'T??nh tr???ng',
            key: 'trangThai.value',
        },
        {
            label: 'Ngu???n c???p',
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
    //                 thaoTac: 'C???p nh???t th??ng tin d???ch v??? DV_01'
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
                        <span style={{ color: '#7E7D88' }}>B??o c??o</span>
                        <img src='/img/icon/breadcrumb.png' alt='navbar-img' />
                        <span>L???p b??o c??o</span>
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
                                T???i v???
                            </Button>
                        </CSVLink>;
                    </>
            }


        </div>

    )
}