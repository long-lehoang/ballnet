import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR, HOST, TEAM_REQUEST_API } from '../../../../../config/config';
import loadStar from '../../../../../lib/star';
import { setMessage } from '../../../../../slices/messageSlice';
import styles from './styles.module.scss';
export default function Item({request}){
    const avatar = request.avatar === null ? AVATAR : HOST + request.avatar;
    const date = new Date(request.requestTime);
    const request_date = `Joined: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const token = useSelector(state => state.token);
    const [show, setShow] = useState(true);
    const dispatch = useDispatch();

    function handleAccept(){
        axios.post(TEAM_REQUEST_API + `${request.requestId}/approve`,{}, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            setShow(false);
        }).catch(error=>{
            openMessageBox("Can't approve the request");
        })
    }
    function handleDeny(){
        axios.post(TEAM_REQUEST_API + `${request.requestId}/deny`,{}, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            setShow(false);
        }).catch(error=>{
            openMessageBox("Can't approve the request");
        })
    }

    function openMessageBox(message, title = 'Error') {
        const data = { title: title, message: message, show: true };
        const action = setMessage(data);
        dispatch(action);
    }

    return(
        <div className={styles.container}>
            <div className={styles.left} >
                <Link href={`/${request.username}`}>
                <img src={avatar} ></img>
                </Link>
                <div className={styles.info}>
                    <p className={styles.name}>{request.name}</p>
                    <p className={styles.sub}>{request_date}</p>
                </div>
            </div>
            <div className={styles.right}>
                <p className={styles.star}>{loadStar(request.points, 12)}</p>
                <button className={show?styles.btnAdd:styles.none} onClick={handleAccept}><FormattedMessage id="Accept" /></button>
                <button className={show?styles.btnUnfr:styles.none} onClick={handleDeny}><FormattedMessage id="Deny" /></button>
            </div>
        </div>
    )
}