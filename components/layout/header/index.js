import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol, faSearch, faHome, faUsers, faCalendarAlt, faMap, faUserPlus, faEnvelope, faBell, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import axios from 'axios';
import {LOGOUT_API} from '../../../config/config'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Header(){
    const router = useRouter()
    function handleLoggout(e){
        const token = localStorage.getItem('access_token');
        axios.get(LOGOUT_API,{
            headers:{
                'Authorization': token
            }
        }).then((response)=>{
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            router.push('/login');
        }).catch((error)=>{
            
        });
    }
    const user = useSelector(state => state.infoUser);

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
                <Link href="/long-lehoang">
                <div className={styles.profile}>
                    <div className={styles.avatar}>
                        <img src="/avatar.jpg"></img>
                    </div>
                    <div className={styles.name}>{user !== null ? user.name : 'No Name' }</div>
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