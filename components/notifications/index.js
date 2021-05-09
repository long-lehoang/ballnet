import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from '../../slices/messageSlice';
import styles from './styles.module.scss';


export default function Notification(props) {
    const token = useSelector(state => state.token);
    const [del, setDel] = useState(false);
    const dispatch = useDispatch();

    function openMessageBox(message, title = 'Error'){
        const data = {title: title, message: message, show: true};
        const action = setMessage(data);
        dispatch(action);
    }

    function handleJoin(){
        axios.post(props.linkJoin, props.dataJoin, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setDel(true);
        }).catch(error=>{
            openMessageBox(error.response.data.message)
        });
    }

    function handleAccept() {
        axios.post(props.linkAccept, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setDel(true);
        }).catch(error=>{
            openMessageBox(error.response.data.message)
        });
    }

    function handleDeny() {
        if(props.delMethod == 'delete'){
            axios.delete(props.linkDeny, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                setDel(true);
            }).catch(error=>{
                openMessageBox(error.response.data.message)
            });
        }else{
            axios.post(props.linkDeny, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                setDel(true);
            }).catch(error=>{
                openMessageBox(error.response.data.message)
            });
        }
        
    }

    return (
        <div className={!del?styles.wrapper:styles.none}>
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
            <div className={styles.btn}>
                {props.linkJoin != null ? <button className={styles.acptBtn} onClick={handleJoin}>Join</button> : ''}
                {props.linkAccept != null ? <button className={styles.acptBtn} onClick={handleAccept}>Accept</button> : ''}
                {props.linkDeny != null ? <button className={styles.dnBtn} onClick={handleDeny}>Deny</button> : ''}
            </div>
        </div>
    )
}