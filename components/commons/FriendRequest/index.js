import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR, FRIEND_REQUESTS_API, HOST } from '../../../config/config';
import { setMessage } from '../../../slices/messageSlice';
import styles from './styles.module.scss';

export default function FriendRequest() {
    
    const [list, setList] = useState([]);
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(FRIEND_REQUESTS_API + 'top', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setList(response.data.data);
        }).catch(error => {
            console.log(error);
        })
    },[null])

    function handleAccept(id) {
        axios.post(FRIEND_REQUESTS_API + `${id}/accept`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            let arr = [...list]
            arr = arr.filter(element=>element.idRequest !== id)
            setList(arr);
        }).catch(error => {
            openMessageBox(error.response.message);

        })
    }

    function handleCancel(id) {
        axios.post(FRIEND_REQUESTS_API + `${id}/deny`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            let arr = [...list]
            arr = arr.filter(element=>element.idRequest !== id)
            setList(arr);
        }).catch(error => {
            openMessageBox(error.response.message);
        })
    }

    function openMessageBox(message, title = 'Error') {
        const data = { title: title, message: message, show: true };
        const action = setMessage(data);
        dispatch(action);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span><FormattedMessage id="Friend Requests" /></span>
            </div>
            <div className={styles.body}>
                {list.map((element, key) => {
                    return (
                        <div key={key} className={styles.element}>
                            <div className={styles.col}>
                                <div className={styles.avatar}>
                                    <img src={element.avatar == null ? AVATAR : HOST + element.avatar} alt="Avatar"></img>
                                </div>
                                <div className={styles.description}>
                                    <div className={styles.name}>
                                        <Link href={element.username}><span>{element.name}</span></Link>
                                    </div>
                                    <div className={styles.location}>
                                        <span>{element.address == null ? '' : element.address.split(',')[1]}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.col}>
                                <button onClick={()=>handleAccept(element.idRequest)} className={styles.btnAdd}>+</button>
                                <button onClick={()=>handleCancel(element.idRequest)} className={styles.btn}><FontAwesomeIcon icon={faTrashAlt} className={styles.btnRemove}></FontAwesomeIcon></button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}