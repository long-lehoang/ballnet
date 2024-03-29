import { faWindowMinimize } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR, AVATAR_TEAM, HOST, MATCH_API, MATCH_JOINING_API } from '../../../config/config';
import { setMessage } from '../../../slices/messageSlice';
import EditMatchForm from '../EditMatchForm';
import Booking from './Booking';
import InvitePeople from './InvitePeople';
import InviteTeam from './InviteTeam';
import SelectTeam from './SelectMyTeam';
import styles from './styles.module.scss';
import TeamRequest from './TeamRequest';
import UserRequest from './UserRequest';

export default function Item({ item }) {
    const [time, setTime] = useState(new Date(item.time.split(", ")[0]));
    const [type, setType] = useState(item.type.split(" vs ")[0]);
    const [typeSport, setTypeSport] = useState(item.type);
    const [location, setLocation] = useState(item.location);
    const avatar1 = item.avatar1 == null ? AVATAR_TEAM : HOST + item.avatar1;
    const avatar2 = item.avatar2 == null ? AVATAR_TEAM : HOST + item.avatar2;
    const [team2, setTeam2] = useState(item.team_2);
    const [isJoin1, setIsJoin1] = useState(item.join1);
    const [isJoin2, setIsJoin2] = useState(item.join2);
    const [isRequest1, setIsRequest1] = useState(item.wait1 == 1);
    const [isRequest2, setIsRequest2] = useState(item.wait2 == 1);
    const [idRequest1, setIdRequest1] = useState(item.idRequest1);
    const [idRequest2, setIdRequest2] = useState(item.idRequest2);
    const [member1, setMember1] = useState(item.member1);
    const [member2, setMember2] = useState(item.member2);
    const isInvite1 = item.wait1 == 2;
    const isInvite2 = item.wait2 == 2;
    const [selectTeam, setSelectTeam] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showInviteTeam, setShowInviteTeam] = useState(false);
    const [showInvitePeople1, setShowInvitePeople1] = useState(false);
    const [showInvitePeople2, setShowInvitePeople2] = useState(false);
    const [showTeamRequest, setShowTeamRequest] = useState(false);
    const [showUserRequest1, setShowUserRequest1] = useState(false);
    const [showUserRequest2, setShowUserRequest2] = useState(false);
    const [showBooking, setShowBooking] = useState(false);
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

    function checkStart()
    {
        let now = new Date();
        let start = new Date(time);
        return start <= now;
    }

    function handleJoin(option) {
        var formData = new FormData();
        formData.append('team_id', option == 1 ? item.team_1 : item.team_2);
        formData.append('match_id', item.id);
        axios.post(MATCH_JOINING_API, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (option == 1) {
                if (response.data.data.status == 'active') {
                    setIsJoin1(true);
                    setIdRequest1(response.data.data.id);
                    setMember1(member1 + 1);
                } else {
                    setIsRequest1(true);
                    setIdRequest1(response.data.data.id);
                }
            } else {
                if (response.data.data.status == 'active') {
                    setIsJoin2(true);
                    setIdRequest2(response.data.data.id);
                    setMember2(member2 + 1);
                } else {
                    setIsRequest2(true);
                    setIdRequest2(response.data.data.id);
                }
            }
        }).catch(error => {
            openMessageBox(error.response.data.message);
        })
    }

    function handleTeamJoin() {
        setSelectTeam(true);
    }

    function handleLeave(option) {
        let id = option == 2 ? idRequest2 : idRequest1;

        axios.delete(MATCH_JOINING_API + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (option == 1) {
                setIsJoin1(false);
                setIdRequest1(null);
                setMember1(member1 - 1);
            } else {
                setIsJoin2(false);
                setIdRequest2(null);
                setMember2(member2 - 1);
            }
        }).catch(error => {
            openMessageBox(error.response.data.message);
        })
    }

    function handleCancel(option) {
        let id = option == 2 ? idRequest2 : idRequest1;

        axios.delete(MATCH_JOINING_API + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (option == 1) {
                setIsRequest1(false);
                setIdRequest1(null);
            } else {
                setIsRequest2(false);
                setIdRequest2(null);
            }
        }).catch(error => {
            openMessageBox(error.response.data.message);
        })
    }

    function handleDeny(option) {
        let id = option == 2 ? idRequest2 : idRequest1;

        axios.delete(MATCH_JOINING_API + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (option == 1) {
                setIsRequest1(false);
                setIdRequest1(null);
            } else {
                setIsRequest2(false);
                setIdRequest2(null);
            }
        }).catch(error => {
            openMessageBox(error.response.data.message);
        })
    }

    function handleAccept(option) {
        var formData = new FormData();
        let id = option == 2 ? idRequest2 : idRequest1
        axios.put(MATCH_JOINING_API + id, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (option == 1) {
                setIsJoin1(true);
                setMember1(member1 + 1);
            } else {
                setIsJoin2(true);
                setMember2(member2 + 1);
            }
        }).catch(error => {
            openMessageBox(error.response.data.message);
        })
    }

    function handleEdit() {
        setShowEdit(true);
    }

    function handleBooking() {
        setShowBooking(true);
    }

    function handleTeamLeave() {
        axios.put(MATCH_API + `${item.id}/leave`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setTeam2(null);
        }).catch(error => {
            openMessageBox(error.response.data.message);
        })
    }

    function handleInviteTeam() {
        setShowInviteTeam(true);
    }

    function handleInvitePeople(option) {
        option === 1 ? setShowInvitePeople1(true) : setShowInvitePeople2(true);
    }

    function handleDelete() {
        axios.delete(MATCH_API + item.id, {
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

    function handleRemoveTeam() {
        axios.delete(MATCH_API + `${item.id}/team`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setTeam2(null);
            setMembers2([]);
            setMember2(0);
        }).catch(error => {
            openMessageBox(error.response.data.message);
        })
    }

    function handleManageUserRequest(option) {
        if (option === 1) {
            setShowUserRequest1(true);
        } else {
            setShowUserRequest2(true);
        }
    }

    function handleManageTeamRequest() {
        setShowTeamRequest(true);
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
            <SelectTeam show={selectTeam} setShow={setSelectTeam} match={item} />
            {item.captain1 ? <EditMatchForm item={item} setShow={setShowEdit} show={showEdit}
                setParentLocation={setLocation} setParentType={setType}
                setParentStart={setTime} setParentTypeSport={setTypeSport} /> : ''}
            {item.admin1 && item.team_2 == null ? <InviteTeam show={showInviteTeam} setShow={setShowInviteTeam} match={item} /> : ''}
            <InvitePeople show={showInvitePeople1} setShow={setShowInvitePeople1} match={item} team_id={item.team_1} />
            {item.team_2 !== null ? <InvitePeople show={showInvitePeople2} setShow={setShowInvitePeople2} match={item} team_id={item.team_2} /> : ''}
            {item.captain1 ? <TeamRequest show={showTeamRequest} setShow={setShowTeamRequest} match={item} /> : ''}
            {item.admin1 ? <UserRequest show={showUserRequest1} setShow={setShowUserRequest1} match={item} team_id={item.team_1} /> : ''}
            {item.admin2 ? <UserRequest show={showUserRequest2} setShow={setShowUserRequest2} match={item} team_id={item.team_2} /> : ''}
            {item.captain1 ? <Booking show={showBooking} setShow={setShowBooking} match={item}></Booking> : ''}
            <div className={styles.edit}>
                <div className={styles.user}>
                    <img src={item.avatar_user == null ? AVATAR : HOST + item.avatar_user}></img>
                    <span>{item.name_user}</span>
                </div>
                <button className={styles.btnShowPopup}>...</button>
                <div className={styles.popup}>
                    {item.captain1 && !checkStart() ? <button onClick={handleEdit}><FormattedMessage id="Edit" /></button> : ''}
                    {item.captain1 && !checkStart() ? <button onClick={() => handleManageTeamRequest(2)}><FormattedMessage id="Team Request" /></button> : ''}
                    {item.captain1 && !checkStart() ? <button onClick={handleBooking}><FormattedMessage id="Book Stadium" /></button> : ''}
                    {item.captain1 && !checkStart() ? <button onClick={handleDelete}><FormattedMessage id="Delete" /></button> : ''}
                </div>
            </div>
            <hr></hr>
            <div className={styles.actionTeam}>
                <button className={styles.btnShowPopup1}>...</button>
                <div className={styles.popup1}>
                    {item.admin1 && !checkStart() ? <button onClick={() => handleManageUserRequest(1)}><FormattedMessage id="User Request" /></button> : ''}
                    {!checkStart() ? <button onClick={() => { handleInvitePeople(1) }}><FormattedMessage id="Invite People" /></button> : ''}
                </div>
                <button className={styles.btnShowPopup2}>...</button>
                <div className={styles.popup2}>
                    {item.admin1 && !checkStart() && item.team_2 == null ? <button onClick={handleInviteTeam}><FormattedMessage id="Invite Team" /></button> : ''}
                    {item.admin2 && !checkStart() ? <button onClick={() => handleManageUserRequest(2)}><FormattedMessage id="User Request" /></button> : ''}
                    {item.team_2 !== null && !checkStart() ? <button onClick={() => { handleInvitePeople(2) }}><FormattedMessage id="Invite People" /></button> : ''}
                    {item.captain2 && !checkStart() ? <button onClick={handleTeamLeave}><FormattedMessage id="Leave" /></button> : ''}
                    {item.captain1 && !checkStart() && item.team_2 !== null ? <button onClick={handleRemoveTeam}><FormattedMessage id="Remove" /> {item.name2}</button> : ''}
                </div>
            </div>
            <div className={styles.team}>
                <Link href={`/team/${item.team_1}`}>
                    <img src={avatar1} className={styles.logo}></img>
                </Link>

                {team2 == null ? <button onClick={handleTeamJoin} className={styles.btnTeamJoin} disabled={checkStart() ? 'disabled' : ''}>+</button> :
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
            <div className={styles.action}>
                <div>
                    {isJoin1 ? <button className={styles.btnLeave} onClick={() => { handleLeave(1) }} disabled={checkStart() ? 'disabled' : ''}><FormattedMessage id="Leave" /></button> :
                        isJoin2 ? <button disabled className={styles.btnJoin} onClick={() => { handleJoin(2) }} ><FormattedMessage id="Join" /></button> :
                            isRequest1 ? <button className={styles.btnCancel} onClick={() => { handleCancel(1) }} disabled={checkStart() ? 'disabled' : ''}><FormattedMessage id="Cancel" /></button> :
                                isInvite1 ? <button className={styles.btnAccept} onClick={() => { handleAccept(1) }} disabled={checkStart() ? 'disabled' : ''}><FormattedMessage id="Accept" /></button> :
                                    <button className={styles.btnJoin} onClick={() => { handleJoin(1) }} disabled={checkStart() ? 'disabled' : ''}><FormattedMessage id="Join" /></button>}

                    {(!isJoin1 && !isJoin2) && isInvite1 ? <button className={styles.btnCancel} onClick={handleDeny} disabled={checkStart() ? 'disabled' : ''}><FormattedMessage id="Deny" /></button> :
                        ''}
                </div>
                {team2 == null ?
                    <div>
                        <button className={styles.btnJoin} onClick={() => { handleJoin(2) }} disabled><FormattedMessage id="Join" /></button>
                    </div> :
                    <div>
                        {isJoin2 ? <button className={styles.btnLeave} onClick={() => { handleLeave(2) }} disabled={checkStart() ? 'disabled' : ''}><FormattedMessage id="Leave" /></button> :
                            isJoin1 ? <button disabled={'disabled'} className={styles.btnJoin} onClick={() => { handleJoin(2) }}><FormattedMessage id="Join" /></button> :
                                isRequest2 ? <button className={styles.btnCancel} onClick={() => { handleCancel(2) }} disabled={checkStart() ? 'disabled' : ''}><FormattedMessage id="Cancel" /></button> :
                                    isInvite2 ? <button className={styles.btnAccept} onClick={() => { handleAccept(2) }} disabled={checkStart() ? 'disabled' : ''}><FormattedMessage id="Accept" /></button> :
                                        <button className={styles.btnJoin} onClick={() => { handleJoin(2) }} disabled={checkStart() ? 'disabled' : ''}><FormattedMessage id="Join" /></button>}

                        {(!isJoin1 && !isJoin2) && isInvite2 ? <button className={styles.btnCancel} onClick={handleDeny} disabled={checkStart() ? 'disabled' : ''}><FormattedMessage id="Deny" /></button> :
                            ''}
                    </div>
                }
            </div>
            <hr></hr>

            <div className={styles.type}>
                <span>{item.sport} &#40;{typeSport}&#41;</span>
            </div>
            <div className={styles.time}>
                <span>{time.toLocaleString()}</span>
            </div>
            <div className={styles.location}>
                <span>{item.stadium == null ? '' : `${item.stadium}, `}{location}</span>
            </div>

        </div>
    )
}