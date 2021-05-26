import styles from './styles.module.scss';
import StadiumSuggest from '../../commons/StadiumSuggest';
import MatchSuggest from '../../commons/MatchSuggest';
import InfoComponent from './InfoComponent';
import Feed from './Feed';
import Info from './Info';
import Match from './Match';
import Member from './Member';
import MemberRequest from './MemberRequest';
import { useEffect, useState } from 'react';
import loadStar from '../../../lib/star';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faIdCard, faMap, faNewspaper, faUser, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { HOST, PROFILE_API, TEAM_REQUEST_API } from '../../../config/config';
import { TEAM_API } from '../../../config/config';
import { setMessage } from '../../../slices/messageSlice';
import { Router, useRouter } from 'next/dist/client/router';
import ChangeCaptain from './ChangeCaptain';
import MatchInvitation from './MatchInvitation';
import { FormattedMessage } from 'react-intl';


export default function TeamProfile({ isMember, isAdmin, isCaptain, team }) {
    const [option, setOption] = useState(2);
    const [cover, setCover] = useState(team.cover !== null ? HOST + team.cover : '');
    const name = team.name;
    const points = team.rating;
    const token = useSelector(state => state.token);
    const [changeCaptain, openChangeCaptain] = useState(false);
    const [member, setMember] = useState(team.isMember);
    const [waiting, setWaiting] = useState(team.isWaitingForApprove);
    const [invited, setInvited] = useState(team.isInvitedBy);
    const [idRequest, setIdRequest] = useState(team.idRequest || '');

    const dispatch = useDispatch();
    const router = useRouter();
    function loadComponent(option) {
        switch (option) {
            case 1:
                return (<Feed team={team}></Feed>)
            case 2:
                return (<Info team={team} permission={isCaptain}></Info>)
            case 3:
                return (<Member team={team}></Member>)
            case 4:
                return (<MemberRequest team={team}></MemberRequest>)
            case 5:
                return (<Match team={team}></Match>)
            case 6:
                return (<MatchInvitation team={team}></MatchInvitation>)
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
            openMessageBox('Có lỗi xảy ra trong quá trình thay đổi ảnh bìa.')

        });
    }

    function handleLeave() {
        if (isCaptain) {
            openChangeCaptain(true);
        } else {
            axios.delete(TEAM_API + `${team.id}/leave`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                setMember(false);
                router.push('/');
            }).catch(error => {
                console.log(error);
                openMessageBox(error.response.data.message);
            })
        }
    }

    function handleJoin() {
        let formData = new FormData();
        formData.append('team_id', team.id);
        axios.post(TEAM_REQUEST_API, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setWaiting(true);
            setIdRequest(response.data.data);
        }).catch(error => {
            console.log(error);
            openMessageBox('Có lỗi xảy ra trong quá trình tham gia đội.')
        });
    }
    function handleCancel() {
        axios.post(TEAM_REQUEST_API + `${idRequest}/deny`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setWaiting(false);
        }).catch(error => {
            console.log(error);
            openMessageBox('Có lỗi xảy ra trong quá trình huỷ yêu cầu tham gia đội.')
        });
    }

    function handleAccept() {
        axios.post(TEAM_REQUEST_API + `${idRequest}/approve`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setMember(true);
            setInvited(false);
        }).catch(error => {
            console.log(error);
            openMessageBox('Có lỗi xảy ra trong quá trình huỷ yêu cầu tham gia đội.')
        });

    }

    function handleDeny() {
        axios.post(TEAM_REQUEST_API + `${idRequest}/deny`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setInvited(false);
        }).catch(error => {
            console.log(error);
            openMessageBox('Có lỗi xảy ra trong quá trình huỷ yêu cầu tham gia đội.')
        });
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
                {isCaptain ? <input type="file" name="image" id="btn-change" onChange={handleCover} className={styles.btnChange}></input> : ''}
                {isCaptain ? <label for="btn-change"><FormattedMessage id="Change" /></label> : ''}
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
                        <div>
                            <span className={styles.name}>{name}</span>
                            <div className={styles.star}>
                                {loadStar(points, 15)}
                            </div>
                        </div>
                        <div className={styles.btn}>
                            <ChangeCaptain team={team} openMessageBox={openMessageBox} setMember={setMember} show={changeCaptain} setShow={openChangeCaptain}></ChangeCaptain>
                            {member ? <button className={styles.btn_leave} onClick={handleLeave}><FormattedMessage id="Leave" /></button> :
                                waiting ? <button className={styles.btn_cancel} onClick={handleCancel}><FormattedMessage id="Cancel" /></button> :
                                    invited ? <button className={styles.btn_accept} onClick={handleAccept}><FormattedMessage id="Accept" /></button> :
                                        <button className={styles.btn_join} onClick={handleJoin}><FormattedMessage id="Join" /></button>}
                            {invited ? <button className={styles.btn_deny} onClick={handleDeny}><FormattedMessage id="Deny" /></button> : ''}
                        </div>

                    </div>
                    <div className={styles.menu}>
                        {isMember ?
                            <button onClick={() => setOption(1)} className={option == 1 ? styles.active : ''}>
                                <FontAwesomeIcon className={styles.icon} icon={faNewspaper} height={20}></FontAwesomeIcon>
                                <span><FormattedMessage id="Feed" /></span>
                            </button> : ''}

                        <button onClick={() => setOption(2)} className={option == 2 ? styles.active : ''}>
                            <FontAwesomeIcon className={styles.icon} icon={faIdCard} height={20}></FontAwesomeIcon>
                            <span><FormattedMessage id="Info" /></span>
                        </button>
                        {isMember ?
                            <button onClick={() => setOption(3)} className={option == 3 ? styles.active : ''}>
                                <FontAwesomeIcon className={styles.icon} icon={faUser} height={20}></FontAwesomeIcon>
                                <span><FormattedMessage id="Members" /></span>
                            </button> : ''}
                        {isAdmin ?
                            <button onClick={() => setOption(4)} className={option == 4 ? styles.active : ''}>
                                <FontAwesomeIcon className={styles.icon} icon={faUserPlus} height={20}></FontAwesomeIcon>
                                <span><FormattedMessage id="Member Requests" /></span>
                            </button> : ''}
                        {isMember ?
                            <button onClick={() => setOption(5)} className={option == 5 ? styles.active : ''}>
                                <FontAwesomeIcon className={styles.icon} icon={faCalendarAlt} height={20}></FontAwesomeIcon>
                                <span><FormattedMessage id="Matches" /></span>
                            </button> : ''}
                        {isCaptain ?
                            <button onClick={() => setOption(6)} className={option == 6 ? styles.active : ''}>
                                <FontAwesomeIcon className={styles.icon} icon={faCalendarAlt} height={20}></FontAwesomeIcon>
                                <span><FormattedMessage id="Match Invitation" /></span>
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