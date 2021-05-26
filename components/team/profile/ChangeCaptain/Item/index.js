import { faTrademark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR, FRIENDS_API, FRIEND_REQUESTS_API, HOST, TEAM_API } from '../../../../../config/config';
import loadStar from '../../../../../lib/star';
import { setMessage } from '../../../../../slices/messageSlice';
import styles from './styles.module.scss';
export default function Item({ member, choice, setChoice }) {
    const avatar = member.avatar === null ? AVATAR : HOST + member.avatar;
    const num_match = `${member.num_match} matchs`;
    const date = new Date(member.joinedDate);
    const join_date = `Joined: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

    return (
        < div className={styles.container} >
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
                <button className={member.id === choice ? styles.active : styles.btnAdd} onClick={() => { setChoice(member.id) }}><FormattedMessage id="Choose" /></button>
            </div>
        </div >
    )
}