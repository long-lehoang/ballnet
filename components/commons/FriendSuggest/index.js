import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AVATAR, FRIEND_REQUESTS_API, HOST, SUGGEST_API } from '../../../config/config';
import styles from './styles.module.scss';

export default function FriendSuggest() {
    const [list, setList] = useState([]);
    const token = useSelector(state => state.token);
    useEffect(() => {
        axios.get(SUGGEST_API + 'friend', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setList(response.data.data)
        }).catch(error => {
            console.log(error);
        })
    }, [null])

    function handleAddfr(username)
    {
        let formData = new FormData()
        formData.append('username', username)
        axios.post(FRIEND_REQUESTS_API, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            let arr = JSON.parse(JSON.stringify(list));
            arr = arr.filter(element=>element.username !== username)
            setList(arr);
        }).catch(error => {
            console.log(error);
        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span>Friends &#40;suggestion&#41;</span>
            </div>
            <div className={styles.body}>
                {list.map((element, key) => {
                    return (
                        <div key={key} className={styles.element}>
                            <div className={styles.col}>
                                <div className={styles.avatar}>
                                    <img src={element.info.avatar == null ? AVATAR : HOST + element.info.avatar}></img>
                                </div>
                                <div className={styles.description}>
                                    <div className={styles.name}>
                                        <Link href={`/${element.username}`}><span>{element.name}</span></Link>
                                    </div>
                                    <div className={styles.location}>
                                        <span>{element.info.address == null ? '' : element.info.address.split(', ')[1]}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.col}>
                                <button onClick={()=>{handleAddfr(element.username)}} className={styles.btn}>+</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}