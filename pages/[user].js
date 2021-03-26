import LayoutMain from '../components/layout/main'
import checkLogin from '../lib/user'
import { useSelector } from 'react-redux'
import Profile from '../components/profile';

export default function UserProfile() {
    // checkLogin();

    return (
        <LayoutMain>
            <Profile ></Profile>
        </LayoutMain>
    )
}