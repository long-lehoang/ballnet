import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AVATAR, FRIENDS_API, FRIEND_REQUESTS_API, HOST } from '../../../../../config/config';
import loadStar from '../../../../../lib/star';
import styles from './styles.module.scss';
export default function Item({member}){
    const avatar = member.avatar === null ? AVATAR : HOST + member.avatar;
    const info = `${member.mutual_friends} bạn chung`;
    const [isFriend, setIsFriend] = useState(member.is_friend);
    const [idRequest, setIdRequest] = useState('');
    const [isRequest, setIsRequest] = useState(false);
    const token = useSelector(state => state.token);

    function handleAddfriend(){
        let formData = new FormData();
        formData.append('username', member.username);
        axios.post(FRIEND_REQUESTS_API, formData, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            setIdRequest(response.data.data);
            setIsRequest(true);
        }).catch(error=>{
            console.log(error);
        })
    }
    function handleUnfriend(){
        axios.delete(FRIENDS_API+member.username, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            setIsFriend(false);
        }).catch(error=>{
            console.log(error);
        })
    }

    function handleCancel(){
        axios.post(FRIEND_REQUESTS_API + `${idRequest}/deny`, {}, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            setIsRequest(false);
        }).catch(error=>{
            console.log(error)
        })
    }
    return(
        <div className={styles.container}>
            <div className={styles.left} >
                <img src={avatar} ></img>
                <div className={styles.info}>
                    <p className={styles.name}>{member.name}</p>
                    <p className={styles.sub}>{info}</p>
                </div>
            </div>
            <div className={styles.right}>
                <p className={styles.star}>{loadStar(friend.point, 12)}</p>
                {isFriend ? <button className={styles.btnUnfr} onClick={handleUnfriend}>Unfriend</button> : 
                isRequest ? <button className={styles.btnUnfr} onClick={handleCancel}>Cancel</button> : <button className={styles.btnAdd}  onClick={handleAddfriend}>Add friend</button>}
            </div>
        </div>
    )
}