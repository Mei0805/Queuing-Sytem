
import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Modal } from "antd"
import { Select } from "antd"

const { Option } = Select;

export const ThemCapSo = () => {
    const navigate = useNavigate();
    const dichVuList = [
        { id: 1, tenDV: 'Khám tim mạch' },
        { id: 2, tenDV: 'Khám sản - Phụ khoa' },
        { id: 3, tenDV: 'Khám răng hàm mặt' },
        { id: 4, tenDV: 'Khám tai mũi họng' },
        { id: 5, tenDV: 'Khám hô hấp' },
        { id: 6, tenDV: 'Khám tổng quát' }
    ]

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
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        showModal();
    }

    return (
        <div className="themCapSoContainer" style={{ width: '100%' }}>
            <h1>Quản lý cấp số</h1>
            <Row className="formThemContainer">
                <h5 className="capsoTitle" style={{ width: '100%' }}>Cấp số mới</h5>
                <div className="chonDichvu" style={{ width: '100%' }}>
                    <h5 style={{ width: '100%', fontSize: '20px', fontWeight: '700' }}>Dịch vụ khách hàng lựa chọn</h5>
                    <Select defaultValue="Khám tổng quát" style={{ width: 400 }} className='form__top-select' autoFocus={false} suffixIcon={<img src='/img/icon/arrow.png' />} placeholder='Chọn dịch vụ' dropdownClassName='capSo__dropdown'>
                        {dichVuList.map((dvI) => (
                            <Option value={dvI.id} >{dvI.tenDV}</Option>
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
                <p className='popupNumber'>2001201</p>
                <p className='popupInfo'>
                    DV: Khám răng hàm mặt
                    <span> <b>(tại quầy số 1)</b></span>
                </p>
            </Fragment>} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} className='modal__capSo'>
                <p>Thời gian cấp: 09:30 11/10/2021</p>
                <p>Hạn sử dụng: 17:30 11/10/2021</p>
            </Modal>


        </div>


    )
}