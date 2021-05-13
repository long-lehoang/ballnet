import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR_TEAM, HOST, MATCH_INVITATION_API,  } from '../../../../../config/config';
import { setMessage } from '../../../../../slices/messageSlice';
import styles from './styles.module.scss';

export default function Item({item}) {
    const dispatch = useDispatch();
    const img = item.avatar !== null ? HOST + item.avatar : AVATAR_TEAM;
    const token = useSelector(state=>state.token);
    const [show, setShow] = useState(true);

    function handleAccept(){
        axios.post(MATCH_INVITATION_API + `${item.id}/${item.request_id}/accept`, {}, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            setShow(false);
        }).catch(error=>{
            openMessageBox(error.response.data.message)
        })
    }

    function handleCancel(){
        axios.post(MATCH_JOINING_API + `${item.id}/${item.request_id}/cancel`, {}, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            setShow(false);
        }).catch(error=>{
            openMessageBox(error.response.data.message)
        })
    }

    function openMessageBox(message, title = 'Error') {
        const data = { title: title, message: message, show: true };
        const action = setMessage(data);
        dispatch(action);
    }

    return (
        <div className={show ? styles.item : styles.none}>
            <div>
                <img src={img}></img>
                <Link href={`/team/${item.id}`}><span>{item.name}</span></Link>
            </div>
            {item.status == 'invited' ? <button onClick={handleCancel}>Cancel</button> : 
            <div>
                <button onClick={handleAccept}>Accept</button>
                <button onClick={handleCancel}>Deny</button>
            </div>}
            
        </div>
    )
}