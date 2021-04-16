import LayoutMain from '../components/layout/main'
import MyBookingPage from '../components/my_booking'
import { parseCookies } from '../lib/cookie';
import { setProfile } from '../slices/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../slices/tokenSlice';
import { setUser } from '../slices/infoUserSlice';
import axios from 'axios';
import { PROFILE_API } from '../config/config';

export default function MyBooking({ token, username, user }) {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile);
    const userState = useSelector(state => state.infoUser);

    const actionToken = setToken(token);
    dispatch(actionToken);

    if (userState && Object.keys(userState).length === 0 && userState.constructor === Object) {
        const actionUser = setUser(user);
        dispatch(actionUser);
    }

    if (profile && Object.keys(profile).length === 0 && profile.constructor === Object) {
        axios.get(PROFILE_API + username, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            const profile = response.data.data;
            const actionProfile = setProfile(profile);
            dispatch(actionProfile);
        })
    }

    return (
        <LayoutMain>
            <MyBookingPage data={[]}></MyBookingPage>
        </LayoutMain>
    )
}


MyBooking.getInitialProps = async ({ req, res }) => {
    const data = parseCookies(req).user
    if (res) {
        if ((data === undefined) || (Object.keys(data).length === 0 && data.constructor === Object)) {
            res.writeHead(301, { Location: "/login", 'Cache-Control': 'no-cache' })
            res.end()
        }
    }
    const user = JSON.parse(data)
    const token = user.access_token;

    return {
        token: user.access_token,
        username: user.user.username,
        user: user.user
    }
}
