import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {showNotice} from '../../../lib/notification'
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol, faSearch, faHome, faUsers, faCalendarAlt, faMap, faUserPlus, faEnvelope, faBell, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import axios from 'axios';
import { LOGOUT_API, AVATAR, HOST, NOTIFICATION } from '../../../config/config'
import { useRouter } from 'next/router';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
var numNotice = 0;

export default function Header() {
    const token = useSelector(state => state.token);
    const user = useSelector(state => state.infoUser);
    const profile = useSelector(state => state.profile);
    let link_profile = user != null ? user.username : "";
    const [notification, showNotification] = useState(false);
    const [listNotice, addNotice] = useState([]);
    const [newNotice, setNewNotice] = useState(0);
    const [cookie, setCookie, removeCookie] = useCookies(["user"]);
    let echo;

    const options = {
        broadcaster: 'pusher',
        key: '903afb56e4567c43f695',
        cluster: 'ap1',
        forceTLS: true,
        encrypted: true,
        //authEndpoint is your apiUrl + /broadcasting/auth
        authEndpoint: HOST + '/api/broadcasting/auth',
        // As I'm using JWT tokens, I need to manually set up the headers.
        auth: {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        },
    }
    

    useEffect(() => {
        axios.get(NOTIFICATION, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            }
        }).then((response) => {
            const data = response.data.data;
            let number = newNotice;
            let list = listNotice;
            data.forEach(element => {
                if (element.read_at === null)
                number = number + 1;
                let notice = showNotice(element);
                list.push(notice);
            });
            numNotice = number;
            setNewNotice(number);
            addNotice(list);
        });
    }, [null]);
    
    function handleReadNotice() {
        if (!notification) {
            axios.post(NOTIFICATION + 'read', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                console.log(response.data.message);
            }).catch(error => {
                console.log(error.message);
            })
        }
        setNewNotice(0);
        numNotice = 0;
        showNotification(!notification);
    }

    useEffect(() => {
        echo = new Echo(options);
    }, [null])

    useEffect(() => {
        if (user.id !== undefined && echo !== undefined) {
            echo.private(`App.Models.User.${user.id}`).notification((data) => {
                const obj = { data: {...data} ,type : data.type, read_at: null, created_at: (new Date()).getTime() }
                
                if (obj.read_at === null)
                numNotice = numNotice + 1;            
                const notice = showNotice(obj);
                let list = listNotice;
                list.unshift(notice);
                addNotice(list);
                setNewNotice(numNotice);
            });
        }
    },[listNotice]);

    const router = useRouter();

    function handleLoggout(e) {
        axios.post(LOGOUT_API, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        removeCookie("user");
        router.push('/login');
    }


    return (
        <div className={styles.container}>
            <div className={styles.col}>
                <div className={styles.logo}>
                    <Link href="/">
                        <FontAwesomeIcon icon={faFutbol}></FontAwesomeIcon>
                    </Link>
                </div>
                {/* <div className={styles.search}>
                    <div className={styles.btnSearch}>
                        <input placeholder="Search..."></input>
                    </div>
                    <div className={styles.iconSearch}>
                        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                    </div>
                </div> */}
            </div>

            <div className={styles.col}>
                <div className={styles.nav}>
                    <Link href="/">
                        <div className={styles.btnNav}>
                            <div className={styles.iconNav}>
                                <FontAwesomeIcon height={22} icon={faHome}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                Home
                            </div>
                        </div>
                    </Link>

                    <div className={styles.btnNav}>
                        <div className={styles.iconNav}>
                            <FontAwesomeIcon height={22} icon={faUsers}></FontAwesomeIcon>
                        </div>
                        <div className={styles.textNav}>
                            <Link href="/team"><div className={styles.link}>Team</div></Link>
                            <Link href="/team/invitation"><div className={styles.link}>Team Invitations</div></Link>
                        </div>
                    </div>

                    <Link href="/match">
                        <div className={styles.btnNav}>
                            <div className={styles.iconNav}>
                                <FontAwesomeIcon height={22} icon={faCalendarAlt}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                            <Link href="/match"><div className={styles.link}>Match</div></Link>
                            <Link href="/match/invitation"><div className={styles.link}>Match Invitation</div></Link>
                            </div>
                        </div>
                    </Link>

                    <Link href="/stadium">
                        <div className={styles.btnNav}>
                            <div className={styles.iconNav}>
                                <FontAwesomeIcon height={22} icon={faMap}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                Stadium
                            </div>
                        </div>
                    </Link>

                    <div className={styles.btnNav}>
                        <div className={styles.iconNav}>
                            <FontAwesomeIcon height={22} icon={faUserPlus}></FontAwesomeIcon>
                        </div>
                        <div className={styles.textNav}>
                            <Link href="/people"><div className={styles.link}>People</div></Link>
                            <Link href="/people/friend_request"><div className={styles.link}>Friend Requests</div></Link>
                        </div>
                    </div>
                    {/* <Link href="/message">
                        <div className={styles.btnNav}>

                            <div className={styles.iconNav}>
                                <FontAwesomeIcon height={22} icon={faEnvelope}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                Message
                            </div>
                        </div>
                    </Link> */}
                    <div className={styles.group_notice}>
                        {newNotice > 0 ? <span className={styles.number}>{newNotice}</span> : ''}
                        <div className={styles.btnNav} onClick={handleReadNotice}>
                            <div className={styles.iconNav}>
                                <FontAwesomeIcon height={22} icon={faBell}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                Notification
                            </div>
                        </div>
                        
                    </div>
                </div>
                <Link href={"/" + link_profile}>
                    <div className={styles.profile}>
                        <div className={styles.avatar}>
                            <img src={profile.avatar == null ? AVATAR : HOST + profile.avatar}></img>
                        </div>
                        <div className={styles.name}>{user != null ? user.name : "No Name"}</div>
                    </div>
                </Link>
                <div className={styles.setting}>
                    <button><FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon></button>
                    <div className={styles.dropdown_setting}>
                        <Link href="/setting">
                            <a>Account Setting</a>
                        </Link>
                        <Link href="/stadium/mystadium">
                            <a>My Stadium</a>
                        </Link>
                        <Link href="/my_booking">
                            <a>My Booking</a>
                        </Link>
                        <a onClick={handleLoggout}>Logout</a>
                    </div>
                </div>
            </div>
            <div className={notification ? styles.notification : styles.hideNotification}>
                {listNotice.length == 0 ? <h5 style={{padding: 10 ,color: "black"}}>No notifications</h5> : listNotice}
            </div>
        </div>

    )
}