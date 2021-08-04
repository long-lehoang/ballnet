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
import { useDispatch, useSelector } from 'react-redux';
import { FRIENDS_API, FRIEND_REQUESTS_API, HOST, PROFILE_API } from '../../config/config';
import Link from 'next/link';
import { setMessage } from '../../slices/messageSlice';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import { validateFile } from '../../lib/image';
import { setLoading } from '../../slices/loadingSlice';



export default function Profile({ permission, userN, profileN }) {
    const [option, setOption] = useState(1);
    const status = profileN.status || "No status";
    const [cover, setCover] = useState(profileN.cover !== null ? HOST + profileN.cover : '');
    const name = userN.name;
    const points = profileN.points;
    const token = useSelector(state => state.token);

    const [friend, setFriend] = useState(userN.isFriend);
    const [request, setRequest] = useState(userN.isRequest);
    const [waiting, setWaiting] = useState(userN.isWaiting);
    const [idRequest, setIdRequest] = useState(userN.idRequest || '');
    const router = useRouter();
    const dispatch = useDispatch()
    function loadComponent(option) {
        switch (option) {
            case 1:
                return (<Feed user_id={userN.id} permission={permission}></Feed>)
            case 2:
                return (<Info username={userN.username} profile={profileN} user={userN} permission={permission}></Info>)
            case 3:
                return (<Team permission={permission}></Team>)
            case 4:
                return (<Friend username={userN.username} permission={permission}></Friend>)
            case 5:
                return (<Match user_id={userN.id}></Match>)
            case 6:
                return (<Stadium user_id={userN.id}></Stadium>)
            default:
                return (<Feed username={userN.username}></Feed>)
        }
    }

    function handleCover(event) {
        if(!validateFile(event.target)){
            return false;
        }
        dispatch(setLoading(true));
        var formData = new FormData();
        formData.append('image', event.target.files[0]);

        axios.post(PROFILE_API + 'cover', formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            let url = URL.createObjectURL(event.target.files[0]);
            setCover(url);
            dispatch(setLoading(false));

        }).catch((error) => {
            dispatch(setLoading(false));
            console.log(error);
        });
    }

    function handleAdd() {
        let formData = new FormData();
        formData.append('username', userN.username);
        axios.post(FRIEND_REQUESTS_API, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setWaiting(true);
            setIdRequest(response.data.data);
        }).catch(error=>{
            openMessageBox("Error happened when add friend");
        })
    }
    function handleUnfriend() {
        axios.delete(FRIENDS_API + `${userN.username}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setFriend(false);
            router.push('/');
        }).catch(error => {
            openMessageBox("Error happened when unfriend");

        })
    }

    function handleAccept() {
        axios.post(FRIEND_REQUESTS_API + `${idRequest}/accept`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setFriend(true);
        }).catch(error => {
            openMessageBox("Error happened when accept request");

        })
    }

    function handleDeny() {
        axios.post(FRIEND_REQUESTS_API + `${idRequest}/deny`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setRequest(false);
        }).catch(error => {
            openMessageBox("Error happened when deny request");
        })
    }

    function handleCancel() {
        axios.post(FRIEND_REQUESTS_API + `${idRequest}/deny`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setWaiting(false);
        }).catch(error => {
            openMessageBox("Error happened when cancel request");
        })
    }

    function openMessageBox(message, title = 'Error') {
        const data = { title: title, message: message, show: true };
        const action = setMessage(data);
        dispatch(action);
    }

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <img src={cover} key={cover} className={styles.cover}></img>
                {permission ? <input type="file" accept=".jpg, .png, .jpeg" name="image" id="btn-change" onChange={handleCover} className={styles.btnChange}></input> : ''}
                {permission ? <label for="btn-change"><FormattedMessage id="Change" /></label> : ''}
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
                        <div className={styles.first}>
                            <div>
                                <span className={styles.name}>{name}</span>
                                <span className={styles.star}>
                                    {loadStar(points, 15)}
                                </span>
                            </div>
                            <div className={styles.btn}>
                                {permission ? <Link href="/setting"><button className={styles.btn_setting}><FormattedMessage id="Setting" /></button></Link> :
                                    friend ? <button className={styles.btn_unfr} onClick={handleUnfriend}><FormattedMessage id="Unfriend" /></button> :
                                        request ? <button className={styles.btn_accept} onClick={handleAccept}><FormattedMessage id="Accept" /></button> :
                                            waiting ? <button className={styles.btn_cancel} onClick={handleCancel}><FormattedMessage id="Cancel" /></button> :
                                                <button className={styles.btn_add} onClick={handleAdd}><FormattedMessage id="Add Friend" /></button>}
                                {request ? <button className={styles.btn_deny} onClick={handleDeny}><FormattedMessage id="Deny" /></button> : ''}
                            </div>

                        </div>
                    </div>
                    <div className={styles.menu}>
                        <button onClick={() => setOption(1)} className={option == 1 ? styles.active : ''}>
                            <FontAwesomeIcon className={styles.icon} icon={faNewspaper} height={20}></FontAwesomeIcon>
                            <span><FormattedMessage id="Feed" /></span>
                        </button>
                        <button onClick={() => setOption(2)} className={option == 2 ? styles.active : ''}>
                            <FontAwesomeIcon className={styles.icon} icon={faIdCard} height={20}></FontAwesomeIcon>
                            <span><FormattedMessage id="Info" /></span>
                        </button>
                        <button onClick={() => setOption(3)} className={option == 3 ? styles.active : ''}>
                            <FontAwesomeIcon className={styles.icon} icon={faUsers} height={20}></FontAwesomeIcon>
                            <span><FormattedMessage id="Teams" /></span>
                        </button>
                        <button onClick={() => setOption(4)} className={option == 4 ? styles.active : ''}>
                            <FontAwesomeIcon className={styles.icon} icon={faUser} height={20}></FontAwesomeIcon>
                            <span><FormattedMessage id="Friends" /></span>
                        </button>
                        {friend || permission ?
                            <button onClick={() => setOption(5)} className={option == 5 ? styles.active : ''}>
                                <FontAwesomeIcon className={styles.icon} icon={faCalendarAlt} height={20}></FontAwesomeIcon>
                                <span><FormattedMessage id="Matches" /></span>
                            </button> : ''}
                        {friend || permission ?
                            <button onClick={() => setOption(6)} className={option == 6 ? styles.active : ''}>
                                <FontAwesomeIcon className={styles.icon} icon={faMap} height={20}></FontAwesomeIcon>
                                <span><FormattedMessage id="Stadiums" /></span>
                            </button> : ''}
                    </div>
                    {loadComponent(option)}
                </div>
                <div className={styles.right}>

                    <div className={styles.component}>
                        <MatchSuggest></MatchSuggest>
                    </div>
                </div>
            </div>
        </div>
    )
}