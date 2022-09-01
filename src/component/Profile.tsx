import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { State } from '../redux/reducers';
import { useSelector } from 'react-redux';

import { Avatar } from 'antd';

export const Profile = () => {
    const [taiKhoan, setTaiKhoan] = useState<any | undefined>();
    const { userLogin } = useSelector((state: State) => state.taikhoan);

    useEffect(() => {
        setTaiKhoan(userLogin[0])
    }, [userLogin[0]])
    
    return (
        <div className="profileContainer">
            <Link to='/profile' >
                <Avatar size={40} src="/img/avatar.png" />
            </Link>
            <div className="greeting">
                <span>Xin chào</span>
                <h4>{taiKhoan && taiKhoan.hoTen}</h4>
            </div>
        </div>
    )
}

