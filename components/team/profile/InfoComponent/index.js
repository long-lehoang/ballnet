import { faCamera, faDirections } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR_TEAM, HOST, TEAM_API } from '../../../../config/config';
import { validateFile } from '../../../../lib/image';
import { setLoading } from '../../../../slices/loadingSlice';
import styles from './styles.module.scss';

export default function InfoComponent({team, permission}) {
    const [avatar, setAvatar] = useState(team.avatar !== null ? (HOST + team.avatar) : AVATAR_TEAM);
    const token = useSelector(state => state.token)
    const dispatch = useDispatch();

    function handleAvatar(event) {
        if(!validateFile(event.target)){
            return false;
        }
        dispatch(setLoading(true));
        var formData = new FormData();
        formData.append('image', event.target.files[0]);

        axios.post(TEAM_API + `${team.id}/avatar`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            let url = URL.createObjectURL(event.target.files[0]);
            setAvatar(url);
            dispatch(setLoading(false));

        }).catch((error) => {
            dispatch(setLoading(false));

            console.log(error);
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                <img src={avatar} key={avatar}></img>
                {permission ? <label for="button-avatar"><FontAwesomeIcon height={20} icon={faCamera}></FontAwesomeIcon></label> : ''}
                {permission ? <input id="button-avatar" type="file" accept=".jpg, .png, .jpeg" onChange={handleAvatar}></input> : ''}
            </div>
            <div className={styles.friend_follow}>
                <div>
                    <span className={styles.label}><FormattedMessage id="Members" />: {team.member}</span>
                </div>
            </div>
            <div className={styles.item}>
                <FontAwesomeIcon height={20} icon={faDirections}></FontAwesomeIcon>
                <span className={styles.text}><FormattedMessage id="Location" />: {team.location}</span>
            </div>
            <div className={styles.item}>
                <FontAwesomeIcon height={20} icon={faDirections}></FontAwesomeIcon>
                <span className={styles.text}><FormattedMessage id="Match" />: {team.num_match}</span>

            </div>
            <div className={styles.item}>
                <FontAwesomeIcon height={20} icon={faDirections}></FontAwesomeIcon>
                <span className={styles.text}><FormattedMessage id="Sport" />: {team.sport}</span>
            </div>
        </div>
    )
}