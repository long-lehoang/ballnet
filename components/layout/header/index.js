import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol, faSearch, faHome, faUsers, faCalendarAlt, faMap, faUserPlus, faEnvelope, faBell, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import axios from 'axios';
import { LOGOUT_API, AVATAR, HOST, NOTIFICATION } from '../../../config/config'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { useEffect, useState } from 'react';

import { useCookies } from 'react-cookie';
import { showNotice } from '../../../lib/notification';



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
    
    function addNotification(data, number) {
        if (Array.isArray(data)) {
            data.forEach(element => {
                if (element.read_at === null)
                    ++number;
                const notice = showNotice(element);
                addNotice([...listNotice, notice]);
            });
        } else {
            if (data.read_at === null)
                ++number;            
            const notice = showNotice(data);
            addNotice([...listNotice, notice]);
        }
        setNewNotice(number);
    }
    

    function handleReadNotice() {
        if (!notification) {
            axios.post(NOTIFICATION + 'read', [], {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                console.log(response.data.message);
            }).catch(error => {
                console.log(error.message);
            })
            setNewNotice(0);
        }
        showNotification(!notification);
    }

    
    useEffect(() => {
        echo = new Echo(options);
    }, [null])

    useEffect(() => {
        if (user.id !== undefined && echo !== undefined) {
            
            console.log(newNotice);
            echo.private(`App.Models.User.${user.id}`).notification((data) => {
                debugger
                let number = 0;
                const obj = { data: {...data} ,type : data.type, read_at: null, created_at: (new Date()).getTime() }
                if (obj.read_at === null)
                ++number;            
                const notice = showNotice(obj);
                let list = listNotice;
                list.push(notice);
                addNotice(list);
                setNewNotice(1+newNotice);
            });
        }

    }, [newNotice]);

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
                number++;
                let notice = showNotice(element);
                list.push(notice);
            });
            setNewNotice(number);
            addNotice(list);
        });
    }, [null]);


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
                                <FontAwesomeIcon height={22} icon={faHome}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                Home
                            </div>
                        </div>
                    </Link>

                    <Link href="/team">
                        <div className={styles.btnNav}>
                            <div className={styles.iconNav}>
                                <FontAwesomeIcon height={22} icon={faUsers}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                Team
                            </div>
                        </div>
                    </Link>

                    <Link href="/match">
                        <div className={styles.btnNav}>
                            <div className={styles.iconNav}>
                                <FontAwesomeIcon height={22} icon={faCalendarAlt}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                Match
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

                    <Link href="/people">
                        <div className={styles.btnNav}>
                            <div className={styles.iconNav}>
                                <FontAwesomeIcon height={22} icon={faUserPlus}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                People
                            </div>
                        </div>
                    </Link>

                    <Link href="/message">
                        <div className={styles.btnNav}>

                            <div className={styles.iconNav}>
                                <FontAwesomeIcon height={22} icon={faEnvelope}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                Message
                            </div>
                        </div>
                    </Link>
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
                        <p>Setting</p>
                        <Link href="/setting">
                            <a>Account Setting</a>
                        </Link>
                        <button onClick={handleLoggout}>Logout</button>
                    </div>
                </div>
            </div>
            <div className={notification ? styles.notification : styles.hideNotification}>
                {listNotice.length == 0 ? <h5 style={{padding: 10 ,color: "black"}}>No notifications</h5> : listNotice}
                <button onClick={()=>{setNewNotice(newNotice+1)}}>Add</button>
            </div>
        </div>

    )
}