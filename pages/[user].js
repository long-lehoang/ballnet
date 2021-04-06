import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import LayoutMain from '../components/layout/main'
import Profile from '../components/profile';
import { PROFILE_API, USER_API } from '../config/config';
import { parseCookies } from '../lib/cookie';
import { setUser } from '../slices/infoUserSlice';
import { setProfile } from '../slices/profileSlice';
import { setToken } from '../slices/tokenSlice';

export default function UserProfile({token, username, user, permission, userN, profileN}) {
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
            <Profile permission={permission} userN={userN} profileN={profileN}></Profile>
        </LayoutMain>
    )
}

UserProfile.getInitialProps = async ({query, req, res }) => {
    const data = parseCookies(req).user
    if (res) {
        if ((data === undefined) || (Object.keys(data).length === 0 && data.constructor === Object)) {
            res.writeHead(301, { Location: "/login", 'Cache-Control': 'no-cache' })
            res.end()
        }
    }
    const user = JSON.parse(data);
    const token = user.access_token;
    let profileN, userN;
    await axios.get(PROFILE_API + query.user, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        profileN = response.data.data;
    }).catch((error) => {
        console.log(error.message);
    });

    await axios.get(USER_API + query.user, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        userN = response.data.data;
    }).catch((error) => {
        console.log(error.message);
    });
    return {
        token: user.access_token,
        username: user.user.username,
        user: user.user,
        permission: query.user === user.user.username,
        userN: userN,
        profileN: profileN
    }
}