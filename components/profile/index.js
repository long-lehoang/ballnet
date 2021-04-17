import styles from './styles.module.scss';
import StadiumSuggest from '../commons/StadiumSuggest';
import MatchSuggest from '../commons/MatchSuggest';
import InfoComponent from './InfoComponent';
import Feed from './Feed';
import Info from './Info';
import Stadium from './Stadium';
import Team from './Team';
import Match from './Match';
import Friend from './Friend';

import { useState } from 'react';
import loadStar from '../../lib/star';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faIdCard, faMap, faNewspaper, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { HOST, PROFILE_API } from '../../config/config';
import Link from 'next/link';



export default function Profile({permission, userN, profileN}) {
    const [option, setOption] = useState(1);
    const status = profileN.status || "No status";
    const [cover, setCover] = useState(profileN.cover !== null ? HOST + profileN.cover : '');
    const name = userN.name;
    const points = profileN.points;
    const token = useSelector(state => state.token);

    function loadComponent(option) {
        switch (option) {
            case 1:
                return (<Feed username={userN.username} permission={permission}></Feed>)
            case 2:
                return (<Info username={userN.username} profile={profileN} user={userN} permission={permission}></Info>)
            case 3:
                return (<Team permission={permission}></Team>)
            case 4:
                return (<Friend username={userN.username} permission={permission}></Friend>)
            case 5:
                return (<Match></Match>)
            case 6:
                return (<Stadium></Stadium>)
            default:
                return (<Feed username={userN.username}></Feed>)
        }
    }

    function handleCover(event) {
        var formData = new FormData();
        formData.append('image', event.target.files[0]);

        axios.post(PROFILE_API + 'cover', formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            let url = URL.createObjectURL(event.target.files[0]);
            setCover(url);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <img src={cover} key={cover} className={styles.cover}></img>
                {permission ? <input type="file" name="image" id="btn-change" onChange={handleCover} className={styles.btnChange}></input> : ''}
                {permission ? <label for="btn-change">Change</label> : ''}
            </div>
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.item}>
                        <InfoComponent username={userN.username} profile={profileN} permission={permission}></InfoComponent>
                    </div>
                    <div className={styles.item}>
                        <StadiumSuggest></StadiumSuggest>
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.header}>
                        <span className={styles.name}>{name}</span>
                        <div className={styles.info}>
                            <span className={styles.status}>{status}</span>
                            <div className={styles.star}>
                                {loadStar(points, 15)}
                            </div>
                        </div>
                    </div>
                    <div className={styles.menu}>
                        <button onClick={() => setOption(1)} className={option == 1 ? styles.active : ''}>
                            <FontAwesomeIcon className={styles.icon} icon={faNewspaper} height={20}></FontAwesomeIcon>
                            <span>Feed</span>
                        </button>
                        <button onClick={() => setOption(2)} className={option == 2 ? styles.active : ''}>
                            <FontAwesomeIcon className={styles.icon} icon={faIdCard} height={20}></FontAwesomeIcon>
                            <span>Info</span>
                        </button>
                        <button onClick={() => setOption(3)} className={option == 3 ? styles.active : ''}>
                            <FontAwesomeIcon className={styles.icon} icon={faUsers} height={20}></FontAwesomeIcon>
                            <span>Teams</span>
                        </button>
                        <button onClick={() => setOption(4)} className={option == 4 ? styles.active : ''}>
                            <FontAwesomeIcon className={styles.icon} icon={faUser} height={20}></FontAwesomeIcon>
                            <span>Friends</span>
                        </button>
                        <button onClick={() => setOption(5)} className={option == 5 ? styles.active : ''}>
                            <FontAwesomeIcon className={styles.icon} icon={faCalendarAlt} height={20}></FontAwesomeIcon>
                            <span>Matchs</span>
                        </button>
                        <button onClick={() => setOption(6)} className={option == 6 ? styles.active : ''}>
                            <FontAwesomeIcon className={styles.icon} icon={faMap} height={20}></FontAwesomeIcon>
                            <span>Stadiums</span>
                        </button>
                    </div>
                    {loadComponent(option)}
                </div>
                <div className={styles.right}>
                    {permission ? <Link href="/setting"><button className={styles.btnSetting}>Setting</button></Link> : <Link href="message"><button className={styles.btnSetting}>Message</button></Link>}

                    <div className={styles.component}>
                        <MatchSuggest></MatchSuggest>
                    </div>
                </div>
            </div>
        </div>
    )
}