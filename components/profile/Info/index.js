import { faBirthdayCake, faEdit, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PROFILE_API } from '../../../config/config';
import loadStar from '../../../lib/star';
import EditLocation from '../../commons/EditLocation';
import EditOverview from '../../commons/EditOverview';
import EditPInfo from '../../commons/EditPInfo';
import styles from './styles.module.scss';

export default function Info(props){
    const [overview, setOverview] = useState("asdasdadadad lkasjdla alsdj la a lja a jl jl jl jl jl hk jk hkj kj gj jg jkh jg jfj hjk ");
    const [sport, setSport] = useState();
    const [location, setLocation] = useState("Quận Tân Phú, TP. Hồ Chí Minh");
    const [phone, setPhone] = useState("0938186100");
    const [mail, setMail] = useState("long.bk.khmt@gmail.com");
    const [birthday, setBirthday] = useState("1999-02-24");
    const [editOverview, toggleEditOverview] = useState(false);
    const [editLocation, toggleEditLocation] = useState(false);
    const [editPInfo, toggleEditPInfo] = useState(false);

    useEffect(()=>{
        // axios.get(PROFILE_API)
    },[null])
    return(
        <div className={styles.container}>
            <div className={styles.box}>
                <EditOverview show={editOverview} value={overview} setValue={setOverview} setShow={toggleEditOverview}></EditOverview>
                <div className={styles.title}>
                    <span>Overview</span>
                    <button onClick={()=>{toggleEditOverview(true)}}><FontAwesomeIcon height={15} icon={faEdit}></FontAwesomeIcon></button>
                </div>
                <div className={styles.content}>{overview}</div>
            </div>
            <div className={styles.box}>
                <div className={styles.title}>
                    <span>Sport</span>
                </div>
                <div className={styles.content}>
                    <div className={styles.sport}>
                        <span className={styles.name}>Tennis</span>
                        <span className={styles.num}>15 Match</span>
                        <span className={styles.star}>{loadStar(4, 12)}</span>
                    </div>
                    
                    <div className={styles.sport}>
                        <span className={styles.name}>Tennis</span>
                        <span className={styles.num}>15 Match</span>
                        <span className={styles.star}>{loadStar(4, 12)}</span>
                    </div>
                </div>
            </div>
            <div className={styles.box}>
                <EditLocation show={editLocation} setShow={toggleEditLocation} value={location} setValue={setLocation}></EditLocation>
                <div className={styles.title}>
                    <span>Location</span>
                    <button onClick={()=>{toggleEditLocation(true)}}><FontAwesomeIcon height={15} icon={faEdit}></FontAwesomeIcon></button>
                </div>
                <div className={styles.content}>{location}</div>
            </div>
            <div className={styles.box}>
                <EditPInfo 
                show={editPInfo} 
                email={mail} 
                setEmail={setMail} 
                phone={phone} 
                setPhone={setPhone} 
                birthday={birthday} 
                setBirthday={setBirthday} 
                setShow={toggleEditPInfo}>
                </EditPInfo>
                <div className={styles.title}>
                    <span>Personal Information</span>
                    <button onClick={()=>{toggleEditPInfo(true)}}><FontAwesomeIcon height={15} icon={faEdit}></FontAwesomeIcon></button>
                </div>
                <div className={styles.content}>
                    <div>
                        <FontAwesomeIcon className={styles.icon} icon={faEnvelope} height={15}></FontAwesomeIcon>
                        <span>Email</span>
                    </div>
                    <div>
                        {mail}
                    </div>
                    <div>
                        <FontAwesomeIcon className={styles.icon} icon={faPhone} height={15}></FontAwesomeIcon>
                        <span>Phone</span>
                    </div>
                    <div>
                        {phone}
                    </div>
                    <div>
                        <FontAwesomeIcon className={styles.icon} icon={faBirthdayCake} height={15}></FontAwesomeIcon>
                        <span>Birthday</span>
                    </div>
                    <div>
                        {birthday}
                    </div>
                </div>
            </div>
        </div>
    )
}