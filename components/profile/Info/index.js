import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styles from './styles.module.scss';

export default function Info(props){
    const [overview, setOverview] = useState("asdasdadadad lkasjdla alsdj la a lja a jl jl jl jl jl hk jk hkj kj gj jg jkh jg jfj hjk ");
    const [sport, setSport] = useState();
    const [location, setLocation] = useState();
    const [pInfo, setPInfo] = useState();

    return(
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.title}>
                    <span>Overview</span>
                    <button><FontAwesomeIcon height={15} icon={faEdit}></FontAwesomeIcon></button>
                </div>
                <div className={styles.content}>{overview}</div>
            </div>
            <div className={styles.box}>
                <div className={styles.title}>
                    <span>Sport</span>
                    <button><FontAwesomeIcon height={15} icon={faEdit}></FontAwesomeIcon></button>
                </div>
                <div className={styles.content}></div>
            </div>
            <div className={styles.box}>
                <div className={styles.title}>
                    <span>Location</span>
                    <button><FontAwesomeIcon height={15} icon={faEdit}></FontAwesomeIcon></button>
                </div>
                <div className={styles.content}>{location}</div>
            </div>
            <div className={styles.box}>
                <div className={styles.title}>
                    <span>Personal Information</span>
                    <button><FontAwesomeIcon height={15} icon={faEdit}></FontAwesomeIcon></button>
                </div>
                <div className={styles.content}></div>
            </div>
        </div>
    )
}