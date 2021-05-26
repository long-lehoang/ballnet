import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR_TEAM, HOST, MATCH_API, MATCH_INVITATION_API, MATCH_JOINING_API } from '../../../../../config/config';
import { setMessage } from '../../../../../slices/messageSlice';
import styles from './styles.module.scss';

export default function Item({ item, setList, setPeople, request }) {
    const dispatch = useDispatch();
    const img = item.avatar !== null ? HOST + item.avatar : AVATAR_TEAM;
    const token = useSelector(state => state.token);

    function handleAccept() {
        axios.put(MATCH_JOINING_API + item.request_id, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            let fr = request.filter(element => {
                return element.request_id !== item.request_id;
            });
            setList(fr);
            setPeople(fr);
        }).catch(error => {
            openMessageBox(error.response.data.message)
        })
    }

    function handleCancel() {
        axios.delete(MATCH_JOINING_API + item.request_id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            let fr = request.filter(element => {
                return element.request_id !== item.request_id;
            });
            setList(fr);
            setPeople(fr);
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
                <Link href={`/${item.username}`}><span>{item.name}</span></Link>
            </div>
            <div>
                <button className={styles.btnAccept} onClick={handleAccept}><FormattedMessage id="Accept" /></button>
                <button className={styles.btnDeny} onClick={handleCancel}><FormattedMessage id="Deny" /></button>
            </div>

        </div>
    )
}