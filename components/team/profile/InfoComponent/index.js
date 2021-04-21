import { faCamera, faDirections } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR, AVATAR_TEAM, FOLLOWS_API, FRIENDS_API, HOST, PROFILE_API, SPORT_API, TEAM_API } from '../../../../config/config';
import styles from './styles.module.scss';
import { setProfile } from '../../../../slices/profileSlice';

export default function InfoComponent({team, permission}) {
    const [avatar, setAvatar] = useState(team.avatar !== null ? (HOST + team.avatar) : AVATAR_TEAM);
    const [member, setMember] = useState(0);
    const [match, setMatch] = useState(team.num_match);
    const [sport, setSport] = useState(team.sport);
    const location = team.location || '';
    const token = useSelector(state => state.token)

    const dispatch = useDispatch();

    // useEffect(() => {
    //     axios.get(TEAM_API + `${team.id}/countMember`, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     }).then((response) => {
    //         setFriend(response.data.data)
    //     }).catch((error) => {
    //         console.log(error.response)
    //     });

    //     axios.get(FOLLOWS_API + props.username + '/count', {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     }).then((response) => {
    //         setFollow(response.data.data)
    //     }).catch((error) => {
    //         console.log(error.response)
    //     })

    //     axios.get(SPORT_API + props.username + '/main', {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     }).then((response) => {
    //         setMatch(response.data.data.num_match || 0);
    //         setSport(response.data.data.sport || "");
    //     }).catch((error) => {
    //         console.log(error.response)
    //     })
    // }, [null])

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
            dispatch(setProfile(response.data.data));
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
                    <span className={styles.label}>Members: {member}</span>
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
                <span className={styles.text}>Sport: {sport}</span>
            </div>
        </div>
    )
}