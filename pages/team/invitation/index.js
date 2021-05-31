import LayoutMain from '../../../components/layout/main'
import { useDispatch, useSelector } from "react-redux";
import { setToken } from '../../../slices/tokenSlice';
import { setUser } from '../../../slices/infoUserSlice';
import { setProfile } from '../../../slices/profileSlice';
import { PROFILE_API, TEAM_API, TEAM_REQUEST_API } from "../../../config/config";
import axios from 'axios';
import { parseCookies } from '../../../lib/cookie';
import Invitation from '../../../components/team/invitation';
import Error from 'next/error'

export default function InvitationPage({errorCode,token, username, user, team}) {
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
            <Invitation team={team||[]}></Invitation>
        </LayoutMain>
    )
}

InvitationPage.getInitialProps = async ({ req, res }) => {
    const data = parseCookies(req).user
    if (res) {
        if ((data === undefined) || (Object.keys(data).length === 0 && data.constructor === Object)) {
            res.writeHead(301, { Location: "/login", 'Cache-Control': 'no-cache' })
            res.end()
        }
    }
    const user = JSON.parse(data)
    const token = user.access_token;
    let team;
    let errCode = false;

    await axios.get(TEAM_REQUEST_API,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then(response=>{
        team = response.data.data
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
        team: team
    }
}