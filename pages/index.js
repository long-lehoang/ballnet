import LayoutMain from '../components/layout/main'
import HomePage from '../components/home'
import { parseCookies } from '../lib/cookie';
import { setProfile } from '../slices/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../slices/tokenSlice';
import { setUser } from '../slices/infoUserSlice';
import axios from 'axios';
import { POSTS_API, PROFILE_API } from '../config/config';
import Error from 'next/error'


export default function Home({ errorCode, token, username, posts, user }) {
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
            <HomePage posts={posts || []}></HomePage>
        </LayoutMain>
    )
}


Home.getInitialProps = async ({ req, res }) => {
    const data = parseCookies(req).user

    if (res) {
        if ((data === undefined) || (Object.keys(data).length === 0 && data.constructor === Object)) {
            res.writeHead(301, { Location: "/login", 'Cache-Control': 'no-cache' })
            res.end()
        }
    }


    const user = JSON.parse(data || '{}')
    const token = user.access_token;
    var posts = [];
    let errCode = false;

    await axios.get(POSTS_API, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        posts = response.data.data.data;

    }).catch((error) => {
        if (error.response) {
            errCode = error.response.status;
        } else {
            errCode = 500;
        }
    })

    return {
        errorCode: errCode,
        token: user.access_token,
        username: user.user.username,
        posts: posts,
        user: user.user
    }
}
