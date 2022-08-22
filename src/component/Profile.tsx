import { Link } from 'react-router-dom';
import { Avatar } from 'antd';

export const Profile = () => {
    return (
        <div className="profileContainer">
            <Link to='/profile' >
                <Avatar size={40} src="/img/avatar.png" />
            </Link>
            <div className="greeting">
                <span>Xin chào</span>
                <h4>Lê Quỳnh Ái Vân</h4>
            </div>
        </div>
    )
}

