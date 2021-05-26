import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR_TEAM, HOST, MATCH_API, MATCH_INVITATION_API, MATCH_JOINING_API } from '../../../../../config/config';
import { setMessage } from '../../../../../slices/messageSlice';
import styles from './styles.module.scss';

export default function Item({id, username, avatar, name, match_id, team_id}) {
    const dispatch = useDispatch();
    const img = avatar !== null ? HOST + avatar : AVATAR_TEAM;
    const token = useSelector(state=>state.token);
    const [show, setShow] = useState(true);

    function handleInvite(){
        let formData = new FormData();
        formData.append('team_id', team_id);
        formData.append('match_id', match_id);
        formData.append('player_id', id)
        axios.post(MATCH_JOINING_API, formData, {
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
        <div className={styles.item}>
            <div>
                <img src={img}></img>
                <Link href={`/${username}`}><span>{name}</span></Link>
            </div>
            {show ? <button onClick={handleInvite}><FormattedMessage id="Invite" /></button> :
            <button disabled ><FormattedMessage id="Invite" /></button>
            }
            
        </div>
    )
}