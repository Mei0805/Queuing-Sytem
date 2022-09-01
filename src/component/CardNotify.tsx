import { Card, Col, Row } from 'antd';
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { capsoCreator } from '../redux';
import { bindActionCreators } from "redux";
import { State } from '../redux/reducers';


export const CardNotify = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function zeroPad(num: any, places: any) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }

    const [capSoList, setCapSoList] = useState<any | undefined>();

    const { actionLoadCapSoMoiNhat } = bindActionCreators(capsoCreator, dispatch);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        actionLoadCapSoMoiNhat();
    }, [])

    const { listCapSo } = useSelector((state: State) => state.capso);
    useEffect(() => {
        setCapSoList(listCapSo)
    }, [listCapSo])

    return (
        <Col className='cardNotify'>
            <Card title="Thông báo" bordered={false}>
                {
                    capSoList && capSoList.map((capSoItem: any) => {
                        return  <Link className="nav-link" to={`/capso/chitiet/${capSoItem.id}`} >
                                    <div className="cardContent">
                                    <span className='user'>Người dùng: {capSoItem.tenKH}</span>
                                    <p className='time'>Thời gian nhận số: {capSoItem.thoiGianCap} </p>
                                </div>
                                </Link>
                    })
                }
            </Card>
        </Col>
    )
}