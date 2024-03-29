import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { showNotice } from '../../../lib/notification'
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol, faSearch, faHome, faUsers, faCalendarAlt, faMap, faUserPlus, faEnvelope, faBell, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import axios from 'axios';
import { LOGOUT_API, AVATAR, HOST, NOTIFICATION } from '../../../config/config'
import { useRouter } from 'next/router';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { FormattedMessage } from 'react-intl';

export default function Header() {
    const token = useSelector(state => state.token);
    const user = useSelector(state => state.infoUser);
    const profile = useSelector(state => state.profile);
    let link_profile = user != null ? user.username : "";
    const [notification, showNotification] = useState(false);
    const [listNotice, addNotice] = useState([]);
    const [newNotice, setNewNotice] = useState(0);
    const [cookie, setCookie, removeCookie] = useCookies(["user"]);

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
            let number = 0;
            let list = [];
            data.forEach(element => {
                if (element.read_at === null)
                    number = number + 1;
                let notice = showNotice(element);
                list.push(notice);
            });
            setNewNotice(newNotice => newNotice + number);
            addNotice(listNotice => listNotice.concat(list));
        });
    }, [null]);

    function handleReadNotice() {
        if (!notification) {
            axios.post(NOTIFICATION + 'read', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
            }).catch(error => {
                console.log(error);
            })
        }
        setNewNotice(0);
        showNotification(!notification);
    }

    useEffect(() => {
        window.Echo = new Echo(options);

        window.Echo.private(`App.Models.User.${user.id}`).notification((data) => {
            const obj = { data: { ...data }, type: data.type, read_at: null, created_at: (new Date()).getTime() }

            if (obj.read_at === null)
                setNewNotice(newNotice => newNotice + 1);

            const notice = showNotice(obj);
            addNotice(listNotice => [notice].concat(listNotice));
        });
    }, [null])

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
                <div key={1} className={styles.nav}>
                    <Link href="/">
                        <div className={styles.btnNav}>
                            <div className={styles.iconNav}>
                                <FontAwesomeIcon height={22} icon={faHome}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                <FormattedMessage id="Home" />
                            </div>
                        </div>
                    </Link>
                    <Link href="/team">
                        <div key={2} className={styles.btnNav}>
                            <div className={styles.iconNav}>
                                <FontAwesomeIcon height={22} icon={faUsers}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                <Link href="/team"><div className={styles.link}><FormattedMessage id="Team" /></div></Link>
                                <Link href="/team/invitation"><div className={styles.link}><FormattedMessage id="Team Invitation" /></div></Link>
                            </div>
                        </div>
                    </Link>
                    <Link href="/match">
                        <div key={3} className={styles.btnNav}>
                            <div className={styles.iconNav}>
                                <FontAwesomeIcon height={22} icon={faCalendarAlt}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                <Link href="/match"><div className={styles.link}><FormattedMessage id="Match" /></div></Link>
                                <Link href="/match/invitation"><div className={styles.link}><FormattedMessage id="Match Invitation" /></div></Link>
                            </div>
                        </div>
                    </Link>

                    <Link href="/stadium">
                        <div key={4} className={styles.btnNav}>
                            <div className={styles.iconNav}>
                                <FontAwesomeIcon height={22} icon={faMap}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                <FormattedMessage id="Stadium" />
                            </div>
                        </div>
                    </Link>
                    <Link href="/people">
                        <div key={5} className={styles.btnNav}>
                            <div className={styles.iconNav}>
                                <FontAwesomeIcon height={22} icon={faUserPlus}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                <Link href="/people"><div className={styles.link}><FormattedMessage id="People" /></div></Link>
                                <Link href="/people/friend_request"><div className={styles.link}><FormattedMessage id="Friend Requests" /></div></Link>
                            </div>
                        </div>
                    </Link>
                    <Link href="/message">
                        <div className={styles.btnNav}>

                            <div className={styles.iconNav}>
                                <FontAwesomeIcon height={22} icon={faEnvelope}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                <FormattedMessage id="Message" />
                            </div>
                        </div>
                    </Link>
                    <div className={styles.group_notice}>
                        {newNotice > 0 ? <span className={styles.number}>{newNotice}</span> : ''}
                        <div key={6} className={styles.btnNav} onClick={handleReadNotice}>
                            <div className={styles.iconNav}>
                                <FontAwesomeIcon height={22} icon={faBell}></FontAwesomeIcon>
                            </div>
                            <div className={styles.textNav}>
                                <FormattedMessage id="Notification" />
                            </div>
                        </div>

                    </div>
                </div>
                <Link href={"/" + link_profile}>
                    <div className={styles.profile}>
                        <div className={styles.avatar}>
                            <img src={profile.avatar == null ? AVATAR : HOST + profile.avatar} alt="Avatar"></img>
                        </div>
                        <div className={styles.name}>{user != null ? user.name : "No Name"}</div>
                    </div>
                </Link>
                <div className={styles.setting}>
                    <button><FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon></button>
                    <div className={styles.dropdown_setting}>
                        <Link href="/setting">
                            <a><FormattedMessage id="Account Setting" /></a>
                        </Link>
                        <a onClick={handleLoggout}><FormattedMessage id="Logout" /></a>
                    </div>
                </div>
            </div>
            <div className={notification ? styles.notification : styles.hideNotification}>
                {listNotice.length == 0 ? <h5 style={{ padding: 10, color: "black" }}><FormattedMessage id="No notification" /></h5> : listNotice}
            </div>
        </div>

    )
}