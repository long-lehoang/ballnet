import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AVATAR, FRIEND_REQUESTS_API, HOST } from '../../../config/config';
import loadStar from '../../../lib/star';
import styles from './styles.module.scss';

export default function Item({item}){
    const [img, setImg] = useState(item.avatar == null ? AVATAR : HOST + item.avatar);
    const [name, setName] = useState(item.name);
    const [numStar, setNumStar] = useState(item.points);
    const [url, setUrl] = useState('/'+item.username);
    const [location, setLocation] = useState(item.address);
    const token = useSelector(state => state.token);
    const [disable, setDisable] = useState(false);
    const [idRequest, setIdRequest] = useState('');
    function handleAdd(){
        let formData = new FormData();
        formData.append('username', item.username);
        axios.post(FRIEND_REQUESTS_API, formData, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            setDisable(true);
            setIdRequest(response.data.data);
        })
    }

    function handleCancel(){
        axios.post(FRIEND_REQUESTS_API + `${idRequest}/deny`, {}, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            setDisable(false);
        })
    }

    function handleMessage(){
        console.log("add");   
    }
    return (
        <div className={styles.container}>
            <img src={img} className={styles.img}></img>
            <h3 className={styles.name}>{name}</h3>
            <div className={styles.stars}>
                {loadStar(numStar, 15)}
            </div>
            <p className={styles.location}>{location}</p>
            <div className={styles.group_btn}>
                {disable ? <button className={styles.btn_cancel} onClick={handleCancel}>Cancel</button> : <button className={styles.btn_add} onClick={handleAdd}>Add Friend</button>}        
                <button className={styles.btn_message} onClick={handleMessage}><FontAwesomeIcon height={15} className={styles.icon} icon={faEnvelope} /></button>
            </div>
            <Link href={url}><span className={styles.link}>View Profile</span></Link>
        </div>
    )
}