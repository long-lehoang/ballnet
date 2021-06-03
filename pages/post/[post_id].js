import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import LayoutMain from '../../components/layout/main';
import PostPage from '../../components/post';
import { POSTS_API, PROFILE_API } from '../../config/config';
import { parseCookies } from '../../lib/cookie';
import { setUser } from '../../slices/infoUserSlice';
import { setProfile } from '../../slices/profileSlice';
import { setToken } from '../../slices/tokenSlice';
import Error from 'next/error'

export default function Post({ errorCode, token, username, user, post, permisson }) {
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
            <PostPage postD={post} permisson={permisson}></PostPage>
        </LayoutMain>
    )
}

Post.getInitialProps = async ({ query, req, res }) => {
    const data = parseCookies(req).user
    if (res) {
        if ((data === undefined) || (Object.keys(data).length === 0 && data.constructor === Object)) {
            res.writeHead(301, { Location: "/login", 'Cache-Control': 'no-cache' })
            res.end()
        }
    }
    const user = JSON.parse(data || '')
    const token = user.access_token
    let post;
    let errCode = false;

    await axios.get(POSTS_API + query.post_id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        post = response.data.data;
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
        user: user.user,
        post: post,
        permisson: post.author.username === user.user.username
    }
}