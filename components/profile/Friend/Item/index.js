import axios from 'axios';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { AVATAR, FRIENDS_API, FRIEND_REQUESTS_API, HOST } from '../../../../config/config';
import loadStar from '../../../../lib/star';
import styles from './styles.module.scss';
export default function Item({ friend }) {
    const avatar = friend.avatar === null ? AVATAR : HOST + friend.avatar;
    const info = `${friend.mutual_friends} bạn chung`;
    const [isFriend, setIsFriend] = useState(friend.is_friend);
    const [idRequest, setIdRequest] = useState('');
    const [isRequest, setIsRequest] = useState(false);
    const token = useSelector(state => state.token);

    function handleAddfriend() {
        let formData = new FormData();
        formData.append('username', friend.username);
        axios.post(FRIEND_REQUESTS_API, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setIdRequest(response.data.data);
            setIsRequest(true);
        }).catch(error => {
            console.log(error);
        })
    }
    function handleUnfriend() {
        axios.delete(FRIENDS_API + friend.username, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setIsFriend(false);
        }).catch(error => {
            console.log(error);
        })
    }

    function handleCancel() {
        axios.post(FRIEND_REQUESTS_API + `${idRequest}/deny`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setIsRequest(false);
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.left} >
                <Link href={`/${friend.username}`}><img src={avatar} ></img></Link>
                <div className={styles.info}>
                    <p className={styles.name}>{friend.name}</p>
                    <p className={styles.sub}>{info}</p>
                </div>
            </div>
            <div className={styles.right}>
                <p className={styles.star}>{loadStar(friend.point, 12)}</p>
                {isFriend ? <button className={styles.btnUnfr} onClick={handleUnfriend}><FormattedMessage id="Unfriend" /> </button> :
                    isRequest ? <button className={styles.btnUnfr} onClick={handleCancel}><FormattedMessage id="Cancel" /></button> :
                        <button className={styles.btnAdd} onClick={handleAddfriend}><FormattedMessage id="Add friend" /></button>}
            </div>
        </div>
    )
}