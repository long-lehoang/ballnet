import { useDispatch, useSelector } from 'react-redux';
import LayoutMain from '../components/layout/main'
import { parseCookies } from '../lib/cookie'
import { setProfile } from '../slices/profileSlice';
import { setToken } from '../slices/tokenSlice';

export default function Message({ token, username }) {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile);
    const actionToken = setToken(token);
    dispatch(actionToken);

    if (profile == null) {
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
        </LayoutMain>
    )
}

Message.getInitialProps = async ({ req, res }) => {
    const data = parseCookies(req).user
    if (res) {
        if ((data === undefined) || (Object.keys(data).length === 0 && data.constructor === Object)) {
            res.writeHead(301, { Location: "/login", 'Cache-Control': 'no-cache' })
            res.end()
        }
    }
    const user = JSON.parse(data)
    return {
        token: user.access_token,
        username: user.user.username
    }
}