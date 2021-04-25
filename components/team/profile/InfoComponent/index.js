import { faCamera, faDirections } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AVATAR_TEAM, HOST, TEAM_API } from '../../../../config/config';
import styles from './styles.module.scss';

export default function InfoComponent({team, permission}) {
    const [avatar, setAvatar] = useState(team.avatar !== null ? (HOST + team.avatar) : AVATAR_TEAM);
    const token = useSelector(state => state.token)

    function handleAvatar(event) {
        var formData = new FormData();
        formData.append('image', event.target.files[0]);

        axios.post(TEAM_API + `${team.id}/avatar`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            let url = URL.createObjectURL(event.target.files[0]);
            setAvatar(url);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                <img src={avatar} key={avatar}></img>
                {permission ? <label for="button-avatar"><FontAwesomeIcon height={20} icon={faCamera}></FontAwesomeIcon></label> : ''}
                {permission ? <input id="button-avatar" type="file" onChange={handleAvatar}></input> : ''}
            </div>
            <div className={styles.friend_follow}>
                <div>
                    <span className={styles.label}>Members: {team.member}</span>
                </div>
            </div>
            <div className={styles.item}>
                <FontAwesomeIcon height={20} icon={faDirections}></FontAwesomeIcon>
                <span className={styles.text}>Location: {team.location}</span>
            </div>
            <div className={styles.item}>
                <FontAwesomeIcon height={20} icon={faDirections}></FontAwesomeIcon>
                <span className={styles.text}>Match: {team.num_match}</span>

            </div>
            <div className={styles.item}>
                <FontAwesomeIcon height={20} icon={faDirections}></FontAwesomeIcon>
                <span className={styles.text}>Sport: {team.sport}</span>
            </div>
        </div>
    )
}