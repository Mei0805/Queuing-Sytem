import { Link } from 'react-router-dom';
import { Avatar } from 'antd';

export const Profile = () => {
    return (
        <div className="profileContainer">
            <Link to='/profile' >
                <Avatar size={40} src="https://scontent.fsgn5-2.fna.fbcdn.net/v/t39.30808-6/278858444_502628194846639_1246819765598551041_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=1BmDNIAjQ8UAX_sJLXg&_nc_ht=scontent.fsgn5-2.fna&oh=00_AT_KRDX-VbFAIPBGp3lg0j41CMXQD7lKMQtY-wxwqXD9AA&oe=62FDA685" />
            </Link>
            <div className="greeting">
                <span>Xin chào</span>
                <h4>Nguyễn Hoàng Thúy Mai</h4>
            </div>
        </div>
    )
}

