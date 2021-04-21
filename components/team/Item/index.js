import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR_TEAM, HOST, TEAM_API, TEAM_REQUEST_API } from '../../../config/config';
import loadStar from '../../../lib/star';
import { setMessage } from '../../../slices/messageSlice';
import styles from './styles.module.scss';

export default function Item({item}){
    const img = item.avatar == null ? AVATAR_TEAM : HOST + item.avatar;
    const [member, setMember] = useState(item.isMember);
    const [waiting, setWaiting] = useState(item.isWaitingForApprove);
    const [invited, setInvited] = useState(item.isInvitedBy);
    const [idRequest, setIdRequest] = useState(item.idRequest||'');
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();

    function handleLeave(){
        axios.delete(TEAM_API + `${item.id}/leave`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            setMember(false);
        }).catch(error=>{
            console.log(error);
            openMessageBox('Có lỗi xảy ra trong quá trình rời đội.')
        })
    }

    function handleJoin(){
        let formData = new FormData();
        formData.append('team_id', item.id);
        axios.post(TEAM_REQUEST_API, formData, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            setWaiting(true);
            setIdRequest(response.data.data);
        }).catch(error=>{
            console.log(error);
            openMessageBox('Có lỗi xảy ra trong quá trình tham gia đội.')
        });
    }
    function handleCancel(){
        axios.post(TEAM_REQUEST_API + `${idRequest}/deny`,{} , {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            setWaiting(false);
        }).catch(error=>{
            console.log(error);
            openMessageBox('Có lỗi xảy ra trong quá trình huỷ yêu cầu tham gia đội.')
        });
    }

    function handleAccept(){
        axios.post(TEAM_REQUEST_API + `${idRequest}/approve`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            setMember(true);
            setInvited(false);
        }).catch(error=>{
            console.log(error);
            openMessageBox('Có lỗi xảy ra trong quá trình huỷ yêu cầu tham gia đội.')
        });
        
    }

    function handleDeny(){
        axios.post(TEAM_REQUEST_API + `${idRequest}/deny`,{} , {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            setInvited(false);
        }).catch(error=>{
            console.log(error);
            openMessageBox('Có lỗi xảy ra trong quá trình huỷ yêu cầu tham gia đội.')
        });
    }
    function handleMessage(){
        console.log("add");   
    }

    function openMessageBox(message, title = 'Error'){
        const data = {title: title, message: message, show: true};
        const action = setMessage(data);
        dispatch(action);
    }

    return (
        <div className={styles.container}>
            <img src={img} className={styles.img}></img>
            <h3 className={styles.name}>{item.name}</h3>
            <div className={styles.stars}>
                {loadStar(item.rating, 15)}
            </div>
            <p className={styles.location}>{item.sport}</p>
            <p className={styles.location}>{item.location}</p>
            <div className={styles.group_btn}>
                {member ? <button className={styles.btn_leave} onClick={handleLeave}>Leave</button>:
                waiting ? <button className={styles.btn_cancel} onClick={handleCancel}>Cancel</button>:
                invited ?<button className={styles.btn_accept} onClick={handleAccept}>Accept</button>:
                <button className={styles.btn_join} onClick={handleJoin}>Join</button>}
                
                {invited ? <button className={styles.btn_deny} onClick={handleDeny}>Deny</button> :
                <button className={styles.btn_message} onClick={handleMessage}><FontAwesomeIcon height={15} className={styles.icon} icon={faEnvelope} /></button>}
                
            </div>
            <Link href={'/team/'+item.id}><span className={styles.link}>View Profile</span></Link>
        </div>
    )
}