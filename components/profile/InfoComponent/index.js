import { faDirections } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styles from './styles.module.scss';

export default function InfoComponent(){
    const [follow, setFollow] = useState(20);
    const [friend, setFriend] = useState(20);
    const [location, setLocation] = useState("Tan Phu, HCM");
    const [match, setMatch] = useState(20);
    const [sport, setSport] = useState("Football");
    const [phone, setPhone] = useState("0938186100");

    return(
        <div className={styles.container}>
            <div className={styles.avatar}>
                <img src="/avatar.jpg" ></img>
            </div>
            <div className={styles.friend_follow}>
                <div>
                    <span className={styles.label}>Followers</span>
                    <span className={styles.number}>{follow}</span>
                </div>
                <div>
                    <span className={styles.label}>Friends</span>
                    <span className={styles.number}>{friend}</span>
                </div>
            </div>
            <div className={styles.item}>
                <FontAwesomeIcon height={20} icon={faDirections}></FontAwesomeIcon>
                <span className={styles.text}>Location: {location}</span>
            </div>
            <div className={styles.item}>
                <FontAwesomeIcon height={20} icon={faDirections}></FontAwesomeIcon>
                <span className={styles.text}>Match: {match}</span>
            
            </div>
            <div className={styles.item}>
                <FontAwesomeIcon height={20} icon={faDirections}></FontAwesomeIcon>
                <span className={styles.text}>Main Sport: {sport}</span>
            </div>
            <div className={styles.item}>
                <FontAwesomeIcon height={20} icon={faDirections}></FontAwesomeIcon>
                <span className={styles.text}>Phone: {phone}</span>
            </div>
        </div>
    )
}