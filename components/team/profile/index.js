import styles from './styles.module.scss';
import StadiumSuggest from '../../commons/StadiumSuggest';
import MatchSuggest from '../../commons/MatchSuggest';
import InfoComponent from './InfoComponent';
import Feed from './Feed';
import Info from './Info';
import Match from './Match';

import { useState } from 'react';
import loadStar from '../../../lib/star';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faIdCard, faMap, faNewspaper, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { HOST, PROFILE_API } from '../../../config/config';
import Link from 'next/link';
import { TEAM_API } from '../../../config/config';


export default function TeamProfile({isMember, isAdmin, isCaptain, team}) {
    const [option, setOption] = useState(2);
    const [cover, setCover] = useState(team.cover !== null ? HOST + team.cover : '');
    const name = team.name;
    const points = team.rating;
    const token = useSelector(state => state.token);

    function loadComponent(option) {
        switch (option) {
            case 1:
                return (<Feed team={team}></Feed>)
            case 2:
                return (<Info team={team} permission={isCaptain}></Info>)
            case 3:
                return (<Member permission={isCaptain}></Member>)
            case 4:
                return (<MemberRequest permission={isAdmin}></MemberRequest>)
            case 5:
                return (<Match></Match>)
            case 6:
                return (<MatchRequest></MatchRequest>)
            default:
                return (<Info team={team} permission={isCaptain}></Info>)
        }
    }

    function handleCover(event) {
        var formData = new FormData();
        formData.append('image', event.target.files[0]);

        axios.post(TEAM_API + `${team.id}/cover`, formData, {
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
                {isCaptain ? <input type="file" name="image" id="btn-change" onChange={handleCover} className={styles.btnChange}></input> : ''}
                {isCaptain ? <label for="btn-change">Change</label> : ''}
            </div>
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.item}>
                        <InfoComponent team={team} permission={isCaptain}></InfoComponent>
                    </div>
                    <div className={styles.item}>
                        <StadiumSuggest></StadiumSuggest>
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.header}>
                        <span className={styles.name}>{name}</span>
                        <div className={styles.info}>
                            <span className={styles.status}></span>
                            <div className={styles.star}>
                                {loadStar(points, 15)}
                            </div>
                        </div>
                    </div>
                    <div className={styles.menu}>
                        {isMember ? 
                        <button onClick={() => setOption(1)} className={option == 1 ? styles.active : ''}>
                            <FontAwesomeIcon className={styles.icon} icon={faNewspaper} height={20}></FontAwesomeIcon>
                            <span>Feed</span>
                        </button> : ''}
                        
                        <button onClick={() => setOption(2)} className={option == 2 ? styles.active : ''}>
                            <FontAwesomeIcon className={styles.icon} icon={faIdCard} height={20}></FontAwesomeIcon>
                            <span>Info</span>
                        </button>
                        {isMember ?
                        <button onClick={() => setOption(3)} className={option == 4 ? styles.active : ''}>
                            <FontAwesomeIcon className={styles.icon} icon={faUser} height={20}></FontAwesomeIcon>
                            <span>Members</span>
                        </button>:''}
                        {isMember ?
                        <button onClick={() => setOption(4)} className={option == 4 ? styles.active : ''}>
                            <FontAwesomeIcon className={styles.icon} icon={faUser} height={20}></FontAwesomeIcon>
                            <span>Member Requests</span>
                        </button>:''}
                        {isMember ?
                        <button onClick={() => setOption(5)} className={option == 5 ? styles.active : ''}>
                            <FontAwesomeIcon className={styles.icon} icon={faCalendarAlt} height={20}></FontAwesomeIcon>
                            <span>Matchs</span>
                        </button>:''}
                        {isMember ?
                        <button onClick={() => setOption(6)} className={option == 5 ? styles.active : ''}>
                            <FontAwesomeIcon className={styles.icon} icon={faCalendarAlt} height={20}></FontAwesomeIcon>
                            <span>Match Invitation</span>
                        </button>:''}
                    </div>
                    {loadComponent(option)}
                </div>
                <div className={styles.right}>
                    {isMember ? <button className={styles.btnSetting}>Leave</button> : <button className={styles.btnSetting}>Join</button>}

                    <div className={styles.component}>
                        <MatchSuggest></MatchSuggest>
                    </div>
                </div>
            </div>
        </div>
    )
}