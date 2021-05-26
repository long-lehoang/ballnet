import { faTrademark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR, FRIENDS_API, FRIEND_REQUESTS_API, HOST, TEAM_API } from '../../../../../config/config';
import loadStar from '../../../../../lib/star';
import { setMessage } from '../../../../../slices/messageSlice';
import styles from './styles.module.scss';
export default function Item({ member, team }) {
    const avatar = member.avatar === null ? AVATAR : HOST + member.avatar;
    const num_match = `${member.num_match} matchs`;
    const date = new Date(member.joinedDate);
    const join_date = `Joined: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const token = useSelector(state => state.token);
    const [show, setShow] = useState(true);
    const dispatch = useDispatch();
    function handleKick() {
        var formData = new FormData();
        formData.append('member_id', member.memberId);
        axios.post(TEAM_API + `kick`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setShow(false);
        }).catch(error => {
            openMessageBox(`Can't kick ${member.name}`)
        })
    }

    function openMessageBox(message, title = 'Error') {
        const data = { title: title, message: message, show: true };
        const action = setMessage(data);
        dispatch(action);
    }
    return (
        < div className={show ? styles.container : styles.hidden} >
            <div className={styles.left} >
                <Link href={`/${member.username}`}>
                    <img src={avatar} ></img>
                </Link>
                <div className={styles.info}>
                    <p className={styles.name}>{member.name}</p>
                    <p className={styles.match}>{num_match}</p>
                    <p className={styles.date}>{join_date}</p>
                </div>
            </div>

            <div className={styles.right}>
                <p className={styles.star}>{loadStar(member.point, 12)}</p>
                {(!member.isCaptain) && (team.isCaptain || (team.isAdmin && !member.isAdmin)) ? <button className={styles.btnUnfr} onClick={handleKick}><FormattedMessage id="Remove" /></button> : ''}
            </div>
        </div >
    )
}