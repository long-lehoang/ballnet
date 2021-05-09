import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR_TEAM, HOST, MATCH_JOINING_API } from '../../../config/config';
import { setMessage } from '../../../slices/messageSlice';
import EditMatchForm from '../../commons/EditMatchForm';
import SelectTeam from './SelectTeam';
import styles from './styles.module.scss';

export default function Item({item}){
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
    const isAdmin1 = true;
    const isAdmin2 = true;
    const [selectTeam, setSelectTeam] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();

    function openMessageBox(message, title = 'Error'){
        const data = {title: title, message: message, show: true};
        const action = setMessage(data);
        dispatch(action);
    }

    function handleJoin(option)
    {
        var formData = new FormData();
        formData.append('team_id', option == 1 ? item.team_1 : item.team_2);
        formData.append('match_id', item.id);
        axios.post(MATCH_JOINING_API, formData, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            console.log(response.data);
            if(option == 1){
                if(response.data.data.status == 'active'){
                    setIsJoin1(true);
                    setIdRequest1(response.data.data.id);
                    setMember1(member1+1);
                }else{
                    setIsRequest1(true);
                    setIdRequest1(response.data.data.id);
                }
            }else{
                if(response.data.data.status == 'active'){
                    setIsJoin2(true);
                    setIdRequest2(response.data.data.id);
                    setMember2(member2+1);
                }else{
                    setIsRequest2(true);
                    setIdRequest2(response.data.data.id);
                }
            }
        }).catch(error=>{
            openMessageBox(error.response.data.message);
        })
    }

    function handleTeamJoin()
    {
        setSelectTeam(true);
    }

    function handleLeave(option)
    {
        let id = option == 2 ? idRequest2 : idRequest1;

        axios.delete(MATCH_JOINING_API + id, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            if(option == 1){
                setIsJoin1(false);
                setIdRequest1(null);
                setMember1(member1-1);
            }else{
                setIsJoin2(false);
                setIdRequest2(null);
                setMember2(member2-1);
            }
        }).catch(error=>{
            openMessageBox(error.response.data.message);
        })
    }

    function handleCancel(option)
    {
        let id = option == 2 ? idRequest2 : idRequest1;

        axios.delete(MATCH_JOINING_API + id, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            if(option == 1){
                setIsRequest1(false);
                setIdRequest1(null);
            }else{
                setIsRequest2(false);
                setIdRequest2(null);
            }
        }).catch(error=>{
            openMessageBox(error.response.data.message);
        })
    }

    function handleDeny(option)
    {
        let id = option == 2 ? idRequest2 : idRequest1;

        axios.delete(MATCH_JOINING_API + id, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            if(option == 1){
                setIsRequest1(false);
                setIdRequest1(null);
            }else{
                setIsRequest2(false);
                setIdRequest2(null);
            }
        }).catch(error=>{
            openMessageBox(error.response.data.message);
        })
    }

    function handleAccept(option)
    {
        var formData = new FormData();
        axios.put(MATCH_JOINING_API + option == 2 ? idRequest2 : idRequest1, formData, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            if(option == 1){
                setIsJoin1(true);
                setMember1(member1+1);
            }else{
                setIsJoin2(true);
                setMember2(member2+1);
            }
        }).catch(error=>{
            openMessageBox(error.response.data.message);
        })
    }

    function handleEdit()
    {
        setShowEdit(true);
    }

    function handleBooking()
    {

    }

    function handleTeamLeave()
    {

    }

    function handleInviteTeam()
    {

    }

    function handleInvitePeople(option)
    {

    }

    function handleDelete()
    {
        
    }
    return (
        <div className={styles.container}>
            <SelectTeam show={selectTeam} setShow={setSelectTeam} match={item} />
            <EditMatchForm item={item} setShow={setShowEdit} show={showEdit} 
            setParentLocation={setLocation} setParentType={setType} 
            setParentStart={setTime} setParentTypeSport={setTypeSport} />
            <div className={styles.edit}>
                <button className={styles.btnShowPopup}>...</button>
                <div className={styles.popup}>
                    {item.captain1 ? <button onClick={handleEdit}>Edit</button> : ''}
                    {item.captain2 ? <button onClick={handleTeamLeave}>Leave</button> : ''}
                    {item.captain1 ? <button onClick={handleInviteTeam}>Invite Team</button> : ''}
                    <button onClick={handleInvitePeople(1)}>Invite People &#40;{item.name1}&#41;</button>
                    {item.team_2 !== null ? <button onClick={handleInvitePeople(2)}>Invite People &#40;{item.name2}&#41;</button> : ''}
                    {item.captain1? <button onClick={handleEdit}>Delete</button> : ''}
                    {item.captain1? <button onClick={handleBooking}>Book Stadium</button>: ''}
                </div>
            </div>
            <div className={styles.team}>
                <Link href={`/team/${item.team_1}`}>
                <img src={avatar1} className={styles.logo}></img>
                </Link>
                <span className={styles.member}>{`${member1}/${type}`}</span>
                <span>:</span>
                <span className={styles.member}>{`${member2}/${type}`}</span>
                {team2 == null ? <button onClick={handleTeamJoin} className={styles.btnTeamJoin}>+</button> :
                <Link href={`/team/${item.team_2}`}>                
                <img src={avatar2} className={styles.logo}></img>
                </Link>
                }
                
            </div>
            <div className={styles.action}>
                <div>
                    {isJoin1 ? <button className={styles.btnLeave} onClick={()=>{handleLeave(1)}}>Leave</button> :
                    isJoin2 ? <button disabled className={styles.btnJoin} onClick={()=>{handleJoin(2)}}>Join</button> :
                    isRequest1 ? <button className={styles.btnCancel} onClick={()=>{handleCancel(1)}}>Cancel</button>:
                    isInvite1 ? <button className={styles.btnAccept} onClick={()=>{handleAccept(1)}}>Accept</button>:
                    <button className={styles.btnJoin} onClick={()=>{handleJoin(1)}}>Join</button>}
                    
                    {isInvite1 ? <button className={styles.btnInvite} onClick={handleDeny}>Deny</button> :
                    ''}
                </div>
                {team2 == null ? 
                <div>
                    <button className={styles.btnJoin} onClick={()=>{handleJoin(2)}} disabled>Join</button>
                </div> :
                <div>
                    {isJoin2 ? <button className={styles.btnLeave} onClick={()=>{handleLeave(2)}}>Leave</button> :
                    isJoin1 ? <button disabled className={styles.btnJoin} onClick={()=>{handleJoin(2)}}>Join</button> :
                    isRequest2 ? <button className={styles.btnCancel} onClick={()=>{handleCancel(2)}}>Cancel</button>:
                    isInvite2 ? <button className={styles.btnAccept} onClick={()=>{handleAccept(2)}}>Accept</button>:
                    <button className={styles.btnJoin} onClick={()=>{handleJoin(2)}}>Join</button>}
                    
                    {isInvite2 ? <button className={styles.btnInvite} onClick={handleDeny}>Deny</button> :
                    ''}
                </div>
                }
            </div> 
            <div className={styles.type}>
                <span>{item.sport} &#40;{typeSport}&#41;</span>
            </div>
            <div className={styles.time}>
                <span>{time.toLocaleString()}</span>
            </div>
            <div className={styles.location}>
                <span>{location}</span>
            </div>
            <div className={styles.stadium}>
                <span>{item.stadium == null ? 'No Booking' : item.stadium}</span>
            </div>
            
        </div>
    )
}