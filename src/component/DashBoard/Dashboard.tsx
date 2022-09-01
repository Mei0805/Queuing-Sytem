import { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../../style/dashboard/Dashboard.scss'
import { Col, Row } from 'antd';
import { Card, Badge, Select } from 'antd';

import { ThietBiRadial } from './RadialBar/ThietBi';
import { DichVuRadial } from './RadialBar/DichVu';
import { CapSoRadial } from './RadialBar/CapSo';

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

import { CardNotify } from '../CardNotify';
import { Profile } from '../Profile';
import { NotifyBtn } from './NotifyBtn';

import axios from 'axios';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { capsoCreator } from '../../redux';
import { State } from '../../redux/reducers';


const { Option } = Select;

export const Dashboard = () => {
    const dispatch = useDispatch();
    const [date, setDate] = useState<any>(new Date());
    const [statusNotify, setStatusNotify] = useState<boolean>(false);
    const { actionLoadCapSo } = bindActionCreators(capsoCreator, dispatch);
    const { listCapSo } = useSelector((state: State) => state.capso);

    const navigate = useNavigate();

    const [ip, setIP] = useState('');

    const dataUsed = listCapSo.filter((item: any) => item.trangThai.id === 0);
    const dataPending = listCapSo.filter((item: any) => item.trangThai.id === 1);
    const dataPassed = listCapSo.filter((item: any) => item.trangThai.id === 2);

    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data);
        setIP(res.data.IPv4)
    }
    useEffect(() => {
        //passing getData method to the lifecycle method
        getData()
        actionLoadCapSo()
    }, [])
    const handleChange = (value: any) => {
        if (value === 'day') {
            navigate('/dashboard');
        } else if (value === 'week') {
            navigate('/dashboard/dashboardWeek');
        } else {
            navigate('/dashboard/dashboardMonth');
        }
    }
    return (
        <Row className='dashboardContainer'>
            {listCapSo &&
                <Col className='main-col' span={17}>
                    {/* <h5>Địa chỉ IP: {ip}</h5> */}
                    <h1 style={{ fontSize: '20px' }}>Dashboard</h1>

                    <h2>Biểu đồ cấp số</h2>
                    <Row className='cardContainer'>

                        <Card className='cardItem'>
                            <Link to='/capso' style={{color:'black'}} >
                                <div className="cardTittle">
                                    <div className="iconContainer" style={{ background: '#E8EFFE' }}>
                                        <img src='/img/icon/dashboard1.png' className='icon' alt='navbar-img' />
                                    </div>
                                    <h5>Số thứ tự đã cấp</h5>


                                </div>

                                <div className="cardContent">

                                    <span className='number'>{listCapSo.length} </span>
                                    <Badge
                                        className="site-badge-count"
                                        count='&uarr; 32,41%'
                                        style={{ backgroundColor: '#FFEFD9', color: '#FF9138' }}
                                    />

                                </div>

                            </Link>
                        </Card>


                        <Card className='cardItem'>
                            <div className="cardTittle">
                                <div className="iconContainer" style={{ background: '#E1F7E6' }}>
                                    <img src='/img/icon/dashboard2.png' className='icon' alt='navbar-img' />
                                </div>
                                <h5>Số thứ tự đã sử dụng</h5>
                            </div>
                            <div className="cardContent">
                                <span className='number'>0{dataUsed.length && dataUsed.length}</span>
                                <Badge
                                    className="site-badge-count"
                                    count='&darr; 32,41%'
                                    style={{ backgroundColor: '#FBE2E2', color: 'red' }}
                                />
                            </div>
                        </Card>

                        <Card className='cardItem'>
                            <div className="cardTittle">
                                <div className="iconContainer" style={{ background: '#FFEFD9' }}>
                                    <img src='/img/icon/dashboard3.png' className='icon' alt='navbar-img' />

                                </div>
                                <h5>Số thứ tự đang chờ</h5>
                            </div>
                            <div className="cardContent">
                                <span className='number'>{dataPending.length && dataPending.length}</span>
                                <Badge
                                    className="site-badge-count"
                                    count='&uarr; 56,41%'
                                    style={{ backgroundColor: '#FFEFD9', color: '#FF9138' }}
                                />
                            </div>

                        </Card>

                        <Card className='cardItem'>
                            <div className="cardTittle">
                                <div className="iconContainer" style={{ background: '#FBE2E2' }}>
                                    <img src='/img/icon/dashboard4.png' className='icon' alt='navbar-img' />
                                </div>
                                <h5>Số thứ tự đã bỏ qua</h5>


                            </div>
                            <div className="cardContent">
                                <span className='number'>0{dataPassed.length && dataPassed.length} </span>
                                <Badge
                                    className="site-badge-count"
                                    count='&darr; 22,41%'
                                    style={{ backgroundColor: '#FBE2E2', color: 'red' }}
                                />
                            </div>

                        </Card>
                    </Row>

                    <div className='dashboardTypeContainer'>
                        <div className='content__chart-select'>
                            <span className='content__chart-text'>Xem theo </span>
                            <Select defaultValue="Ngày" style={{ width: 120 }} onChange={handleChange} suffixIcon={<img src='/img/icon/arrow.png' alt='arrowImg' />}>
                                <Option value="day">Ngày</Option>
                                <Option value="week">Tuần</Option>
                                <Option value="month">Tháng</Option>
                            </Select>
                        </div>
                        <Outlet />
                    </div>

                </Col>
            }


            <Col className='aside-col' span={7}>
                <div className="top_info" id='notifyContainer'>
                    <NotifyBtn trigger={statusNotify} setTrigger={setStatusNotify} />
                    <Profile />
                    {statusNotify ? <CardNotify /> : <></>}
                </div>

                <div className="tongquan">
                    <h2>Tổng quan</h2>
                    <Row className='cardContainer'>
                        <Card className='cardItem'>
                            <div className="cardLeft">
                                <ThietBiRadial />
                                <div className="content">
                                    <span className='number'>4.221 </span>
                                    <div style={{ color: '#FF7506', fontSize: '14px' }} >
                                        <img className='thietbi' src='/img/icon/thietbi.png' width={14} alt='navbar-img' />
                                        Thiết bị
                                    </div>
                                </div>
                            </div>
                            <div className="cardRight">
                                <div className='status' style={{ color: '#FF7506' }}> <span>&bull; Đang hoạt động:</span><span className='number'>3.799</span></div>
                                <div className='status' style={{ color: '#7E7D88' }}> <span>&bull; Ngưng hoạt động:</span><span className='number'>422</span></div>
                            </div>

                        </Card>

                        <Card className='cardItem'>
                            <div className="cardLeft">
                                <DichVuRadial />
                                <div className="content">
                                    <span className='number'>276 </span>
                                    <div style={{ color: '#4277FF', fontSize: '14px' }}>
                                        <img className='dichvu' src='/img/icon/dichvu.png' width={14} alt='navbar-img' />
                                        Dịch vụ
                                    </div>
                                </div>
                            </div>
                            <div className="cardRight">
                                <div style={{ color: '#4277FF' }} className='status'>  <span>&bull; Đang hoạt động: </span><span className='number'>210</span></div>
                                <div style={{ color: '#7E7D88' }} className='status'> <span>&bull; Ngưng hoạt động: </span><span className='number'>66</span></div>
                            </div>

                        </Card>

                        <Card className='cardItem'>
                            <div className="cardLeft">
                                <CapSoRadial />
                                <div className="content">
                                    <span className='number'>4.221 </span>
                                    <div style={{ color: '#35C75A', fontSize: '14px' }}>
                                        <img className='capso' src='/img/icon/capso.png' width={14} alt='navbar-img' />
                                        Cấp số
                                    </div>
                                </div>
                            </div>
                            <div className="cardRight">
                                <div className='status' style={{ color: '#35C75A' }}> <span>&bull; Đã sử dụng: </span><span className='number'>3.721</span></div>
                                <div className='status' style={{ color: '#7E7D88' }}> <span>&bull; Đang chờ: </span><span className='number'>486</span></div>
                                <div className='status' style={{ color: '#F178B6' }}> <span>&bull; Bỏ qua: </span><span className='number'>32</span></div>
                            </div>

                        </Card>

                    </Row>
                </div>
                <div className="calendar">
                    <Calendar onChange={setDate} locale="vi" value={date} />
                </div>
            </Col>
        </Row>


    )
}