
import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Button, Modal } from "antd"
import { Select } from "antd"

import { useDispatch, useSelector } from "react-redux";
import { capsoCreator, nhatkyCreator, taikhoanCreator } from "../../redux";
import { bindActionCreators } from "redux";
import { State } from "../../redux/reducers";


const { Option } = Select;

export const ThemCapSo = () => {
    const [capSoList, setCapSoList] = useState<any | undefined>();
    const [dichVuChon, setDichVuChon] = useState<any>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { actionLoadCapSo, actionAddCapSo } = bindActionCreators(capsoCreator, dispatch);
    const { actionLoadTaiKhoan } = bindActionCreators(taikhoanCreator, dispatch);

    const { actionLoadNhatKy, actionAddNhatKy } = bindActionCreators(nhatkyCreator, dispatch);
    const { listNhatKy } = useSelector((state: State) => state.nhatky);
    const { userLogin } = useSelector((state: State) => state.taikhoan);

    let listCapSoLength = capSoList && capSoList.length;
    let nextNumber = listCapSoLength + 1;

    function zeroPad(num: any, places: any) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }
    const dichVuList = [
        { id: 1, tenDV: 'Khám tim mạch' },
        { id: 2, tenDV: 'Khám sản-Phụ khoa' },
        { id: 3, tenDV: 'Khám răng hàm mặt' },
        { id: 4, tenDV: 'Khám tai mũi họng' },
        { id: 5, tenDV: 'Khám hô hấp' },
        { id: 6, tenDV: 'Khám tổng quát' }
    ]

    const handleChangeDichVu = (value: string | number) => {
        console.log(value);
        setDichVuChon(value);
    }

    //popup thêm
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        navigate('/capso')
    };
    

    const d = new Date();
    //dateCurrent
    var date = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    var time = d.getHours() + ":" + d.getMinutes();
    var dateTime = time + ' - ' + date;
    // after24h
    var nextDay = new Date(d);
    var nextDate = nextDay.setDate(d.getDate() + 1);
    var dateAfter = nextDay.getDate() + '/' + (nextDay.getMonth() + 1) + '/' + nextDay.getFullYear();
    var dateTimeAfter = time + ' - ' + dateAfter;
    console.log('today:', dateTime);
    console.log('nexdate: ', dateTimeAfter);

    const handleAction = (actionValue: any) => {
        let len = listNhatKy.length;
        let STT = len++;
        const date = new Date();
        var d = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        var time = date.getHours() + ":" + date.getMinutes();
        var dateTime = time + ' - ' + d;
        const action = 'Thêm Cấp số ' + actionValue;
        let item = {
            STT: zeroPad(STT, 6),
            tenDangNhap: userLogin[0].hoTen,
            thoiGianTacDong: dateTime,
            diaChiIP: "192.168.3.1",
            thaoTac: action,
        }
        actionAddNhatKy(item)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (dichVuChon) {
            let len = capSoList && capSoList.length;
            let STT = zeroPad(len + 1, 4)
            let item = {
                STT: zeroPad(STT, 4), // "0001"
                tenKH: userLogin[0].hoTen,
                tenDV: dichVuChon,
                thoiGianCap: dateTime,
                HSD: dateTimeAfter,
                trangThai: { id: 1, value: 'Đang chờ' },
                nguonCap: "Kiosk"
            }
            actionAddCapSo(item)
            handleAction(STT)
            showModal();
        } else {
            alert('Xin mời chọn dịch vụ !')
        }

    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        actionLoadCapSo();
        actionLoadTaiKhoan()
        actionLoadNhatKy()
    }, [])

    const { listCapSo } = useSelector((state: State) => state.capso);
    useEffect(() => {
        setCapSoList(listCapSo)
    }, [listCapSo])

    return (
        <div className="themCapSoContainer" style={{ width: '100%' }}>
            <h1>Quản lý cấp số</h1>
            <Row className="formThemContainer">
                <h5 className="capsoTitle" style={{ width: '100%' }}>Cấp số mới</h5>
                <div className="chonDichvu" style={{ width: '100%' }}>
                    <h5 style={{ width: '100%', fontSize: '20px', fontWeight: '700' }}>Dịch vụ khách hàng lựa chọn</h5>
                    <Select defaultValue="Khám tổng quát"
                        style={{ width: 400 }}
                        className='form__top-select'
                        autoFocus={false}
                        suffixIcon={<img src='/img/icon/arrow.png' alt="arrow-img" />}
                        placeholder='Chọn dịch vụ'
                        dropdownClassName='capSo__dropdown'
                        onChange={handleChangeDichVu}
                    >
                        {dichVuList.map((dvI) => (
                            <Option key={dvI.id} value={dvI.tenDV} >{dvI.tenDV}</Option>
                        ))}
                    </Select>
                </div>

                <div className="btnGroup" style={{ width: '100%' }}>
                    <Button size='large' className="resetBtn" onClick={() => {
                        navigate('/capso');
                    }} >Hủy bỏ</Button>
                    <Button size='large' type="primary" className="addBtn" onClick={handleSubmit} >In số</Button>
                </div>
            </Row>

            <Modal wrapClassName="popUpInfo" title={<Fragment>
                <h3>Số thứ tự được cấp</h3>
                <p className='popupNumber'>{zeroPad(nextNumber,5)}</p>
                <p className='popupInfo'>
                    DV: {dichVuChon}
                    <span> <b>(tại quầy số 1)</b></span>
                </p>
            </Fragment>} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} className='modal__capSo'>
                <p>Thời gian cấp: {dateTime} </p>
                <p>Hạn sử dụng: {dateTimeAfter} </p>
            </Modal>


        </div>


    )
}