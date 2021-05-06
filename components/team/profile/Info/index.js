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
import { AVATAR, HOST, TEAM_API } from '../../../../config/config';
import Link from 'next/link';
import EditSport from './EditSport';

export default function Info({team, permission}) {
    const [overview, setOverview] = useState(team.overview || "No overview");
    const [location, setLocation] = useState(team.location);
    const [sport, setSport] = useState(team.sport);
    const [admins, setAdmins] = useState([]);
    const [members, setMembers] = useState([]);
    const [editOverview, toggleEditOverview] = useState(false);
    const [editSport, toggleEditSport] = useState(false);
    const [editLocation, toggleEditLocation] = useState(false);
    const [editAdmin, toggleEditAdmin] = useState(false);
    const created_at = new Date(team.created_at);
    const establish = `Team created at ${created_at.getDate()}/${created_at.getMonth() + 1}/${created_at.getFullYear()}`;
    const token = useSelector(state=>state.token);
    useEffect(()=>{
        axios.get(TEAM_API+`${team.id}/admin`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            setAdmins(response.data.data);
        }).catch(error=>{
            console.log(error);
        });
        axios.get(TEAM_API+`${team.id}/member`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            setMembers(response.data.data);
        }).catch(error=>{
            console.log(error);
        });
    },[null])

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
                <EditSport show={editSport} value={sport} setValue={setSport} setShow={toggleEditSport} id={team.id}></EditSport>
                <div className={styles.title}>
                    <span>Sport</span>
                    {permission ? <button onClick={() => { toggleEditSport(true) }}><FontAwesomeIcon height={15} icon={faEdit}></FontAwesomeIcon></button> : ''}
                </div>

                <div className={styles.content}>
                    <span className={styles.name}>{team.sport || ''}</span>
                    <span className={styles.num}>{team.num_match || 0}</span>
                    <span className={styles.star}>{loadStar(team.rating || 0, 12)}</span>
                </div>

            </div>
            <div className={styles.box}>
                <EditLocation show={editLocation} setShow={toggleEditLocation} id={team.id} value={location} setValue={setLocation}></EditLocation>
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
                <EditAdmin show={editAdmin} setShow={toggleEditAdmin} value={admins} members={members} id={team.id} setValue={setAdmins}></EditAdmin>
                <div className={styles.title}>
                    <span>Administrator</span>
                    {permission ? <button onClick={() => { toggleEditAdmin(true) }}><FontAwesomeIcon height={15} icon={faEdit}></FontAwesomeIcon></button> : ''}
                </div>
                <div className={styles.content}>
                    <div className={styles.admin}>
                        {
                            admins.map((admin, key)=>{
                                const src = admin.avatar===null? AVATAR: HOST + admin.avatar

                                return (
                                    <Link href={`/${admin.username}`}>
                                    <div className={styles.item} key={key}>
                                        <img src={src}></img>
                                        <div>
                                            <span className={styles.name}>{admin.name}</span>
                                            <span className={styles.location}>{admin.address != null ? admin.address.split(', ')[1] : 'No address'}</span>
                                        </div>
                                    </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}