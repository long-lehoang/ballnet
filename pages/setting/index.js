import LayoutMain from '../../components/layout/main'
import ChangePassword from '../../components/setting/ChangePassword'
import GeneralSetting from '../../components/setting/General'
import DeadactiveAccount from '../../components/setting/DeadactiveAccount'
import MyBooking from '../../components/setting/MyBooking'

import { useState } from 'react'
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCog, faLock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { parseCookies } from '../../lib/cookie'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../../slices/tokenSlice'
import { setUser } from '../../slices/infoUserSlice'
import { PROFILE_API } from '../../config/config'
import axios from 'axios'
import { setProfile } from '../../slices/profileSlice'

export default function Setting({token, user, username}) {
    const [option, setOption] = useState(1);

    function loadComponent(option) {
        switch (option) {
            case 1:
                return (<GeneralSetting></GeneralSetting>)
            case 2:
                return (<ChangePassword></ChangePassword>)

            case 3:
                return (<DeadactiveAccount></DeadactiveAccount>)

            case 4:
                return (<MyBooking></MyBooking>)
            default:
                return (<GeneralSetting></GeneralSetting>)
        }
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
            <div className={styles.container}>
                <div className={styles.menu}>
                    <button onClick={() => { setOption(1) }}>
                        <FontAwesomeIcon icon={faCog} className={styles.icon}></FontAwesomeIcon>
                        <span>General</span>
                    </button>
                    <button onClick={() => { setOption(2) }}>
                        <FontAwesomeIcon icon={faLock} className={styles.icon}></FontAwesomeIcon>
                        <span>Change Password</span>
                    </button>
                    <button onClick={() => { setOption(3) }}>
                        <FontAwesomeIcon icon={faTrash} className={styles.icon}></FontAwesomeIcon>
                        <span>Deadactive Account</span>
                    </button>
                    <button onClick={() => { setOption(4) }}>
                        <FontAwesomeIcon icon={faBook} className={styles.icon}></FontAwesomeIcon>
                        <span>My booking</span>
                    </button>
                </div>
                <div className={styles.content}>
                    {loadComponent(option)}
                </div>
            </div>
        </LayoutMain>
    )
}

Setting.getInitialProps = async ({ req, res }) => {
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
        username: user.user.username,
        user: user.user
    }
}