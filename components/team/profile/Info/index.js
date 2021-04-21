import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EditAdmin from './EditAdmin';
import loadStar from '../../../../lib/star';
import EditLocation from './EditLocation';
import EditOverview from './EditOverview';
import styles from './styles.module.scss';

export default function Info({team, permission}) {
    const [overview, setOverview] = useState(team.overview || "No overview");
    const [location, setLocation] = useState(team.location);
    const [admins, setAdmins] = useState([]);
    const [editOverview, toggleEditOverview] = useState(false);
    const [editLocation, toggleEditLocation] = useState(false);
    const [editAdmin, toggleEditAdmin] = useState(false);
    const created_at = new Date(team.created_at);
    const establish = `Team created at ${created_at.getDate()}/${created_at.getMonth()}/${created_at.getFullYear()}`
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <EditOverview show={editOverview} value={overview} setValue={setOverview} setShow={toggleEditOverview} id={team.id}></EditOverview>
                <div className={styles.title}>
                    <span>Overview</span>
                    {permission ? <button onClick={() => { toggleEditOverview(true) }}><FontAwesomeIcon height={15} icon={faEdit}></FontAwesomeIcon></button> : ''}
                </div>
                <div className={styles.content}>{overview}</div>
            </div>
            <div className={styles.box}>
                <div className={styles.title}>
                    <span>Sport</span>
                </div>

                <div className={styles.content}>
                    <span className={styles.name}>{team.sport || ''}</span>
                    <span className={styles.num}>{team.num_match || 0}</span>
                    <span className={styles.star}>{loadStar(team.rating || 0, 12)}</span>
                </div>

            </div>
            <div className={styles.box}>
                <EditLocation show={editLocation} setShow={toggleEditLocation} value={location} setValue={setLocation}></EditLocation>
                <div className={styles.title}>
                    <span>Location</span>
                    {permission ? <button onClick={() => { toggleEditLocation(true) }}><FontAwesomeIcon height={15} icon={faEdit}></FontAwesomeIcon></button> : ''}
                </div>
                <div className={styles.content}>{location}</div>
            </div>
            <div className={styles.box}>
                <div className={styles.title}>
                    <span>Establish</span>
                </div>
                <div className={styles.content}>{establish}</div>
            </div>
            <div className={styles.box}>
                <EditAdmin show={editLocation} setShow={toggleEditAdmin} value={admins} setValue={setAdmins}></EditAdmin>
                <div className={styles.title}>
                    <span>Administrator</span>
                    {permission ? <button onClick={() => { toggleEditAdmin(true) }}><FontAwesomeIcon height={15} icon={faEdit}></FontAwesomeIcon></button> : ''}
                </div>
                <div className={styles.content}>

                </div>
            </div>
        </div>
    )
}