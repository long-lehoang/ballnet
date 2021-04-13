import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';


export default function Notification(props) {
    const token = useSelector(state => state.token);
    const [del, setDel] = useState(false);
    function handleAccept() {
        axios.post(props.linkAccept, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            axios.delete(props.linkDelNtf, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                setDel(true);
            })
        }).catch(error=>{
            console.log(error);
        });

    }

    function handleDeny() {
        axios.post(props.linkDeny, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            axios.delete(props.linkDelNtf, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                setDel(true);
            })
        }).catch(error=>{
            console.log(error);
        });
    }

    return (
        <div>
            <Link href={props.link}>
            <div className={styles.container}>
                <div className={styles.col}>
                    <img src={props.avatar}></img>
                </div>
                <div className={props.read ? styles.read : styles.col}>
                    <p className={styles.text}>{props.text}</p>
                    <p className={styles.time}>{props.time}</p>
                </div>
            </div>        
            </Link>
            {!del ? <div className={styles.btn}>
                {props.linkAccept != null ? <button className={styles.acptBtn} onClick={handleAccept}>Accept</button> : ''}
                {props.linkDeny != null ? <button className={styles.dnBtn} onClick={handleDeny}>Deny</button> : ''}
            </div> : ''}
        </div>
    )
}