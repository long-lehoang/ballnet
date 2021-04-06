import LayoutMain from '../components/layout/main'
import HomePage from '../components/home'
import { parseCookies } from '../lib/cookie';
import { setProfile } from '../slices/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../slices/tokenSlice';
import { setUser } from '../slices/infoUserSlice';
import axios from 'axios';
import { POSTS_API, PROFILE_API } from '../config/config';


function extractData(data, result = []) {
    if (Array.isArray(data))
        data.forEach(element => {
            if (Array.isArray(element))
                element.forEach(subele => {
                    result.push(subele);
                });
            else result.push(element);
        });
    else result.push(data);
    return result;
}
export default function Home({ token, username, posts, user }) {
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
            <HomePage posts={posts}></HomePage>
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
    const user = JSON.parse(data)
    const token = user.access_token;
    var posts = [];
    await axios.get(POSTS_API, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        posts = extractData(response.data.data).sort(function (a, b) {
            let time1 = new Date(a.updated_at);
            let time2 = new Date(b.updated_at);

            return time2 - time1;
        })
    }).catch((error) => {
        console.log(error);
    })

    return {
        token: user.access_token,
        username: user.user.username,
        posts: posts,
        user: user.user
    }
}
