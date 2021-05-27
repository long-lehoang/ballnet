import { faCamera, faDirections } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR, FOLLOWS_API, FRIENDS_API, HOST, PROFILE_API, SPORT_API } from '../../../config/config';
import styles from './styles.module.scss';
import { setProfile } from '../../../slices/profileSlice';
import { FormattedMessage } from 'react-intl';

export default function InfoComponent(props) {
    const [avatar, setAvatar] = useState(props.profile.avatar !== null ? (HOST + props.profile.avatar) : AVATAR);
    const [follow, setFollow] = useState(0);
    const [friend, setFriend] = useState(0);
    const [match, setMatch] = useState(0);
    const [sport, setSport] = useState("");
    const location = props.profile.address || '';
    const phone = props.profile.phone || '';
    const token = useSelector(state => state.token)

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(FRIENDS_API + props.username + '/count', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setFriend(response.data.data)
        }).catch((error) => {
            console.log(error.response)
        });

        // axios.get(FOLLOWS_API + props.username + '/count', {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // }).then((response) => {
        //     setFollow(response.data.data)
        // }).catch((error) => {
        //     console.log(error.response)
        // })

        axios.get(SPORT_API + props.username + '/main', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setMatch(response.data.data.num_match || 0);
            setSport(response.data.data.sport || "");
        }).catch((error) => {
            console.log(error.response)
        })
    }, [null])

    function handleAvatar(event) {
        var formData = new FormData();
        formData.append('image', event.target.files[0]);

        axios.post(PROFILE_API + 'avatar', formData, {
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
                {props.permission ? <label for="button-avatar"><FontAwesomeIcon height={20} icon={faCamera}></FontAwesomeIcon></label> : ''}
                {props.permission ? <input id="button-avatar" type="file" onChange={handleAvatar}></input> : ''}
            </div>
            <div className={styles.friend_follow}>
                {/* <div>
                    <span className={styles.label}><FormattedMessage id="Followers" /></span>
                    <span className={styles.number}>{follow}</span>
                </div> */}
                <div>
                    <span className={styles.label}><FormattedMessage id="Friends" />: {friend}</span>
                </div>
            </div>
            <div className={styles.item}>
                <FontAwesomeIcon height={20} icon={faDirections}></FontAwesomeIcon>
                <span className={styles.text}><FormattedMessage id="Location" />: {location}</span>
            </div>
            <div className={styles.item}>
                <FontAwesomeIcon height={20} icon={faDirections}></FontAwesomeIcon>
                <span className={styles.text}><FormattedMessage id="Match" />: {match}</span>

            </div>
            <div className={styles.item}>
                <FontAwesomeIcon height={20} icon={faDirections}></FontAwesomeIcon>
                <span className={styles.text}><FormattedMessage id="Main Sport" />: {sport}</span>
            </div>
            <div className={styles.item}>
                <FontAwesomeIcon height={20} icon={faDirections}></FontAwesomeIcon>
                <span className={styles.text}><FormattedMessage id="Phone Number" />: {phone}</span>
            </div>
        </div>
    )
}