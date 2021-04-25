import { faBirthdayCake, faEdit, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SPORT_API } from '../../../config/config';
import loadStar from '../../../lib/star';
import EditLocation from './EditLocation';
import EditOverview from './EditOverview';
import EditPInfo from './EditPInfo';
import styles from './styles.module.scss';

export default function Info(props) {
    const [overview, setOverview] = useState(props.profile.overview || "No overview");
    const [sport, setSport] = useState([]);
    const [location, setLocation] = useState(props.profile.address || "No location");
    const [phone, setPhone] = useState(props.profile.phone || "No phone");
    const [mail, setMail] = useState(props.user.email || "No email");
    const [birthday, setBirthday] = useState(props.profile.birthday || "");
    const [editOverview, toggleEditOverview] = useState(false);
    const [editLocation, toggleEditLocation] = useState(false);
    const [editPInfo, toggleEditPInfo] = useState(false);
    const token = useSelector(state => state.token);

    useEffect(() => {
        axios.get(SPORT_API + props.username, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setSport(response.data.data);
            console.log(response.data.data);
        }).catch((error) => {
            console.log(error.response)
        })
    }, [null]);

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <EditOverview show={editOverview} value={overview} setValue={setOverview} setShow={toggleEditOverview}></EditOverview>
                <div className={styles.title}>
                    <span>Overview</span>
                    {props.permission ? <button onClick={() => { toggleEditOverview(true) }}><FontAwesomeIcon height={15} icon={faEdit}></FontAwesomeIcon></button> : ''}
                </div>
                <div className={styles.content}>{overview}</div>
            </div>
            <div className={styles.box}>
                <div className={styles.title}>
                    <span>Sport</span>
                </div>
                <div className={styles.content}>
                    {sport.map((val, key) => {
                        return (
                            <div className={styles.sport}>
                                <span className={styles.name}>{val.sport || ''}</span>
                                <span className={styles.num}>{val.num_match || 0}</span>
                                <span className={styles.star}>{loadStar(val.rating || 0, 12)}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={styles.box}>
                <EditLocation show={editLocation} setShow={toggleEditLocation} value={location} setValue={setLocation}></EditLocation>
                <div className={styles.title}>
                    <span>Location</span>
                    {props.permission ? <button onClick={() => { toggleEditLocation(true) }}><FontAwesomeIcon height={15} icon={faEdit}></FontAwesomeIcon></button> : ''}
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
                    {props.permission ? <button onClick={() => { toggleEditPInfo(true) }}><FontAwesomeIcon height={15} icon={faEdit}></FontAwesomeIcon></button> : ''}
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