import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR, FRIENDS_API, FRIEND_REQUESTS_API, HOST } from '../../../config/config';
import loadStar from '../../../lib/star';
import { setMessage } from '../../../slices/messageSlice';
import styles from './styles.module.scss';

export default function Item({item}){
    const img = item.avatar == null ? AVATAR : HOST + item.avatar;
    const token = useSelector(state => state.token);
    const [friend, setFriend] = useState(item.isFriend);
    const [request, setRequest] = useState(item.isRequest);
    const [waiting, setWaiting] = useState(item.isWaiting);
    const [idRequest, setIdRequest] = useState(item.idRequest||'');
    const dispatch = useDispatch();

    function handleAdd(){
        let formData = new FormData();
        formData.append('username', item.username);
        axios.post(FRIEND_REQUESTS_API, formData, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            setWaiting(true);
            setIdRequest(response.data.data);

        }).catch(error=>{
            console.log(error);
            openMessageBox("Error happened when add friend");
        })
    }
    function handleUnfriend(){
        axios.delete(FRIENDS_API + `${item.username}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            setFriend(false);
        }).catch(error=>{
            console.log(error);
            openMessageBox("Error happened when unfriend");

        })
    }

    function handleAccept(){
        axios.post(FRIEND_REQUESTS_API + `${idRequest}/accept`, {}, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            setFriend(true);
        }).catch(error=>{
            openMessageBox("Error happened when accept request");

        })
    }

    function handleDeny(){
        axios.post(FRIEND_REQUESTS_API + `${idRequest}/deny`, {}, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            setRequest(false);
        }).catch(error=>{
            openMessageBox("Error happened when deny request");
        })
    }

    function handleCancel(){
        axios.post(FRIEND_REQUESTS_API + `${idRequest}/deny`, {}, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            setWaiting(false);
        }).catch(error=>{
            openMessageBox("Error happened when cancel request");
        })
    }

    function openMessageBox(message, title = 'Error'){
        const data = {title: title, message: message, show: true};
        const action = setMessage(data);
        dispatch(action);
    }

    function handleMessage(){
        console.log("add");   
    }
    return (
        <div className={styles.container}>
            <Link href={'/'+item.username}>
            <img src={img} className={styles.img}></img>
            </Link>
            <h3 className={styles.name}>{item.name}</h3>
            <div className={styles.stars}>
                {loadStar(item.points, 15)}
            </div>
            <p className={styles.location}>{item.address}</p>
            <div className={styles.group_btn}>
                {friend ? <button className={styles.btn_unfr} onClick={handleUnfriend}>Unfriend</button> : 
                request ? <button className={styles.btn_accept} onClick={handleAccept}>Accept</button>:
                waiting ? <button className={styles.btn_cancel} onClick={handleCancel}>Cancel</button>:
                <button className={styles.btn_add} onClick={handleAdd}>Add Friend</button>}        
                {(!friend)&&request ?<button className={styles.btn_deny} onClick={handleDeny}>Deny</button>:
                <button className={styles.btn_message} onClick={handleMessage}><FontAwesomeIcon height={15} className={styles.icon} icon={faEnvelope} /></button>}
                
            </div>
        </div>
    )
}