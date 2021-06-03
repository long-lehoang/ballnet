import LayoutMain from '../../components/layout/main'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../../slices/tokenSlice';
import { setUser } from '../../slices/infoUserSlice';
import { MATCH_API, PROFILE_API } from '../../config/config';
import axios from 'axios';
import { setProfile } from '../../slices/profileSlice';
import Match from '../../components/match';
import { parseCookies } from '../../lib/cookie';
import Error from 'next/error'

export default function MatchPage({errorCode,token, username, user, match}) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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
            <Match match={match||[]}></Match>
        </LayoutMain>
    )
}

MatchPage.getInitialProps = async ({ req, res }) => {
    const data = parseCookies(req).user
    if (res) {
        if ((data === undefined) || (Object.keys(data).length === 0 && data.constructor === Object)) {
            res.writeHead(301, { Location: "/login", 'Cache-Control': 'no-cache' })
            res.end()
        }
    }
    const user = JSON.parse(data)
    const token = user.access_token;
    let match;
    let errCode = false;

    await axios.get(MATCH_API,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then(response=>{
        match = response.data.data
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
        match: match
    }
}