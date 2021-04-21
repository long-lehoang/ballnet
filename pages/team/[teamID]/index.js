import LayoutMain from '../../../components/layout/main'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../../../slices/tokenSlice';
import { setUser } from '../../../slices/infoUserSlice';
import { TEAM_API, PROFILE_API } from '../../../config/config';
import axios from 'axios';
import { setProfile } from '../../../slices/profileSlice';
import { parseCookies } from '../../../lib/cookie';
import TeamProfile from '../../../components/team/profile';

export default function TeamProfilePage({token, username, user, team, permission}) {
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
            <TeamProfile team={team||[]} isMember={permission.isMember} isAdmin={permission.isAdmin} isCaptain={permission.isCaptain}></TeamProfile>
        </LayoutMain>
    )
}

TeamProfilePage.getInitialProps = async ({ query, req, res }) => {
    const data = parseCookies(req).user
    if (res) {
        if ((data === undefined) || (Object.keys(data).length === 0 && data.constructor === Object)) {
            res.writeHead(301, { Location: "/login", 'Cache-Control': 'no-cache' })
            res.end()
        }
    }
    const user = JSON.parse(data)
    const token = user.access_token;
    let team,permission;
    await axios.get(TEAM_API + `${query.teamID}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then(response=>{
        team = response.data.data
    }).catch(error=>{
        console.log(error);
    });
    await axios.get(TEAM_API + `${query.teamID}/permission`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then(response=>{
        permission = response.data.data
    }).catch(error=>{
        console.log(error);
    });
    return {
        token: user.access_token,
        username: user.user.username,
        user: user.user,
        team: team,
        permission: permission
    }
}