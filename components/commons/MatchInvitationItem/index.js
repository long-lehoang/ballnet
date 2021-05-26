import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR, AVATAR_TEAM, HOST, MATCH_API, MATCH_INVITATION_API, MATCH_JOINING_API } from '../../../config/config';
import { setMessage } from '../../../slices/messageSlice';
import styles from './styles.module.scss';

export default function Item({ team, item }) {
    const [time, setTime] = useState(new Date(item.time.split(", ")[0]));
    const [type, setType] = useState(item.type.split(" vs ")[0]);
    const [typeSport, setTypeSport] = useState(item.type);
    const [location, setLocation] = useState(item.location);
    const avatar1 = item.avatar1 == null ? AVATAR_TEAM : HOST + item.avatar1;
    const avatar2 = item.avatar2 == null ? AVATAR_TEAM : HOST + item.avatar2;
    const [team2, setTeam2] = useState(item.team_2);
    const [member1, setMember1] = useState(item.member1);
    const [member2, setMember2] = useState(item.member2);

    const [members1, setMembers1] = useState([]);
    const [members2, setMembers2] = useState([]);
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();

    const [del, setDel] = useState(false);

    function openMessageBox(message, title = 'Error') {
        const data = { title: title, message: message, show: true };
        const action = setMessage(data);
        dispatch(action);
    }

    function handleDeny(option) {
        axios.post(MATCH_INVITATION_API + `${team.id}/${item.request_id}/cancel`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setDel(true);
        }).catch(error => {
            openMessageBox(error.response.data.message);
        })
    }

    function handleAccept(option) {
        axios.post(MATCH_INVITATION_API + `${team.id}/${item.request_id}/accept`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setDel(true);
        }).catch(error => {
            openMessageBox(error.response.data.message);
        })
    }

    function handleDeleteMember(option, join_id) {
        axios.delete(MATCH_JOINING_API + join_id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (option === 1) {
                setMembers1(members1.filter(element => { return element.join_id !== join_id }))
            } else {
                setMembers2(members2.filter(element => { return element.join_id !== join_id }))
            }
        }).catch(error => {
            openMessageBox(error.response.data.message)
        })
    }

    useEffect(() => {
        axios.get(MATCH_API + `${item.id}/member/${item.team_1}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setMembers1(response.data.data);
        }).catch(error => {
            openMessageBox(error.response.data.message)
        })
        axios.get(MATCH_API + `${item.id}/member/${item.team_2}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setMembers2(response.data.data);
        }).catch(error => {
            openMessageBox(error.response.data.message)
        })
    }, [null])
    return (
        <div className={!del ? styles.container : styles.none}>
            <div className={styles.edit}>
                <div className={styles.user}>
                    <img src={item.avatar_user == null ? AVATAR : HOST + item.avatar_user}></img>
                    <span>{item.name_user}</span>
                </div>
                <button className={styles.btnShowPopup}>...</button>
                <div className={styles.popup}>

                </div>
            </div>
            <hr></hr>
            <div className={styles.team}>
                <Link href={`/team/${item.team_1}`}>
                    <img src={avatar1} className={styles.logo}></img>
                </Link>

                {team2 == null ? <button className={styles.btnTeamJoin}>+</button> :
                    <Link href={`/team/${item.team_2}`}>
                        <img src={avatar2} className={styles.logo}></img>
                    </Link>
                }

            </div>
            <div className={styles.name}>
                <span>{item.name1}</span>
                <span>{item.name2}</span>
            </div>
            <div className={styles.members}>
                <span className={styles.member}>{`${member1}/${type}`}
                    <div className={styles.popupMember}>
                        {members1.map((element, key) => {
                            let src = element.avatar == null ? AVATAR : HOST + element.avatar;
                            return (
                                <div className={styles.item} key={key}>
                                    <Link href={`/${element.username}`}>
                                        <div>
                                            <img src={src}></img>
                                            <span>{element.name}</span>
                                        </div>
                                    </Link>
                                    <div>
                                        {item.admin2 ? <button onClick={() => handleDeleteMember(1, element.join_id)}>
                                            <FontAwesomeIcon icon={faTrash} height={12}></FontAwesomeIcon>
                                        </button> : ''}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </span>
                <span className={styles.member}>{`${member2}/${type}`}
                    <div className={styles.popupMember}>
                        {members2.map((element, key) => {
                            let src = element.avatar == null ? AVATAR : HOST + element.avatar;
                            return (
                                <div className={styles.item} key={key}>
                                    <Link href={`/${element.username}`}>
                                        <div>
                                            <img src={src}></img>
                                            <span>{element.name}</span>
                                        </div>
                                    </Link>
                                    <div>
                                        {item.admin2 ? <button onClick={() => handleDeleteMember(2, element.join_id)}>
                                            <FontAwesomeIcon icon={faTrash} height={12}></FontAwesomeIcon>
                                        </button> : ''}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </span>
            </div>
            <div className={styles.type}>
                <span>{item.sport} &#40;{typeSport}&#41;</span>
            </div>
            <div className={styles.time}>
                <span>{time.toLocaleString()}</span>
            </div>
            <div className={styles.location}>
                <span>{item.stadium == null ? '' : `${item.stadium}, `}{location}</span>
            </div>
            <hr></hr>
            <div className={styles.action}>
                <button className={styles.btnAccept} onClick={handleAccept}><FormattedMessage id="Accept" /></button>
                <button className={styles.btnCancel} onClick={handleDeny}><FormattedMessage id="Deny" /></button>
            </div>
        </div>
    )
}