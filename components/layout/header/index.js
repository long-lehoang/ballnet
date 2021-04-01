import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol, faSearch, faHome, faUsers, faCalendarAlt, faMap, faUserPlus, faEnvelope, faBell, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import axios from 'axios';
import {LOGOUT_API,AVATAR,HOST} from '../../../config/config'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    forceTLS: true
});

export default function Header(){
    const router = useRouter()
    function handleLoggout(e){
        const token = localStorage.getItem('access_token');
        axios.post(LOGOUT_API,{},{
            headers:{
                'Authorization': token
            }
        })
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        router.push('/login');
    }
    const user = useSelector(state => state.infoUser);
    const profile = useSelector(state => state.profile);
    let link_profile = user != null ? user.username : "";

    return(
        <div className={styles.container}>
            <div className={styles.col}>
                <div className={styles.logo}>
                    <Link href="/">
                    <FontAwesomeIcon icon={faFutbol}></FontAwesomeIcon>
                    </Link>
                </div>
                <div className={styles.search}>
                    <div className={styles.btnSearch}>
                        <input placeholder="Search..."></input>
                    </div>
                    <div className={styles.iconSearch}>
                        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                    </div>
                </div>
            </div>
            
            <div className={styles.col}>
                <div className={styles.nav}>
                    <Link href="/">
                        <div className={styles.btnNav}>
                            <div className={styles.iconNav}>
                                <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                Home
                            </div>
                        </div>
                    </Link>

                    <Link href="/team">
                        <div className={styles.btnNav}>
                            <div className={styles.iconNav}>
                            <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                Team
                            </div>
                        </div>
                    </Link>

                    <Link href="/match">
                        <div className={styles.btnNav}>
                            <div className={styles.iconNav}>
                            <FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                Match
                            </div>
                        </div>
                    </Link>

                    <Link href="/stadium">
                        <div className={styles.btnNav}>
                            <div className={styles.iconNav}>
                            <FontAwesomeIcon icon={faMap}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                Stadium
                            </div>
                        </div>
                    </Link>

                    <Link href="/people">
                        <div className={styles.btnNav}>
                            <div className={styles.iconNav}>
                            <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                People
                            </div>
                        </div>
                    </Link>

                    <Link href="/message">
                        <div className={styles.btnNav}>
                            
                            <div className={styles.iconNav}>
                            <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                Message
                            </div>
                        </div>
                    </Link>

                    <Link href="/notification">
                        <div className={styles.btnNav}>
                            <div className={styles.iconNav}>
                            <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                Notification
                            </div>
                        </div>
                    </Link>
                </div>
                <Link href={"/" + link_profile}>
                <div className={styles.profile}>
                    <div className={styles.avatar}>
                        <img src={profile.avatar == null ? AVATAR : HOST+profile.avatar}></img>
                    </div>
                    <div className={styles.name}>{user != null ? user.name : "No Name" }</div>
                </div>
                </Link>
                <div className={styles.setting}>
                    <button><FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon></button>
                    <div className={styles.dropdown_setting}>
                        <p>Setting</p>
                        <Link href="/setting">
                            <a>Account Setting</a>
                        </Link>
                        <button onClick={handleLoggout}>Logout</button>                   
                    </div>
                </div>
            </div>
        </div>
        
    )
}