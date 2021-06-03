import LayoutMain from '../../components/layout/main'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../../slices/tokenSlice';
import { setUser } from '../../slices/infoUserSlice';
import { PROFILE_API, STADIUM_API } from '../../config/config';
import axios from 'axios';
import { setProfile } from '../../slices/profileSlice';
import { parseCookies } from '../../lib/cookie';
import Error from 'next/error'
import Stadium from '../../components/stadium';

export default function StadiumPage({errorCode,token, username, user, stadium}) {
    if (errorCode) {
        return <Error statusCode={errorCode} />
    }
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
            <Stadium stadium={stadium||[]}></Stadium>
        </LayoutMain>
    )
}

StadiumPage.getInitialProps = async ({ req, res }) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const data = parseCookies(req).user
    if (res) {
        if ((data === undefined) || (Object.keys(data).length === 0 && data.constructor === Object)) {
            res.writeHead(301, { Location: "/login", 'Cache-Control': 'no-cache' })
            res.end()
        }
    }
    const user = JSON.parse(data)
    const token = user.access_token;
    let stadium;
    let errCode = false;

    await axios.get(STADIUM_API,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then(response=>{
        stadium = response.data.data
    }).catch(error=>{
        if (error.response) {
            errCode = error.response.status;
        }else{
            errCode = 500;
        }
    })
    return {
        errorCode: errCode,

        token: user.access_token,
        username: user.user.username,
        user: user.user,
        stadium: stadium
    }
}