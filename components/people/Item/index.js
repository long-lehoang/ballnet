import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useState } from 'react';
import { AVATAR } from '../../../config/config';
import loadStar from '../../../lib/star';
import styles from './styles.module.scss';

export default function Item(props){
    const [img, setImg] = useState(AVATAR);
    const [name, setName] = useState("Le Hoang Long");
    const [numStar, setNumStar] = useState(5);
    const [url, setUrl] = useState('/'+'admin');
    const [location, setLocation] = useState("TP. Hồ Chí Minh")
    function handleAdd(){
        console.log("add");   
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
                <button className={styles.btn_add} onClick={handleAdd}>Add Friend</button>
                <button className={styles.btn_message} onClick={handleMessage}><FontAwesomeIcon height={15} className={styles.icon} icon={faEnvelope} /></button>
            </div>
            <Link href={url}><span className={styles.link}>View Profile</span></Link>
        </div>
    )
}