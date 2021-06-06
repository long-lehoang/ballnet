import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR, HOST, TEAM_REQUEST_API } from '../../../../../../config/config';
import { setMessage } from '../../../../../../slices/messageSlice';
import styles from './styles.module.scss';

export default function Item({ id, avatar, name, username }) {
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);
    const img = avatar !== null ? HOST + avatar : AVATAR;
    const router = useRouter();
    const token = useSelector(state => state.token);

    function handleInvite() {
        let formData = new FormData();
        let team_id = router.query.teamID;
        formData.append('user_id', id);
        formData.append('team_id', team_id);

        axios.post(TEAM_REQUEST_API + `invite`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setShow(false);
        }).catch(error => {
            openMessageBox(`Can't invite ${name} to join Team`)
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
                <Link href={`/${username}`}><span>{name}</span></Link>
            </div>
            <button onClick={handleInvite}><FormattedMessage id="Invite" /></button>
        </div>
    )
}