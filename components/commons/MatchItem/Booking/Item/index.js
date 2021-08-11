import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR_TEAM, BOOKING_API, HOST, MATCH_API, MATCH_INVITATION_API, MATCH_JOINING_API } from '../../../../../config/config';
import loadStar from '../../../../../lib/star';
import { setMessage } from '../../../../../slices/messageSlice';
import styles from './styles.module.scss';

export default function Item({ id, avatar, name, match_id, location, rating, phone, setShow }) {
    const dispatch = useDispatch();
    const img = avatar !== null ? HOST + avatar : AVATAR_TEAM;
    const token = useSelector(state => state.token);

    function handleBooking() {
        let formData = new FormData();
        formData.append('match_id', match_id);
        formData.append('stadium_id', id);
        axios.post(BOOKING_API, formData, {
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
                <div>
                    <Link href={`/stadium/${id}`}><a className={styles.name}>{name}</a></Link>
                    <span className={styles.star}>{loadStar(rating, 12)}</span>
                    <span className={styles.line}>{location}</span>
                    <span className={styles.line}>{phone}</span>
                </div>
            </div>
            <button onClick={handleBooking}><FormattedMessage id="Choose" /></button>

        </div>
    )
}