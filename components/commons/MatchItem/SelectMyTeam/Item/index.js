import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR_TEAM, HOST, MATCH_INVITATION_API } from '../../../../../config/config';
import { setMessage } from '../../../../../slices/messageSlice';
import styles from './styles.module.scss';

export default function Item({ id, avatar, name, match_id, setShow }) {
    const dispatch = useDispatch();
    const img = avatar !== null ? HOST + avatar : AVATAR_TEAM;
    const token = useSelector(state => state.token);

    function handleSelect() {
        let formData = new FormData();
        formData.append('match_id', match_id);

        axios.post(MATCH_INVITATION_API + `${id}/request`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setShow(false);
        }).catch(error => {
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
                <Link href={`/team/${id}`}><span>{name}</span></Link>
            </div>
            <button onClick={handleSelect}><FormattedMessage id="Select" /></button>
        </div>
    )
}